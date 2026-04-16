from fastapi import FastAPI, APIRouter, HTTPException, Depends
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import secrets
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Security
security = HTTPBasic()

# Admin credentials (in production, use environment variables)
ADMIN_USERNAME = os.environ.get('ADMIN_USERNAME', 'admin')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'keeada2025')
JURY_USERNAME = os.environ.get('JURY_USERNAME', 'jury')
JURY_PASSWORD = os.environ.get('JURY_PASSWORD', 'jury2025')


def verify_admin(credentials: HTTPBasicCredentials = Depends(security)):
    correct_username = secrets.compare_digest(credentials.username, ADMIN_USERNAME)
    correct_password = secrets.compare_digest(credentials.password, ADMIN_PASSWORD)
    if not (correct_username and correct_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return credentials.username


def verify_jury_or_admin(credentials: HTTPBasicCredentials = Depends(security)):
    is_admin = secrets.compare_digest(credentials.username, ADMIN_USERNAME) and secrets.compare_digest(credentials.password, ADMIN_PASSWORD)
    is_jury = secrets.compare_digest(credentials.username, JURY_USERNAME) and secrets.compare_digest(credentials.password, JURY_PASSWORD)
    if not (is_admin or is_jury):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return credentials.username


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


# Nomination Models
class NominationCreate(BaseModel):
    nomineeName: str
    nomineeNameArabic: str
    location: str
    email: EmailStr
    phone: str
    achievementDescription: str
    linksOrMedia: str
    nominatorName: str
    nominatorEmail: EmailStr


class Nomination(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nomineeName: str
    nomineeNameArabic: str
    location: str
    email: str
    phone: str
    achievementDescription: str
    linksOrMedia: str
    nominatorName: str
    nominatorEmail: str
    status: str = "pending"  # pending, under_review, approved, rejected
    submittedAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    averageScore: Optional[float] = None


# Evaluation Models
class EvaluationCriteria(BaseModel):
    innovation: int = Field(ge=1, le=10, description="Innovation and creativity (1-10)")
    impact: int = Field(ge=1, le=10, description="Societal impact (1-10)")
    recognition: int = Field(ge=1, le=10, description="Swedish institution recognition (1-10)")
    presentation: int = Field(ge=1, le=10, description="Quality of presentation (1-10)")
    overall: int = Field(ge=1, le=10, description="Overall impression (1-10)")


class EvaluationCreate(BaseModel):
    nominationId: str
    criteria: EvaluationCriteria
    comments: Optional[str] = ""


class Evaluation(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nominationId: str
    juryMember: str
    criteria: EvaluationCriteria
    comments: str = ""
    totalScore: float = 0
    evaluatedAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# ===== NOMINATION ENDPOINTS =====

@api_router.post("/nominations", response_model=Nomination)
async def create_nomination(nomination: NominationCreate):
    """Submit a new nomination (public endpoint)"""
    nomination_obj = Nomination(**nomination.model_dump())
    
    doc = nomination_obj.model_dump()
    doc['submittedAt'] = doc['submittedAt'].isoformat()
    
    await db.nominations.insert_one(doc)
    return nomination_obj


@api_router.get("/nominations", response_model=List[Nomination])
async def get_nominations(username: str = Depends(verify_jury_or_admin)):
    """Get all nominations (requires jury or admin auth)"""
    nominations = await db.nominations.find({}, {"_id": 0}).to_list(1000)
    
    for nom in nominations:
        if isinstance(nom.get('submittedAt'), str):
            nom['submittedAt'] = datetime.fromisoformat(nom['submittedAt'])
    
    return nominations


@api_router.get("/nominations/{nomination_id}", response_model=Nomination)
async def get_nomination(nomination_id: str, username: str = Depends(verify_jury_or_admin)):
    """Get a specific nomination"""
    nomination = await db.nominations.find_one({"id": nomination_id}, {"_id": 0})
    if not nomination:
        raise HTTPException(status_code=404, detail="Nomination not found")
    
    if isinstance(nomination.get('submittedAt'), str):
        nomination['submittedAt'] = datetime.fromisoformat(nomination['submittedAt'])
    
    return nomination


@api_router.patch("/nominations/{nomination_id}/status")
async def update_nomination_status(nomination_id: str, status: str, username: str = Depends(verify_admin)):
    """Update nomination status (admin only)"""
    if status not in ["pending", "under_review", "approved", "rejected"]:
        raise HTTPException(status_code=400, detail="Invalid status")
    
    result = await db.nominations.update_one(
        {"id": nomination_id},
        {"$set": {"status": status}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Nomination not found")
    
    return {"message": "Status updated", "status": status}


@api_router.delete("/nominations/{nomination_id}")
async def delete_nomination(nomination_id: str, username: str = Depends(verify_admin)):
    """Delete a nomination (admin only)"""
    result = await db.nominations.delete_one({"id": nomination_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Nomination not found")
    
    # Also delete related evaluations
    await db.evaluations.delete_many({"nominationId": nomination_id})
    
    return {"message": "Nomination deleted"}


# ===== EVALUATION ENDPOINTS =====

@api_router.post("/evaluations", response_model=Evaluation)
async def create_evaluation(evaluation: EvaluationCreate, username: str = Depends(verify_jury_or_admin)):
    """Submit an evaluation for a nomination"""
    # Check if nomination exists
    nomination = await db.nominations.find_one({"id": evaluation.nominationId})
    if not nomination:
        raise HTTPException(status_code=404, detail="Nomination not found")
    
    # Check if this jury member already evaluated this nomination
    existing = await db.evaluations.find_one({
        "nominationId": evaluation.nominationId,
        "juryMember": username
    })
    if existing:
        raise HTTPException(status_code=400, detail="You have already evaluated this nomination")
    
    # Calculate total score
    criteria = evaluation.criteria
    total_score = (criteria.innovation + criteria.impact + criteria.recognition + 
                   criteria.presentation + criteria.overall) / 5
    
    evaluation_obj = Evaluation(
        nominationId=evaluation.nominationId,
        juryMember=username,
        criteria=criteria,
        comments=evaluation.comments or "",
        totalScore=total_score
    )
    
    doc = evaluation_obj.model_dump()
    doc['evaluatedAt'] = doc['evaluatedAt'].isoformat()
    doc['criteria'] = evaluation.criteria.model_dump()
    
    await db.evaluations.insert_one(doc)
    
    # Update average score on nomination
    all_evaluations = await db.evaluations.find({"nominationId": evaluation.nominationId}).to_list(100)
    if all_evaluations:
        avg_score = sum(e['totalScore'] for e in all_evaluations) / len(all_evaluations)
        await db.nominations.update_one(
            {"id": evaluation.nominationId},
            {"$set": {"averageScore": round(avg_score, 2)}}
        )
    
    return evaluation_obj


@api_router.get("/evaluations/{nomination_id}", response_model=List[Evaluation])
async def get_evaluations(nomination_id: str, username: str = Depends(verify_jury_or_admin)):
    """Get all evaluations for a nomination"""
    evaluations = await db.evaluations.find({"nominationId": nomination_id}, {"_id": 0}).to_list(100)
    
    for ev in evaluations:
        if isinstance(ev.get('evaluatedAt'), str):
            ev['evaluatedAt'] = datetime.fromisoformat(ev['evaluatedAt'])
    
    return evaluations


@api_router.get("/my-evaluations", response_model=List[Evaluation])
async def get_my_evaluations(username: str = Depends(verify_jury_or_admin)):
    """Get evaluations made by the current user"""
    evaluations = await db.evaluations.find({"juryMember": username}, {"_id": 0}).to_list(100)
    
    for ev in evaluations:
        if isinstance(ev.get('evaluatedAt'), str):
            ev['evaluatedAt'] = datetime.fromisoformat(ev['evaluatedAt'])
    
    return evaluations


# ===== DASHBOARD STATS =====

@api_router.get("/dashboard/stats")
async def get_dashboard_stats(username: str = Depends(verify_jury_or_admin)):
    """Get dashboard statistics"""
    total_nominations = await db.nominations.count_documents({})
    pending = await db.nominations.count_documents({"status": "pending"})
    under_review = await db.nominations.count_documents({"status": "under_review"})
    approved = await db.nominations.count_documents({"status": "approved"})
    rejected = await db.nominations.count_documents({"status": "rejected"})
    total_evaluations = await db.evaluations.count_documents({})
    
    return {
        "totalNominations": total_nominations,
        "pending": pending,
        "underReview": under_review,
        "approved": approved,
        "rejected": rejected,
        "totalEvaluations": total_evaluations
    }


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()