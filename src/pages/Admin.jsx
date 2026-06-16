import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import {
  FaUsers, FaCamera, FaCrown, FaSignOutAlt,
  FaSearch, FaChartBar, FaBan, FaCheckCircle,
  FaArrowUp, FaArrowDown, FaTrash
} from 'react-icons/fa'
import logo from '../assets/logo.png'

export default function Admin() {
  const [users, setUsers] = useState([])
  const [scans, setScans] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const [updating, setUpdating] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const { data: usersData } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
      setUsers(usersData || [])

      const { data: scansData } = await supabase
        .from('scans')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50)
      setScans(scansData || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const updatePlan = async (userId, newPlan) => {
    setUpdating(userId)
    try {
      await supabase
        .from('profiles')
        .update({ plan: newPlan })
        .eq('id', userId)
      setUsers(prev => prev.map(u =>
        u.id === userId ? { ...u, plan: newPlan } : u
      ))
    } catch (err) {
      console.error(err)
    } finally {
      setUpdating(null)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('snapcount_admin')
    window.location.href = '/'
  }

  const totalUsers = users.length
  const proUsers = users.filter(u => u.plan === 'pro').length
  const businessUsers = users.filter(u => u.plan === 'business').length
  const freeUsers = users.filter(u => u.plan === 'free').length
  const totalScans = scans.length
  const revenue = (proUsers * 3000) + (businessUsers * 7500)

  const filteredUsers = users.filter(u =>
    u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  )

  const planColor = (plan) => {
    if (plan === 'pro') return 'bg-blue-100 text-blue-600'
    if (plan === 'business') return 'bg-yellow-100 text-yellow-600'
    return 'bg-gray-100 text-gray-600'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F0F8FF' }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 font-medium text-sm">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F0F8FF' }}>

      {/* TOP BAR */}
      <div className="bg-white px-6 py-4 shadow-sm flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <img src={logo} alt="SnapCount AI" className="h-8 w-auto" />
          <div>
            <p className="text-gray-900 font-black text-sm">Admin Dashboard</p>
            <p className="text-gray-400 text-xs">SnapCount AI Control Panel</p>
          </div>
        </div>
        <button onClick={handleLogout}
          className="flex items-center gap-2 text-red-500 text-sm font-bold hover:bg-red-50 px-3 py-2 rounded-xl transition">
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 overflow-x-hidden">

        {/* TABS */}
        <div className="flex gap-2 mb-6 bg-white rounded-2xl p-1.5 shadow-sm border border-gray-100 w-fit">
          {['overview', 'users', 'scans'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl text-sm font-bold capitalize transition-all duration-200 ${activeTab === tab
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-500 hover:text-blue-500'}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">

            {/* STATS GRID */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <FaUsers className="text-blue-500 text-xl" />, label: 'Total Users', value: totalUsers, bg: 'bg-blue-50' },
                { icon: <FaCamera className="text-purple-500 text-xl" />, label: 'Total Scans', value: totalScans, bg: 'bg-purple-50' },
                { icon: <FaCrown className="text-yellow-500 text-xl" />, label: 'Pro Users', value: proUsers, bg: 'bg-yellow-50' },
                { icon: <FaCrown className="text-orange-500 text-xl" />, label: 'Business Users', value: businessUsers, bg: 'bg-orange-50' },
                { icon: <FaUsers className="text-gray-500 text-xl" />, label: 'Free Users', value: freeUsers, bg: 'bg-gray-50' },
                { icon: <FaChartBar className="text-green-500 text-xl" />, label: 'Est. Revenue', value: `₦${revenue.toLocaleString()}`, bg: 'bg-green-50' },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                  <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                    {stat.icon}
                  </div>
                  <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                  <p className="text-gray-400 text-xs font-medium mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* PLAN BREAKDOWN */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-gray-900 font-black text-base mb-5">Plan Breakdown</h2>
              <div className="space-y-4">
                {[
                  { label: 'Free', count: freeUsers, total: totalUsers, color: 'bg-gray-400' },
                  { label: 'Pro', count: proUsers, total: totalUsers, color: 'bg-blue-500' },
                  { label: 'Business', count: businessUsers, total: totalUsers, color: 'bg-yellow-500' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-1.5">
                      <p className="text-gray-700 text-sm font-bold">{item.label}</p>
                      <p className="text-gray-500 text-sm">{item.count} users</p>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className={`${item.color} h-2.5 rounded-full transition-all duration-500`}
                        style={{ width: `${item.total > 0 ? (item.count / item.total) * 100 : 0}%` }}>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RECENT SCANS */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-50">
                <h2 className="text-gray-900 font-black text-base">Recent Scans</h2>
              </div>
              <div className="divide-y divide-gray-50">
                {scans.slice(0, 5).map((scan, i) => (
                  <div key={i} className="flex items-center gap-4 p-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FaCamera className="text-blue-400 text-sm" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 font-bold text-sm truncate">{scan.result}</p>
                      <p className="text-gray-400 text-xs mt-0.5">
                        {new Date(scan.created_at).toLocaleDateString('en-NG', {
                          day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <span className="bg-blue-100 text-blue-600 text-xs font-black px-2.5 py-1 rounded-lg flex-shrink-0">
                      {scan.count} items
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === 'users' && (
          <div className="space-y-4">

            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users by name or email..."
                className="w-full bg-white border border-gray-100 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-blue-300 transition shadow-sm" />
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-50 flex items-center justify-between">
                <h2 className="text-gray-900 font-black text-base">All Users</h2>
                <span className="bg-blue-100 text-blue-600 text-xs font-black px-3 py-1 rounded-full">
                  {filteredUsers.length} users
                </span>
              </div>
              <div className="divide-y divide-gray-50">
                {filteredUsers.map((u, i) => (
                  <div key={i} className="p-4 hover:bg-blue-50/30 transition-colors duration-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-black text-sm">
                          {u.full_name?.[0]?.toUpperCase() || u.email?.[0]?.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 font-bold text-sm truncate">{u.full_name || 'No name'}</p>
                        <p className="text-gray-400 text-xs truncate">{u.email}</p>
                      </div>
                      <span className={`text-xs font-black px-2.5 py-1 rounded-lg ${planColor(u.plan)}`}>
                        {u.plan || 'free'}
                      </span>
                    </div>

                    {/* Plan Controls */}
                    <div className="flex gap-2 ml-13">
                      {['free', 'pro', 'business'].map((p) => (
                        <button key={p} onClick={() => updatePlan(u.id, p)}
                          disabled={updating === u.id || u.plan === p}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${u.plan === p
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-blue-500'}`}>
                          {updating === u.id ? '...' : p}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SCANS TAB */}
        {activeTab === 'scans' && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-50 flex items-center justify-between">
              <h2 className="text-gray-900 font-black text-base">All Scans</h2>
              <span className="bg-blue-100 text-blue-600 text-xs font-black px-3 py-1 rounded-full">
                {scans.length} scans
              </span>
            </div>
            <div className="divide-y divide-gray-50">
              {scans.map((scan, i) => (
                <div key={i} className="flex items-center gap-4 p-4 hover:bg-blue-50/30 transition-colors duration-200">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaCamera className="text-blue-400 text-sm" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 font-bold text-sm truncate">{scan.result}</p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      {new Date(scan.created_at).toLocaleDateString('en-NG', {
                        day: 'numeric', month: 'short', year: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="bg-blue-100 text-blue-600 text-xs font-black px-2.5 py-1 rounded-lg">
                      {scan.count} items
                    </span>
                    {scan.confidence && (
                      <span className={`text-xs font-bold px-2 py-1 rounded-lg ${scan.confidence >= 90
                        ? 'bg-green-100 text-green-600'
                        : scan.confidence >= 75
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-red-100 text-red-600'}`}>
                        {scan.confidence}%
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}