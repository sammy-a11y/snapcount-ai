import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../supabase'
import BottomNav from '../components/BottomNav'
import logo from '../assets/logo.png'
import {
  FaCamera, FaHistory, FaChartBar, FaCrown,
  FaBolt, FaCheckCircle, FaArrowRight, FaFire,
  FaBell, FaRocket
} from 'react-icons/fa'

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [recentScans, setRecentScans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      setProfile(profileData)

      const { data: scansData } = await supabase
        .from('scans')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5)
      setRecentScans(scansData || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const firstName = profile?.full_name?.split(' ')[0] ||
    user?.user_metadata?.full_name?.split(' ')[0] ||
    user?.email?.split('@')[0] || 'there'

  const plan = profile?.plan || 'free'
  const scansToday = profile?.scans_today || 0
  const scansLeft = plan === 'free' ? Math.max(0, 5 - scansToday) : 'Unlimited'

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F0F8FF' }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 font-medium text-sm">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: '#F0F8FF' }}>

      {/* TOP HEADER */}
      <div className="bg-white px-5 pt-6 pb-4 shadow-sm sticky top-0 z-40">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <img src={logo} alt="SnapCount AI" className="h-7 w-auto" />
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition relative">
              <FaBell className="text-sm" />
              <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-400 rounded-full"></div>
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:-translate-y-0.5 transition-all duration-200">
              <span className="text-white font-black text-xs">
                {firstName[0]?.toUpperCase()}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-5 py-6 max-w-lg mx-auto space-y-5">

        {/* GREETING */}
        <div>
          <p className="text-gray-400 text-sm font-medium">{getGreeting()} 👋</p>
          <h1 className="text-2xl font-black text-gray-900 mt-0.5">{firstName}!</h1>
        </div>

        {/* HERO SCAN CARD */}
        <div className="relative bg-blue-500 rounded-3xl p-6 overflow-hidden shadow-xl shadow-blue-200">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-white/10"
              style={{
                width: `${(i + 2) * 90}px`,
                height: `${(i + 2) * 90}px`,
                top: `${i * 20 - 30}%`,
                right: `${i * 10 - 15}%`,
              }} />
          ))}
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-blue-100 text-xs font-medium">
                {plan === 'free' ? `${scansLeft} scan${scansLeft !== 1 ? 's' : ''} left today` : 'Unlimited scans'}
              </p>
            </div>
            <h2 className="text-xl font-black text-white mb-1">Start Counting Now</h2>
            <p className="text-blue-100 text-sm mb-5 leading-relaxed">
              Snap a photo and get instant AI count results in seconds
            </p>
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/scan')}
                className="bg-white text-blue-500 font-black px-5 py-2.5 rounded-xl hover:bg-blue-50 hover:-translate-y-0.5 transition-all duration-200 shadow-lg flex items-center gap-2 text-sm">
                <FaCamera /> Snap Now
              </button>
              {plan === 'free' && (
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-2.5">
                  <p className="text-white text-xs font-black">{scansLeft} left</p>
                  <p className="text-blue-100 text-xs">today</p>
                </div>
              )}
              {plan !== 'free' && (
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-2.5">
                  <p className="text-white text-xs font-black">Unlimited</p>
                  <p className="text-blue-100 text-xs">scans</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* STATS ROW */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: <FaCamera className="text-blue-500" />, value: scansToday, label: 'Today', bg: 'bg-blue-50' },
            { icon: <FaFire className="text-orange-500" />, value: recentScans.length, label: 'Total', bg: 'bg-orange-50' },
            { icon: <FaBolt className="text-green-500" />, value: '99%', label: 'Accuracy', bg: 'bg-green-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-center">
              <div className={`w-8 h-8 ${stat.bg} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                {stat.icon}
              </div>
              <p className="text-gray-900 font-black text-lg">{stat.value}</p>
              <p className="text-gray-400 text-xs">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* PLAN CARD */}
        {plan === 'free' && (
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-900 font-black text-sm">Free Plan</p>
                <p className="text-gray-400 text-xs mt-0.5">Upgrade for unlimited access</p>
              </div>
              <FaCrown className="text-gray-300 text-2xl" />
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1.5">
                <p className="text-gray-500 text-xs font-medium">Daily scans used</p>
                <p className="text-gray-900 text-xs font-black">{scansToday}/5</p>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(scansToday / 5) * 100}%` }}>
                </div>
              </div>
            </div>

            <button onClick={() => navigate('/profile')}
              className="w-full bg-blue-500 text-white font-bold py-3 rounded-xl hover:bg-blue-600 hover:-translate-y-0.5 transition-all duration-200 shadow-md flex items-center justify-center gap-2 text-sm">
              <FaCrown /> Upgrade to Pro — ₦3,000/mo
            </button>
          </div>
        )}

        {/* PRO/BUSINESS PLAN CARD */}
        {plan !== 'free' && (
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900 font-black text-sm">
                  {plan === 'pro' ? '⭐ Pro Plan' : '👑 Business Plan'}
                </p>
                <p className="text-gray-400 text-xs mt-0.5">You have unlimited access</p>
              </div>
              <FaCrown className="text-yellow-400 text-2xl" />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {(plan === 'pro' ? [
                'Unlimited scans',
                'PDF export',
                'Full AI analysis',
                '30 days history',
              ] : [
                'Unlimited scans',
                'Team members',
                'Forever history',
                'WhatsApp support',
              ]).map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <FaCheckCircle className="text-blue-500 text-xs flex-shrink-0" />
                  <p className="text-gray-500 text-xs">{f}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RECENT SCANS */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-50">
            <div>
              <h2 className="text-gray-900 font-black text-base">Recent Scans</h2>
              <p className="text-gray-400 text-xs mt-0.5">Your latest results</p>
            </div>
            <button onClick={() => navigate('/history')}
              className="text-blue-500 text-xs font-bold hover:text-blue-600 transition flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg">
              See All <FaArrowRight className="text-xs" />
            </button>
          </div>

          {recentScans.length === 0 ? (
            <div className="py-12 text-center px-6">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaCamera className="text-blue-300 text-2xl" />
              </div>
              <p className="text-gray-900 font-bold text-sm mb-1">No scans yet!</p>
              <p className="text-gray-400 text-xs mb-5 leading-relaxed">
                Take your first scan to see results here
              </p>
              <button onClick={() => navigate('/scan')}
                className="bg-blue-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-600 transition shadow-md text-sm flex items-center gap-2 mx-auto">
                <FaCamera /> Take First Scan
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {recentScans.map((scan, i) => (
                <div key={i}
                  className="flex items-center gap-4 p-4 hover:bg-blue-50/50 transition-colors duration-200 cursor-pointer active:bg-blue-50"
                  onClick={() => navigate('/results', { state: { scan } })}>
                  <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaChartBar className="text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 font-bold text-sm truncate">
                      {scan.result || 'Scan Result'}
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      {new Date(scan.created_at).toLocaleDateString('en-NG', {
                        day: 'numeric', month: 'short',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="bg-blue-100 text-blue-600 text-xs font-black px-2.5 py-1 rounded-lg">
                      {scan.count} items
                    </span>
                    <FaArrowRight className="text-gray-300 text-xs" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: <FaRocket className="text-blue-500 text-xl" />, title: 'New Scan', desc: 'Count anything now', path: '/scan', bg: 'bg-blue-50' },
            { icon: <FaHistory className="text-purple-500 text-xl" />, title: 'History', desc: 'View past scans', path: '/history', bg: 'bg-purple-50' },
          ].map((item, i) => (
            <button key={i} onClick={() => navigate(item.path)}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200 text-left group">
              <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                {item.icon}
              </div>
              <p className="text-gray-900 font-black text-sm">{item.title}</p>
              <p className="text-gray-400 text-xs mt-0.5">{item.desc}</p>
            </button>
          ))}
        </div>

      </div>

      {/* BOTTOM NAV */}
      <BottomNav />
    </div>
  )
}