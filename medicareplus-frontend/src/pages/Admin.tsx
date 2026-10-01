import { useState } from 'react';
import { Shield, Moon, Sun, Bell, Lock, Globe, Smartphone } from 'lucide-react';
import { PageHeader, Card, Button, Input, Select, TableWrapper, Th, Td, Avatar, Badge, StatusBadge } from '../components/ui';
import { users as allUsers } from '../data/mockData';
import { useAuth, useTheme, useToast } from '../context/AppContext';

const roleColors: Record<string, 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'> = {
  Admin: 'primary', Doctor: 'info', Nurse: 'success', Receptionist: 'warning', Pharmacist: 'info', Laboratory: 'danger', Cashier: 'default',
};

export function Users() {
  const { push } = useToast();
  return (
    <div>
      <PageHeader title="Users & Roles" subtitle="Manage platform access and role permissions" actions={<Button onClick={() => push({ type: 'success', message: 'New user form opened.' })}>+ Add User</Button>} />

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
        {['Admin', 'Doctor', 'Nurse', 'Receptionist', 'Pharmacist', 'Laboratory', 'Cashier'].map((r) => (
          <Card key={r} hover className="text-center p-4">
            <div className="h-10 w-10 rounded-full bg-[var(--primary-50)] text-[var(--primary)] inline-flex items-center justify-center mb-2"><Shield className="h-5 w-5" /></div>
            <p className="caption font-semibold">{r}</p>
            <p className="h3 mt-0.5">{allUsers.filter((u) => u.role === r).length}</p>
          </Card>
        ))}
      </div>

      <Card className="p-0 overflow-hidden">
        <TableWrapper>
          <thead>
            <tr><Th>User</Th><Th>Role</Th><Th className="hidden md:table-cell">Email</Th><Th>Status</Th><Th className="hidden lg:table-cell">Last Login</Th></tr>
          </thead>
          <tbody>
            {allUsers.map((u) => (
              <tr key={u.id} className="hover:bg-[var(--surface-2)] transition-colors">
                <Td><div className="flex items-center gap-3"><Avatar name={u.name} size={36} /><div><p className="body font-semibold">{u.name}</p><p className="caption text-[var(--text-muted)]">{u.id}</p></div></div></Td>
                <Td><Badge variant={roleColors[u.role] || 'default'}>{u.role}</Badge></Td>
                <Td className="hidden md:table-cell body text-[var(--text-secondary)]">{u.email}</Td>
                <Td><StatusBadge status={u.status} /></Td>
                <Td className="hidden lg:table-cell body text-[var(--text-muted)]">{u.lastLogin}</Td>
              </tr>
            ))}
          </tbody>
        </TableWrapper>
      </Card>
    </div>
  );
}

export function Settings() {
  const { user } = useAuth();
  const { theme, toggle } = useTheme();
  const { push } = useToast();
  const [tab, setTab] = useState('Profile');
  const tabs = ['Profile', 'Security', 'Notifications', 'Appearance'];

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage your account and platform preferences" />

      <Card className="mb-5 p-0">
        <div className="flex gap-1 border-b border-[var(--border)] overflow-x-auto">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-5 py-3 caption font-semibold whitespace-nowrap border-b-2 transition-colors ${tab === t ? 'border-[var(--primary)] text-[var(--primary)]' : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>{t}</button>
          ))}
        </div>
      </Card>

      {tab === 'Profile' && (
        <Card>
          <h3 className="h3 mb-4">Personal Information</h3>
          <div className="flex items-center gap-4 mb-6">
            <Avatar name={user?.name || 'User'} size={72} />
            <div><Button size="sm" variant="outline">Change Avatar</Button><p className="caption text-[var(--text-muted)] mt-1.5">JPG, PNG up to 2MB</p></div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Input label="Full Name" defaultValue={user?.name} />
            <Input label="Email" defaultValue={user?.email} />
            <Input label="Phone" defaultValue="+1 415 555 0101" />
            <Select label="Role"><option>{user?.role}</option></Select>
          </div>
          <div className="mt-6 flex justify-end"><Button onClick={() => push({ type: 'success', message: 'Profile updated successfully.' })}>Save Changes</Button></div>
        </Card>
      )}

      {tab === 'Security' && (
        <Card>
          <h3 className="h3 mb-4 flex items-center gap-2"><Lock className="h-5 w-5 text-[var(--primary)]" /> Password & Security</h3>
          <div className="space-y-4 max-w-md">
            <Input label="Current Password" type="password" />
            <Input label="New Password" type="password" />
            <Input label="Confirm Password" type="password" />
          </div>
          <div className="mt-6 p-4 rounded-[var(--radius)] bg-[var(--surface-2)] flex items-start gap-3">
            <Smartphone className="h-5 w-5 text-[var(--primary)] shrink-0 mt-0.5" />
            <div className="flex-1"><p className="body font-semibold">Two-factor authentication</p><p className="caption text-[var(--text-secondary)]">Add an extra layer of security to your account.</p></div>
            <Button size="sm" variant="outline">Enable</Button>
          </div>
          <div className="mt-4 flex justify-end"><Button onClick={() => push({ type: 'success', message: 'Password updated.' })}>Update Password</Button></div>
        </Card>
      )}

      {tab === 'Notifications' && (
        <Card>
          <h3 className="h3 mb-4 flex items-center gap-2"><Bell className="h-5 w-5 text-[var(--primary)]" /> Notification Preferences</h3>
          <div className="space-y-3">
            {[
              { l: 'Appointment reminders', d: 'Receive a notification before appointments' },
              { l: 'New patient registration', d: 'Notify when new patients are added' },
              { l: 'Payment receipts', d: 'Send automatic receipts to patients' },
              { l: 'Low stock alerts', d: 'Pharmacy inventory warnings' },
              { l: 'Critical lab results', d: 'Immediate alerts for critical findings' },
            ].map((n, i) => (
              <div key={n.l} className="flex items-center justify-between p-3 rounded-[var(--radius)] hover:bg-[var(--surface-2)] transition-colors">
                <div><p className="body font-semibold">{n.l}</p><p className="caption text-[var(--text-muted)]">{n.d}</p></div>
                <label className="relative inline-block w-11 h-6"><input type="checkbox" defaultChecked={i !== 2} className="peer sr-only" /><span className="absolute inset-0 bg-[var(--surface-2)] peer-checked:bg-[var(--primary)] rounded-full transition-colors cursor-pointer" /><span className="absolute left-0.5 top-0.5 h-5 w-5 bg-white rounded-full transition-transform peer-checked:translate-x-5 shadow-sm" /></label>
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === 'Appearance' && (
        <Card>
          <h3 className="h3 mb-4 flex items-center gap-2">{theme === 'light' ? <Sun className="h-5 w-5 text-[var(--primary)]" /> : <Moon className="h-5 w-5 text-[var(--primary)]" />} Theme</h3>
          <div className="grid sm:grid-cols-2 gap-3 max-w-xl">
            <button onClick={() => theme !== 'light' && toggle()} className={`p-4 rounded-[var(--radius-lg)] border-2 text-left transition-all ${theme === 'light' ? 'border-[var(--primary)] bg-[var(--primary-50)]' : 'border-[var(--border)] hover:border-[var(--primary-200)]'}`}>
              <Sun className="h-5 w-5 text-[var(--warning)]" />
              <p className="body font-semibold mt-2">Light</p>
              <p className="caption text-[var(--text-muted)]">Clean and bright interface</p>
            </button>
            <button onClick={() => theme !== 'dark' && toggle()} className={`p-4 rounded-[var(--radius-lg)] border-2 text-left transition-all ${theme === 'dark' ? 'border-[var(--primary)] bg-[var(--primary-50)]' : 'border-[var(--border)] hover:border-[var(--primary-200)]'}`}>
              <Moon className="h-5 w-5 text-[var(--primary)]" />
              <p className="body font-semibold mt-2">Dark</p>
              <p className="caption text-[var(--text-muted)]">Comfortable for low light</p>
            </button>
          </div>
          <div className="mt-6 pt-6 border-t border-[var(--border)]">
            <h4 className="h3 flex items-center gap-2"><Globe className="h-4 w-4" /> Language</h4>
            <Select className="mt-2 max-w-xs"><option>English (US)</option><option>Español</option><option>Français</option><option>Deutsch</option></Select>
          </div>
        </Card>
      )}
    </div>
  );
}
