import { useState } from 'react';
import { Pill, AlertTriangle, Package, XCircle, Search, Plus, TestTube2, Clock, CheckCircle2, AlertOctagon } from 'lucide-react';
import { PageHeader, Card, StatCard, Button, Input, Select, TableWrapper, Th, Td, StatusBadge, EmptyState, Badge } from '../components/ui';
import { medicines as allMeds, labTests as allLabs } from '../data/mockData';
import { useToast } from '../context/AppContext';

export function Pharmacy() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const { push } = useToast();

  const categories = Array.from(new Set(allMeds.map((m) => m.category)));
  const filtered = allMeds.filter((m) => {
    const q = search.toLowerCase();
    return (!q || m.name.toLowerCase().includes(q) || m.id.toLowerCase().includes(q)) && (!category || m.category === category);
  });

  const low = allMeds.filter((m) => m.stock > 0 && m.stock < 50).length;
  const out = allMeds.filter((m) => m.stock === 0).length;
  const expiring = allMeds.filter((m) => m.status === 'Expiring Soon').length;

  return (
    <div>
      <PageHeader
        title="Pharmacy"
        subtitle="Monitor inventory, track stock levels and manage medicines"
        actions={<Button onClick={() => push({ type: 'success', message: 'New medicine form opened.' })}><Plus className="h-4 w-4" /> Add Medicine</Button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={<Package className="h-5 w-5" />} label="Total Medicines" value={allMeds.length.toString()} change="2.1%" positive color="blue" />
        <StatCard icon={<AlertTriangle className="h-5 w-5" />} label="Low Stock" value={low.toString()} color="amber" />
        <StatCard icon={<Clock className="h-5 w-5" />} label="Expiring Soon" value={expiring.toString()} color="amber" />
        <StatCard icon={<XCircle className="h-5 w-5" />} label="Out of Stock" value={out.toString()} color="purple" />
      </div>

      <Card className="mb-5">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[220px]"><Input placeholder="Search medicine by name or batch..." icon={<Search className="h-4 w-4" />} value={search} onChange={(e) => setSearch(e.target.value)} /></div>
          <div className="w-48"><Select value={category} onChange={(e) => setCategory(e.target.value)}><option value="">All Categories</option>{categories.map((c) => <option key={c}>{c}</option>)}</Select></div>
        </div>
      </Card>

      <Card className="p-0 overflow-hidden">
        {filtered.length === 0 ? <EmptyState title="No medicines" description="Try adjusting your search." /> : (
          <TableWrapper>
            <thead>
              <tr><Th>Medicine</Th><Th className="hidden md:table-cell">Category</Th><Th className="hidden md:table-cell">Batch</Th><Th>Stock</Th><Th className="hidden lg:table-cell">Price</Th><Th className="hidden lg:table-cell">Expiry</Th><Th>Status</Th></tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-[var(--surface-2)] transition-colors">
                  <Td><div className="flex items-center gap-2.5"><div className="h-9 w-9 rounded-[var(--radius)] bg-[var(--primary-50)] text-[var(--primary)] inline-flex items-center justify-center"><Pill className="h-4 w-4" /></div><div><p className="body font-semibold">{m.name}</p><p className="caption text-[var(--text-muted)]">{m.id}</p></div></div></Td>
                  <Td className="hidden md:table-cell body">{m.category}</Td>
                  <Td className="hidden md:table-cell"><span className="caption font-mono text-[var(--text-muted)]">{m.batch}</span></Td>
                  <Td>
                    <div className="flex items-center gap-2">
                      <span className={`body font-semibold ${m.stock === 0 ? 'text-[var(--danger)]' : m.stock < 50 ? 'text-[var(--warning)]' : ''}`}>{m.stock}</span>
                      <div className="w-16 h-1.5 rounded-full bg-[var(--surface-2)] overflow-hidden"><div className={`h-full ${m.stock === 0 ? 'bg-[var(--danger)]' : m.stock < 50 ? 'bg-[var(--warning)]' : 'bg-[var(--success)]'}`} style={{ width: `${Math.min((m.stock / 300) * 100, 100)}%` }} /></div>
                    </div>
                  </Td>
                  <Td className="hidden lg:table-cell body font-semibold">${m.price.toFixed(2)}</Td>
                  <Td className="hidden lg:table-cell body text-[var(--text-muted)]">{m.expiry}</Td>
                  <Td><StatusBadge status={m.status} /></Td>
                </tr>
              ))}
            </tbody>
          </TableWrapper>
        )}
      </Card>
    </div>
  );
}

export function Laboratory() {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('All');
  const { push } = useToast();

  const tabs = ['All', 'Pending', 'Processing', 'Completed', 'Critical'];
  const filtered = allLabs.filter((l) => {
    const q = search.toLowerCase();
    const matchQ = !q || l.patient.toLowerCase().includes(q) || l.test.toLowerCase().includes(q);
    const matchT = tab === 'All' || (tab === 'Critical' ? l.result === 'Critical' : l.status === tab);
    return matchQ && matchT;
  });

  const critical = allLabs.filter((l) => l.result === 'Critical').length;

  return (
    <div>
      <PageHeader
        title="Laboratory"
        subtitle="Track lab tests, samples and results"
        actions={<Button onClick={() => push({ type: 'success', message: 'New lab request created.' })}><Plus className="h-4 w-4" /> New Request</Button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={<TestTube2 className="h-5 w-5" />} label="Pending Tests" value={allLabs.filter(l => l.status === 'Pending').length.toString()} color="blue" />
        <StatCard icon={<Clock className="h-5 w-5" />} label="Processing" value={allLabs.filter(l => l.status === 'Processing').length.toString()} color="amber" />
        <StatCard icon={<CheckCircle2 className="h-5 w-5" />} label="Completed" value={allLabs.filter(l => l.status === 'Completed').length.toString()} color="teal" />
        <StatCard icon={<AlertOctagon className="h-5 w-5" />} label="Critical Results" value={critical.toString()} color="purple" />
      </div>

      <Card className="mb-5 p-0">
        <div className="flex gap-1 border-b border-[var(--border)] overflow-x-auto">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-5 py-3 caption font-semibold whitespace-nowrap border-b-2 transition-colors ${tab === t ? 'border-[var(--primary)] text-[var(--primary)]' : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>{t}{t === 'Critical' && critical > 0 && <span className="ml-1.5 h-1.5 w-1.5 rounded-full bg-[var(--danger)] inline-block" />}</button>
          ))}
        </div>
        <div className="p-5 flex flex-wrap gap-3">
          <div className="flex-1 min-w-[220px]"><Input placeholder="Search by patient or test..." icon={<Search className="h-4 w-4" />} value={search} onChange={(e) => setSearch(e.target.value)} /></div>
        </div>
      </Card>

      <Card className="p-0 overflow-hidden">
        {filtered.length === 0 ? <EmptyState title="No lab results" description="No tests match the current filters." /> : (
          <TableWrapper>
            <thead>
              <tr><Th>ID</Th><Th>Patient</Th><Th className="hidden md:table-cell">Test</Th><Th className="hidden lg:table-cell">Doctor</Th><Th className="hidden lg:table-cell">Requested</Th><Th>Status</Th><Th>Result</Th></tr>
            </thead>
            <tbody>
              {filtered.map((l) => (
                <tr key={l.id} className="hover:bg-[var(--surface-2)] transition-colors">
                  <Td><span className="caption font-mono text-[var(--text-muted)]">{l.id}</span></Td>
                  <Td className="body font-semibold">{l.patient}</Td>
                  <Td className="hidden md:table-cell body">{l.test}</Td>
                  <Td className="hidden lg:table-cell body text-[var(--text-secondary)]">{l.doctor}</Td>
                  <Td className="hidden lg:table-cell body text-[var(--text-muted)]">{l.requested}</Td>
                  <Td><StatusBadge status={l.status} /></Td>
                  <Td>{l.result === 'Critical' ? <Badge variant="danger">Critical</Badge> : l.result === 'Normal' ? <Badge variant="success">Normal</Badge> : <span className="caption text-[var(--text-muted)]">—</span>}</Td>
                </tr>
              ))}
            </tbody>
          </TableWrapper>
        )}
      </Card>
    </div>
  );
}
