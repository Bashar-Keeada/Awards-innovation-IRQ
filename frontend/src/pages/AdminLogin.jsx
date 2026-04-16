import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Lock, User, AlertCircle } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Test credentials with API
      const credentials = btoa(`${username}:${password}`);
      const response = await fetch(`${BACKEND_URL}/api/dashboard/stats`, {
        headers: {
          'Authorization': `Basic ${credentials}`
        }
      });

      if (response.ok) {
        login(username, password);
        navigate('/admin/dashboard');
      } else {
        setError('Felaktiga inloggningsuppgifter');
      }
    } catch (err) {
      setError('Kunde inte ansluta till servern');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-dark to-primary-blue flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-blue/10 flex items-center justify-center">
              <Lock className="w-8 h-8 text-primary-blue" />
            </div>
            <h1 className="text-2xl font-bold text-text-dark">Admin / Jury Login</h1>
            <p className="text-text-muted mt-2">جائزة الإبداع - Innovation Award</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span className="text-red-700">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Användarnamn</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="pl-10"
                  placeholder="admin / jury"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Lösenord</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full py-6 bg-primary-blue hover:bg-primary-dark"
              disabled={isLoading}
            >
              {isLoading ? 'Loggar in...' : 'Logga in'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-primary-blue hover:underline">
              ← Tillbaka till hemsidan
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
