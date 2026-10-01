import { Users, Calendar, UserRound, DollarSign, MoreHorizontal, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, StatCard, Avatar, Badge, StatusBadge, TableWrapper, Th, Td, IconButton, Button, PageHeader } from '../components/ui';
import { stats, appointmentsToday, patients, revenueData, patientRegistrationData, demographicsData, appointmentStatsData } from '../data/mockData';
import { useAuth } from '../context/AppContext';

function ChartCard({ title, subtitle, children, action }: { title: string; subtitle?: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="flex items-start justify-between p-5 pb-0">
        <div>
          <h3 className="h3">{title}</h3>
          {subtitle && <p className="caption text-[var(--text-muted)] mt-0.5">{subtitle}</p>}
        </div>
        {action || <IconButton><MoreHorizontal className="h-4 w-4" /></IconButton>}
      </div>
      <div className="p-5 h-[280px]">{children}</div>
    </Card>
  );
}

const tickStyle = { fill: 'var(--text-muted)', fontSize: 11 };
const gridStyle = { stroke: 'var(--border)', strokeDasharray: '3 3' };

function greet() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div>
      <PageHeader
        title={`${greet()}, ${user?.name.split(' ')[1] || user?.name} 👋`}
        subtitle="Here's what's happening in your clinic today."
        actions={<Button><Calendar className="h-4 w-4" /> Today, {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</Button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard icon={<Users className="h-5 w-5" />} label="Total Patients" value={stats.totalPatients.toLocaleString()} change={`${stats.patientsChange}%`} positive color="blue" />
        <StatCard icon={<Calendar className="h-5 w-5" />} label="Today's Appointments" value={stats.todayAppointments.toString()} change={`${stats.appointmentsChange}%`} positive color="teal" />
        <StatCard icon={<UserRound className="h-5 w-5" />} label="Active Doctors" value={stats.doctors.toString()} change={`${stats.doctorsChange}%`} positive color="purple" />
        <StatCard icon={<DollarSign className="h-5 w-5" />} label="This Month Revenue" value={`$${stats.revenue.toLocaleString()}`} change={`${stats.revenueChange}%`} positive color="amber" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2">
          <ChartCard title="Revenue Overview" subtitle="Daily earnings for this week">
            <ResponsiveContainer>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="rev" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="var(--primary)" stopOpacity={0.3} />
                    <stop offset="1" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid {...gridStyle} />
                <XAxis dataKey="name" tick={tickStyle} axisLine={false} tickLine={false} />
                <YAxis tick={tickStyle} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: 12 }} />
                <Area type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={2.5} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
        <ChartCard title="Patient Demographics" subtitle="Distribution by age group">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={demographicsData} innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                {demographicsData.map((e, i) => <Cell key={i} fill={e.color} stroke="none" />)}
              </Pie>
              <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: 12 }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <ChartCard title="Patient Registration" subtitle="Monthly growth over 6 months">
          <ResponsiveContainer>
            <LineChart data={patientRegistrationData}>
              <CartesianGrid {...gridStyle} />
              <XAxis dataKey="month" tick={tickStyle} axisLine={false} tickLine={false} />
              <YAxis tick={tickStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: 12 }} />
              <Line type="monotone" dataKey="patients" stroke="var(--secondary)" strokeWidth={3} dot={{ fill: 'var(--secondary)', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <div className="lg:col-span-2">
          <ChartCard title="Appointment Statistics" subtitle="Confirmed, pending and cancelled">
            <ResponsiveContainer>
              <BarChart data={appointmentStatsData}>
                <CartesianGrid {...gridStyle} />
                <XAxis dataKey="name" tick={tickStyle} axisLine={false} tickLine={false} />
                <YAxis tick={tickStyle} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: 12 }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="confirmed" fill="var(--success)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" fill="var(--warning)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cancelled" fill="var(--danger)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-4">
        <Card className="p-0 lg:col-span-3 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
            <div>
              <h3 className="h3">Today's Appointments</h3>
              <p className="caption text-[var(--text-muted)] mt-0.5">Scheduled visits for today</p>
            </div>
            <Link to="/app/appointments" className="caption font-semibold text-[var(--primary)] flex items-center gap-1 hover:gap-2 transition-all">View all <ArrowRight className="h-3.5 w-3.5" /></Link>
          </div>
          <TableWrapper>
            <thead>
              <tr>
                <Th>Patient</Th>
                <Th className="hidden md:table-cell">Doctor</Th>
                <Th className="hidden lg:table-cell">Service</Th>
                <Th>Time</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              {appointmentsToday.map((a) => (
                <tr key={a.id} className="hover:bg-[var(--surface-2)] transition-colors">
                  <Td>
                    <div className="flex items-center gap-2.5">
                      <Avatar name={a.patient} size={32} />
                      <div>
                        <p className="body font-semibold">{a.patient}</p>
                        <p className="caption text-[var(--text-muted)]">{a.id}</p>
                      </div>
                    </div>
                  </Td>
                  <Td className="hidden md:table-cell"><span className="body">{a.doctor}</span></Td>
                  <Td className="hidden lg:table-cell"><span className="body">{a.service}</span></Td>
                  <Td><span className="body font-semibold">{a.time}</span></Td>
                  <Td><StatusBadge status={a.status} /></Td>
                </tr>
              ))}
            </tbody>
          </TableWrapper>
        </Card>

        <Card className="p-0 lg:col-span-2 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
            <div>
              <h3 className="h3">Recent Patients</h3>
              <p className="caption text-[var(--text-muted)] mt-0.5">Latest registrations</p>
            </div>
            <Link to="/app/patients" className="caption font-semibold text-[var(--primary)] flex items-center gap-1 hover:gap-2 transition-all">View all <ArrowRight className="h-3.5 w-3.5" /></Link>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {patients.slice(0, 5).map((p) => (
              <Link to={`/app/patients/${p.id}`} key={p.id} className="flex items-center gap-3 p-4 hover:bg-[var(--surface-2)] transition-colors">
                <Avatar name={p.name} size={38} />
                <div className="flex-1 min-w-0">
                  <p className="body font-semibold truncate">{p.name}</p>
                  <p className="caption text-[var(--text-muted)]">{p.id} · {p.gender} · {p.age}y</p>
                </div>
                <Badge variant={p.status === 'Active' ? 'success' : 'default'}>{p.status}</Badge>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
