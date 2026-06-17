import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../supabase'
import { usePaystackPayment } from 'react-paystack'
import BottomNav from '../components/BottomNav'
import {
  FaUser, FaCrown, FaCheckCircle, FaSignOutAlt,
  FaLock, FaEnvelope, FaChevronRight, FaStar,
  FaBriefcase, FaWhatsapp
} from 'react-icons/fa'

export default function Profile() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      setProfile(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  const plan = profile?.plan || 'free'
  const firstName = profile?.full_name?.split(' ')[0] ||
    user?.user_metadata?.full_name?.split(' ')[0] ||
    user?.email?.split('@')[0] || 'User'

  const planDetails = {
    free: {
      label: 'Free Plan',
      color: 'bg-gray-100 text-gray-600',
      icon: <FaUser className="text-gray-500" />,
      features: ['5 scans per day', 'Basic AI counting', 'Today history only', 'Mobile app access'],
    },
    pro: {
      label: '⭐ Pro Plan',
      color: 'bg-blue-100 text-blue-600',
      icon: <FaStar className="text-blue-500" />,
      features: ['Unlimited scans', 'Full AI analysis', 'PDF export', '30 days history', 'Priority processing'],
    },
    business: {
      label: '👑 Business Plan',
      color: 'bg-yellow-100 text-yellow-600',
      icon: <FaCrown className="text-yellow-500" />,
      features: ['Everything in Pro', 'Up to 5 team members', 'Forever history', 'Batch upload', 'WhatsApp support'],
    }
  }

  const plans = [
    {
      id: 'pro',
      name: 'Pro Plan',
      price: '₦3,000',
      period: '/month',
      icon: <FaStar className="text-blue-500 text-xl" />,
      color: 'border-blue-200 bg-blue-50',
      highlight: true,
      features: ['Unlimited scans', 'Full AI analysis', 'PDF export', '30 days history', 'Priority processing', 'No watermark'],
    },
    {
      id: 'business',
      name: 'Business Plan',
      price: '₦7,500',
      period: '/month',
      icon: <FaBriefcase className="text-yellow-500 text-xl" />,
      color: 'border-yellow-200 bg-yellow-50',
      highlight: false,
      features: ['Everything in Pro', 'Up to 5 team members', 'Forever history', 'Batch upload', 'WhatsApp support', 'Monthly reports'],
    }
  ]

  // ✅ PayButton component defined here
  const PayButton = ({ plan, amount, label, color }) => {
    const config = {
      reference: `snapcount_${plan}_${user.id}_${Date.now()}`,
      email: user.email,
      amount: amount * 100,
      publicKey: import.meta.env.VITE_PAYSTACK_KEY,
      metadata: {
        user_id: user.id,
        plan: plan
      }
    }

    const onSuccess = async () => {
      await supabase
        .from('profiles')
        .update({ plan: plan })
        .eq('id', user.id)
      fetchProfile()
      alert(`🎉 Welcome to ${label}! Your account has been upgraded!`)
    }

    const onClose = () => console.log('Payment closed')
    const initializePayment = usePaystackPayment(config)

    return (
      <button
        onClick={() => initializePayment(onSuccess, onClose)}
        className={`w-full font-bold py-3 rounded-xl transition-all duration-200 shadow-md text-sm flex items-center justify-center gap-2 ${color}`}>
        <FaCrown /> Upgrade to {label}
      </button>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F0F8FF' }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 font-medium text-sm">Loading profile...</p>
        </div>
      </div>
    )
  }


  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: '#F0F8FF' }}>

      {/* LOGOUT CONFIRM POPUP */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowLogoutConfirm(false)}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl p-6 w-full max-w-sm text-center">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaSignOutAlt className="text-red-400 text-2xl" />
            </div>
            <h2 className="text-gray-900 font-black text-xl mb-2">Logout?</h2>
            <p className="text-gray-400 text-sm mb-6">Are you sure you want to logout of SnapCount AI?</p>
            <div className="flex gap-3">
              <button onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 bg-gray-100 text-gray-600 font-bold py-3.5 rounded-xl hover:bg-gray-200 transition text-sm">
                Cancel
              </button>
              <button onClick={handleLogout}
                className="flex-1 bg-red-500 text-white font-bold py-3.5 rounded-xl hover:bg-red-600 transition shadow-md text-sm">
                Yes Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="bg-white px-5 pt-6 pb-4 shadow-sm sticky top-0 z-40">
        <div className="max-w-lg mx-auto">
          <h1 className="text-gray-900 font-black text-lg">My Profile 👤</h1>
          <p className="text-gray-400 text-xs mt-0.5">Manage your account and subscription</p>
        </div>
      </div>

      <div className="px-5 py-5 max-w-lg mx-auto space-y-4">

        {/* PROFILE CARD */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 flex-shrink-0">
              <span className="text-white font-black text-2xl">
                {firstName[0]?.toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-900 font-black text-lg truncate">
                {profile?.full_name || user?.user_metadata?.full_name || 'User'}
              </p>
              <p className="text-gray-400 text-sm truncate">{user?.email}</p>
              <span className={`text-xs font-black px-3 py-1 rounded-full inline-block mt-2 ${planDetails[plan].color}`}>
                {planDetails[plan].label}
              </span>
            </div>
          </div>
        </div>

        {/* CURRENT PLAN */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-50">
            <p className="text-gray-900 font-black text-sm">Current Plan</p>
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {planDetails[plan].icon}
                <p className="text-gray-900 font-bold text-sm">{planDetails[plan].label}</p>
              </div>
              {plan === 'free' && (
                <span className="text-xs text-gray-400 font-medium">Free forever</span>
              )}
            </div>
            <div className="space-y-2">
              {planDetails[plan].features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <FaCheckCircle className="text-blue-500 text-xs flex-shrink-0" />
                  <p className="text-gray-500 text-xs">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* UPGRADE PLANS */}
        {plan === 'free' && (
          <div className="space-y-3">
            <p className="text-gray-700 font-black text-sm px-1">Upgrade Your Plan 🚀</p>
            {plans.map((p, i) => (
              <div key={i} className={`rounded-3xl border-2 p-5 ${p.color} ${p.highlight ? 'border-blue-300' : 'border-yellow-200'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {p.icon}
                    <p className="text-gray-900 font-black text-sm">{p.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900 font-black text-lg">{p.price}</p>
                    <p className="text-gray-400 text-xs">{p.period}</p>
                  </div>
                </div>
                <div className="space-y-1.5 mb-4">
                  {p.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500 text-xs flex-shrink-0" />
                      <p className="text-gray-600 text-xs">{feature}</p>
                    </div>
                  ))}
                </div>
                <PayButton
                  plan={p.id}
                  amount={p.id === 'pro' ? 3000 : 7500}
                  label={p.name}
                  color={p.highlight
                    ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-blue-200'
                    : 'bg-yellow-500 text-white hover:bg-yellow-600 shadow-yellow-200'}
                />
              </div>
            ))}
          </div>
        )}

        {/* PRO/BUSINESS MANAGEMENT */}
        {plan !== 'free' && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-50">
              <p className="text-gray-900 font-black text-sm">Subscription</p>
            </div>
            <div className="p-5 text-center">
              <FaCrown className="text-yellow-400 text-3xl mx-auto mb-3" />
              <p className="text-gray-900 font-bold text-sm mb-1">
                You are on {planDetails[plan].label}!
              </p>
              <p className="text-gray-400 text-xs leading-relaxed">
                To cancel or change your plan contact us on WhatsApp
              </p>
              <a href="https://wa.me/2349169530731"
                target="_blank"
                rel="noreferrer"
                className="mt-4 bg-green-500 text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-green-600 transition inline-flex items-center gap-2">
                <FaWhatsapp /> Contact Support
              </a>
            </div>
          </div>
        )}

        {/* ACCOUNT SETTINGS */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-50">
            <p className="text-gray-900 font-black text-sm">Account Settings</p>
          </div>
          <div className="divide-y divide-gray-50">
            {[
              { icon: <FaEnvelope className="text-blue-400" />, label: 'Email Address', value: user?.email },
              { icon: <FaLock className="text-blue-400" />, label: 'Change Password', value: 'Tap to update', action: () => navigate('/forgot-password') },
            ].map((item, i) => (
              <button key={i} onClick={item.action}
                className="w-full flex items-center gap-4 px-5 py-4 hover:bg-blue-50/50 transition-colors duration-200 text-left">
                <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 font-bold text-sm">{item.label}</p>
                  <p className="text-gray-400 text-xs truncate mt-0.5">{item.value}</p>
                </div>
                {item.action && <FaChevronRight className="text-gray-300 text-xs flex-shrink-0" />}
              </button>
            ))}
          </div>
        </div>

        {/* LOGOUT */}
        <button onClick={() => setShowLogoutConfirm(true)}
          className="w-full bg-white border border-red-100 text-red-500 font-bold py-4 rounded-2xl hover:bg-red-50 hover:-translate-y-0.5 transition-all duration-200 shadow-sm flex items-center justify-center gap-2 text-sm">
          <FaSignOutAlt /> Logout
        </button>

        {/* APP INFO */}
        <div className="text-center pb-2">
          <p className="text-gray-300 text-xs">SnapCount AI v1.0.0</p>
          <p className="text-gray-300 text-xs mt-0.5">Made with ❤️ in Nigeria 🇳🇬</p>
        </div>

      </div>
      <BottomNav />
    </div>
  )
}