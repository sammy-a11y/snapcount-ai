import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function SplashScreen() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if user is logged in
      const session = localStorage.getItem('sb-yakqwaunovbjeiyfscmb-auth-token')
      if (session) {
        navigate('/dashboard')
      } else {
        navigate('/login')
      }
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: '#1A73E8' }}>

      {/* Background circles */}
      {[...Array(4)].map((_, i) => (
        <div key={i} className="absolute rounded-full bg-white/10"
          style={{
            width: `${(i + 2) * 120}px`,
            height: `${(i + 2) * 120}px`,
            top: `${i * 15 - 10}%`,
            right: `${i * 10 - 15}%`,
          }} />
      ))}

      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="w-28 h-28 bg-white rounded-3xl flex items-center justify-center shadow-2xl animate-bounce">
          <img src={logo} alt="SnapCount AI" className="w-20 h-20 object-contain" />
        </div>

        <div className="text-center">
          <h1 className="text-white font-black text-3xl mb-2">SnapCount AI</h1>
          <p className="text-blue-100 text-sm">AI Powered Counting App</p>
        </div>

        {/* Loading dots */}
        <div className="flex gap-2 mt-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-white rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}></div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <p className="absolute bottom-8 text-blue-200 text-xs">Made with ❤️ in Nigeria 🇳🇬</p>
    </div>
  )
}