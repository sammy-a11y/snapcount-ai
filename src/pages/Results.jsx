import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import BottomNav from '../components/BottomNav'
import { useState } from 'react'
import {
  FaCheckCircle, FaCamera, FaHome,
  FaShareAlt, FaFilePdf, FaCrown,
  FaExclamationTriangle, FaRedo,
  FaChartBar, FaLightbulb
} from 'react-icons/fa'

export default function Results() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [copied, setCopied] = useState(false)

  const result = state?.result
  const itemType = state?.itemType || 'items'
  const photos = state?.photos || []
  const plan = state?.plan || 'free'

  // If no result — redirect to scan
  if (!result) {
    navigate('/scan')
    return null
  }

  const handleShare = async () => {
    const text = `I just counted ${result.total} ${itemType} using SnapCount AI with ${result.confidence}% accuracy! 🎯\n\nTry it free at snapcountai.com 🇳🇬`
    if (navigator.share) {
      await navigator.share({ title: 'SnapCount AI Result', text })
    } else {
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const confidenceColor = result.confidence >= 90
    ? 'text-green-500'
    : result.confidence >= 75
      ? 'text-yellow-500'
      : 'text-red-500'

  const confidenceBg = result.confidence >= 90
    ? 'bg-green-50 border-green-200'
    : result.confidence >= 75
      ? 'bg-yellow-50 border-yellow-200'
      : 'bg-red-50 border-red-200'

  // ERROR STATE
  if (!result.success) {
    return (
      <div className="min-h-screen pb-24" style={{ backgroundColor: '#F0F8FF' }}>
        <div className="bg-white px-5 pt-6 pb-4 shadow-sm sticky top-0 z-40">
          <div className="max-w-lg mx-auto">
            <h1 className="text-gray-900 font-black text-lg">Scan Result ❌</h1>
            <p className="text-gray-400 text-xs mt-0.5">Something went wrong</p>
          </div>
        </div>

        <div className="px-5 py-6 max-w-lg mx-auto">
          <div className="bg-white rounded-3xl shadow-sm border border-red-100 p-8 text-center">
            <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-5">
              <FaExclamationTriangle className="text-red-400 text-3xl" />
            </div>
            <h2 className="text-gray-900 font-black text-xl mb-3">
              AI Could Not Count This! 😕
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {result.error || 'The photo was unclear or items could not be identified. Please try again with a better photo.'}
            </p>

            {/* Tips */}
            <div className="bg-blue-50 rounded-2xl p-4 text-left mb-6">
              <p className="text-blue-600 font-bold text-sm mb-3">💡 Tips to fix this:</p>
              <div className="space-y-2">
                {[
                  'Take photo in better lighting',
                  'Hold phone steady — avoid blur',
                  'Move closer to the items',
                  'Take from directly above or in front',
                  'Make sure all items are visible',
                ].map((tip, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></div>
                    <p className="text-blue-600 text-xs">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => navigate('/dashboard')}
                className="flex-1 bg-gray-100 text-gray-600 font-bold py-3.5 rounded-xl hover:bg-gray-200 transition text-sm flex items-center justify-center gap-2">
                <FaHome /> Home
              </button>
              <button onClick={() => navigate('/scan')}
                className="flex-1 bg-blue-500 text-white font-bold py-3.5 rounded-xl hover:bg-blue-600 transition shadow-md text-sm flex items-center justify-center gap-2">
                <FaRedo /> Try Again
              </button>
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: '#F0F8FF' }}>

      {/* HEADER */}
      <div className="bg-white px-5 pt-6 pb-4 shadow-sm sticky top-0 z-40">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-gray-900 font-black text-lg">Scan Result ✅</h1>
            <p className="text-gray-400 text-xs mt-0.5">AI analysis complete</p>
          </div>
          <button onClick={handleShare}
            className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 hover:bg-blue-100 transition">
            <FaShareAlt className="text-sm" />
          </button>
        </div>
      </div>

      <div className="px-5 py-5 max-w-lg mx-auto space-y-4">

        {/* MAIN RESULT CARD */}
        <div className="bg-blue-500 rounded-3xl p-6 text-center relative overflow-hidden shadow-xl shadow-blue-200">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-white/10"
              style={{
                width: `${(i + 2) * 80}px`,
                height: `${(i + 2) * 80}px`,
                top: `${i * 20 - 20}%`,
                right: `${i * 10 - 10}%`,
              }} />
          ))}
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaCheckCircle className="text-white text-3xl" />
            </div>
            <p className="text-blue-100 text-sm font-medium mb-1">Total Count</p>
            <p className="text-white font-black text-6xl mb-2">{result.total}</p>
            <p className="text-blue-100 text-sm capitalize">{itemType} counted</p>

            {/* Confidence Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mt-4">
              <div className={`w-2 h-2 rounded-full ${result.confidence >= 90 ? 'bg-green-400' : result.confidence >= 75 ? 'bg-yellow-400' : 'bg-red-400'}`}></div>
              <p className="text-white text-xs font-bold">{result.confidence}% Confidence</p>
            </div>
          </div>
        </div>

        {/* CONFIDENCE METER */}
        <div className={`bg-white rounded-3xl p-5 shadow-sm border ${confidenceBg}`}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-700 font-bold text-sm">AI Confidence Level</p>
            <p className={`font-black text-sm ${confidenceColor}`}>{result.confidence}%</p>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-1000 ${result.confidence >= 90 ? 'bg-green-500' : result.confidence >= 75 ? 'bg-yellow-500' : 'bg-red-500'}`}
              style={{ width: `${result.confidence}%` }}>
            </div>
          </div>
          <p className={`text-xs mt-2 font-medium ${confidenceColor}`}>
            {result.confidence >= 90
              ? '✅ Very high confidence — result is very accurate!'
              : result.confidence >= 75
                ? '⚠️ Good confidence — result should be close'
                : '❌ Low confidence — consider retaking photo'}
          </p>
        </div>

        {/* PHOTO PREVIEWS */}
        {photos.length > 0 && (
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <p className="text-gray-700 font-bold text-sm mb-3">
              📸 Scanned Photos ({photos.length})
            </p>
            <div className="grid grid-cols-3 gap-2">
              {photos.map((photo, i) => (
                <div key={i} className="relative rounded-2xl overflow-hidden aspect-square">
                  <img src={photo} alt={`Photo ${i + 1}`}
                    className="w-full h-full object-cover" />
                  <div className="absolute bottom-1.5 left-1.5 bg-black/60 rounded-lg px-2 py-0.5">
                    <p className="text-white text-xs font-bold">#{i + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BREAKDOWN — if multiple photos */}
        {result.breakdown && result.breakdown.length > 1 && (
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <FaChartBar className="text-blue-500" />
              <p className="text-gray-700 font-bold text-sm">Photo Breakdown</p>
            </div>
            <div className="space-y-3">
              {result.breakdown.map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-blue-50 rounded-2xl px-4 py-3">
                  <div className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <p className="text-white font-black text-xs">#{item.photo}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-bold text-sm">{item.count} {itemType}</p>
                    {item.notes && <p className="text-gray-400 text-xs mt-0.5">{item.notes}</p>}
                  </div>
                  <span className="text-blue-500 font-black text-sm">{item.count}</span>
                </div>
              ))}
              <div className="flex items-center justify-between bg-blue-500 rounded-2xl px-4 py-3">
                <p className="text-white font-black text-sm">Total</p>
                <p className="text-white font-black text-lg">{result.total}</p>
              </div>
            </div>
          </div>
        )}

        {/* AI SUGGESTIONS */}
        {result.suggestions && (
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <FaLightbulb className="text-yellow-500" />
              <p className="text-gray-700 font-bold text-sm">AI Suggestions</p>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">{result.suggestions}</p>
          </div>
        )}

        {/* ACTIONS */}
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => navigate('/scan')}
            className="bg-white border border-gray-100 text-gray-700 font-bold py-4 rounded-2xl hover:bg-blue-50 hover:border-blue-200 hover:text-blue-500 hover:-translate-y-0.5 transition-all duration-200 shadow-sm flex items-center justify-center gap-2 text-sm">
            <FaCamera /> Scan Again
          </button>
          <button onClick={() => navigate('/dashboard')}
            className="bg-blue-500 text-white font-bold py-4 rounded-2xl hover:bg-blue-600 hover:-translate-y-0.5 transition-all duration-200 shadow-md shadow-blue-200 flex items-center justify-center gap-2 text-sm">
            <FaHome /> Dashboard
          </button>
        </div>

        {/* PDF EXPORT */}
        {plan === 'free' ? (
          <button onClick={() => navigate('/profile')}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-4 rounded-2xl hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-blue-200 flex items-center justify-center gap-2 text-sm">
            <FaCrown /> Upgrade to Export PDF — ₦3,000/mo
          </button>
        ) : (
          <button
            className="w-full bg-white border border-gray-100 text-gray-700 font-bold py-4 rounded-2xl hover:bg-blue-50 hover:border-blue-200 hover:text-blue-500 hover:-translate-y-0.5 transition-all duration-200 shadow-sm flex items-center justify-center gap-2 text-sm">
            <FaFilePdf className="text-red-500" /> Export as PDF
          </button>
        )}

        {/* COPIED TOAST */}
        {copied && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg">
            ✅ Result copied to clipboard!
          </div>
        )}

      </div>
      <BottomNav />
    </div>
  )
}