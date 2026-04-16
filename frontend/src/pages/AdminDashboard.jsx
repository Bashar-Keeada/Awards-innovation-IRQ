import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  LayoutDashboard,
  Users,
  FileText,
  LogOut,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Star,
  BarChart3,
  RefreshCw,
  MapPin
} from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AdminDashboard = () => {
  const { user, logout, getAuthHeaders, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [nominations, setNominations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
      return;
    }
    fetchData();
  }, [isAuthenticated, navigate]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const headers = getAuthHeaders();
      
      const [statsRes, nominationsRes] = await Promise.all([
        fetch(`${BACKEND_URL}/api/dashboard/stats`, { headers }),
        fetch(`${BACKEND_URL}/api/nominations`, { headers })
      ]);

      if (statsRes.ok) {
        setStats(await statsRes.json());
      }
      if (nominationsRes.ok) {
        setNominations(await nominationsRes.json());
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (nominationId, newStatus) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/nominations/${nominationId}/status?status=${newStatus}`, {
        method: 'PATCH',
        headers: getAuthHeaders()
      });
      if (response.ok) {
        fetchData();
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const deleteNomination = async (nominationId) => {
    if (!window.confirm('Är du säker på att du vill ta bort denna nominering?')) return;
    
    try {
      const response = await fetch(`${BACKEND_URL}/api/nominations/${nominationId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (response.ok) {
        fetchData();
      }
    } catch (err) {
      console.error('Error deleting:', err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      under_review: 'bg-blue-100 text-blue-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    const labels = {
      pending: 'Väntande',
      under_review: 'Under granskning',
      approved: 'Godkänd',
      rejected: 'Avvisad'
    };
    return <Badge className={styles[status]}>{labels[status]}</Badge>;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-section flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-primary-blue" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-section">
      {/* Header */}
      <header className="bg-primary-dark text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <LayoutDashboard className="w-8 h-8 text-accent-gold" />
              <div>
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-white/70">جائزة الإبداع - Innovation Award</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/70">
                Inloggad som: <strong className="text-accent-gold">{user?.username}</strong>
                {user?.role === 'admin' && <Badge className="ml-2 bg-accent-gold text-primary-dark">Admin</Badge>}
                {user?.role === 'jury' && <Badge className="ml-2 bg-accent-green text-white">Jury</Badge>}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout} className="text-white border-white/30 hover:bg-white/10">
                <LogOut className="w-4 h-4 mr-2" />
                Logga ut
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'overview'
                  ? 'border-primary-blue text-primary-blue'
                  : 'border-transparent text-text-muted hover:text-text-dark'
              }`}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              Översikt
            </button>
            <button
              onClick={() => setActiveTab('nominations')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'nominations'
                  ? 'border-primary-blue text-primary-blue'
                  : 'border-transparent text-text-muted hover:text-text-dark'
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Nomineringar
            </button>
            <button
              onClick={() => setActiveTab('evaluate')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'evaluate'
                  ? 'border-primary-blue text-primary-blue'
                  : 'border-transparent text-text-muted hover:text-text-dark'
              }`}
            >
              <Star className="w-4 h-4 inline mr-2" />
              Bedöm
            </button>
            <button
              onClick={() => navigate('/admin/internal-document')}
              className="py-4 px-2 border-b-2 border-transparent font-medium text-sm transition-colors text-text-muted hover:text-text-dark"
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Strategiskt Dokument
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && stats && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border-light">
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="w-5 h-5 text-primary-blue" />
                  <span className="text-sm text-text-muted">Totalt</span>
                </div>
                <p className="text-3xl font-bold text-text-dark">{stats.totalNominations}</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border-light">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-text-muted">Väntande</span>
                </div>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border-light">
                <div className="flex items-center gap-3 mb-2">
                  <Eye className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-text-muted">Granskas</span>
                </div>
                <p className="text-3xl font-bold text-blue-600">{stats.underReview}</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border-light">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-text-muted">Godkända</span>
                </div>
                <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border-light">
                <div className="flex items-center gap-3 mb-2">
                  <XCircle className="w-5 h-5 text-red-500" />
                  <span className="text-sm text-text-muted">Avvisade</span>
                </div>
                <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border-light">
                <div className="flex items-center gap-3 mb-2">
                  <Star className="w-5 h-5 text-accent-gold" />
                  <span className="text-sm text-text-muted">Bedömningar</span>
                </div>
                <p className="text-3xl font-bold text-accent-gold">{stats.totalEvaluations}</p>
              </div>
            </div>

            {/* Recent Nominations */}
            <div className="bg-white rounded-xl shadow-sm border border-border-light">
              <div className="p-6 border-b border-border-light">
                <h2 className="text-lg font-semibold text-text-dark">Senaste nomineringar</h2>
              </div>
              <div className="p-6">
                {nominations.slice(0, 5).map((nom) => (
                  <div key={nom.id} className="flex items-center justify-between py-3 border-b border-border-light last:border-0">
                    <div>
                      <p className="font-medium text-text-dark">{nom.nomineeName}</p>
                      <p className="text-sm text-text-muted">{nom.nomineeNameArabic} • {nom.location}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {nom.averageScore && (
                        <span className="text-sm font-medium text-accent-gold">
                          ★ {nom.averageScore}
                        </span>
                      )}
                      {getStatusBadge(nom.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'nominations' && (
          <div className="bg-white rounded-xl shadow-sm border border-border-light overflow-hidden">
            <div className="p-6 border-b border-border-light flex items-center justify-between">
              <h2 className="text-lg font-semibold text-text-dark">Alla nomineringar</h2>
              <Button onClick={fetchData} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Uppdatera
              </Button>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Namn</TableHead>
                    <TableHead>Arabiskt namn</TableHead>
                    <TableHead>Plats</TableHead>
                    <TableHead>E-post</TableHead>
                    <TableHead>Poäng</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Åtgärder</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {nominations.map((nom) => (
                    <TableRow key={nom.id}>
                      <TableCell className="font-medium">{nom.nomineeName}</TableCell>
                      <TableCell dir="rtl">{nom.nomineeNameArabic}</TableCell>
                      <TableCell>{nom.location}</TableCell>
                      <TableCell>{nom.email}</TableCell>
                      <TableCell>
                        {nom.averageScore ? (
                          <span className="font-medium text-accent-gold">★ {nom.averageScore}</span>
                        ) : (
                          <span className="text-text-muted">-</span>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(nom.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/admin/nomination/${nom.id}`)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {user?.role === 'admin' && (
                            <>
                              <select
                                className="text-xs border rounded px-2 py-1"
                                value={nom.status}
                                onChange={(e) => updateStatus(nom.id, e.target.value)}
                              >
                                <option value="pending">Väntande</option>
                                <option value="under_review">Granskas</option>
                                <option value="approved">Godkänd</option>
                                <option value="rejected">Avvisad</option>
                              </select>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-700"
                                onClick={() => deleteNomination(nom.id)}
                              >
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {activeTab === 'evaluate' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-border-light p-6">
              <h2 className="text-lg font-semibold text-text-dark mb-2">Bedöm nomineringar</h2>
              <p className="text-text-muted mb-6">Klicka på en nominering nedan för att se detaljer och lämna din bedömning.</p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {nominations.map((nom) => (
                  <div 
                    key={nom.id}
                    onClick={() => navigate(`/admin/nomination/${nom.id}`)}
                    className="border border-border-light rounded-lg p-4 hover:border-accent-gold hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-text-dark group-hover:text-primary-blue transition-colors">
                          {nom.nomineeName}
                        </h3>
                        <p className="text-sm text-text-muted" dir="rtl">{nom.nomineeNameArabic}</p>
                      </div>
                      {nom.averageScore ? (
                        <span className="text-lg font-bold text-accent-gold">★ {nom.averageScore}</span>
                      ) : (
                        <span className="text-sm text-text-muted bg-bg-section px-2 py-1 rounded">Ej bedömd</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                      <MapPin className="w-4 h-4" />
                      <span>{nom.location}</span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-border-light">
                      <p className="text-sm text-text-body line-clamp-2">
                        {nom.achievementDescription}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      {getStatusBadge(nom.status)}
                      <span className="text-xs text-primary-blue group-hover:underline">
                        Visa & Bedöm →
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {nominations.length === 0 && (
                <div className="text-center py-12 text-text-muted">
                  <Star className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p>Inga nomineringar att bedöma ännu.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
