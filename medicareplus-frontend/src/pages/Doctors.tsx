import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, Plus, Star, Phone, Mail, Calendar, Award, Users as UsersIcon, ArrowLeft, MapPin } from 'lucide-react';
import { PageHeader, Button, Input, Select, Card, Avatar, Badge, StatusBadge, EmptyState } from '../components/ui';
import { doctors as allDoctors } from '../data/mockData';

export function DoctorsList() {
  const [search, setSearch] = useState('');
  const [spec, setSpec] = useState('');
  const [view, setView] = useState<'grid' | 'table'>('grid');
  const nav = useNavigate();

  const specs = Array.from(new Set(allDoctors.map((d) => d.specialization)));
  const filtered = allDoctors.filter((d) => {
    const q = search.toLowerCase();
    return (!q || d.name.toLowerCase().includes(q) || d.specialization.toLowerCase().includes(q)) && (!spec || d.specialization === spec);
  });

  return (
    <div>
      <PageHeader
        title="Doctors"
        subtitle={`${allDoctors.length} physicians · ${allDoctors.filter(d => d.status === 'Available').length} available now`}
        actions={<>
          <Button variant="outline" onClick={() => setView(view === 'grid' ? 'table' : 'grid')}>{view === 'grid' ? 'Table' : 'Card'} View</Button>
          <Button><Plus className="h-4 w-4" /> Add Doctor</Button>
        </>}
      />

      <Card className="mb-5">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[220px]"><Input placeholder="Search by name or specialization..." icon={<Search className="h-4 w-4" />} value={search} onChange={(e) => setSearch(e.target.value)} /></div>
          <div className="w-52"><Select value={spec} onChange={(e) => setSpec(e.target.value)}><option value="">All Specializations</option>{specs.map((s) => <option key={s}>{s}</option>)}</Select></div>
        </div>
      </Card>

      {filtered.length === 0 ? (
        <Card><EmptyState title="No doctors found" description="Try adjusting your filters." /></Card>
      ) : view === 'grid' ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((d) => (
            <Card key={d.id} hover className="p-0 overflow-hidden cursor-pointer" onClick={() => nav(`/app/doctors/${d.id}`)}>
              <div className="h-24 relative" style={{ background: `linear-gradient(135deg, ${d.color}33, ${d.color}11)` }}>
                <div className="absolute -bottom-8 left-5"><div className="h-16 w-16 rounded-[var(--radius-md)] shadow-[var(--shadow-md)] inline-flex items-center justify-center text-white text-xl font-bold" style={{ background: d.color }}>{d.initial}</div></div>
                <div className="absolute top-3 right-3"><Badge variant={d.status === 'Available' ? 'success' : d.status === 'Off Duty' ? 'danger' : 'warning'}>{d.status}</Badge></div>
              </div>
              <div className="p-5 pt-11">
                <h4 className="h3">{d.name}</h4>
                <p className="caption text-[var(--text-secondary)] mt-0.5">{d.specialization}</p>
                <div className="flex items-center gap-4 mt-3 caption text-[var(--text-muted)]">
                  <span className="flex items-center gap-1"><Award className="h-3.5 w-3.5" />{d.experience}y</span>
                  <span className="flex items-center gap-1"><UsersIcon className="h-3.5 w-3.5" />{d.patients}</span>
                  <span className="flex items-center gap-1 text-[var(--warning)]"><Star className="h-3.5 w-3.5" fill="currentColor" />{d.rating}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto"><table className="w-full text-sm">
            <thead><tr>
              <th className="text-left caption text-[var(--text-muted)] font-semibold uppercase tracking-wider py-3 px-4 border-b border-[var(--border)]">Doctor</th>
              <th className="text-left caption text-[var(--text-muted)] font-semibold uppercase tracking-wider py-3 px-4 border-b border-[var(--border)]">Specialization</th>
              <th className="text-left caption text-[var(--text-muted)] font-semibold uppercase tracking-wider py-3 px-4 border-b border-[var(--border)] hidden md:table-cell">Experience</th>
              <th className="text-left caption text-[var(--text-muted)] font-semibold uppercase tracking-wider py-3 px-4 border-b border-[var(--border)] hidden lg:table-cell">Phone</th>
              <th className="text-left caption text-[var(--text-muted)] font-semibold uppercase tracking-wider py-3 px-4 border-b border-[var(--border)]">Rating</th>
              <th className="text-left caption text-[var(--text-muted)] font-semibold uppercase tracking-wider py-3 px-4 border-b border-[var(--border)]">Status</th>
            </tr></thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id} onClick={() => nav(`/app/doctors/${d.id}`)} className="hover:bg-[var(--surface-2)] cursor-pointer transition-colors">
                  <td className="py-3.5 px-4 border-b border-[var(--border)]">
                    <div className="flex items-center gap-3"><Avatar name={d.name} size={36} color={d.color} /><div><p className="body font-semibold">{d.name}</p><p className="caption text-[var(--text-muted)]">{d.email}</p></div></div>
                  </td>
                  <td className="py-3.5 px-4 border-b border-[var(--border)] body">{d.specialization}</td>
                  <td className="py-3.5 px-4 border-b border-[var(--border)] body hidden md:table-cell">{d.experience} years</td>
                  <td className="py-3.5 px-4 border-b border-[var(--border)] body hidden lg:table-cell">{d.phone}</td>
                  <td className="py-3.5 px-4 border-b border-[var(--border)]"><span className="inline-flex items-center gap-1 body font-semibold text-[var(--warning)]"><Star className="h-3.5 w-3.5" fill="currentColor" />{d.rating}</span></td>
                  <td className="py-3.5 px-4 border-b border-[var(--border)]"><StatusBadge status={d.status} /></td>
                </tr>
              ))}
            </tbody>
          </table></div>
        </Card>
      )}
    </div>
  );
}

export function DoctorProfile() {
  const { id } = useParams();
  const nav = useNavigate();
  const doctor = allDoctors.find((d) => d.id === id) || allDoctors[0];

  return (
    <div>
      <button onClick={() => nav(-1)} className="inline-flex items-center gap-1.5 caption font-semibold text-[var(--text-secondary)] hover:text-[var(--primary)] mb-4">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to doctors
      </button>
      <Card className="mb-5">
        <div className="flex flex-wrap items-start gap-5">
          <div className="h-20 w-20 rounded-[var(--radius-lg)] inline-flex items-center justify-center text-white text-3xl font-bold" style={{ background: doctor.color }}>{doctor.initial}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap"><h1 className="h2">{doctor.name}</h1><StatusBadge status={doctor.status} /></div>
            <p className="body text-[var(--text-secondary)] mt-1">{doctor.specialization}</p>
            <div className="flex flex-wrap gap-5 mt-4 caption text-[var(--text-secondary)]">
              <span className="flex items-center gap-1.5"><Award className="h-3.5 w-3.5" /> {doctor.experience} years experience</span>
              <span className="flex items-center gap-1.5"><UsersIcon className="h-3.5 w-3.5" /> {doctor.patients} patients treated</span>
              <span className="flex items-center gap-1.5 text-[var(--warning)]"><Star className="h-3.5 w-3.5" fill="currentColor" /> {doctor.rating} rating</span>
              <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {doctor.phone}</span>
              <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> {doctor.email}</span>
            </div>
          </div>
          <Button><Calendar className="h-4 w-4" /> Schedule</Button>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <h3 className="h3 mb-4">Today's Schedule</h3>
          <div className="space-y-2">
            {['09:00 AM — Olivia Bennett', '10:00 AM — Marcus Chen', '11:00 AM — Break', '01:00 PM — Sophia Almeida', '02:30 PM — Ethan Walker'].map((s, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-[var(--radius)] bg-[var(--surface-2)] body"><Calendar className="h-4 w-4 text-[var(--primary)]" />{s}</div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="h3 mb-4">About</h3>
          <p className="body text-[var(--text-secondary)]">
            {doctor.name} is a highly experienced {doctor.specialization.toLowerCase()} specialist with {doctor.experience} years of dedicated service. Committed to patient-centered care and evidence-based medicine.
          </p>
          <div className="mt-5 space-y-2.5">
            <div className="flex items-center gap-2.5 body text-[var(--text-secondary)]"><MapPin className="h-4 w-4 text-[var(--text-muted)]" /> MediCare+ Downtown Clinic</div>
            <div className="flex items-center gap-2.5 body text-[var(--text-secondary)]"><Award className="h-4 w-4 text-[var(--text-muted)]" /> Board Certified · {doctor.specialization}</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
