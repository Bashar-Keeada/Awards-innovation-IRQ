import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';
import {
  ArrowLeft,
  User,
  MapPin,
  Mail,
  Phone,
  FileText,
  Link as LinkIcon,
  Star,
  Send,
  CheckCircle,
  RefreshCw
} from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const NominationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAuthHeaders, isAuthenticated, user } = useAuth();
  const [nomination, setNomination] = useState(null);
  const [evaluations, setEvaluations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showEvaluationForm, setShowEvaluationForm] = useState(false);
  const [hasEvaluated, setHasEvaluated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [evaluation, setEvaluation] = useState({
    innovation: 5,
    impact: 5,
    recognition: 5,
    presentation: 5,
    overall: 5,
    comments: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
      return;
    }
    fetchData();
  }, [isAuthenticated, navigate, id]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const headers = getAuthHeaders();
      
      const [nomRes, evalRes, myEvalsRes] = await Promise.all([
        fetch(`${BACKEND_URL}/api/nominations/${id}`, { headers }),
        fetch(`${BACKEND_URL}/api/evaluations/${id}`, { headers }),
        fetch(`${BACKEND_URL}/api/my-evaluations`, { headers })
      ]);

      if (nomRes.ok) {
        setNomination(await nomRes.json());
      }
      if (evalRes.ok) {
        setEvaluations(await evalRes.json());
      }
      if (myEvalsRes.ok) {
        const myEvals = await myEvalsRes.json();
        setHasEvaluated(myEvals.some(e => e.nominationId === id));
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const submitEvaluation = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/evaluations`, {
        method: 'POST',
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nominationId: id,
          criteria: {
            innovation: evaluation.innovation,
            impact: evaluation.impact,
            recognition: evaluation.recognition,
            presentation: evaluation.presentation,
            overall: evaluation.overall
          },
          comments: evaluation.comments
        })
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setShowEvaluationForm(false);
        setHasEvaluated(true);
        fetchData();
      } else {
        const error = await response.json();
        alert(error.detail || 'Kunde inte spara bedömningen');
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const criteriaLabels = {
    innovation: { sv: 'Innovation & Kreativitet', ar: 'الابتكار والإبداع' },
    impact: { sv: 'Samhällspåverkan', ar: 'الأثر المجتمعي' },
    recognition: { sv: 'Svenskt erkännande', ar: 'الاعتراف السويدي' },
    presentation: { sv: 'Presentation', ar: 'جودة العرض' },
    overall: { sv: 'Helhetsintryck', ar: 'الانطباع العام' }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-section flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-primary-blue" />
      </div>
    );
  }

  if (!nomination) {
    return (
      <div className="min-h-screen bg-bg-section flex items-center justify-center">
        <p>Nominering hittades inte</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-section">
      {/* Header */}
      <header className="bg-primary-dark text-white shadow-lg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/admin/dashboard')}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Tillbaka
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold">Nomineringsdetaljer</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Nominee Info Card */}
            <div className="bg-white rounded-xl shadow-sm border border-border-light p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-text-dark">{nomination.nomineeName}</h2>
                  <p className="text-xl text-text-muted" dir="rtl">{nomination.nomineeNameArabic}</p>
                </div>
                <Badge className={
                  nomination.status === 'approved' ? 'bg-green-100 text-green-800' :
                  nomination.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  nomination.status === 'under_review' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }>
                  {nomination.status === 'pending' && 'Väntande'}
                  {nomination.status === 'under_review' && 'Under granskning'}
                  {nomination.status === 'approved' && 'Godkänd'}
                  {nomination.status === 'rejected' && 'Avvisad'}
                </Badge>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-text-muted" />
                  <span>{nomination.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-text-muted" />
                  <span>{nomination.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-text-muted" />
                  <span>{nomination.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-text-muted" />
                  <span>Nominerad av: {nomination.nominatorName}</span>
                </div>
              </div>

              <div className="border-t border-border-light pt-6">
                <h3 className="font-semibold text-text-dark mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary-blue" />
                  Beskrivning av motivering
                </h3>
                <p className="text-text-body whitespace-pre-wrap leading-relaxed">
                  {nomination.achievementDescription}
                </p>
              </div>

              {nomination.linksOrMedia && (
                <div className="border-t border-border-light pt-6 mt-6">
                  <h3 className="font-semibold text-text-dark mb-3 flex items-center gap-2">
                    <LinkIcon className="w-5 h-5 text-primary-blue" />
                    Länkar / Media
                  </h3>
                  <p className="text-text-body whitespace-pre-wrap">
                    {nomination.linksOrMedia}
                  </p>
                </div>
              )}
            </div>

            {/* Existing Evaluations */}
            {evaluations.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-border-light p-6">
                <h3 className="font-semibold text-text-dark mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-accent-gold" />
                  Bedömningar ({evaluations.length})
                </h3>
                <div className="space-y-4">
                  {evaluations.map((ev, idx) => (
                    <div key={idx} className="border border-border-light rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-text-dark">{ev.juryMember}</span>
                        <span className="text-lg font-bold text-accent-gold">★ {ev.totalScore.toFixed(1)}</span>
                      </div>
                      <div className="grid grid-cols-5 gap-2 text-sm mb-3">
                        {Object.entries(ev.criteria).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <p className="text-text-muted text-xs">{criteriaLabels[key]?.sv}</p>
                            <p className="font-medium">{value}/10</p>
                          </div>
                        ))}
                      </div>
                      {ev.comments && (
                        <p className="text-sm text-text-muted italic">"{ev.comments}"</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Evaluation Form */}
          <div className="space-y-6">
            {/* Score Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-border-light p-6 text-center">
              <p className="text-sm text-text-muted mb-2">Genomsnittlig poäng</p>
              <p className="text-5xl font-bold text-accent-gold">
                {nomination.averageScore ? `★ ${nomination.averageScore}` : '-'}
              </p>
              <p className="text-sm text-text-muted mt-2">
                {evaluations.length} bedömning(ar)
              </p>
            </div>

            {/* Evaluation Form */}
            {!hasEvaluated && !submitSuccess ? (
              <div className="bg-white rounded-xl shadow-sm border border-border-light p-6">
                <h3 className="font-semibold text-text-dark mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-accent-gold" />
                  Lämna din bedömning
                </h3>

                {!showEvaluationForm ? (
                  <Button 
                    onClick={() => setShowEvaluationForm(true)}
                    className="w-full bg-primary-blue hover:bg-primary-dark"
                  >
                    Bedöm denna nominering
                  </Button>
                ) : (
                  <div className="space-y-6">
                    {Object.entries(criteriaLabels).map(([key, labels]) => (
                      <div key={key}>
                        <div className="flex justify-between mb-2">
                          <Label>{labels.sv}</Label>
                          <span className="font-bold text-primary-blue">{evaluation[key]}/10</span>
                        </div>
                        <Slider
                          value={[evaluation[key]]}
                          onValueChange={(v) => setEvaluation(prev => ({ ...prev, [key]: v[0] }))}
                          min={1}
                          max={10}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    ))}

                    <div>
                      <Label>Kommentarer (valfritt)</Label>
                      <Textarea
                        value={evaluation.comments}
                        onChange={(e) => setEvaluation(prev => ({ ...prev, comments: e.target.value }))}
                        placeholder="Skriv dina kommentarer här..."
                        rows={4}
                        className="mt-2"
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        onClick={() => setShowEvaluationForm(false)}
                        className="flex-1"
                      >
                        Avbryt
                      </Button>
                      <Button 
                        onClick={submitEvaluation}
                        disabled={isSubmitting}
                        className="flex-1 bg-accent-gold hover:bg-accent-gold/90 text-primary-dark"
                      >
                        {isSubmitting ? 'Sparar...' : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Skicka
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-green-50 rounded-xl border border-green-200 p-6 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="font-medium text-green-800">Du har redan bedömt denna nominering</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NominationDetail;
