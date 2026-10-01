import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useState, type ReactNode } from 'react';
import {
  LayoutDashboard, Users, UserRound, Calendar, Stethoscope, FileText,
  Pill, TestTube2, Receipt, BarChart3, Settings, LogOut, HelpCircle,
  Search, Bell, MessageSquare, Plus, Moon, Sun, Menu, X, Activity,
} from 'lucide-react';
import { useAuth, useSidebar, useTheme, useToast } from '../../context/AppContext';
import { IconButton, Avatar } from '../ui';
import { cn } from '../../utils/cn';

const navItems = [
  { to: '/app', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/app/patients', label: 'Patients', icon: Users },
  { to: '/app/doctors', label: 'Doctors', icon: UserRound },
  { to: '/app/appointments', label: 'Appointments', icon: Calendar },
  { to: '/app/consultations', label: 'Consultations', icon: Stethoscope },
  { to: '/app/prescriptions', label: 'Prescriptions', icon: FileText },
  { to: '/app/pharmacy', label: 'Pharmacy', icon: Pill },
  { to: '/app/laboratory', label: 'Laboratory', icon: TestTube2 },
  { to: '/app/billing', label: 'Billing', icon: Receipt },
  { to: '/app/reports', label: 'Reports', icon: BarChart3 },
  { to: '/app/users', label: 'Users', icon: Settings },
];

export function Logo({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="h-9 w-9 rounded-[var(--radius-md)] bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] inline-flex items-center justify-center shadow-md">
        <Activity className="h-5 w-5 text-white" />
      </div>
      {!collapsed && (
        <div className="leading-tight">
          <p className="h3">MediCare<span className="text-[var(--primary)]">+</span></p>
          <p className="caption text-[var(--text-muted)]">Clinic Platform</p>
        </div>
      )}
    </div>
  );
}

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && <div className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden anim-fade" onClick={onClose} />}
      <aside className={cn(
        'fixed lg:sticky top-0 left-0 z-50 h-screen w-[var(--sidebar-width)] bg-[var(--surface)] border-r border-[var(--border)] flex flex-col transition-transform duration-300',
        open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      )}>
        <div className="h-[var(--topbar-height)] flex items-center justify-between px-5 border-b border-[var(--border)]">
          <Logo />
          <IconButton className="lg:hidden" onClick={onClose}><X className="h-4 w-4" /></IconButton>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          <p className="overline text-[var(--text-muted)] px-3 pt-3 pb-2">Main Menu</p>
          {navItems.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              end={it.end}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius)] text-sm font-medium transition-colors group',
                  isActive
                    ? 'bg-[var(--primary-50)] text-[var(--primary)]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <it.icon className={cn('h-[18px] w-[18px]', isActive && 'text-[var(--primary)]')} />
                  <span>{it.label}</span>
                  {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-[var(--border)] space-y-0.5">
          <NavLink to="/app/settings" onClick={onClose} className={({ isActive }) => cn('flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius)] text-sm font-medium', isActive ? 'bg-[var(--primary-50)] text-[var(--primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--surface-2)]')}>
            <Settings className="h-[18px] w-[18px]" /> Settings
          </NavLink>
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius)] text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-2)] w-full">
            <HelpCircle className="h-[18px] w-[18px]" /> Help & Support
          </button>
        </div>
      </aside>
    </>
  );
}

function UserMenu() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const nav = useNavigate();
  if (!user) return null;
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2.5 pl-2 pr-2 py-1 rounded-full hover:bg-[var(--surface-2)] transition-colors focus-ring">
        <Avatar name={user.name} size={34} />
        <div className="hidden md:block text-left leading-tight">
          <p className="body font-semibold">{user.name}</p>
          <p className="caption text-[var(--text-muted)]">{user.role}</p>
        </div>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-56 rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow-lg)] z-50 anim-scale py-1.5">
            <div className="px-4 py-3 border-b border-[var(--border)]">
              <p className="body font-semibold">{user.name}</p>
              <p className="caption text-[var(--text-muted)]">{user.email}</p>
            </div>
            <button onClick={() => { setOpen(false); nav('/app/settings'); }} className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--surface-2)]">
              <Settings className="h-4 w-4" /> Settings
            </button>
            <button onClick={() => { logout(); nav('/login'); }} className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-[var(--danger)] hover:bg-[var(--danger-50)]">
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function Topbar() {
  const { setOpen } = useSidebar();
  const { theme, toggle } = useTheme();
  const { push } = useToast();
  const loc = useLocation();
  const title = getPageTitle(loc.pathname);

  return (
    <header className="sticky top-0 z-30 h-[var(--topbar-height)] bg-[var(--surface)]/80 backdrop-blur-lg border-b border-[var(--border)] flex items-center px-4 md:px-6 gap-3">
      <IconButton className="lg:hidden" onClick={() => setOpen(true)}><Menu className="h-5 w-5" /></IconButton>
      <div className="hidden md:flex items-center gap-2 text-[var(--text-muted)]">
        <span className="caption">MediCare+</span>
        <span>/</span>
        <span className="caption text-[var(--text-primary)] font-semibold">{title}</span>
      </div>
      <div className="flex-1 max-w-md mx-auto w-full">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
          <input
            placeholder="Search patients, doctors, appointments..."
            className="w-full h-10 pl-10 pr-4 rounded-full bg-[var(--surface-2)] border border-transparent text-sm focus-ring focus:border-[var(--primary)] focus:bg-[var(--surface)]"
          />
        </div>
      </div>
      <IconButton onClick={toggle} aria-label="Toggle theme">
        {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </IconButton>
      <IconButton aria-label="Messages" onClick={() => push({ type: 'info', message: 'No new messages.' })}><MessageSquare className="h-4 w-4" /></IconButton>
      <IconButton aria-label="Notifications" onClick={() => push({ type: 'success', message: '3 appointments pending confirmation.' })}>
        <span className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[var(--danger)] ring-2 ring-[var(--surface)]" />
        </span>
      </IconButton>
      <button onClick={() => push({ type: 'success', message: 'Quick add menu opened.' })} className="hidden md:inline-flex items-center gap-2 h-9 px-3.5 rounded-full btn-primary text-xs font-semibold">
        <Plus className="h-4 w-4" /> Quick Add
      </button>
      <UserMenu />
    </header>
  );
}

function getPageTitle(path: string) {
  const map: Record<string, string> = {
    '/app': 'Dashboard',
    '/app/patients': 'Patients',
    '/app/doctors': 'Doctors',
    '/app/appointments': 'Appointments',
    '/app/consultations': 'Consultations',
    '/app/prescriptions': 'Prescriptions',
    '/app/pharmacy': 'Pharmacy',
    '/app/laboratory': 'Laboratory',
    '/app/billing': 'Billing',
    '/app/reports': 'Reports',
    '/app/users': 'Users',
    '/app/settings': 'Settings',
  };
  if (path.includes('/patients/')) return 'Patient Profile';
  return map[path] || 'MediCare+';
}

export default function AppLayout({ children }: { children?: ReactNode }) {
  const { open, setOpen } = useSidebar();
  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  );
}
