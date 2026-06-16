import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../supabase'
import BottomNav from '../components/BottomNav'
import {
  FaHistory, FaCamera, FaArrowRight,
  FaChartBar, FaCrown, FaSearch, FaTrash
} from 'react-icons/fa'

export default function History() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [scans, setScans] = useState([])
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)
  const [search, setSearch] = useState('')
  const [deleting, setDeleting] = useState(null)

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
      setScans(scansData || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    setDeleting(id)
    try {
      await supabase.from('scans').delete().eq('id', id)
      setScans(prev => prev.filter(s => s.id !== id))
    } catch (err) {
      console.error(err)
    } finally {
      setDeleting(null)
    }
  }

  const plan = profile?.plan || 'free'

  const filteredScans = scans.filter(scan =>
    scan.result?.toLowerCase().includes(search.toLowerCase()) ||
    scan.item_type?.toLowerCase().includes(search.toLowerCase())
  )

  const visibleScans = plan === 'free'
    ? filteredScans.filter(scan => {
        const today = new Date().toDateString()
        return new Date(scan.created_at).toDateString() === today
      })
    : plan === 'pro'
      ? filteredScans.filter(scan => {
          const thirtyDaysAgo = new Date()
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
          return new Date(scan.created_at) >= thirtyDaysAgo
        })
      : filteredScans

  const confidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-500 bg-green-50'
    if (confidence >= 75) return 'text-yellow-500 bg-yellow-50'
    return 'text-red-500 bg-red-50'
  }

  const itemTypeIcon = (type) => {
    const icons = {
      blocks: '🧱', rods: '🪵', boxes: '📦',
      animals: '🐄', people: '👥', crops: '🌾',
      bottles: '🍾', other: '📋'
    }
    return icons[type] || '📋'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F0F8FF' }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 font-medium text-sm">Loading history...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: '#F0F8FF' }}>

      {/* HEADER */}
      <div className="bg-white px-5 pt-6 pb-4 shadow-sm sticky top-0 z-40">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-gray-900 font-black text-lg">Scan History 📁</h1>
              <p className="text-gray-400 text-xs mt-0.5">
                {plan === 'free' ? 'Today only (Free plan)' :
                  plan === 'pro' ? 'Last 30 days (Pro plan)' :
                    'All time (Business plan)'}
              </p>
            </div>
            <span className={`text-xs font-black px-3 py-1.5 rounded-xl ${plan === 'free' ? 'bg-gray-100 text-gray-600' :
              plan === 'pro' ? 'bg-blue-100 text-blue-600' :
                'bg-yellow-100 text-yellow-600'}`}>
              {visibleScans.length} scans
            </span>
          </div>

          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search scans..."
              className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-blue-300 transition"
            />
          </div>
        </div>
      </div>

      <div className="px-5 py-5 max-w-lg mx-auto space-y-4">

        {/* FREE PLAN UPGRADE BANNER */}
        {plan === 'free' && scans.length > 0 && (
          <div className="bg-blue-500 rounded-2xl p-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-white font-black text-sm">See full history!</p>
              <p className="text-blue-100 text-xs mt-0.5">Upgrade Pro for 30 days history</p>
            </div>
            <button onClick={() => navigate('/profile')}
              className="bg-white text-blue-500 font-black text-xs px-4 py-2 rounded-xl hover:bg-blue-50 transition whitespace-nowrap flex items-center gap-1">
              <FaCrown className="text-xs" /> Upgrade
            </button>
          </div>
        )}

        {/* EMPTY STATE */}
        {visibleScans.length === 0 && (
          <div className="bg-white rounded-3xl p-10 text-center shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaHistory className="text-blue-300 text-2xl" />
            </div>
            <p className="text-gray-900 font-bold text-sm mb-1">
              {search ? 'No results found!' : 'No scans yet!'}
            </p>
            <p className="text-gray-400 text-xs mb-5 leading-relaxed">
              {search ? 'Try a different search term' : 'Start scanning to see your history here'}
            </p>
            {!search && (
              <button onClick={() => navigate('/scan')}
                className="bg-blue-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-600 transition shadow-md text-sm flex items-center gap-2 mx-auto">
                <FaCamera /> Take First Scan
              </button>
            )}
          </div>
        )}

        {/* SCANS LIST */}
        {visibleScans.length > 0 && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="divide-y divide-gray-50">
              {visibleScans.map((scan, i) => (
                <div key={i} className="p-4 hover:bg-blue-50/50 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    {/* Icon */}
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl">
                      {itemTypeIcon(scan.item_type)}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 cursor-pointer"
                      onClick={() => navigate('/results', {
                        state: {
                          result: {
                            success: true,
                            total: scan.count,
                            confidence: scan.confidence,
                            suggestions: scan.suggestions,
                            breakdown: JSON.parse(scan.breakdown || '[]'),
                            item_type: scan.item_type,
                            error: ''
                          },
                          itemType: scan.item_type,
                          photos: [],
                          plan
                        }
                      })}>
                      <p className="text-gray-900 font-bold text-sm truncate">{scan.result}</p>
                      <p className="text-gray-400 text-xs mt-0.5">
                        {new Date(scan.created_at).toLocaleDateString('en-NG', {
                          day: 'numeric', month: 'short', year: 'numeric',
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </p>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="text-right">
                        <span className="bg-blue-100 text-blue-600 text-xs font-black px-2.5 py-1 rounded-lg block">
                          {scan.count} items
                        </span>
                        {scan.confidence && (
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-lg mt-1 block text-center ${confidenceColor(scan.confidence)}`}>
                            {scan.confidence}%
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleDelete(scan.id)}
                        disabled={deleting === scan.id}
                        className="w-8 h-8 bg-red-50 rounded-xl flex items-center justify-center text-red-400 hover:bg-red-100 hover:text-red-500 transition">
                        {deleting === scan.id
                          ? <div className="w-3 h-3 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                          : <FaTrash className="text-xs" />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STATS SUMMARY */}
        {visibleScans.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Total Scans', value: visibleScans.length, icon: '📸' },
              { label: 'Items Counted', value: visibleScans.reduce((sum, s) => sum + (s.count || 0), 0), icon: '🔢' },
              { label: 'Avg Confidence', value: Math.round(visibleScans.reduce((sum, s) => sum + (s.confidence || 0), 0) / visibleScans.length) + '%', icon: '🎯' },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                <p className="text-2xl mb-1">{stat.icon}</p>
                <p className="text-gray-900 font-black text-sm">{stat.value}</p>
                <p className="text-gray-400 text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

      </div>
      <BottomNav />
    </div>
  )
}