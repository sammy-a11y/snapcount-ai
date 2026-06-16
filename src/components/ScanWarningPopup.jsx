export default function ScanWarningPopup({ scansLeft, plan, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel}></div>

      {/* Popup */}
      <div className="relative bg-white rounded-3xl shadow-2xl p-6 w-full max-w-sm">
        {/* Icon */}
        <div className="w-16 h-16 bg-yellow-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl">⚠️</span>
        </div>

        <h2 className="text-gray-900 font-black text-xl text-center mb-2">
          Ready to Scan?
        </h2>
        <p className="text-gray-400 text-sm text-center mb-5 leading-relaxed">
          Please read carefully before continuing
        </p>

        {/* Warning Points */}
        <div className="space-y-3 mb-6">
          {[
            { icon: '📸', text: 'This will use 1 of your daily scans' },
            { icon: '🔒', text: 'This scan cannot be undone or recovered' },
            { icon: '✅', text: 'Make sure your photo is clear and well lit' },
            { icon: '🔢', text: plan === 'free' ? `You have ${scansLeft} scan${scansLeft !== 1 ? 's' : ''} remaining today` : 'You have unlimited scans' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              <p className="text-gray-600 text-xs font-medium">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button onClick={onCancel}
            className="flex-1 bg-gray-100 text-gray-600 font-bold py-3.5 rounded-xl hover:bg-gray-200 transition text-sm">
            Cancel
          </button>
          <button onClick={onConfirm}
            className="flex-1 bg-blue-500 text-white font-bold py-3.5 rounded-xl hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-200 transition-all duration-200 shadow-md text-sm">
            Scan Now! 🚀
          </button>
        </div>
      </div>
    </div>
  )
}