import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  Stethoscope, Smile, TestTube2, Pill, Siren, HeartPulse, Syringe, Brain,
  Star, ArrowRight, Shield, Clock, Users, Check, Menu, X,
  Activity,
} from 'lucide-react';
import { Button, Badge } from '../components/ui';
import { services, doctors } from '../data/mockData';
import { useAuth, useTheme } from '../context/AppContext';

const iconMap: Record<string, any> = { Stethoscope, Smile, TestTube2, Pill, Siren, HeartPulse, Syringe, Brain };

function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { theme, toggle } = useTheme();
  const links = ['Home', 'About', 'Services', 'Doctors', 'Appointments', 'Contact'];
  return (
    <header className="sticky top-0 z-40 bg-[var(--surface)]/80 backdrop-blur-xl border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 h-16 md:h-18">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="h-10 w-10 rounded-[var(--radius-md)] bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] inline-flex items-center justify-center shadow-md">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <div className="leading-tight">
            <p className="h3">MediCare<span className="text-[var(--primary)]">+</span></p>
            <p className="caption text-[var(--text-muted)] -mt-0.5">Modern Clinic</p>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="body font-medium text-[var(--text-secondary)] hover:text-[var(--primary)] px-4 py-2 rounded-full transition-colors">{l}</a>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-2">
          <button onClick={toggle} className="h-9 w-9 rounded-full hover:bg-[var(--surface-2)] text-[var(--text-secondary)]">{theme === 'light' ? '🌙' : '☀️'}</button>
          {user ? (
            <Link to="/app"><Button variant="primary">Go to Dashboard</Button></Link>
          ) : (
            <>
              <Link to="/login"><Button variant="ghost">Login</Button></Link>
              <Link to="/login"><Button>Book Appointment</Button></Link>
            </>
          )}
        </div>
        <button onClick={() => setOpen(!open)} className="lg:hidden h-10 w-10 inline-flex items-center justify-center rounded-[var(--radius)] hover:bg-[var(--surface-2)]">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-[var(--border)] bg-[var(--surface)]">
          <div className="px-4 py-3 flex flex-col gap-1">
            {links.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} className="px-3 py-2.5 rounded-[var(--radius)] hover:bg-[var(--surface-2)] body font-medium">{l}</a>
            ))}
            <div className="flex gap-2 mt-2">
              <Link to="/login" className="flex-1"><Button variant="outline" className="w-full">Login</Button></Link>
              <Link to="/login" className="flex-1"><Button className="w-full">Book</Button></Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-[400px] w-[400px] rounded-full bg-[var(--primary-100)] opacity-60 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-[380px] w-[380px] rounded-full bg-[var(--secondary-50)] opacity-70 blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className="anim-fade">
          <Badge variant="primary"><span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)] animate-pulse" /> Trusted by 10,000+ patients</span></Badge>
          <h1 className="display mt-5">
            Modern Healthcare, <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">Simplified.</span>
          </h1>
          <p className="body-lg text-[var(--text-secondary)] mt-5 max-w-xl">
            A complete clinic management platform that brings doctors, patients and staff together in one elegant experience — so you can focus on what matters most.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link to="/login"><Button size="lg">Book an Appointment <ArrowRight className="h-4 w-4" /></Button></Link>
            <a href="#services"><Button variant="outline" size="lg">Explore Services</Button></a>
          </div>
          <div className="flex items-center gap-6 mt-10">
            {[{ icon: Shield, label: 'HIPAA Ready' }, { icon: Clock, label: '24/7 Support' }, { icon: Users, label: 'Expert Staff' }].map((f) => (
              <div key={f.label} className="flex items-center gap-2 text-[var(--text-secondary)]">
                <div className="h-9 w-9 rounded-full bg-[var(--primary-50)] inline-flex items-center justify-center text-[var(--primary)]"><f.icon className="h-4 w-4" /></div>
                <span className="caption font-semibold">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative anim-scale">
          <div className="aspect-square max-w-lg mx-auto relative">
            <div className="absolute inset-8 rounded-[40px] bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] shadow-[var(--shadow-xl)]" />
            <div className="absolute inset-8 rounded-[40px] overflow-hidden">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                <defs>
                  <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stopColor="#fff" stopOpacity="0.2" />
                    <stop offset="1" stopColor="#fff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <circle cx="200" cy="160" r="70" fill="url(#g1)" />
                <path d="M 200 130 L 200 190 M 170 160 L 230 160" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
                <rect x="80" y="260" width="240" height="80" rx="14" fill="#fff" opacity="0.15" />
                <rect x="100" y="280" width="140" height="10" rx="5" fill="#fff" opacity="0.7" />
                <rect x="100" y="300" width="90" height="10" rx="5" fill="#fff" opacity="0.4" />
              </svg>
            </div>
            {/* Floating cards */}
            <div className="absolute -top-2 -left-2 md:top-4 md:-left-6 bg-[var(--surface)] rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] p-4 w-56 anim-float" style={{ animationDelay: '0s' }}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[var(--success-50)] inline-flex items-center justify-center"><HeartPulse className="h-5 w-5 text-[var(--success)]" /></div>
                <div>
                  <p className="caption text-[var(--text-muted)]">Heart Rate</p>
                  <p className="body font-bold">72 <span className="caption text-[var(--text-muted)] font-medium">bpm</span></p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 -right-2 md:-right-6 bg-[var(--surface)] rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] p-4 w-60 anim-float" style={{ animationDelay: '1.5s' }}>
              <p className="caption text-[var(--text-muted)]">Next Appointment</p>
              <p className="body font-semibold mt-1">Dr. Amelia Hart</p>
              <div className="flex items-center justify-between mt-2">
                <span className="caption text-[var(--text-secondary)]">Today · 10:30 AM</span>
                <Badge variant="success">Confirmed</Badge>
              </div>
            </div>
            <div className="absolute top-1/2 -right-4 md:-right-10 bg-[var(--surface)] rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] p-3 flex items-center gap-2 anim-float" style={{ animationDelay: '3s' }}>
              <div className="h-8 w-8 rounded-full bg-[var(--warning-50)] inline-flex items-center justify-center"><Star className="h-4 w-4 text-[var(--warning)]" fill="currentColor" /></div>
              <div>
                <p className="caption font-bold">4.9</p>
                <p className="caption text-[var(--text-muted)] -mt-0.5">2,148 reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    { value: '10,000+', label: 'Patients Served' },
    { value: '25+', label: 'Medical Professionals' },
    { value: '15+', label: 'Healthcare Services' },
    { value: '24/7', label: 'Support Available' },
  ];
  return (
    <section className="border-y border-[var(--border)] bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((it) => (
          <div key={it.label} className="text-center md:text-left">
            <p className="h1 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">{it.value}</p>
            <p className="caption text-[var(--text-secondary)] mt-1 font-medium">{it.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-28">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="overline text-[var(--primary)]">Our Services</span>
        <h2 className="h1 mt-2">Complete care, all under one roof</h2>
        <p className="body-lg text-[var(--text-secondary)] mt-3">From routine checkups to specialized treatments — we provide a full spectrum of modern healthcare services.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {services.map((s, i) => {
          const Icon = iconMap[s.icon];
          return (
            <div key={s.title} className="card card-hover p-6 anim-fade" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="h-12 w-12 rounded-[var(--radius-md)] bg-[var(--primary-50)] text-[var(--primary)] inline-flex items-center justify-center">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="h3 mt-4">{s.title}</h3>
              <p className="body text-[var(--text-secondary)] mt-2">{s.desc}</p>
              <button className="mt-4 inline-flex items-center gap-1.5 caption font-semibold text-[var(--primary)] hover:gap-2.5 transition-all">
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Doctors() {
  return (
    <section id="doctors" className="bg-[var(--surface-2)]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-28">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="overline text-[var(--primary)]">Meet the Team</span>
          <h2 className="h1 mt-2">Doctors you can trust</h2>
          <p className="body-lg text-[var(--text-secondary)] mt-3">Our specialists combine years of experience with cutting-edge medicine to deliver exceptional outcomes.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {doctors.slice(0, 6).map((d) => (
            <div key={d.id} className="card card-hover overflow-hidden anim-fade">
              <div className="h-32 relative" style={{ background: `linear-gradient(135deg, ${d.color}33, ${d.color}11)` }}>
                <div className="absolute -bottom-10 left-6">
                  <div className="h-20 w-20 rounded-[var(--radius-lg)] shadow-[var(--shadow-md)] inline-flex items-center justify-center text-white text-2xl font-bold" style={{ background: d.color }}>{d.initial}</div>
                </div>
              </div>
              <div className="p-6 pt-14">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="h3">{d.name}</h4>
                    <p className="caption text-[var(--text-secondary)] mt-0.5">{d.specialization}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-[var(--warning-50)] px-2 py-1 rounded-full">
                    <Star className="h-3 w-3 text-[var(--warning)]" fill="currentColor" />
                    <span className="caption font-bold text-[var(--warning)]">{d.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4 caption text-[var(--text-secondary)]">
                  <span>{d.experience} yrs exp</span>
                  <span>•</span>
                  <span>{d.patients} patients</span>
                </div>
                <div className="flex items-center justify-between mt-5">
                  <Badge variant={d.status === 'Available' ? 'success' : d.status === 'Off Duty' ? 'danger' : 'warning'}>{d.status}</Badge>
                  <button className="caption font-semibold text-[var(--primary)] hover:underline">View Profile →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AppointmentCTA() {
  return (
    <section id="appointments" className="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-28">
      <div className="rounded-[var(--radius-xl)] bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] p-8 md:p-14 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-60 w-60 rounded-full bg-[var(--secondary)]/20 blur-3xl" />
        <div className="relative grid lg:grid-cols-2 gap-10 items-center">
          <div className="text-white">
            <span className="overline text-white/70">Get Started Today</span>
            <h2 className="h1 mt-2 text-white">Book your appointment in 60 seconds</h2>
            <p className="body-lg text-white/80 mt-3">Choose your doctor, select a time that works for you, and we'll handle the rest. No waiting rooms, no paperwork.</p>
            <ul className="mt-6 space-y-2.5">
              {['Instant online booking', 'Real-time availability', 'Automated reminders', 'Digital medical records'].map((f) => (
                <li key={f} className="flex items-center gap-2.5 body text-white/90">
                  <span className="h-5 w-5 rounded-full bg-white/20 inline-flex items-center justify-center"><Check className="h-3 w-3" /></span>{f}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-xl)]">
            <h3 className="h3 text-[var(--text-primary)]">Schedule a visit</h3>
            <p className="caption text-[var(--text-muted)] mt-0.5">Fill the form to book instantly</p>
            <div className="mt-5 space-y-3">
              <select className="w-full h-11 rounded-[var(--radius)] border border-[var(--border-strong)] px-3 text-sm">
                <option>Choose doctor</option>{doctors.map((d) => <option key={d.id}>{d.name}</option>)}
              </select>
              <select className="w-full h-11 rounded-[var(--radius)] border border-[var(--border-strong)] px-3 text-sm">
                <option>Select service</option>{services.map((s) => <option key={s.title}>{s.title}</option>)}
              </select>
              <div className="grid grid-cols-2 gap-3">
                <input type="date" className="h-11 rounded-[var(--radius)] border border-[var(--border-strong)] px-3 text-sm" />
                <select className="h-11 rounded-[var(--radius)] border border-[var(--border-strong)] px-3 text-sm">
                  <option>Select time</option>{['09:00 AM','10:00 AM','11:00 AM','02:00 PM','03:00 PM'].map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <Link to="/login"><Button size="lg" className="w-full">Book Appointment <ArrowRight className="h-4 w-4" /></Button></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-[var(--text-primary)] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-[var(--radius-md)] bg-gradient-to-br from-[var(--primary-light)] to-[var(--secondary)] inline-flex items-center justify-center"><Activity className="h-5 w-5 text-white" /></div>
            <p className="h3">MediCare+</p>
          </div>
          <p className="body text-white/60 mt-4">Premium healthcare management for modern clinics and hospitals.</p>
        </div>
        {[
          { t: 'Services', l: ['General Care', 'Dental', 'Laboratory', 'Pharmacy'] },
          { t: 'Company', l: ['About Us', 'Our Doctors', 'Careers', 'Press'] },
          { t: 'Contact', l: ['123 Medical Way, SF', 'hello@medicareplus.com', '+1 415 555 0100'], icons: true },
        ].map((col) => (
          <div key={col.t}>
            <p className="h3 mb-4">{col.t}</p>
            <ul className="space-y-2.5">
              {col.l.map((item) => <li key={item} className="body text-white/60 hover:text-white cursor-pointer transition-colors">{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex flex-wrap items-center justify-between gap-3 caption text-white/50">
          <p>© 2026 MediCare Plus. All rights reserved.</p>
          <div className="flex gap-6"><a href="#" className="hover:text-white">Privacy</a><a href="#" className="hover:text-white">Terms</a><a href="#" className="hover:text-white">Cookies</a></div>
        </div>
      </div>
    </footer>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <Doctors />
      <AppointmentCTA />
      <Footer />
    </div>
  );
}
