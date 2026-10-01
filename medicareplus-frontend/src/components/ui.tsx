import { type ReactNode, type ButtonHTMLAttributes, type InputHTMLAttributes, type SelectHTMLAttributes, forwardRef, useEffect } from 'react';
import { X, AlertCircle, CheckCircle2, Info, AlertTriangle, Loader2, Inbox } from 'lucide-react';
import { useToast } from '../context/AppContext';
import { cn } from '../utils/cn';

/* ============ Button ============ */
type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  loading?: boolean;
};
export const Button = forwardRef<HTMLButtonElement, BtnProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...rest }, ref) => {
    const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-[var(--radius)] transition-all duration-200 focus-ring disabled:opacity-60 disabled:cursor-not-allowed';
    const variants: Record<string, string> = {
      primary: 'btn-primary',
      secondary: 'bg-[var(--secondary)] hover:bg-[var(--secondary-light)] text-white',
      outline: 'border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--text-primary)] hover:bg-[var(--surface-2)]',
      ghost: 'text-[var(--text-secondary)] hover:bg-[var(--surface-2)]',
      danger: 'bg-[var(--danger)] hover:bg-[var(--danger-600)] text-white',
      success: 'bg-[var(--success)] hover:bg-[var(--success-600)] text-white',
    };
    const sizes: Record<string, string> = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-[0.95rem]',
      icon: 'h-10 w-10',
    };
    return (
      <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} disabled={disabled || loading} {...rest}>
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

/* ============ IconButton ============ */
export function IconButton({ children, className, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...rest} className={cn('h-9 w-9 inline-flex items-center justify-center rounded-[var(--radius)] text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)] transition-colors focus-ring', className)}>
      {children}
    </button>
  );
}

/* ============ Input ============ */
type InputProps = InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string; icon?: ReactNode; };
export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, icon, className, id, ...rest }, ref) => {
  const rid = id || rest.name || 'input';
  return (
    <div className="w-full">
      {label && <label htmlFor={rid} className="block caption text-[var(--text-secondary)] mb-1.5 font-medium">{label}</label>}
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">{icon}</span>}
        <input
          ref={ref} id={rid} {...rest}
          className={cn(
            'w-full h-11 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--border-strong)] px-3.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors focus-ring focus:border-[var(--primary)]',
            icon && 'pl-10',
            error && 'border-[var(--danger)]',
            className,
          )}
        />
      </div>
      {error && <p className="caption text-[var(--danger)] mt-1.5">{error}</p>}
    </div>
  );
});
Input.displayName = 'Input';

/* ============ Select ============ */
type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & { label?: string; };
export function Select({ label, className, children, ...rest }: SelectProps) {
  return (
    <div className="w-full">
      {label && <label className="block caption text-[var(--text-secondary)] mb-1.5 font-medium">{label}</label>}
      <select {...rest} className={cn('w-full h-11 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--border-strong)] px-3 text-sm text-[var(--text-primary)] focus-ring focus:border-[var(--primary)]', className)}>
        {children}
      </select>
    </div>
  );
}

/* ============ Card ============ */
export function Card({ className, children, hover, ...rest }: { className?: string; children: ReactNode; hover?: boolean } & React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('card p-5', hover && 'card-hover', className)} {...rest}>{children}</div>;
}

/* ============ StatCard ============ */
export function StatCard({ icon, label, value, change, positive, color = 'blue' }: { icon: ReactNode; label: string; value: string; change?: string; positive?: boolean; color?: 'blue' | 'teal' | 'amber' | 'purple'; }) {
  const colors: Record<string, string> = {
    blue: 'bg-[var(--primary-50)] text-[var(--primary)]',
    teal: 'bg-[var(--secondary-50)] text-[var(--secondary)]',
    amber: 'bg-[var(--warning-50)] text-[var(--warning)]',
    purple: 'bg-[#f5f3ff] text-[#8b5cf6] dark:bg-[#1f1b33]',
  };
  return (
    <div className="card p-5 anim-fade">
      <div className="flex items-start justify-between">
        <div className={cn('h-11 w-11 rounded-[var(--radius-md)] inline-flex items-center justify-center', colors[color])}>
          {icon}
        </div>
        {change && (
          <span className={cn('caption font-semibold px-2 py-0.5 rounded-full', positive ? 'bg-[var(--success-50)] text-[var(--success)]' : 'bg-[var(--danger-50)] text-[var(--danger)]')}>
            {positive ? '▲' : '▼'} {change}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="caption text-[var(--text-muted)] font-medium">{label}</p>
        <p className="h2 mt-1">{value}</p>
      </div>
    </div>
  );
}

/* ============ Badge ============ */
export function Badge({ children, variant = 'default' }: { children: ReactNode; variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'primary'; }) {
  const v: Record<string, string> = {
    default: 'bg-[var(--surface-2)] text-[var(--text-secondary)]',
    success: 'bg-[var(--success-50)] text-[var(--success-600)]',
    warning: 'bg-[var(--warning-50)] text-[var(--warning)]',
    danger: 'bg-[var(--danger-50)] text-[var(--danger-600)]',
    info: 'bg-[var(--info-50)] text-[var(--info)]',
    primary: 'bg-[var(--primary-50)] text-[var(--primary)]',
  };
  return <span className={cn('caption inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-semibold', v[variant])}>{children}</span>;
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'default'> = {
    Confirmed: 'success', Paid: 'success', Completed: 'success', Active: 'success', 'In Stock': 'success', Available: 'success', Normal: 'success',
    Pending: 'warning', Processing: 'warning', 'Low Stock': 'warning', 'Expiring Soon': 'warning', 'In Consultation': 'warning',
    Cancelled: 'danger', Overdue: 'danger', 'Out of Stock': 'danger', Expired: 'danger', Critical: 'danger', Inactive: 'danger', 'Off Duty': 'danger',
  };
  return <Badge variant={map[status] || 'default'}>{status}</Badge>;
}

/* ============ Avatar ============ */
export function Avatar({ name, size = 40, color }: { name: string; size?: number; color?: string }) {
  const initials = name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();
  const palette = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#0d9488', '#ef4444'];
  const hash = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const bg = color || palette[hash % palette.length];
  return (
    <div
      className="inline-flex items-center justify-center rounded-full font-semibold text-white select-none shrink-0"
      style={{ width: size, height: size, background: bg, fontSize: size * 0.38 }}
    >
      {initials}
    </div>
  );
}

/* ============ Modal ============ */
export function Modal({ open, onClose, title, children, size = 'md' }: { open: boolean; onClose: () => void; title?: string; children: ReactNode; size?: 'sm' | 'md' | 'lg' | 'xl'; }) {
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = ''; };
  }, [open, onClose]);
  if (!open) return null;
  const widths = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm anim-fade" onClick={onClose} />
      <div className={cn('relative w-full rounded-[var(--radius-xl)] bg-[var(--surface)] shadow-[var(--shadow-xl)] anim-scale overflow-hidden', widths[size])}>
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
            <h3 className="h3">{title}</h3>
            <IconButton onClick={onClose} aria-label="Close"><X className="h-4 w-4" /></IconButton>
          </div>
        )}
        <div className="max-h-[75vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

/* ============ Empty State ============ */
export function EmptyState({ icon = <Inbox className="h-6 w-6" />, title, description, action }: { icon?: ReactNode; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="h-14 w-14 rounded-full bg-[var(--surface-2)] inline-flex items-center justify-center text-[var(--text-muted)] mb-4">{icon}</div>
      <h4 className="h3">{title}</h4>
      {description && <p className="body text-[var(--text-secondary)] mt-1 max-w-sm">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

/* ============ Skeleton ============ */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('skeleton rounded-[var(--radius)]', className)} />;
}

/* ============ Table wrapper ============ */
export function TableWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">{children}</table>
    </div>
  );
}
export function Th({ children, className }: { children: ReactNode; className?: string }) {
  return <th className={cn('text-left caption text-[var(--text-muted)] font-semibold uppercase tracking-wider py-3 px-4 border-b border-[var(--border)]', className)}>{children}</th>;
}
export function Td({ children, className }: { children: ReactNode; className?: string }) {
  return <td className={cn('py-3.5 px-4 border-b border-[var(--border)] text-[var(--text-primary)]', className)}>{children}</td>;
}

/* ============ Toast Container ============ */
export function ToastContainer() {
  const { toasts, dismiss } = useToast();
  const icons = { success: CheckCircle2, error: AlertCircle, info: Info, warning: AlertTriangle };
  const colors = {
    success: 'border-[var(--success)] text-[var(--success)]',
    error: 'border-[var(--danger)] text-[var(--danger)]',
    info: 'border-[var(--info)] text-[var(--info)]',
    warning: 'border-[var(--warning)] text-[var(--warning)]',
  };
  return (
    <div className="fixed top-5 right-5 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => {
        const Icon = icons[t.type];
        return (
          <div key={t.id} className={cn('pointer-events-auto flex items-center gap-3 min-w-[300px] max-w-sm px-4 py-3 rounded-[var(--radius-md)] bg-[var(--surface)] border-l-4 shadow-[var(--shadow-lg)] anim-slide', colors[t.type])}>
            <Icon className="h-5 w-5 shrink-0" />
            <p className="body text-[var(--text-primary)] flex-1">{t.message}</p>
            <button onClick={() => dismiss(t.id)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"><X className="h-4 w-4" /></button>
          </div>
        );
      })}
    </div>
  );
}

/* ============ Page Header ============ */
export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 mb-6 anim-fade">
      <div>
        <h1 className="h1">{title}</h1>
        {subtitle && <p className="body text-[var(--text-secondary)] mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
    </div>
  );
}

/* ============ Section Title (for landing page) ============ */
export function SectionTitle({ eyebrow, title, subtitle, center }: { eyebrow?: string; title: string; subtitle?: string; center?: boolean }) {
  return (
    <div className={cn('max-w-2xl', center && 'mx-auto text-center')}>
      {eyebrow && <span className="overline text-[var(--primary)]">{eyebrow}</span>}
      <h2 className="h1 mt-2">{title}</h2>
      {subtitle && <p className="body-lg text-[var(--text-secondary)] mt-3">{subtitle}</p>}
    </div>
  );
}
