import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Activity, Check } from 'lucide-react';
import { Button, Input } from '../components/ui';
import { useAuth, useToast } from '../context/AppContext';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const { push } = useToast();
  const [email, setEmail] = useState('amelia.hart@medicareplus.com');
  const [password, setPassword] = useState('Password123');
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Enter a valid email';
    if (!password) errs.password = 'Password is required';
    else if (password.length < 6) errs.password = 'At least 6 characters';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    try {
      await login(email, password);
      push({ type: 'success', message: 'Welcome back! Redirecting...' });
      setTimeout(() => nav('/app'), 500);
    } catch {
      push({ type: 'error', message: 'Invalid credentials. Try again.' });
    } finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[var(--background)]">
      {/* Left — branding panel */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden bg-gradient-to-br from-[var(--primary-dark)] via-[var(--primary)] to-[var(--secondary)]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 h-72 w-72 rounded-full bg-white/30 blur-3xl" />
          <div className="absolute bottom-10 left-10 h-64 w-64 rounded-full bg-[var(--secondary)]/60 blur-3xl" />
        </div>
        <div className="relative">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-[var(--radius-md)] bg-white/15 backdrop-blur inline-flex items-center justify-center">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <p className="h3 text-white">MediCare<span className="text-white/80">+</span></p>
          </Link>
        </div>

        <div className="relative text-white max-w-md anim-fade">
          <span className="overline text-white/70">Welcome back</span>
          <h1 className="display mt-3 text-white">Care that feels like home.</h1>
          <p className="body-lg text-white/80 mt-4">
            Sign in to manage patients, appointments, prescriptions and more — all from one beautiful workspace.
          </p>
          <ul className="mt-8 space-y-3">
            {['End-to-end encrypted data', 'Role-based access control', 'Real-time analytics & reports'].map((f) => (
              <li key={f} className="flex items-center gap-2.5 body text-white/90">
                <span className="h-6 w-6 rounded-full bg-white/15 inline-flex items-center justify-center"><Check className="h-3.5 w-3.5" /></span>{f}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex items-center gap-6 text-white/70 caption">
          <span>© 2026 MediCare Plus</span>
          <span>•</span>
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md anim-fade">
          <div className="lg:hidden mb-8">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-[var(--radius-md)] bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] inline-flex items-center justify-center">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <p className="h3">MediCare<span className="text-[var(--primary)]">+</span></p>
            </Link>
          </div>
          <h1 className="h1">Sign in</h1>
          <p className="body text-[var(--text-secondary)] mt-1">Enter your credentials to access the platform.</p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <Input
              label="Email address"
              type="email"
              placeholder="you@clinic.com"
              icon={<Mail className="h-4 w-4" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              autoComplete="email"
            />
            <div className="relative">
              <Input
                label="Password"
                type={show ? 'text' : 'password'}
                placeholder="Enter your password"
                icon={<Lock className="h-4 w-4" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-[38px] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                aria-label="Toggle password"
              >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 rounded border-[var(--border-strong)] accent-[var(--primary)]" />
                <span className="caption text-[var(--text-secondary)]">Remember me</span>
              </label>
              <a href="#" className="caption font-semibold text-[var(--primary)] hover:underline">Forgot password?</a>
            </div>

            <Button type="submit" size="lg" className="w-full" loading={loading}>
              Sign in <ArrowRight className="h-4 w-4" />
            </Button>

            <div className="rounded-[var(--radius)] bg-[var(--surface-2)] p-3.5">
              <p className="caption font-semibold text-[var(--text-primary)]">Demo credentials</p>
              <p className="caption text-[var(--text-muted)] mt-0.5">Email: <span className="font-mono">amelia.hart@medicareplus.com</span></p>
              <p className="caption text-[var(--text-muted)]">Password: <span className="font-mono">Password123</span></p>
            </div>

            <p className="text-center caption text-[var(--text-secondary)]">
              Don't have an account? <a href="#" className="font-semibold text-[var(--primary)] hover:underline">Request access</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
