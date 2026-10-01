// Mock data — used throughout the application until Spring Boot API is wired in.
export type Role = 'ADMIN' | 'DOCTOR' | 'NURSE' | 'RECEPTIONIST' | 'PHARMACIST' | 'LABORATORY' | 'CASHIER';

export const currentUser = {
  id: 1,
  name: 'Dr. Amelia Hart',
  email: 'amelia.hart@medicareplus.com',
  role: 'ADMIN' as Role,
  avatar: 'AH',
};

export const stats = {
  totalPatients: 12458,
  todayAppointments: 48,
  doctors: 27,
  revenue: 48230,
  patientsChange: 12.5,
  appointmentsChange: 8.2,
  doctorsChange: 3.8,
  revenueChange: 18.4,
};

export const appointmentsToday = [
  { id: 'A-10231', patient: 'Olivia Bennett', doctor: 'Dr. Nathan Reyes', service: 'General Consultation', time: '09:00', status: 'Confirmed' },
  { id: 'A-10232', patient: 'Marcus Chen', doctor: 'Dr. Priya Shah', service: 'Dental Care', time: '09:45', status: 'Pending' },
  { id: 'A-10233', patient: 'Sophia Almeida', doctor: 'Dr. Liam Okafor', service: 'Pediatrics', time: '10:30', status: 'Confirmed' },
  { id: 'A-10234', patient: 'Ethan Walker', doctor: 'Dr. Amelia Hart', service: 'Cardiology', time: '11:15', status: 'Completed' },
  { id: 'A-10235', patient: 'Isabella Moreno', doctor: 'Dr. Priya Shah', service: 'Health Checkup', time: '13:00', status: 'Pending' },
  { id: 'A-10236', patient: 'Daniel Park', doctor: 'Dr. Nathan Reyes', service: 'Follow-up', time: '14:00', status: 'Cancelled' },
];

export const patients = [
  { id: 'P-1001', name: 'Olivia Bennett', gender: 'Female', age: 32, phone: '+1 415 555 2310', email: 'olivia.b@mail.com', lastVisit: '2026-01-18', status: 'Active', blood: 'O+', address: '221 Baker St, San Francisco' },
  { id: 'P-1002', name: 'Marcus Chen', gender: 'Male', age: 45, phone: '+1 415 555 2912', email: 'marcus.c@mail.com', lastVisit: '2026-01-15', status: 'Active', blood: 'A-', address: '14 Mission St, San Francisco' },
  { id: 'P-1003', name: 'Sophia Almeida', gender: 'Female', age: 8, phone: '+1 415 555 8812', email: 'parent@mail.com', lastVisit: '2026-01-12', status: 'Active', blood: 'B+', address: '80 Pacific Ave, Oakland' },
  { id: 'P-1004', name: 'Ethan Walker', gender: 'Male', age: 58, phone: '+1 415 555 7700', email: 'ethan.w@mail.com', lastVisit: '2026-01-20', status: 'Active', blood: 'AB+', address: '56 Market St, San Francisco' },
  { id: 'P-1005', name: 'Isabella Moreno', gender: 'Female', age: 29, phone: '+1 415 555 1042', email: 'isa.m@mail.com', lastVisit: '2026-01-10', status: 'Active', blood: 'O-', address: '12 Folsom St, San Francisco' },
  { id: 'P-1006', name: 'Daniel Park', gender: 'Male', age: 41, phone: '+1 415 555 3391', email: 'daniel.p@mail.com', lastVisit: '2025-12-28', status: 'Inactive', blood: 'A+', address: '9 Howard St, San Jose' },
  { id: 'P-1007', name: 'Ava Thompson', gender: 'Female', age: 67, phone: '+1 415 555 5500', email: 'ava.t@mail.com', lastVisit: '2026-01-19', status: 'Active', blood: 'B-', address: '33 Union St, Berkeley' },
  { id: 'P-1008', name: 'Liam Johnson', gender: 'Male', age: 22, phone: '+1 415 555 6622', email: 'liam.j@mail.com', lastVisit: '2026-01-05', status: 'Active', blood: 'O+', address: '41 Castro St, SF' },
];

export const doctors = [
  { id: 'D-201', name: 'Dr. Amelia Hart', specialization: 'Cardiology', experience: 14, phone: '+1 415 555 0101', email: 'a.hart@medicareplus.com', rating: 4.9, status: 'Available', patients: 412, initial: 'AH', color: '#3b82f6' },
  { id: 'D-202', name: 'Dr. Nathan Reyes', specialization: 'General Medicine', experience: 9, phone: '+1 415 555 0102', email: 'n.reyes@medicareplus.com', rating: 4.8, status: 'Available', patients: 380, initial: 'NR', color: '#10b981' },
  { id: 'D-203', name: 'Dr. Priya Shah', specialization: 'Dentistry', experience: 11, phone: '+1 415 555 0103', email: 'p.shah@medicareplus.com', rating: 4.9, status: 'In Consultation', patients: 298, initial: 'PS', color: '#f59e0b' },
  { id: 'D-204', name: 'Dr. Liam Okafor', specialization: 'Pediatrics', experience: 7, phone: '+1 415 555 0104', email: 'l.okafor@medicareplus.com', rating: 4.7, status: 'Available', patients: 245, initial: 'LO', color: '#8b5cf6' },
  { id: 'D-205', name: 'Dr. Sofia Laurent', specialization: 'Dermatology', experience: 12, phone: '+1 415 555 0105', email: 's.laurent@medicareplus.com', rating: 4.8, status: 'Off Duty', patients: 321, initial: 'SL', color: '#ec4899' },
  { id: 'D-206', name: 'Dr. Hiroshi Tanaka', specialization: 'Neurology', experience: 18, phone: '+1 415 555 0106', email: 'h.tanaka@medicareplus.com', rating: 4.9, status: 'Available', patients: 450, initial: 'HT', color: '#0d9488' },
];

export const services = [
  { icon: 'Stethoscope', title: 'General Consultation', desc: 'Comprehensive primary care and medical evaluation by our experienced physicians.' },
  { icon: 'Smile', title: 'Dental Care', desc: 'Preventive, restorative and cosmetic dentistry with modern equipment.' },
  { icon: 'TestTube2', title: 'Laboratory', desc: 'Accurate diagnostic testing with quick turnaround and digital results.' },
  { icon: 'Pill', title: 'Pharmacy', desc: 'Full-service in-house pharmacy with verified medicines and counseling.' },
  { icon: 'Siren', title: 'Emergency Care', desc: '24/7 emergency services with rapid triage and critical care support.' },
  { icon: 'HeartPulse', title: 'Health Checkup', desc: 'Complete wellness packages tailored to age, gender and risk factors.' },
  { icon: 'Syringe', title: 'Vaccination', desc: 'Routine and travel vaccinations for children and adults.' },
  { icon: 'Brain', title: 'Specialist Consultation', desc: 'Access to specialists across cardiology, neurology, pediatrics and more.' },
];

export const medicines = [
  { id: 'M-001', name: 'Amoxicillin 500mg', category: 'Antibiotic', batch: 'BX-2341', stock: 240, price: 12.5, expiry: '2027-06-15', status: 'In Stock' },
  { id: 'M-002', name: 'Paracetamol 500mg', category: 'Analgesic', batch: 'BX-2290', stock: 18, price: 4.2, expiry: '2026-11-30', status: 'Low Stock' },
  { id: 'M-003', name: 'Metformin 850mg', category: 'Antidiabetic', batch: 'BX-2188', stock: 120, price: 9.8, expiry: '2027-02-10', status: 'In Stock' },
  { id: 'M-004', name: 'Atorvastatin 20mg', category: 'Cardiovascular', batch: 'BX-2101', stock: 0, price: 14.0, expiry: '2026-09-01', status: 'Out of Stock' },
  { id: 'M-005', name: 'Omeprazole 20mg', category: 'Gastrointestinal', batch: 'BX-2312', stock: 85, price: 6.5, expiry: '2026-04-20', status: 'Expiring Soon' },
  { id: 'M-006', name: 'Ibuprofen 400mg', category: 'NSAID', batch: 'BX-2401', stock: 310, price: 5.0, expiry: '2028-01-12', status: 'In Stock' },
];

export const labTests = [
  { id: 'L-5501', patient: 'Olivia Bennett', test: 'Complete Blood Count', doctor: 'Dr. Nathan Reyes', requested: '2026-01-20', status: 'Completed', result: 'Normal' },
  { id: 'L-5502', patient: 'Ethan Walker', test: 'Lipid Profile', doctor: 'Dr. Amelia Hart', requested: '2026-01-20', status: 'Processing', result: '—' },
  { id: 'L-5503', patient: 'Ava Thompson', test: 'HbA1c', doctor: 'Dr. Nathan Reyes', requested: '2026-01-20', status: 'Pending', result: '—' },
  { id: 'L-5504', patient: 'Marcus Chen', test: 'Thyroid Panel', doctor: 'Dr. Sofia Laurent', requested: '2026-01-19', status: 'Completed', result: 'Critical' },
  { id: 'L-5505', patient: 'Isabella Moreno', test: 'Urinalysis', doctor: 'Dr. Priya Shah', requested: '2026-01-20', status: 'Processing', result: '—' },
];

export const invoices = [
  { id: 'INV-8801', patient: 'Olivia Bennett', service: 'General Consultation', amount: 85, date: '2026-01-20', status: 'Paid', method: 'Card' },
  { id: 'INV-8802', patient: 'Marcus Chen', service: 'Dental Cleaning', amount: 140, date: '2026-01-20', status: 'Pending', method: 'Cash' },
  { id: 'INV-8803', patient: 'Sophia Almeida', service: 'Pediatric Checkup', amount: 95, date: '2026-01-20', status: 'Paid', method: 'Insurance' },
  { id: 'INV-8804', patient: 'Ethan Walker', service: 'Cardiology Consultation', amount: 180, date: '2026-01-19', status: 'Paid', method: 'Mobile Money' },
  { id: 'INV-8805', patient: 'Isabella Moreno', service: 'Lab Tests', amount: 65, date: '2026-01-19', status: 'Overdue', method: 'Card' },
];

export const users = [
  { id: 'U-01', name: 'Dr. Amelia Hart', role: 'Admin', email: 'a.hart@medicareplus.com', status: 'Active', lastLogin: '2026-01-20 08:12' },
  { id: 'U-02', name: 'Dr. Nathan Reyes', role: 'Doctor', email: 'n.reyes@medicareplus.com', status: 'Active', lastLogin: '2026-01-20 07:45' },
  { id: 'U-03', name: 'Nurse Clara Kim', role: 'Nurse', email: 'c.kim@medicareplus.com', status: 'Active', lastLogin: '2026-01-20 07:00' },
  { id: 'U-04', name: 'Receptionist Mia Davis', role: 'Receptionist', email: 'm.davis@medicareplus.com', status: 'Active', lastLogin: '2026-01-20 07:30' },
  { id: 'U-05', name: 'Pharm. Lucas Ford', role: 'Pharmacist', email: 'l.ford@medicareplus.com', status: 'Active', lastLogin: '2026-01-19 18:10' },
  { id: 'U-06', name: 'Lab. Dr. Zara Ali', role: 'Laboratory', email: 'z.ali@medicareplus.com', status: 'Inactive', lastLogin: '2026-01-15 09:05' },
];

export const revenueData = [
  { name: 'Mon', revenue: 4200, appointments: 32 },
  { name: 'Tue', revenue: 5100, appointments: 38 },
  { name: 'Wed', revenue: 4800, appointments: 41 },
  { name: 'Thu', revenue: 6300, appointments: 47 },
  { name: 'Fri', revenue: 7200, appointments: 52 },
  { name: 'Sat', revenue: 3900, appointments: 28 },
  { name: 'Sun', revenue: 2100, appointments: 14 },
];

export const patientRegistrationData = [
  { month: 'Aug', patients: 180 },
  { month: 'Sep', patients: 210 },
  { month: 'Oct', patients: 245 },
  { month: 'Nov', patients: 280 },
  { month: 'Dec', patients: 310 },
  { month: 'Jan', patients: 365 },
];

export const demographicsData = [
  { name: 'Pediatrics', value: 18, color: '#3b82f6' },
  { name: 'Adults', value: 48, color: '#0d9488' },
  { name: 'Seniors', value: 24, color: '#f59e0b' },
  { name: 'Other', value: 10, color: '#8b5cf6' },
];

export const appointmentStatsData = [
  { name: 'Mon', confirmed: 28, pending: 6, cancelled: 2 },
  { name: 'Tue', confirmed: 32, pending: 8, cancelled: 3 },
  { name: 'Wed', confirmed: 30, pending: 7, cancelled: 4 },
  { name: 'Thu', confirmed: 38, pending: 10, cancelled: 2 },
  { name: 'Fri', confirmed: 44, pending: 12, cancelled: 3 },
  { name: 'Sat', confirmed: 22, pending: 5, cancelled: 1 },
  { name: 'Sun', confirmed: 10, pending: 3, cancelled: 1 },
];
