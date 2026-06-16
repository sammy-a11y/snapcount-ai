export default function ScanInstructions({ itemType, setItemType }) {
  const itemTypes = [
    { value: 'blocks', label: '🧱 Blocks/Bricks', tips: ['Photograph each row separately', 'Stand directly in front', 'Avoid shadows across blocks', 'Good lighting is important'] },
    { value: 'rods', label: '🪵 Rods/Iron bars', tips: ['Lay flat if possible', 'Photograph from above', 'Separate bundles if stacked', 'Make sure ends are visible'] },
    { value: 'boxes', label: '📦 Boxes/Products', tips: ['Clear shelf or floor view', 'Stand directly in front', 'Make sure all boxes visible', 'Avoid reflections'] },
    { value: 'animals', label: '🐔 Animals/Livestock', tips: ['Open space photo works best', 'Take from elevated position', 'Make sure animals are still', 'Good natural light'] },
    { value: 'people', label: '👥 People/Students', tips: ['Group photo from slight above', 'Make sure all faces visible', 'Good lighting important', 'Ask people to stand still'] },
    { value: 'crops', label: '🌾 Crops/Fruits', tips: ['Clear daylight photo', 'Photograph rows separately', 'Stand directly above', 'Avoid shadows'] },
    { value: 'bottles', label: '🍾 Bottles/Products', tips: ['Clear shelf view', 'Stand directly in front', 'Make sure all items visible', 'Avoid reflections on glass'] },
    { value: 'other', label: '📋 Other Items', tips: ['Take in good lighting', 'Stand directly in front', 'Make sure all items visible', 'Hold phone steady'] },
  ]

  const selected = itemTypes.find(i => i.value === itemType) || itemTypes[7]

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-blue-500 p-5">
        <h2 className="text-white font-black text-base mb-0.5">📖 Before You Scan</h2>
        <p className="text-blue-100 text-xs">Follow these steps for best results</p>
      </div>

      {/* Item Type Selector */}
      <div className="p-5 border-b border-gray-50">
        <p className="text-gray-700 font-bold text-sm mb-3">What are you counting?</p>
        <div className="grid grid-cols-2 gap-2">
          {itemTypes.map((item, i) => (
            <button key={i} onClick={() => setItemType(item.value)}
              className={`text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${itemType === item.value
                ? 'bg-blue-500 text-white shadow-md shadow-blue-200'
                : 'bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-500'}`}>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="p-5">
        <p className="text-gray-700 font-bold text-sm mb-3">
          Tips for {selected.label}
        </p>
        <div className="space-y-2">
          {selected.tips.map((tip, i) => (
            <div key={i} className="flex items-center gap-3 bg-blue-50 rounded-xl px-4 py-2.5">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-black">{i + 1}</span>
              </div>
              <p className="text-gray-600 text-xs font-medium">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* General Warning */}
      <div className="px-5 pb-5">
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
          <p className="text-yellow-700 text-xs font-bold mb-1">⚠️ Important!</p>
          <p className="text-yellow-600 text-xs leading-relaxed">
            Once you scan a photo it counts as one of your daily scans and cannot be undone. Make sure your photo is clear before scanning!
          </p>
        </div>
      </div>
    </div>
  )
}