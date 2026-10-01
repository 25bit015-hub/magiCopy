import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, Plus, Download, Filter, Mail, Phone, MapPin, Calendar, Droplet, Edit, Printer, ArrowLeft, Activity, Pill, TestTube2, Receipt } from 'lucide-react';
import { PageHeader, Button, Input, Select, Card, Avatar, Badge, StatusBadge, TableWrapper, Th, Td, IconButton, EmptyState } from '../components/ui';
import { patients as allPatients } from '../data/mockData';
import { useToast } from '../context/AppContext';

export function PatientsList() {
  const [search, setSearch] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');
  const nav = useNavigate();
  const { push } = useToast();

  const filtered = useMemo(() => allPatients.filter((p) => {
    const q = search.toLowerCase();
    const matchQ = !q || p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.phone.includes(q);
    const matchG = !gender || p.gender === gender;
    const matchS = !status || p.status === status;
    return matchQ && matchG && matchS;
  }), [search, gender, status]);

  return (
    <div>
      <PageHeader
        title="Patients"
        subtitle={`${allPatients.length} total patients · ${allPatients.filter(p => p.status === 'Active').length} active`}
        actions={<>
          <Button variant="outline"><Download className="h-4 w-4" /> Export</Button>
          <Button onClick={() => push({ type: 'success', message: 'Patient form opened.' })}><Plus className="h-4 w-4" /> Add Patient</Button>
        </>}
      />

      <Card className="mb-5">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[220px]">
            <Input placeholder="Search by name, patient ID or phone..." icon={<Search className="h-4 w-4" />} value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="w-40"><Select value={gender} onChange={(e) => setGender(e.target.value)}><option value="">All Genders</option><option>Male</option><option>Female</option></Select></div>
          <div className="w-40"><Select value={status} onChange={(e) => setStatus(e.target.value)}><option value="">All Status</option><option>Active</option><option>Inactive</option></Select></div>
          <Button variant="outline"><Filter className="h-4 w-4" /> More filters</Button>
        </div>
      </Card>

      <Card className="p-0 overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState title="No patients found" description="Try changing your search or add a new patient." action={<Button>Add Patient</Button>} />
        ) : (
          <TableWrapper>
            <thead>
              <tr>
                <Th>Patient</Th>
                <Th className="hidden md:table-cell">Gender</Th>
                <Th className="hidden md:table-cell">Age</Th>
                <Th className="hidden lg:table-cell">Phone</Th>
                <Th className="hidden lg:table-cell">Last Visit</Th>
                <Th>Status</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-[var(--surface-2)] transition-colors cursor-pointer" onClick={() => nav(`/app/patients/${p.id}`)}>
                  <Td>
                    <div className="flex items-center gap-3">
                      <Avatar name={p.name} size={36} />
                      <div>
                        <p className="body font-semibold">{p.name}</p>
                        <p className="caption text-[var(--text-muted)]">{p.id}</p>
                      </div>
                    </div>
                  </Td>
                  <Td className="hidden md:table-cell"><span className="body">{p.gender}</span></Td>
                  <Td className="hidden md:table-cell"><span className="body">{p.age}</span></Td>
                  <Td className="hidden lg:table-cell"><span className="body">{p.phone}</span></Td>
                  <Td className="hidden lg:table-cell"><span className="body">{p.lastVisit}</span></Td>
                  <Td><StatusBadge status={p.status} /></Td>
                  <Td className="text-right">
                    <IconButton onClick={(e) => { e.stopPropagation(); nav(`/app/patients/${p.id}`); }}><Edit className="h-4 w-4" /></IconButton>
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableWrapper>
        )}
      </Card>
    </div>
  );
}

export function PatientProfile() {
  const { id } = useParams();
  const nav = useNavigate();
  const patient = allPatients.find((p) => p.id === id) || allPatients[0];
  const tabs = ['Overview', 'Medical History', 'Appointments', 'Prescriptions', 'Laboratory', 'Billing'];
  const [tab, setTab] = useState('Overview');

  return (
    <div>
      <button onClick={() => nav(-1)} className="inline-flex items-center gap-1.5 caption font-semibold text-[var(--text-secondary)] hover:text-[var(--primary)] mb-4">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to patients
      </button>

      <Card className="mb-5">
        <div className="flex flex-wrap items-start gap-5">
          <Avatar name={patient.name} size={72} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="h2">{patient.name}</h1>
              <Badge variant={patient.status === 'Active' ? 'success' : 'default'}>{patient.status}</Badge>
            </div>
            <p className="caption text-[var(--text-muted)] mt-1">Patient ID · {patient.id}</p>
            <div className="flex flex-wrap gap-5 mt-4 caption text-[var(--text-secondary)]">
              <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {patient.age} years · {patient.gender}</span>
              <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {patient.phone}</span>
              <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> {patient.email}</span>
              <span className="flex items-center gap-1.5"><Droplet className="h-3.5 w-3.5" /> {patient.blood}</span>
              <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {patient.address}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline"><Printer className="h-4 w-4" /> Print</Button>
            <Button><Calendar className="h-4 w-4" /> Book Appointment</Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-1 border-b border-[var(--border)] mb-5 overflow-x-auto">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-3 caption font-semibold whitespace-nowrap border-b-2 transition-colors ${tab === t ? 'border-[var(--primary)] text-[var(--primary)]' : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>{t}</button>
        ))}
      </div>

      {tab === 'Overview' && (
        <div className="grid lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <h3 className="h3 mb-4">Vital Signs</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { l: 'Blood Pressure', v: '120/80', u: 'mmHg', c: 'blue' },
                { l: 'Heart Rate', v: '72', u: 'bpm', c: 'teal' },
                { l: 'Temperature', v: '36.6', u: '°C', c: 'amber' },
                { l: 'O₂ Saturation', v: '98', u: '%', c: 'purple' },
              ].map((s) => (
                <div key={s.l} className="rounded-[var(--radius-md)] bg-[var(--surface-2)] p-4">
                  <p className="caption text-[var(--text-muted)] font-semibold">{s.l}</p>
                  <p className="h2 mt-1">{s.v}<span className="caption text-[var(--text-muted)] ml-1">{s.u}</span></p>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="h3 mb-4">Medical Summary</h3>
            <div className="space-y-3">
              <div><p className="caption text-[var(--text-muted)] font-semibold">Allergies</p><div className="flex flex-wrap gap-1.5 mt-1.5"><Badge variant="danger">Penicillin</Badge><Badge variant="danger">Nuts</Badge></div></div>
              <div><p className="caption text-[var(--text-muted)] font-semibold">Conditions</p><div className="flex flex-wrap gap-1.5 mt-1.5"><Badge variant="warning">Hypertension</Badge></div></div>
              <div><p className="caption text-[var(--text-muted)] font-semibold">Current Medication</p><div className="flex flex-wrap gap-1.5 mt-1.5"><Badge variant="info">Amlodipine 5mg</Badge></div></div>
            </div>
          </Card>
          <Card className="lg:col-span-3">
            <h3 className="h3 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { icon: Activity, t: 'Consultation with Dr. Amelia Hart', d: 'Cardiology · General checkup', time: 'Jan 20, 2026' },
                { icon: Pill, t: 'Prescription issued', d: 'Amlodipine 5mg · 30 tablets', time: 'Jan 20, 2026' },
                { icon: TestTube2, t: 'Lab test: Lipid Profile', d: 'Results: Normal', time: 'Jan 15, 2026' },
                { icon: Receipt, t: 'Invoice #INV-8801 paid', d: '$85.00 via Card', time: 'Jan 15, 2026' },
              ].map((a, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-[var(--radius)] hover:bg-[var(--surface-2)] transition-colors">
                  <div className="h-9 w-9 rounded-full bg-[var(--primary-50)] text-[var(--primary)] inline-flex items-center justify-center shrink-0"><a.icon className="h-4 w-4" /></div>
                  <div className="flex-1"><p className="body font-semibold">{a.t}</p><p className="caption text-[var(--text-muted)]">{a.d}</p></div>
                  <span className="caption text-[var(--text-muted)] whitespace-nowrap">{a.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
      {tab !== 'Overview' && <Card><EmptyState title={`${tab} coming soon`} description={`Full ${tab.toLowerCase()} records will be available once connected to the backend.`} /></Card>}
    </div>
  );
}
