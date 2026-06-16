import { useState } from 'react'
import { FaEnvelope, FaArrowLeft, FaCheckCircle } from 'react-icons/fa'
import { supabase } from '../supabase'
import logo from '../assets/logo.png'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

const handleSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:5173/reset-password',
    })
    if (error) throw error
    setSent(true)
  } catch (err) {
    console.error(err.message)
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ backgroundColor: '#F0F8FF' }}>

      {/* CARD */}
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
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
              <FaEnvelope className="text-white text-3xl" />
            </div>
            <h2 className="text-3xl font-black text-white leading-tight mb-4">
              Forgot your<br />password?<br />
              <span className="text-blue-200">No wahala! 😄</span>
            </h2>
            <p className="text-blue-100 text-sm leading-relaxed">
              Just enter your email address and we will send you a reset link immediately. Check your inbox after!
            </p>
          </div>

          <p className="text-blue-200 text-xs relative z-10">© 2026 SnapCount AI 🇳🇬</p>
        </div>

        {/* RIGHT — FORM */}
        <div className="flex-1 flex items-center justify-center p-8 md:p-12">
          <div className="w-full max-w-sm">

            {/* Mobile Logo */}
            <div className="md:hidden flex justify-center mb-8">
              <img src={logo} alt="SnapCount AI" className="h-10 w-auto" />
            </div>

            {/* Back Button */}
            <a href="/login" className="inline-flex items-center gap-2 text-gray-400 text-sm font-medium hover:text-blue-500 transition mb-8 group">
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Login
            </a>

            {!sent ? (
              <>
                <div className="mb-8">
                  <h1 className="text-2xl font-black text-gray-900 mb-1">Reset your password</h1>
                  <p className="text-gray-400 text-sm">Enter your email and we will send a reset link</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Email Address</label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 pl-11 text-sm text-gray-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                      />
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                    </div>
                  </div>

                  <button type="submit" disabled={loading}
                    className="w-full bg-blue-500 text-white font-bold py-3.5 rounded-xl hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200 transition-all duration-200 shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2">
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>Send Reset Link 📩</>
                    )}
                  </button>
                </form>

                <p className="text-center text-gray-400 text-sm mt-6">
                  Remember your password?{' '}
                  <a href="/login" className="text-blue-500 font-bold hover:text-blue-600 transition">Login here</a>
                </p>
              </>
            ) : (
              /* SUCCESS STATE */
              <div className="text-center">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaCheckCircle className="text-green-500 text-4xl" />
                </div>
                <h1 className="text-2xl font-black text-gray-900 mb-2">Check your email! 📩</h1>
                <p className="text-gray-400 text-sm leading-relaxed mb-2">
                  We sent a password reset link to
                </p>
                <p className="text-blue-500 font-bold text-sm mb-6">{email}</p>
                <p className="text-gray-400 text-xs leading-relaxed mb-8">
                  Click the link in your email to reset your password. If you don't see it check your spam folder.
                </p>
                <a href="/login"
                  className="block w-full bg-blue-500 text-white font-bold py-3.5 rounded-xl hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200 transition-all duration-200 shadow-md text-center">
                  Back to Login
                </a>
                <button onClick={() => setSent(false)}
                  className="mt-4 text-gray-400 text-sm hover:text-blue-500 transition font-medium">
                  Try a different email
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}