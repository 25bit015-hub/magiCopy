import { useState } from 'react';
import { Download, Printer, DollarSign, Clock, CheckCircle2, AlertCircle, Search, Plus, FileText, TrendingUp, Calendar } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PageHeader, Card, StatCard, Button, Input, Select, TableWrapper, Th, Td, StatusBadge, EmptyState, Badge } from '../components/ui';
import { invoices as allInv, revenueData, patientRegistrationData, appointmentStatsData } from '../data/mockData';

const tickStyle = { fill: 'var(--text-muted)', fontSize: 11 };
const gridStyle = { stroke: 'var(--border)', strokeDasharray: '3 3' };

export function Billing() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  const filtered = allInv.filter((i) => {
    const q = search.toLowerCase();
    return (!q || i.patient.toLowerCase().includes(q) || i.id.toLowerCase().includes(q)) && (!status || i.status === status);
  });

  const todayRevenue = allInv.filter((i) => i.status === 'Paid').reduce((s, i) => s + i.amount, 0);
  const pending = allInv.filter((i) => i.status === 'Pending' || i.status === 'Overdue').reduce((s, i) => s + i.amount, 0);

  return (
    <div>
      <PageHeader
        title="Billing"
        subtitle="Manage invoices, payments and billing records"
        actions={<Button><Plus className="h-4 w-4" /> New Invoice</Button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={<DollarSign className="h-5 w-5" />} label="Today's Revenue" value={`$${todayRevenue.toLocaleString()}`} change="18.4%" positive color="blue" />
        <StatCard icon={<Clock className="h-5 w-5" />} label="Pending Payments" value={`$${pending.toLocaleString()}`} color="amber" />
        <StatCard icon={<CheckCircle2 className="h-5 w-5" />} label="Paid Invoices" value={allInv.filter(i => i.status === 'Paid').length.toString()} change="12%" positive color="teal" />
        <StatCard icon={<AlertCircle className="h-5 w-5" />} label="Outstanding" value={allInv.filter(i => i.status === 'Overdue').length.toString()} color="purple" />
      </div>

      <Card className="mb-5">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[220px]"><Input placeholder="Search invoice ID or patient..." icon={<Search className="h-4 w-4" />} value={search} onChange={(e) => setSearch(e.target.value)} /></div>
          <div className="w-40"><Select value={status} onChange={(e) => setStatus(e.target.value)}><option value="">All Status</option><option>Paid</option><option>Pending</option><option>Overdue</option></Select></div>
          <Button variant="outline"><Download className="h-4 w-4" /> Export</Button>
        </div>
      </Card>

      <Card className="p-0 overflow-hidden">
        {filtered.length === 0 ? <EmptyState title="No invoices" description="No invoices match the current filters." /> : (
          <TableWrapper>
            <thead>
              <tr><Th>Invoice ID</Th><Th>Patient</Th><Th className="hidden md:table-cell">Service</Th><Th>Amount</Th><Th className="hidden lg:table-cell">Date</Th><Th>Status</Th><Th className="hidden lg:table-cell">Method</Th></tr>
            </thead>
            <tbody>
              {filtered.map((i) => (
                <tr key={i.id} className="hover:bg-[var(--surface-2)] transition-colors">
                  <Td><span className="caption font-mono text-[var(--text-muted)]">{i.id}</span></Td>
                  <Td className="body font-semibold">{i.patient}</Td>
                  <Td className="hidden md:table-cell body">{i.service}</Td>
                  <Td className="body font-bold text-[var(--primary)]">${i.amount.toFixed(2)}</Td>
                  <Td className="hidden lg:table-cell body text-[var(--text-muted)]">{i.date}</Td>
                  <Td><StatusBadge status={i.status} /></Td>
                  <Td className="hidden lg:table-cell"><Badge variant="info">{i.method}</Badge></Td>
                </tr>
              ))}
            </tbody>
          </TableWrapper>
        )}
      </Card>
    </div>
  );
}

export function Reports() {
  const [period, setPeriod] = useState('This Month');
  const [type, setType] = useState('Revenue');
  const periods = ['Today', 'This Week', 'This Month', 'This Year', 'Custom Range'];
  const types = ['Revenue', 'Appointments', 'Patients', 'Pharmacy', 'Laboratory'];

  return (
    <div>
      <PageHeader
        title="Reports & Analytics"
        subtitle="Comprehensive insights across the clinic"
        actions={<>
          <Button variant="outline"><Printer className="h-4 w-4" /> Print</Button>
          <Button variant="outline"><FileText className="h-4 w-4" /> Export PDF</Button>
          <Button><Download className="h-4 w-4" /> Export Excel</Button>
        </>}
      />

      <Card className="mb-5">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[220px] flex gap-2 flex-wrap">
            {types.map((t) => (
              <button key={t} onClick={() => setType(t)} className={`h-9 px-3.5 rounded-full caption font-semibold transition-colors ${type === t ? 'bg-[var(--primary)] text-white' : 'bg-[var(--surface-2)] text-[var(--text-secondary)] hover:bg-[var(--border)]'}`}>{t}</button>
            ))}
          </div>
          <Select value={period} onChange={(e) => setPeriod(e.target.value)}>{periods.map((p) => <option key={p}>{p}</option>)}</Select>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <StatCard icon={<DollarSign className="h-5 w-5" />} label="Total Revenue" value="$48,230" change="18.4%" positive color="blue" />
        <StatCard icon={<TrendingUp className="h-5 w-5" />} label="Avg Daily Revenue" value="$6,890" change="8.2%" positive color="teal" />
        <StatCard icon={<Calendar className="h-5 w-5" />} label="Total Appointments" value="348" change="12.5%" positive color="amber" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-0 overflow-hidden">
          <div className="p-5 border-b border-[var(--border)]"><h3 className="h3">Revenue Trend</h3><p className="caption text-[var(--text-muted)] mt-0.5">Daily performance over the period</p></div>
          <div className="p-5 h-[320px]"><ResponsiveContainer>
            <AreaChart data={revenueData}>
              <defs><linearGradient id="rev2" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="var(--primary)" stopOpacity={0.3} /><stop offset="1" stopColor="var(--primary)" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid {...gridStyle} /><XAxis dataKey="name" tick={tickStyle} axisLine={false} tickLine={false} /><YAxis tick={tickStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: 12 }} />
              <Area type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={2.5} fill="url(#rev2)" />
            </AreaChart>
          </ResponsiveContainer></div>
        </Card>
        <Card className="p-0 overflow-hidden">
          <div className="p-5 border-b border-[var(--border)]"><h3 className="h3">Appointments by Status</h3><p className="caption text-[var(--text-muted)] mt-0.5">Confirmed, pending and cancelled</p></div>
          <div className="p-5 h-[320px]"><ResponsiveContainer>
            <BarChart data={appointmentStatsData}>
              <CartesianGrid {...gridStyle} /><XAxis dataKey="name" tick={tickStyle} axisLine={false} tickLine={false} /><YAxis tick={tickStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: 12 }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="confirmed" fill="var(--success)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pending" fill="var(--warning)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="cancelled" fill="var(--danger)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer></div>
        </Card>
        <Card className="p-0 overflow-hidden lg:col-span-2">
          <div className="p-5 border-b border-[var(--border)]"><h3 className="h3">Patient Registration</h3><p className="caption text-[var(--text-muted)] mt-0.5">6-month growth</p></div>
          <div className="p-5 h-[320px]"><ResponsiveContainer>
            <LineChart data={patientRegistrationData}>
              <CartesianGrid {...gridStyle} /><XAxis dataKey="month" tick={tickStyle} axisLine={false} tickLine={false} /><YAxis tick={tickStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: 12 }} />
              <Line type="monotone" dataKey="patients" stroke="var(--secondary)" strokeWidth={3} dot={{ fill: 'var(--secondary)', r: 4 }} />
            </LineChart>
          </ResponsiveContainer></div>
        </Card>
      </div>
    </div>
  );
}
