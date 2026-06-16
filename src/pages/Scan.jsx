import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../supabase'
import BottomNav from '../components/BottomNav'
import ScanInstructions from '../components/ScanInstructions'
import ScanWarningPopup from '../components/ScanWarningPopup'
import {
  FaCamera, FaUpload, FaTimes, FaRocket,
  FaExclamationTriangle, FaCrown
} from 'react-icons/fa'

export default function Scan() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const [itemType, setItemType] = useState('other')
  const [photos, setPhotos] = useState([])
  const [checklist, setChecklist] = useState({
    clear: false,
    lit: false,
    visible: false,
    understood: false,
  })
  const [showWarning, setShowWarning] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
const fetchProfile = async () => {
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Reset scans if last scan was not today
  if (data) {
    const today = new Date().toISOString().split('T')[0]
    if (data.last_scan_date !== today && data.scans_today > 0) {
      await supabase
        .from('profiles')
        .update({ scans_today: 0 })
        .eq('id', user.id)
      data.scans_today = 0
    }
  }

  setProfile(data)
}
    fetchProfile()
  }, [])

  const plan = profile?.plan || 'free'
  const scansToday = profile?.scans_today || 0
  const maxScans = plan === 'free' ? 5 : 999
  const scansLeft = Math.max(0, maxScans - scansToday)
  const maxPhotos = plan === 'free' ? 1 : plan === 'pro' ? 3 : 5
  const allChecked = Object.values(checklist).every(Boolean)
  const canScan = photos.length > 0 && allChecked && scansLeft > 0

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files)
    const remaining = maxPhotos - photos.length
    const toAdd = files.slice(0, remaining)
    const newPhotos = toAdd.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }))
    setPhotos(prev => [...prev, ...newPhotos])
  }

  const removePhoto = (index) => {
    setPhotos(prev => prev.filter((_, i) => i !== index))
  }

  const toggleChecklist = (key) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleScanNow = () => {
    if (!canScan) return
    setShowWarning(true)
  }

  const handleConfirmScan = async () => {
    setShowWarning(false)
    setScanning(true)

    try {
// Send to our backend
const backendForm = new FormData()
backendForm.append('itemType', itemType)
photos.forEach(photo => {
  backendForm.append('photos', photo.file)
})

const response = await fetch('http://localhost:3001/scan', {
  method: 'POST',
  body: backendForm
})

const result = await response.json()

if (!response.ok) {
  throw new Error(result.error || 'Backend error!')
}
      // Update scan count
      await supabase
        .from('profiles')
        .update({
          scans_today: scansToday + 1,
          last_scan_date: new Date().toISOString().split('T')[0]
        })
        .eq('id', user.id)

      // Save to history
      await supabase.from('scans').insert({
        user_id: user.id,
        result: `${result.total} ${itemType} counted`,
        count: result.total,
        item_type: itemType,
        confidence: result.confidence,
        suggestions: result.suggestions,
        breakdown: JSON.stringify(result.breakdown),
      })

      // Go to results
      navigate('/results', {
        state: {
          result,
          itemType,
          photos: photos.map(p => p.preview),
          plan
        }
      })

    } catch (err) {
      console.error(err)
      alert('Something went wrong! Please check your internet and try again.')
    } finally {
      setScanning(false)
    }
  }

  if (scanning) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5" style={{ backgroundColor: '#F0F8FF' }}>
        <div className="text-center">
          <div className="w-24 h-24 bg-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-200 animate-pulse">
            <FaCamera className="text-white text-4xl" />
          </div>
          <h2 className="text-gray-900 font-black text-2xl mb-2">AI Analyzing...</h2>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            Our AI is carefully counting everything<br />in your photo. Please wait...
          </p>
          <div className="flex justify-center gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}></div>
            ))}
          </div>
          <p className="text-gray-300 text-xs mt-6">This usually takes 3-5 seconds</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: '#F0F8FF' }}>

      {showWarning && (
        <ScanWarningPopup
          scansLeft={scansLeft}
          plan={plan}
          onConfirm={handleConfirmScan}
          onCancel={() => setShowWarning(false)}
        />
      )}

      <div className="bg-white px-5 pt-6 pb-4 shadow-sm sticky top-0 z-40">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-gray-900 font-black text-lg">New Scan 📸</h1>
            <p className="text-gray-400 text-xs mt-0.5">Follow the steps below carefully</p>
          </div>
          {plan === 'free' && (
            <div className={`px-3 py-1.5 rounded-xl text-xs font-black ${scansLeft === 0
              ? 'bg-red-100 text-red-500'
              : scansLeft <= 2
                ? 'bg-yellow-100 text-yellow-600'
                : 'bg-blue-100 text-blue-500'}`}>
              {scansLeft === 0 ? '❌ No scans left' : `🔢 ${scansLeft} left today`}
            </div>
          )}
          {plan !== 'free' && (
            <div className="bg-blue-100 text-blue-500 px-3 py-1.5 rounded-xl text-xs font-black">
              ♾️ Unlimited
            </div>
          )}
        </div>
      </div>

      <div className="px-5 py-5 max-w-lg mx-auto space-y-5">

        {scansLeft === 0 && plan === 'free' && (
          <div className="bg-red-50 border border-red-200 rounded-3xl p-6 text-center">
            <div className="text-4xl mb-3">😢</div>
            <h3 className="text-red-600 font-black text-lg mb-2">No Scans Left Today!</h3>
            <p className="text-red-400 text-sm mb-5 leading-relaxed">
              You have used all 5 free scans for today. Come back tomorrow or upgrade to Pro!
            </p>
            <div className="flex gap-3">
              <button onClick={() => navigate('/dashboard')}
                className="flex-1 bg-gray-100 text-gray-600 font-bold py-3 rounded-xl text-sm hover:bg-gray-200 transition">
                Go Back
              </button>
              <button onClick={() => navigate('/profile')}
                className="flex-1 bg-red-500 text-white font-bold py-3 rounded-xl text-sm hover:bg-red-600 transition shadow-md flex items-center justify-center gap-2">
                <FaCrown /> Upgrade Now
              </button>
            </div>
          </div>
        )}

        {scansLeft > 0 && (
          <>
            <ScanInstructions itemType={itemType} setItemType={setItemType} />

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-gray-900 font-black text-sm">Upload Photos</h2>
                    <p className="text-gray-400 text-xs mt-0.5">
                      {plan === 'free' ? '1 photo max (Free plan)' : `Up to ${maxPhotos} photos (${plan} plan)`}
                    </p>
                  </div>
                  <span className="bg-blue-100 text-blue-500 text-xs font-black px-2.5 py-1 rounded-lg">
                    {photos.length}/{maxPhotos}
                  </span>
                </div>
              </div>

              <div className="p-5">
                {photos.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {photos.map((photo, i) => (
                      <div key={i} className="relative rounded-2xl overflow-hidden aspect-square">
                        <img src={photo.preview} alt={`Photo ${i + 1}`}
                          className="w-full h-full object-cover" />
                        <button onClick={() => removePhoto(i)}
                          className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                          <FaTimes className="text-white text-xs" />
                        </button>
                        <div className="absolute bottom-1.5 left-1.5 bg-black/50 rounded-lg px-2 py-0.5">
                          <p className="text-white text-xs font-bold">#{i + 1}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {photos.length < maxPhotos && (
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => {
                      fileInputRef.current.setAttribute('capture', 'environment')
                      fileInputRef.current.click()
                    }}
                      className="flex flex-col items-center gap-2 bg-blue-50 border-2 border-dashed border-blue-200 rounded-2xl py-6 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200">
                      <FaCamera className="text-blue-500 text-2xl" />
                      <p className="text-blue-500 text-xs font-bold">Take Photo</p>
                    </button>
                    <button onClick={() => {
                      fileInputRef.current.removeAttribute('capture')
                      fileInputRef.current.click()
                    }}
                      className="flex flex-col items-center gap-2 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl py-6 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200">
                      <FaUpload className="text-gray-400 text-2xl" />
                      <p className="text-gray-400 text-xs font-bold">Upload Photo</p>
                    </button>
                  </div>
                )}

                <input ref={fileInputRef} type="file" accept="image/*"
                  multiple={maxPhotos > 1} className="hidden"
                  onChange={handlePhotoUpload} />

                {plan === 'free' && (
                  <button onClick={() => navigate('/profile')}
                    className="w-full mt-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-200">
                    <FaCrown /> Upgrade to Pro for 3 photos per scan
                  </button>
                )}
              </div>
            </div>

            {photos.length > 0 && (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
                <h2 className="text-gray-900 font-black text-sm mb-4">
                  ✅ Confirm Before Scanning
                </h2>
                <div className="space-y-3">
                  {[
                    { key: 'clear', label: 'My photo is clear and not blurry' },
                    { key: 'lit', label: 'Items are well lit and visible' },
                    { key: 'visible', label: 'I can see all items in the photo' },
                    { key: 'understood', label: 'I understand this uses 1 scan and cannot be undone' },
                  ].map((item) => (
                    <button key={item.key} onClick={() => toggleChecklist(item.key)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${checklist[item.key]
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-gray-50 border border-gray-100 hover:bg-blue-50'}`}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all duration-200 ${checklist[item.key]
                        ? 'bg-green-500 border-green-500'
                        : 'border-gray-300'}`}>
                        {checklist[item.key] && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <p className={`text-xs font-medium ${checklist[item.key] ? 'text-green-700' : 'text-gray-500'}`}>
                        {item.label}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {photos.length > 0 && (
              <button onClick={handleScanNow} disabled={!canScan}
                className={`w-full font-black py-4 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 text-base shadow-lg ${canScan
                  ? 'bg-blue-500 text-white hover:bg-blue-600 hover:-translate-y-1 hover:shadow-blue-200 hover:shadow-xl'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                <FaRocket />
                {!allChecked ? 'Complete checklist first' : 'Scan Now!'}
              </button>
            )}

            {scansLeft <= 2 && scansLeft > 0 && plan === 'free' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 flex items-start gap-3">
                <FaExclamationTriangle className="text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-yellow-700 font-bold text-sm">
                    Only {scansLeft} scan{scansLeft !== 1 ? 's' : ''} remaining today!
                  </p>
                  <p className="text-yellow-600 text-xs mt-0.5 leading-relaxed">
                    Upgrade to Pro for unlimited scans — ₦3,000/month
                  </p>
                  <button onClick={() => navigate('/profile')}
                    className="mt-2 bg-yellow-500 text-white text-xs font-bold px-4 py-1.5 rounded-lg hover:bg-yellow-600 transition flex items-center gap-1">
                    <FaCrown /> Upgrade Now
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <BottomNav />
    </div>
  )
}
