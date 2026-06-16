import { useState } from 'react'
import { FaEye, FaEyeSlash, FaRocket } from 'react-icons/fa'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      })
      if (error) throw error
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ backgroundColor: '#F0F8FF' }}>
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden flex border border-gray-100">

        {/* LEFT PANEL */}
        <div className="hidden md:flex w-96 bg-blue-500 flex-col justify-between p-10 relative overflow-hidden flex-shrink-0">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-white/10"
              style={{
                width: `${(i + 2) * 70}px`,
                height: `${(i + 2) * 70}px`,
                top: `${i * 15}%`,
                left: `${i * 8 - 20}%`,
              }} />
          ))}
          <img src={logo} alt="SnapCount AI" className="h-10 w-auto brightness-200 relative z-10" />
          <div className="relative z-10">
            <h2 className="text-3xl font-black text-white leading-tight mb-4">
              Welcome<br />back! 👋
            </h2>
            <p className="text-blue-100 text-sm leading-relaxed mb-8">
              Login and continue counting smarter with AI. Thousands of Nigerians trust SnapCount AI daily.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[{ value: '10k+', label: 'Users' }, { value: '99%', label: 'Accuracy' }, { value: '24/7', label: 'Support' }].map((s, i) => (
                <div key={i} className="bg-white/20 rounded-2xl p-3 text-center">
                  <p className="text-white font-black text-lg">{s.value}</p>
                  <p className="text-blue-100 text-xs mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-blue-200 text-xs relative z-10">© 2026 SnapCount AI 🇳🇬</p>
        </div>

        {/* RIGHT FORM */}
        <div className="flex-1 flex items-center justify-center p-8 md:p-12">
          <div className="w-full max-w-sm">
            <div className="md:hidden flex justify-center mb-8">
              <img src={logo} alt="SnapCount AI" className="h-10 w-auto" />
            </div>
            <div className="mb-8">
              <h1 className="text-2xl font-black text-gray-900 mb-1">Login to your account</h1>
              <p className="text-gray-400 text-sm">Enter your details below to continue</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4 font-medium">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Email Address</label>
                <input type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="you@example.com" required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-sm font-semibold text-gray-700">Password</label>
                  <a href="/forgot-password" className="text-xs text-blue-500 hover:text-blue-600 font-medium transition">Forgot password?</a>
                </div>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} name="password" value={form.password}
                    onChange={handleChange} placeholder="Enter your password" required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition pr-12" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-blue-500 text-white font-bold py-3.5 rounded-xl hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200 transition-all duration-200 shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <><FaRocket /> Login to My Account</>
                )}
              </button>
            </form>

            <p className="text-center text-gray-400 text-sm mt-6">
              Don't have an account?{' '}
              <a href="/signup" className="text-blue-500 font-bold hover:text-blue-600 transition">Create one free</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}