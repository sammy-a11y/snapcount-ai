import { useState } from 'react'
import { FaEye, FaEyeSlash, FaRocket, FaCheckCircle } from 'react-icons/fa'
import { supabase } from '../supabase'
import logo from '../assets/logo.png'

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: { full_name: form.name }
        }
      })

      if (error) throw error
      setSuccess(true)

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#F0F8FF' }}>
        <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md w-full text-center border border-gray-100">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="text-green-500 text-4xl" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">Check your email! 📩</h1>
          <p className="text-gray-400 text-sm leading-relaxed mb-2">We sent a confirmation link to</p>
          <p className="text-blue-500 font-bold mb-6">{form.email}</p>
          <p className="text-gray-400 text-xs mb-8">Click the link in your email to activate your account. Check spam if you don't see it!</p>
          <a href="/login" className="block w-full bg-blue-500 text-white font-bold py-3.5 rounded-xl hover:bg-blue-600 transition shadow-md text-center">
            Go to Login
          </a>
        </div>
      </div>
    )
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
              Start for free.<br />
              <span className="text-blue-200">No credit card!</span>
            </h2>
            <p className="text-blue-100 text-sm leading-relaxed mb-6">
              Create your free account and start counting smarter with AI today.
            </p>
            <div className="space-y-3">
              {['5 free scans every day', 'No credit card required', 'Works on Android phone', 'Upgrade anytime easily'].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <FaCheckCircle className="text-blue-200 flex-shrink-0 text-sm" />
                  <p className="text-white text-sm">{item}</p>
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
              <h1 className="text-2xl font-black text-gray-900 mb-1">Create your account 🚀</h1>
              <p className="text-gray-400 text-sm">Join free — no credit card needed</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4 font-medium">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Full Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange}
                  placeholder="Your full name" required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Email Address</label>
                <input type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="you@example.com" required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Password</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} name="password" value={form.password}
                    onChange={handleChange} placeholder="Create a strong password" required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition pr-12" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" required className="mt-1 accent-blue-500" />
                <p className="text-gray-400 text-xs leading-relaxed">
                  I agree to the{' '}
                  <a href="#" className="text-blue-500 font-semibold hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-blue-500 font-semibold hover:underline">Privacy Policy</a>
                </p>
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-blue-500 text-white font-bold py-3.5 rounded-xl hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200 transition-all duration-200 shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <><FaRocket /> Create Free Account</>
                )}
              </button>
            </form>

            <p className="text-center text-gray-400 text-sm mt-6">
              Already have an account?{' '}
              <a href="/login" className="text-blue-500 font-bold hover:text-blue-600 transition">Login here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}