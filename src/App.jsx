import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard'
import Scan from './pages/Scan'
import Results from './pages/Results'
import History from './pages/History'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import SplashScreen from './pages/SplashScreen'
import ProtectedRoute from './components/ProtectedRoute'

const ADMIN_EMAIL = 'mrcourage34@gmail.com'

function AdminRoute({ children }) {
  const storedEmail = localStorage.getItem('snapcount_admin')
  if (storedEmail !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5" style={{ backgroundColor: '#F0F8FF' }}>
        <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm text-center border border-gray-100">
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="text-gray-900 font-black text-xl mb-2">Admin Access Only</h2>
          <p className="text-gray-400 text-sm mb-6">Enter admin password to continue</p>
          <input
            type="password"
            placeholder="Enter admin password"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition mb-3"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (e.target.value === 'deletedacc22') {
                  localStorage.setItem('snapcount_admin', ADMIN_EMAIL)
                  window.location.reload()
                } else {
                  alert('Wrong password!')
                }
              }
            }}
          />
          <p className="text-gray-400 text-xs">Press Enter after typing password</p>
        </div>
      </div>
    )
  }
  return children
}

function RootRoute() {
  const isInstalled = window.matchMedia('(display-mode: standalone)').matches
  return isInstalled ? <SplashScreen /> : <Landing />
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootRoute />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/scan" element={<ProtectedRoute><Scan /></ProtectedRoute>} />
        <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
      </Routes>
    </Router>
  )
}

export default App