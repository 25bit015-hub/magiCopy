import { useState } from 'react';
import { Heart, Thermometer, Activity, Scale, Ruler, Wind, Save, Plus, Printer, Pill, X } from 'lucide-react';
import { PageHeader, Card, Button, Input, Select, Avatar, Badge, TableWrapper, Th, Td, Modal, EmptyState } from '../components/ui';
import { useToast } from '../context/AppContext';
import { patients } from '../data/mockData';

export function Consultation() {
  const { push } = useToast();
  const patient = patients[0];
  const [vitals, setVitals] = useState({ bp: '120/80', temp: '36.6', pulse: '72', weight: '68', height: '170', spo2: '98' });
  const bmi = (Number(vitals.weight) / Math.pow(Number(vitals.height) / 100, 2)).toFixed(1);

  return (
    <div>
      <PageHeader title="New Consultation" subtitle="Record medical assessment and diagnosis" />

      <Card className="mb-5">
        <div className="flex items-center gap-4">
          <Avatar name={patient.name} size={52} />
          <div className="flex-1">
            <p className="h3">{patient.name}</p>
            <p className="caption text-[var(--text-muted)]">{patient.id} · {patient.age} years · {patient.gender} · Blood {patient.blood}</p>
          </div>
          <Badge variant="info">In Consultation</Badge>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <h3 className="h3 mb-4">Chief Complaint</h3>
          <textarea rows={3} className="w-full rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--border-strong)] px-3.5 py-2.5 text-sm focus-ring focus:border-[var(--primary)]" placeholder="Patient's main complaint..." defaultValue="Recurrent chest discomfort during exertion, mild shortness of breath." />

          <h3 className="h3 mt-6 mb-3">Vital Signs</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: Heart, k: 'bp', l: 'Blood Pressure', u: 'mmHg' },
              { icon: Thermometer, k: 'temp', l: 'Temperature', u: '°C' },
              { icon: Activity, k: 'pulse', l: 'Pulse', u: 'bpm' },
              { icon: Wind, k: 'spo2', l: 'SpO₂', u: '%' },
            ].map((v) => (
              <div key={v.k}>
                <label className="caption text-[var(--text-secondary)] flex items-center gap-1 mb-1.5 font-medium"><v.icon className="h-3.5 w-3.5" />{v.l}</label>
                <Input value={vitals[v.k as keyof typeof vitals]} onChange={(e) => setVitals({ ...vitals, [v.k]: e.target.value })} />
              </div>
            ))}
            <div><label className="caption text-[var(--text-secondary)] flex items-center gap-1 mb-1.5 font-medium"><Scale className="h-3.5 w-3.5" />Weight (kg)</label><Input value={vitals.weight} onChange={(e) => setVitals({ ...vitals, weight: e.target.value })} /></div>
            <div><label className="caption text-[var(--text-secondary)] flex items-center gap-1 mb-1.5 font-medium"><Ruler className="h-3.5 w-3.5" />Height (cm)</label><Input value={vitals.height} onChange={(e) => setVitals({ ...vitals, height: e.target.value })} /></div>
            <div><label className="caption text-[var(--text-secondary)] mb-1.5 block font-medium">BMI (calc)</label><Input value={bmi} disabled /></div>
          </div>

          <h3 className="h3 mt-6 mb-3">Diagnosis</h3>
          <Input placeholder="Primary diagnosis" />
          <textarea rows={2} className="w-full mt-3 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--border-strong)] px-3.5 py-2.5 text-sm focus-ring focus:border-[var(--primary)]" placeholder="Clinical notes..." />

          <h3 className="h3 mt-6 mb-3">Treatment Plan</h3>
          <textarea rows={3} className="w-full rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--border-strong)] px-3.5 py-2.5 text-sm focus-ring focus:border-[var(--primary)]" placeholder="Recommended treatment..." />

          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline">Save as Draft</Button>
            <Button onClick={() => push({ type: 'success', message: 'Consultation saved.' })}><Save className="h-4 w-4" /> Save Consultation</Button>
          </div>
        </Card>

        <div className="space-y-4">
          <Card>
            <h3 className="h3 mb-3">Medical History</h3>
            <ul className="space-y-2">
              {['Hypertension (2020)', 'Appendectomy (2015)', 'Seasonal allergies'].map((h) => (
                <li key={h} className="flex items-center gap-2 caption text-[var(--text-secondary)]"><span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />{h}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="h3 mb-3">Allergies</h3>
            <div className="flex flex-wrap gap-1.5"><Badge variant="danger">Penicillin</Badge><Badge variant="danger">Nuts</Badge></div>
          </Card>
          <Card>
            <h3 className="h3 mb-3">Follow-up</h3>
            <Input type="date" />
            <Input placeholder="Follow-up notes" className="mt-2" />
          </Card>
        </div>
      </div>
    </div>
  );
}

type Med = { name: string; dosage: string; frequency: string; duration: string; route: string; instructions: string };

export function Prescriptions() {
  const { push } = useToast();
  const [meds, setMeds] = useState<Med[]>([
    { name: 'Amoxicillin 500mg', dosage: '500mg', frequency: '3 times a day', duration: '7 days', route: 'Oral', instructions: 'Take with food' },
    { name: 'Paracetamol 500mg', dosage: '500mg', frequency: 'As needed', duration: '5 days', route: 'Oral', instructions: 'Max 4 doses/day' },
  ]);
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(false);
  const [form, setForm] = useState<Med>({ name: '', dosage: '', frequency: '', duration: '', route: 'Oral', instructions: '' });

  const add = () => { if (!form.name) return; setMeds([...meds, form]); setForm({ name: '', dosage: '', frequency: '', duration: '', route: 'Oral', instructions: '' }); setOpen(false); push({ type: 'success', message: 'Medicine added to prescription.' }); };

  return (
    <div>
      <PageHeader
        title="Prescriptions"
        subtitle="Create and manage patient prescriptions"
        actions={<>
          <Button variant="outline" onClick={() => setPreview(true)}><Printer className="h-4 w-4" /> Print</Button>
          <Button onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> Add Medicine</Button>
        </>}
      />

      <Card className="mb-5">
        <div className="grid md:grid-cols-3 gap-3">
          <Select label="Patient"><option>{patients[0].name}</option>{patients.slice(1).map((p) => <option key={p.id}>{p.name}</option>)}</Select>
          <Select label="Doctor"><option>Dr. Amelia Hart</option><option>Dr. Nathan Reyes</option></Select>
          <Input type="date" label="Date" defaultValue={new Date().toISOString().slice(0, 10)} />
        </div>
      </Card>

      <Card className="p-0 overflow-hidden">
        {meds.length === 0 ? <EmptyState title="No medicines added" description="Add medicines to this prescription." action={<Button onClick={() => setOpen(true)}>Add Medicine</Button>} /> : (
          <TableWrapper>
            <thead>
              <tr><Th>Medicine</Th><Th>Dosage</Th><Th className="hidden md:table-cell">Frequency</Th><Th className="hidden md:table-cell">Duration</Th><Th className="hidden lg:table-cell">Route</Th><Th className="text-right">Remove</Th></tr>
            </thead>
            <tbody>
              {meds.map((m, i) => (
                <tr key={i} className="hover:bg-[var(--surface-2)]">
                  <Td><div className="flex items-center gap-2.5"><div className="h-9 w-9 rounded-[var(--radius)] bg-[var(--primary-50)] text-[var(--primary)] inline-flex items-center justify-center"><Pill className="h-4 w-4" /></div><div><p className="body font-semibold">{m.name}</p><p className="caption text-[var(--text-muted)]">{m.instructions}</p></div></div></Td>
                  <Td className="body">{m.dosage}</Td>
                  <Td className="body hidden md:table-cell">{m.frequency}</Td>
                  <Td className="body hidden md:table-cell">{m.duration}</Td>
                  <Td className="body hidden lg:table-cell">{m.route}</Td>
                  <Td className="text-right"><button onClick={() => { setMeds(meds.filter((_, j) => j !== i)); push({ type: 'warning', message: 'Medicine removed.' }); }} className="text-[var(--danger)] hover:text-[var(--danger-600)]"><X className="h-4 w-4" /></button></Td>
                </tr>
              ))}
            </tbody>
          </TableWrapper>
        )}
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="Add Medicine">
        <div className="p-6 space-y-3">
          <Input label="Medicine name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Amoxicillin 500mg" />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Dosage" value={form.dosage} onChange={(e) => setForm({ ...form, dosage: e.target.value })} placeholder="500mg" />
            <Select label="Route" value={form.route} onChange={(e) => setForm({ ...form, route: e.target.value })}><option>Oral</option><option>IV</option><option>IM</option><option>Topical</option></Select>
            <Input label="Frequency" value={form.frequency} onChange={(e) => setForm({ ...form, frequency: e.target.value })} placeholder="3 times a day" />
            <Input label="Duration" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="7 days" />
          </div>
          <Input label="Instructions" value={form.instructions} onChange={(e) => setForm({ ...form, instructions: e.target.value })} placeholder="Take with food" />
          <div className="flex justify-end gap-2 pt-2"><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={add}>Add Medicine</Button></div>
        </div>
      </Modal>

      <Modal open={preview} onClose={() => setPreview(false)} title="Prescription Preview" size="lg">
        <div className="p-8 font-mono">
          <div className="text-center border-b border-[var(--border)] pb-4 mb-4">
            <h2 className="h2">MediCare+ Clinic</h2>
            <p className="caption text-[var(--text-muted)]">123 Medical Way, San Francisco · +1 415 555 0100</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4 body">
            <div><span className="caption text-[var(--text-muted)]">Patient:</span> {patients[0].name}</div>
            <div><span className="caption text-[var(--text-muted)]">Doctor:</span> Dr. Amelia Hart</div>
            <div><span className="caption text-[var(--text-muted)]">Date:</span> {new Date().toLocaleDateString()}</div>
            <div><span className="caption text-[var(--text-muted)]">ID:</span> {patients[0].id}</div>
          </div>
          <div className="border-t border-[var(--border)] pt-4">
            <h3 className="h3 mb-3">Rx</h3>
            <ol className="space-y-3 body">
              {meds.map((m, i) => (
                <li key={i}><p className="font-semibold">{i + 1}. {m.name}</p><p className="caption text-[var(--text-muted)]">{m.dosage} · {m.frequency} · {m.duration} · {m.route}</p>{m.instructions && <p className="caption italic">"{m.instructions}"</p>}</li>
              ))}
            </ol>
          </div>
          <div className="mt-10 flex justify-end"><div className="border-t border-[var(--border)] pt-2 w-48 text-center caption">Dr. Amelia Hart · Signature</div></div>
        </div>
      </Modal>
    </div>
  );
}
