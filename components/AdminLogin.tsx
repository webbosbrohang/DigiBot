import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const success = await login(email, password);
    if (success) {
      // Navigate to the secret dashboard route
      navigate('/_admin_secret_portal_99/dashboard');
    } else {
      setError('Invalid credentials. Access denied.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150"></div>
        
        <div className="w-full max-w-md relative z-10">
            <div className="bg-vault-card border border-vault-border rounded-xl overflow-hidden shadow-2xl relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-vault-neon"></div>
                
                <div className="p-8">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 bg-vault-dark border border-vault-border rounded-full flex items-center justify-center mb-4 relative group">
                            <div className="absolute inset-0 bg-vault-neon/20 rounded-full animate-pulse-slow"></div>
                            <Shield className="w-8 h-8 text-vault-neon" />
                        </div>
                        <h2 className="text-2xl font-display font-bold text-white tracking-wider">SECURE LOGIN</h2>
                        <p className="text-slate-500 text-sm font-mono mt-2">Restricted Access // Auth Required</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded flex items-center gap-2 text-red-400 text-sm">
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-mono text-slate-400 uppercase">System ID (Email)</label>
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-vault-dark border border-vault-border rounded p-3 text-white focus:border-vault-neon focus:outline-none transition-colors"
                                placeholder="admin@digibot.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-mono text-slate-400 uppercase">Access Key (Password)</label>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-vault-dark border border-vault-border rounded p-3 text-white focus:border-vault-neon focus:outline-none transition-colors"
                                placeholder="admin123"
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-vault-neon text-vault-dark font-bold font-display uppercase p-4 rounded hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <span className="animate-pulse">Authenticating...</span>
                            ) : (
                                <>
                                    <Lock className="w-4 h-4" /> Initialize Session
                                </>
                            )}
                        </button>
                    </form>
                </div>
                <div className="bg-vault-dark p-4 border-t border-vault-border text-center">
                    <p className="text-[10px] text-slate-600 font-mono">
                        UNAUTHORIZED ACCESS WILL BE LOGGED AND REPORTED.
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
};