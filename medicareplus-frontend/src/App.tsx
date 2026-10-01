import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import type { ReactNode } from 'react';
import { AppProvider, useAuth } from './context/AppContext';
import AppLayout from './components/layout/AppLayout';
import { ToastContainer, Skeleton } from './components/ui';

/* Lazy-loaded pages for code splitting */
const Landing = lazy(() => import('./pages/Landing'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const PatientsList = lazy(() => import('./pages/Patients').then((m) => ({ default: m.PatientsList })));
const PatientProfile = lazy(() => import('./pages/Patients').then((m) => ({ default: m.PatientProfile })));
const DoctorsList = lazy(() => import('./pages/Doctors').then((m) => ({ default: m.DoctorsList })));
const DoctorProfile = lazy(() => import('./pages/Doctors').then((m) => ({ default: m.DoctorProfile })));
const Appointments = lazy(() => import('./pages/Appointments'));
const Consultation = lazy(() => import('./pages/Medical').then((m) => ({ default: m.Consultation })));
const Prescriptions = lazy(() => import('./pages/Medical').then((m) => ({ default: m.Prescriptions })));
const Pharmacy = lazy(() => import('./pages/Operations').then((m) => ({ default: m.Pharmacy })));
const Laboratory = lazy(() => import('./pages/Operations').then((m) => ({ default: m.Laboratory })));
const Billing = lazy(() => import('./pages/Business').then((m) => ({ default: m.Billing })));
const Reports = lazy(() => import('./pages/Business').then((m) => ({ default: m.Reports })));
const Users = lazy(() => import('./pages/Admin').then((m) => ({ default: m.Users })));
const Settings = lazy(() => import('./pages/Admin').then((m) => ({ default: m.Settings })));

function Loader() {
  return (
    <div className="p-6 space-y-4 anim-fade">
      <div className="flex items-center gap-3"><Skeleton className="h-8 w-8 rounded-full" /><Skeleton className="h-6 w-64" /></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28" />)}</div>
      <Skeleton className="h-80" />
    </div>
  );
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const loc = useLocation();
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: loc }} replace />;
  return <>{children}</>;
}

function PublicOnly({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/app" replace />;
  return <>{children}</>;
}

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center anim-fade">
        <p className="display bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">404</p>
        <h2 className="h2 mt-2">Page not found</h2>
        <p className="body text-[var(--text-secondary)] mt-2">The page you are looking for does not exist.</p>
        <a href="/" className="inline-block mt-6 btn-primary h-11 px-6 rounded-[var(--radius)] text-sm font-semibold text-white">Back to home</a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<PublicOnly><Login /></PublicOnly>} />
            <Route path="/app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="patients" element={<PatientsList />} />
              <Route path="patients/:id" element={<PatientProfile />} />
              <Route path="doctors" element={<DoctorsList />} />
              <Route path="doctors/:id" element={<DoctorProfile />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="consultations" element={<Consultation />} />
              <Route path="prescriptions" element={<Prescriptions />} />
              <Route path="pharmacy" element={<Pharmacy />} />
              <Route path="laboratory" element={<Laboratory />} />
              <Route path="billing" element={<Billing />} />
              <Route path="reports" element={<Reports />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <ToastContainer />
      </BrowserRouter>
    </AppProvider>
  );
}
