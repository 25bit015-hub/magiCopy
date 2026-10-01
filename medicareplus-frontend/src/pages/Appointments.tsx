import { useState } from 'react';
import { Search, Plus, Calendar as CalIcon, LayoutGrid, Table as TableIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { PageHeader, Button, Input, Select, Card, Avatar, StatusBadge, TableWrapper, Th, Td, Modal, EmptyState } from '../components/ui';
import { appointmentsToday as allAppts, doctors, services } from '../data/mockData';
import { useToast } from '../context/AppContext';

export default function Appointments() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [view, setView] = useState<'table' | 'calendar'>('table');
  const [open, setOpen] = useState(false);
  const { push } = useToast();

  const filtered = allAppts.filter((a) => {
    const q = search.toLowerCase();
    return (!q || a.patient.toLowerCase().includes(q) || a.id.toLowerCase().includes(q)) && (!status || a.status === status);
  });

  return (
    <div>
      <PageHeader
        title="Appointments"
        subtitle="Manage all scheduled and upcoming appointments"
        actions={<Button onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> New Appointment</Button>}
      />

      <Card className="mb-5">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[220px]"><Input placeholder="Search by patient or appointment ID..." icon={<Search className="h-4 w-4" />} value={search} onChange={(e) => setSearch(e.target.value)} /></div>
          <div className="w-40"><Select value={status} onChange={(e) => setStatus(e.target.value)}><option value="">All Status</option><option>Confirmed</option><option>Pending</option><option>Completed</option><option>Cancelled</option></Select></div>
          <div className="flex gap-1 p-1 rounded-[var(--radius)] bg-[var(--surface-2)]">
            <button onClick={() => setView('table')} className={`h-8 px-3 caption font-semibold rounded-[var(--radius-sm)] transition-colors ${view === 'table' ? 'bg-[var(--surface)] shadow-sm text-[var(--primary)]' : 'text-[var(--text-secondary)]'}`}><TableIcon className="h-3.5 w-3.5 inline mr-1.5" />Table</button>
            <button onClick={() => setView('calendar')} className={`h-8 px-3 caption font-semibold rounded-[var(--radius-sm)] transition-colors ${view === 'calendar' ? 'bg-[var(--surface)] shadow-sm text-[var(--primary)]' : 'text-[var(--text-secondary)]'}`}><LayoutGrid className="h-3.5 w-3.5 inline mr-1.5" />Calendar</button>
          </div>
        </div>
      </Card>

      {view === 'table' ? (
        <Card className="p-0 overflow-hidden">
          {filtered.length === 0 ? <EmptyState title="No appointments" description="Try adjusting your filters or create a new appointment." /> : (
            <TableWrapper>
              <thead>
                <tr>
                  <Th>ID</Th>
                  <Th>Patient</Th>
                  <Th className="hidden md:table-cell">Doctor</Th>
                  <Th className="hidden lg:table-cell">Service</Th>
                  <Th>Time</Th>
                  <Th>Status</Th>
                  <Th className="text-right">Actions</Th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id} className="hover:bg-[var(--surface-2)] transition-colors">
                    <Td><span className="caption font-mono text-[var(--text-muted)]">{a.id}</span></Td>
                    <Td><div className="flex items-center gap-2.5"><Avatar name={a.patient} size={32} /><span className="body font-semibold">{a.patient}</span></div></Td>
                    <Td className="hidden md:table-cell body">{a.doctor}</Td>
                    <Td className="hidden lg:table-cell body">{a.service}</Td>
                    <Td><span className="body font-semibold">{a.time}</span></Td>
                    <Td><StatusBadge status={a.status} /></Td>
                    <Td className="text-right"><Button size="sm" variant="outline" onClick={() => push({ type: 'info', message: `Viewing appointment ${a.id}` })}>View</Button></Td>
                  </tr>
                ))}
              </tbody>
            </TableWrapper>
          )}
        </Card>
      ) : (
        <CalendarView />
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="New Appointment" size="lg">
        <form onSubmit={(e) => { e.preventDefault(); push({ type: 'success', message: 'Appointment booked successfully!' }); setOpen(false); }} className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Select label="Patient"><option>Select patient</option>{allAppts.map((a) => <option key={a.id}>{a.patient}</option>)}</Select>
            <Select label="Doctor"><option>Select doctor</option>{doctors.map((d) => <option key={d.id}>{d.name}</option>)}</Select>
            <Select label="Department"><option>General</option><option>Cardiology</option><option>Pediatrics</option><option>Dental</option></Select>
            <Select label="Service"><option>Select service</option>{services.map((s) => <option key={s.title}>{s.title}</option>)}</Select>
            <Input type="date" label="Date" />
            <Select label="Time"><option>09:00 AM</option><option>10:00 AM</option><option>11:00 AM</option><option>02:00 PM</option><option>03:00 PM</option></Select>
          </div>
          <Input label="Reason" placeholder="Brief reason for the visit" />
          <div><label className="block caption text-[var(--text-secondary)] mb-1.5 font-medium">Notes</label><textarea rows={3} className="w-full rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--border-strong)] px-3.5 py-2.5 text-sm focus-ring focus:border-[var(--primary)]" placeholder="Additional notes..." /></div>
          <div className="flex justify-end gap-2 pt-2"><Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button type="submit">Book Appointment</Button></div>
        </form>
      </Modal>
    </div>
  );
}

function CalendarView() {
  const [month, setMonth] = useState(new Date());
  const start = new Date(month.getFullYear(), month.getMonth(), 1);
  const end = new Date(month.getFullYear(), month.getMonth() + 1, 0);
  const firstDay = start.getDay();
  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= end.getDate(); i++) days.push(i);

  const events: Record<number, { title: string; time: string; color: string }[]> = {
    5: [{ title: 'Olivia Bennett', time: '09:00', color: 'var(--primary)' }, { title: 'Marcus Chen', time: '14:00', color: 'var(--secondary)' }],
    12: [{ title: 'Dr. Hart — Clinic', time: 'All day', color: 'var(--warning)' }],
    18: [{ title: 'Sophia Almeida', time: '10:30', color: 'var(--primary)' }],
    22: [{ title: 'Team Meeting', time: '16:00', color: 'var(--info)' }, { title: 'Ethan Walker', time: '11:15', color: 'var(--primary)' }],
    26: [{ title: 'Ava Thompson', time: '13:00', color: 'var(--secondary)' }],
  };

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="h3">{month.toLocaleString('en-US', { month: 'long', year: 'numeric' })}</h3>
        <div className="flex gap-1">
          <Button size="icon" variant="outline" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}><ChevronLeft className="h-4 w-4" /></Button>
          <Button size="icon" variant="outline" onClick={() => setMonth(new Date())}><CalIcon className="h-4 w-4" /></Button>
          <Button size="icon" variant="outline" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}><ChevronRight className="h-4 w-4" /></Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className="caption text-[var(--text-muted)] font-semibold uppercase text-center py-2">{d}</div>
        ))}
        {days.map((d, i) => {
          const ev = d ? events[d] : undefined;
          const isToday = d === new Date().getDate() && month.getMonth() === new Date().getMonth() && month.getFullYear() === new Date().getFullYear();
          return (
            <div key={i} className={`min-h-[90px] p-2 rounded-[var(--radius)] border ${d ? 'border-[var(--border)] bg-[var(--surface)]' : 'border-transparent'}`}>
              {d && (
                <>
                  <div className={`caption font-semibold mb-1 inline-flex items-center justify-center h-6 w-6 rounded-full ${isToday ? 'bg-[var(--primary)] text-white' : ''}`}>{d}</div>
                  <div className="space-y-1">
                    {ev?.map((e, j) => (
                      <div key={j} className="caption px-1.5 py-0.5 rounded text-white truncate" style={{ background: e.color }}>{e.time} · {e.title}</div>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
