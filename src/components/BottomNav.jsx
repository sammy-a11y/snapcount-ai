import { useNavigate, useLocation } from 'react-router-dom'
import { FaHome, FaCamera, FaHistory, FaUser } from 'react-icons/fa'

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { icon: <FaHome />, label: 'Home', path: '/dashboard' },
    { icon: <FaCamera />, label: 'Scan', path: '/scan' },
    { icon: <FaHistory />, label: 'History', path: '/history' },
    { icon: <FaUser />, label: 'Profile', path: '/profile' },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 px-4 py-2 flex justify-around items-center shadow-2xl shadow-gray-200">
      {navItems.map((item, i) => {
        const active = location.pathname === item.path
        return (
          <button key={i} onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-200 ${active
              ? 'text-blue-500'
              : 'text-gray-400 hover:text-blue-400'}`}>
            <span className={`text-xl transition-all duration-200 ${active ? 'scale-110' : ''}`}>
              {item.icon}
            </span>
            <span className={`text-xs font-bold ${active ? 'text-blue-500' : 'text-gray-400'}`}>
              {item.label}
            </span>
            {active && (
              <div className="absolute -top-0.5 w-8 h-1 bg-blue-500 rounded-full"></div>
            )}
          </button>
        )
      })}
    </div>
  )
}