import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

import { authService } from '../services/api';

/* ========================================================================
   Auth
======================================================================== */

export type Role =
  | 'ADMIN'
  | 'DOCTOR'
  | 'NURSE'
  | 'RECEPTIONIST'
  | 'PHARMACIST'
  | 'LABORATORY'
  | 'CASHIER';

export type User = {
  id: number;
  name: string;
  email: string;
  role: Role;
  status?: string;
  avatar: string;
};

type AuthCtx = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthCtx | null>(null);

/* ========================================================================
   Theme
======================================================================== */

type ThemeCtx = {
  theme: 'light' | 'dark';
  toggle: () => void;
};

const ThemeContext = createContext<ThemeCtx | null>(null);

/* ========================================================================
   Toast
======================================================================== */

type Toast = {
  id: number;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
};

type ToastCtx = {
  toasts: Toast[];
  push: (t: Omit<Toast, 'id'>) => void;
  dismiss: (id: number) => void;
};

const ToastContext = createContext<ToastCtx | null>(null);

/* ========================================================================
   Sidebar
======================================================================== */

type SidebarCtx = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const SidebarContext = createContext<SidebarCtx | null>(null);

/* ========================================================================
   Provider
======================================================================== */

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem('mc_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('mc_theme');

    return saved === 'dark' ? 'dark' : 'light';
  });

  const [toasts, setToasts] = useState<Toast[]>([]);
  const [open, setOpen] = useState(false);

  /* ----------------------------------------------------------------------
     Theme
  ---------------------------------------------------------------------- */

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('mc_theme', theme);
  }, [theme]);

  /* ----------------------------------------------------------------------
     LOGIN — REAL SPRING BOOT LOGIN
  ---------------------------------------------------------------------- */

  const login = useCallback(async (email: string, password: string) => {
    const response = await authService.login(email, password);

    /*
     * Backend returns:
     *
     * {
     *   token: "...",
     *   user: {
     *     id: 1,
     *     name: "Dr. Amelia Hart",
     *     email: "...",
     *     role: "ADMIN",
     *     status: "ACTIVE",
     *     avatar: "DA"
     *   }
     * }
     */

    if (!response?.token || !response?.user) {
      throw new Error('Invalid login response from server');
    }

    const backendUser = response.user as {
      id: number;
      name: string;
      email: string;
      role: Role;
      status?: string;
      avatar?: string;
    };

    const authenticatedUser: User = {
      id: backendUser.id,
      name: backendUser.name,
      email: backendUser.email,
      role: backendUser.role,
      status: backendUser.status,
      avatar: backendUser.avatar || getInitials(backendUser.name),
    };

    /*
     * Save JWT token.
     *
     * api.ts will automatically read mc_token
     * and send:
     *
     * Authorization: Bearer <token>
     */
    localStorage.setItem('mc_token', response.token);

    /* Save authenticated user */
    localStorage.setItem(
      'mc_user',
      JSON.stringify(authenticatedUser)
    );

    setUser(authenticatedUser);
  }, []);

  /* ----------------------------------------------------------------------
     LOGOUT
  ---------------------------------------------------------------------- */

  const logout = useCallback(() => {
    /*
     * JWT is stateless.
     * The backend logout endpoint does not invalidate
     * the token, so removing it from the browser is enough
     * for this implementation.
     */

    localStorage.removeItem('mc_token');
    localStorage.removeItem('mc_user');

    setUser(null);
  }, []);

  /* ----------------------------------------------------------------------
     Toast
  ---------------------------------------------------------------------- */

  const push = useCallback((t: Omit<Toast, 'id'>) => {
    const id = Date.now() + Math.random();

    setToasts((s) => [
      ...s,
      {
        ...t,
        id,
      },
    ]);

    setTimeout(() => {
      setToasts((s) => s.filter((x) => x.id !== id));
    }, 4000);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((s) => s.filter((t) => t.id !== id));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      <ThemeContext.Provider
        value={{
          theme,
          toggle: () =>
            setTheme((t) =>
              t === 'light' ? 'dark' : 'light'
            ),
        }}
      >
        <ToastContext.Provider
          value={{
            toasts,
            push,
            dismiss,
          }}
        >
          <SidebarContext.Provider
            value={{
              open,
              setOpen,
            }}
          >
            {children}
          </SidebarContext.Provider>
        </ToastContext.Provider>
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );
}

/* ========================================================================
   Helpers
======================================================================== */

function getInitials(name: string): string {
  if (!name || !name.trim()) {
    return '?';
  }

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

/* ========================================================================
   Hooks
======================================================================== */

export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error('useAuth outside provider');
  }

  return ctx;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);

  if (!ctx) {
    throw new Error('useTheme outside provider');
  }

  return ctx;
};

export const useToast = () => {
  const ctx = useContext(ToastContext);

  if (!ctx) {
    throw new Error('useToast outside provider');
  }

  return ctx;
};

export const useSidebar = () => {
  const ctx = useContext(SidebarContext);

  if (!ctx) {
    throw new Error('useSidebar outside provider');
  }

  return ctx;
};