import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"

const STORAGE_KEY = "iapi-auth"

type AuthContextValue = {
  isAuthenticated: boolean
  login: (email: string, remember?: boolean) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function readStoredAuth(): boolean {
  try {
    return (
      localStorage.getItem(STORAGE_KEY) === "1" ||
      sessionStorage.getItem(STORAGE_KEY) === "1"
    )
  } catch {
    return false
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(readStoredAuth)

  const login = useCallback((_email: string, remember = true) => {
    setIsAuthenticated(true)
    try {
      if (remember) {
        localStorage.setItem(STORAGE_KEY, "1")
        sessionStorage.removeItem(STORAGE_KEY)
      } else {
        sessionStorage.setItem(STORAGE_KEY, "1")
        localStorage.removeItem(STORAGE_KEY)
      }
    } catch {
      /* ignore */
    }
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
    try {
      localStorage.removeItem(STORAGE_KEY)
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
  }, [])

  const value = useMemo(
    () => ({ isAuthenticated, login, logout }),
    [isAuthenticated, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return ctx
}
