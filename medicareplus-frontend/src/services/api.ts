// ============================================================
//  API Service — Spring Boot ready
//  Base URL is injected via Vite env: VITE_API_BASE_URL
// ============================================================

const BASE = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8080/api';

type RequestOptions = RequestInit & { params?: Record<string, string | number> };

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const token = localStorage.getItem('mc_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  let url = `${BASE}${endpoint}`;
  if (options.params) {
    const qs = new URLSearchParams();
    Object.entries(options.params).forEach(([k, v]) => qs.append(k, String(v)));
    url += `?${qs.toString()}`;
  }

  const res = await fetch(url, { ...options, headers });
  if (res.status === 401) {
    localStorage.removeItem('mc_token');
    localStorage.removeItem('mc_user');
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed (${res.status})`);
  }
  if (res.status === 204) return null as unknown as T;
  return res.json();
}

export const api = {
  get: <T,>(url: string, params?: Record<string, string | number>) => request<T>(url, { method: 'GET', params }),
  post: <T,>(url: string, body?: unknown) => request<T>(url, { method: 'POST', body: JSON.stringify(body) }),
  put: <T,>(url: string, body?: unknown) => request<T>(url, { method: 'PUT', body: JSON.stringify(body) }),
  patch: <T,>(url: string, body?: unknown) => request<T>(url, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: <T,>(url: string) => request<T>(url, { method: 'DELETE' }),
};

// Service modules (replace mock data once Spring Boot is live):
export const authService = {
  login: (email: string, password: string) => api.post<{ token: string; user: unknown }>('/auth/login', { email, password }),
  logout: () => api.post('/auth/logout'),
  me: () => api.get<unknown>('/auth/me'),
};
export const patientService = {
  list: () => api.get<unknown[]>('/patients'),
  get: (id: string) => api.get<unknown>(`/patients/${id}`),
  create: (data: unknown) => api.post<unknown>('/patients', data),
  update: (id: string, data: unknown) => api.put<unknown>(`/patients/${id}`, data),
  delete: (id: string) => api.delete(`/patients/${id}`),
};
export const doctorService = {
  list: () => api.get<unknown[]>('/doctors'),
  get: (id: string) => api.get<unknown>(`/doctors/${id}`),
};
export const appointmentService = {
  list: () => api.get<unknown[]>('/appointments'),
  create: (data: unknown) => api.post<unknown>('/appointments', data),
};
export const consultationService = {
  create: (data: unknown) => api.post<unknown>('/consultations', data),
};
export const prescriptionService = {
  list: () => api.get<unknown[]>('/prescriptions'),
  create: (data: unknown) => api.post<unknown>('/prescriptions', data),
};
export const medicineService = {
  list: () => api.get<unknown[]>('/medicines'),
};
export const laboratoryService = {
  list: () => api.get<unknown[]>('/laboratory'),
};
export const billingService = {
  list: () => api.get<unknown[]>('/billing'),
};
export const reportService = {
  revenue: (period: string) => api.get<unknown>('/reports/revenue', { period }),
};
