import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import logo from '../assets/logo.png'
import {
  FaWhatsapp, FaInstagram, FaTwitter, FaFacebook,
  FaCheckCircle, FaStar, FaBars, FaTimes,
  FaCamera, FaBrain, FaChartBar, FaFilePdf,
  FaHistory, FaUsers, FaMoon, FaAndroid,
  FaLock, FaBolt, FaHeadset, FaRocket
} from 'react-icons/fa'

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: 'ease-in-out' })
  }, [])

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'How it Works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ]

  const stats = [
    { value: '10k+', label: 'Active Users' },
    { value: '99%', label: 'Accuracy Rate' },
    { value: '5sec', label: 'Average Speed' },
    { value: '24/7', label: 'Support' },
  ]

  const steps = [
    { step: '01', icon: <FaCamera className="text-4xl text-blue-500" />, title: 'Snap or Upload', desc: 'Take a photo directly or upload from your gallery. Any photo works — shops, farms, classrooms, warehouses.' },
    { step: '02', icon: <FaBrain className="text-4xl text-blue-500" />, title: 'AI Analyzes', desc: 'Our powerful Claude AI vision scans every inch of your photo and identifies, counts and categorizes everything instantly.' },
    { step: '03', icon: <FaChartBar className="text-4xl text-blue-500" />, title: 'Get Full Report', desc: 'Receive instant count, detailed breakdown, smart recommendations and export as PDF if needed.' },
  ]

  const useCases = [
    { icon: '🏪', title: 'Shop Owners', desc: 'Count shelf stock and inventory instantly', img: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&q=80' },
    { icon: '👨‍🌾', title: 'Farmers', desc: 'Count crops, fruits and livestock easily', img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&q=80' },
    { icon: '🏫', title: 'Schools', desc: 'Count students and track attendance', img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=80' },
    { icon: '📦', title: 'Warehouses', desc: 'Count boxes and manage storage fast', img: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=400&q=80' },
    { icon: '🐄', title: 'Livestock', desc: 'Count animals across large fields', img: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&q=80' },
    { icon: '🚗', title: 'Parking Lots', desc: 'Count available and occupied spaces', img: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=400&q=80' },
  ]

  const features = [
    { icon: <FaBolt className="text-blue-500 text-xl" />, title: '99% Accurate Counting', desc: 'Advanced Claude AI vision that counts with incredible precision even in complex photos' },
    { icon: <FaRocket className="text-blue-500 text-xl" />, title: 'Results In Seconds', desc: 'Get your full count and breakdown in under 5 seconds — no waiting around' },
    { icon: <FaFilePdf className="text-blue-500 text-xl" />, title: 'PDF Export', desc: 'Export professional PDF reports of your scan results to share or save anytime' },
    { icon: <FaHistory className="text-blue-500 text-xl" />, title: 'Full Scan History', desc: 'Access all your previous scans anytime from your personal dashboard' },
    { icon: <FaUsers className="text-blue-500 text-xl" />, title: 'Team Access', desc: 'Add up to 5 team members under one Business account for collaboration' },
    { icon: <FaMoon className="text-blue-500 text-xl" />, title: 'Dark & Light Mode', desc: 'Switch between dark and light mode for comfortable use anytime anywhere' },
    { icon: <FaAndroid className="text-blue-500 text-xl" />, title: 'Works On Android', desc: 'Download directly on your Android phone from Play Store like a native app' },
    { icon: <FaLock className="text-blue-500 text-xl" />, title: 'Secure & Private', desc: 'Your photos and data are fully encrypted and never shared with anyone' },
  ]

  const plans = [
    {
      name: 'Free', price: '₦0', period: '/month',
      features: ['5 scans per day', 'Basic AI counting', 'Simple results only', 'Mobile app access'],
      cta: 'Get Started Free', highlight: false
    },
    {
      name: 'Pro', price: '₦3,000', period: '/month',
      features: ['Unlimited scans', 'Full detailed AI analysis', 'PDF export', '30 days scan history', 'Priority AI processing', 'No watermark'],
      cta: 'Go Pro Now', highlight: true
    },
    {
      name: 'Business', price: '₦7,500', period: '/month',
      features: ['Everything in Pro', 'Up to 5 team members', 'Forever scan history', 'Batch photo upload', 'WhatsApp support', 'Monthly summary reports'],
      cta: 'Go Business', highlight: false
    },
  ]

  const testimonials = [
    {
      name: 'Chukwuemeka O.', role: 'Shop Owner, Lagos',
      review: 'I used to spend 2 hours counting my store inventory. Now SnapCount AI does it in 10 seconds. This app is a game changer!',
      img: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=100&q=80',
      stars: 5
    },
    {
      name: 'Aisha Muhammad', role: 'Poultry Farmer, Kano',
      review: 'Counting my chickens used to be a nightmare. Now I just snap a photo and I get the exact count instantly. Amazing tool!',
      img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&q=80',
      stars: 5
    },
    {
      name: 'Biodun Taiwo', role: 'School Principal, Ibadan',
      review: 'We use SnapCount AI every morning for attendance. So simple even our teachers who are not tech savvy use it easily.',
      img: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=100&q=80',
      stars: 5
    },
  ]

  const footerLinks = {
    Product: ['Features', 'Pricing', 'How it Works', 'Download App', 'Changelog'],
    Company: ['About Us', 'Contact Us', 'Privacy Policy', 'Terms of Service', 'Blog'],
    Support: ['Help Center', 'WhatsApp Support', 'FAQs', 'Report a Bug', 'Community'],
  }

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: '#F0F8FF' }}>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm px-6 py-3 flex justify-between items-center">
        <img src={logo} alt="SnapCount AI" className="h-10 w-auto" />

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-7 text-sm font-semibold text-gray-700">
          {navLinks.map((link, i) => (
            <a key={i} href={link.href} className="relative group hover:text-blue-500 transition-colors duration-200">
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="/login" className="text-sm font-semibold text-gray-700 hover:text-blue-500 transition relative group">
            Login
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
          </a>
          <a href="/signup" className="bg-blue-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5 transition-all duration-200 shadow-md">
            Get Started Free
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-700 text-xl">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-white shadow-lg px-6 py-6 flex flex-col gap-4 md:hidden">
          {navLinks.map((link, i) => (
            <a key={i} href={link.href} onClick={() => setMenuOpen(false)}
              className="text-gray-700 font-semibold text-sm hover:text-blue-500 transition border-b border-gray-100 pb-3">
              {link.label}
            </a>
          ))}
          <a href="/signup" className="bg-blue-500 text-white font-bold py-3 rounded-xl text-center hover:bg-blue-600 transition mt-2">
            Get Started Free
          </a>
        </div>
      )}

      {/* HERO */}
      <section id="home" className="pt-36 pb-24 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">

          {/* LEFT */}
          <div className="flex-1 text-center md:text-left">
            <div data-aos="fade-up" className="inline-flex items-center gap-2 bg-blue-50 text-blue-500 text-xs font-bold px-4 py-2 rounded-full mb-6 border border-blue-100">
              <FaRocket /> Nigeria Number 1 AI Counting App
            </div>
            <h1 data-aos="fade-up" data-aos-delay="100" className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
              Snap a Photo.<br />
              <span className="text-blue-500">AI Counts</span> Everything<br />Instantly.
            </h1>
            <p data-aos="fade-up" data-aos-delay="200" className="text-gray-500 text-lg mb-10 leading-relaxed max-w-lg">
              Count inventory, livestock, crops, students and more — just take a photo and let SnapCount AI handle the rest in seconds.
            </p>
            <div data-aos="fade-up" data-aos-delay="300" className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-12">
              <a href="/signup" className="bg-blue-500 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-200 hover:-translate-y-1 transition-all duration-200 shadow-lg shadow-blue-200 flex items-center justify-center gap-2">
                <FaRocket /> Start For Free
              </a>
              <a href="#how-it-works" className="bg-white text-gray-800 font-bold px-8 py-4 rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:text-blue-500 hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-2">
                See How It Works
              </a>
            </div>

            {/* STATS */}
            <div data-aos="fade-up" data-aos-delay="400" className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <p className="text-2xl font-black text-blue-500">{stat.value}</p>
                  <p className="text-xs text-gray-400 font-medium mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — PHONE MOCKUP */}
          <div data-aos="fade-left" data-aos-delay="300" className="flex-1 flex justify-center">
            <div className="relative">
              {/* Phone Frame */}
              <div className="w-64 h-[520px] bg-gray-900 rounded-[3rem] shadow-2xl border-4 border-gray-800 overflow-hidden relative">
                {/* Phone Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl z-10"></div>
                {/* Phone Screen */}
                <div className="w-full h-full bg-white overflow-hidden">
                  {/* App Header */}
                  <div className="bg-blue-500 px-4 pt-8 pb-4">
                    <p className="text-white text-xs font-medium opacity-70">Good morning 👋</p>
                    <p className="text-white font-black text-base">SnapCount AI</p>
                  </div>
                  {/* App Content */}
                  <div className="p-4">
                    {/* Upload Box */}
                    <div className="bg-blue-50 border-2 border-dashed border-blue-300 rounded-2xl p-4 text-center mb-3">
                      <div className="text-3xl mb-1">📸</div>
                      <p className="text-blue-500 text-xs font-bold">Tap to snap or upload</p>
                    </div>
                    {/* Result Card */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm mb-3">
                      <div className="flex items-center gap-1 mb-2">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                        <p className="text-xs text-gray-400">Analysis Complete</p>
                      </div>
                      <p className="text-gray-900 font-black text-sm">✅ 47 items found</p>
                      <p className="text-gray-400 text-xs mt-1">23 bottles · 15 boxes · 9 bags</p>
                      <p className="text-blue-500 text-xs font-bold mt-1">🎯 97% confidence</p>
                    </div>
                    {/* Recent Scans */}
                    <p className="text-gray-700 font-bold text-xs mb-2">Recent Scans</p>
                    {[
                      { label: 'Shop Inventory', count: '124 items', time: '2 mins ago' },
                      { label: 'Farm Crops', count: '89 plants', time: '1 hr ago' },
                    ].map((scan, i) => (
                      <div key={i} className="flex justify-between items-center bg-gray-50 rounded-xl px-3 py-2 mb-2">
                        <div>
                          <p className="text-gray-800 text-xs font-semibold">{scan.label}</p>
                          <p className="text-gray-400 text-xs">{scan.time}</p>
                        </div>
                        <span className="text-blue-500 text-xs font-black">{scan.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -right-8 top-16 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2 border border-gray-100">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="text-gray-900 font-black text-xs">47 Counted!</p>
                  <p className="text-gray-400 text-xs">97% accurate</p>
                </div>
              </div>
              <div className="absolute -left-10 bottom-24 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2 border border-gray-100">
                <span className="text-2xl">⚡</span>
                <div>
                  <p className="text-gray-900 font-black text-xs">Done in 3s</p>
                  <p className="text-gray-400 text-xs">Super fast AI</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TRUSTED BY */}
        <div data-aos="fade-up" className="max-w-4xl mx-auto mt-16 text-center">
          <p className="text-gray-400 text-sm mb-5 font-medium">Trusted by businesses across Nigeria 🇳🇬</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Lagos Traders', 'Kano Farms', 'Abuja Schools', 'PH Warehouses', 'Ibadan Markets'].map((brand, i) => (
              <span key={i} className="bg-white px-5 py-2.5 rounded-xl shadow-sm border border-gray-100 text-gray-500 text-sm font-semibold hover:border-blue-200 hover:text-blue-500 transition-all duration-200">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <p data-aos="fade-up" className="text-blue-500 font-bold text-sm mb-2 uppercase tracking-widest">Simple Process</p>
          <h2 data-aos="fade-up" className="text-3xl md:text-4xl font-black text-gray-900 mb-4">How SnapCount AI Works</h2>
          <p data-aos="fade-up" className="text-gray-400 max-w-xl mx-auto mb-16">Three simple steps and you are done — no training needed, no complicated setup</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item, i) => (
              <div key={i} data-aos="fade-up" data-aos-delay={i * 150}
                className="relative bg-blue-50 rounded-3xl p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-black px-4 py-1.5 rounded-full group-hover:bg-blue-600 transition">{item.step}</div>
                <div className="flex justify-center mb-5 mt-4">{item.icon}</div>
                <h3 className="text-gray-900 font-black text-lg mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES WITH IMAGES */}
      <section id="use-cases" className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p data-aos="fade-up" className="text-blue-500 font-bold text-sm mb-2 uppercase tracking-widest">Who Uses It</p>
          <h2 data-aos="fade-up" className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Works Everywhere</h2>
          <p data-aos="fade-up" className="text-gray-400 max-w-xl mx-auto mb-16">SnapCount AI is built for every Nigerian business, farm and institution</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {useCases.map((item, i) => (
              <div key={i} data-aos="fade-up" data-aos-delay={i * 100}
                className="group relative overflow-hidden rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer bg-white">
                <div className="overflow-hidden h-44">
                  <img src={item.img} alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-5 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{item.icon}</span>
                    <h3 className="text-gray-900 font-bold text-sm">{item.title}</h3>
                  </div>
                  <p className="text-gray-400 text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p data-aos="fade-up" className="text-blue-500 font-bold text-sm mb-2 uppercase tracking-widest">Powerful Features</p>
            <h2 data-aos="fade-up" className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Everything You Need</h2>
            <p data-aos="fade-up" className="text-gray-400 max-w-xl mx-auto">Built with the tools professionals need to count smarter and faster</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((item, i) => (
              <div key={i} data-aos="fade-up" data-aos-delay={i * 80}
                className="flex gap-4 items-start text-left bg-blue-50 rounded-2xl p-6 hover:shadow-lg hover:bg-blue-100/60 hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:bg-blue-500 transition-all duration-300 flex-shrink-0">
                  <span className="group-hover:text-white transition-colors duration-300">{item.icon}</span>
                </div>
                <div>
                  <h3 className="text-gray-900 font-bold mb-1 group-hover:text-blue-500 transition-colors duration-300">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUPPORT BANNER */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: <FaHeadset className="text-3xl text-white" />, title: '24/7 Support', desc: 'We are always available — day or night, weekdays or weekends. Never get stuck alone.' },
              { icon: <FaWhatsapp className="text-3xl text-white" />, title: 'WhatsApp Support', desc: 'Chat directly with our team on WhatsApp for instant help anytime.' },
              { icon: <FaBolt className="text-3xl text-white" />, title: 'Fast Response', desc: 'We respond to all messages within 5 minutes on average. No long waiting.' },
            ].map((item, i) => (
              <div key={i} data-aos="fade-up" data-aos-delay={i * 100}
                className="bg-blue-500 rounded-2xl p-7 text-center text-white hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-200 hover:-translate-y-1 transition-all duration-300">
                <div className="flex justify-center mb-3">{item.icon}</div>
                <h3 className="font-black text-lg mb-2">{item.title}</h3>
                <p className="text-blue-100 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <p data-aos="fade-up" className="text-blue-500 font-bold text-sm mb-2 uppercase tracking-widest">Testimonials</p>
          <h2 data-aos="fade-up" className="text-3xl md:text-4xl font-black text-gray-900 mb-4">What People Are Saying</h2>
          <p data-aos="fade-up" className="text-gray-400 max-w-xl mx-auto mb-16">Real users across Nigeria loving SnapCount AI every day</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} data-aos="fade-up" data-aos-delay={i * 150}
                className="bg-blue-50 rounded-2xl p-6 text-left hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-blue-100">
                <div className="flex mb-4">
                  {[...Array(t.stars)].map((_, j) => (
                    <FaStar key={j} className="text-yellow-400 text-sm" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">"{t.review}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.img} alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-blue-200" />
                  <div>
                    <p className="text-gray-900 font-bold text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p data-aos="fade-up" className="text-blue-500 font-bold text-sm mb-2 uppercase tracking-widest">Simple Pricing</p>
          <h2 data-aos="fade-up" className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Choose Your Plan</h2>
          <p data-aos="fade-up" className="text-gray-400 max-w-xl mx-auto mb-16">No hidden charges — start free and upgrade when you are ready</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {plans.map((plan, i) => (
              <div key={i} data-aos="fade-up" data-aos-delay={i * 150}
                className={`rounded-3xl p-8 text-left transition-all duration-300 ${plan.highlight
                  ? 'bg-blue-500 shadow-2xl shadow-blue-200 scale-105 hover:shadow-blue-300'
                  : 'bg-white border border-gray-100 hover:shadow-xl hover:-translate-y-2'}`}>
                {plan.highlight && (
                  <p className="text-xs font-black bg-white text-blue-500 px-3 py-1 rounded-full inline-block mb-4">⭐ MOST POPULAR</p>
                )}
                <h3 className={`font-black text-2xl mb-1 ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                <div className="flex items-end gap-1 mb-6">
                  <span className={`text-4xl font-black ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.price}</span>
                  <span className={`text-sm mb-1 ${plan.highlight ? 'text-blue-100' : 'text-gray-400'}`}>{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className={`flex items-center gap-2 text-sm ${plan.highlight ? 'text-white' : 'text-gray-600'}`}>
                      <FaCheckCircle className={plan.highlight ? 'text-white' : 'text-blue-500'} /> {f}
                    </li>
                  ))}
                </ul>
                <a href="/signup"
                  className={`block text-center font-bold py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 ${plan.highlight
                    ? 'bg-white text-blue-500 hover:bg-blue-50 shadow-lg'
                    : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md shadow-blue-100'}`}>
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-white">
        <div data-aos="fade-up" className="max-w-4xl mx-auto overflow-hidden rounded-3xl relative">
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80"
            alt="CTA Background"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="relative bg-blue-500 rounded-3xl p-12 text-center shadow-2xl shadow-blue-200">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Ready To Count Smarter?</h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed max-w-xl mx-auto">
              Join thousands of Nigerians saving time with AI powered counting. Start free today — no credit card needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/signup" className="bg-white text-blue-500 font-black px-10 py-4 rounded-xl hover:bg-blue-50 hover:-translate-y-1 transition-all duration-200 shadow-lg flex items-center justify-center gap-2">
                <FaRocket /> Start Free Today
              </a>
              <a href="#how-it-works" className="border-2 border-white text-white font-bold px-10 py-4 rounded-xl hover:bg-white/10 hover:-translate-y-1 transition-all duration-200">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-start">
          <div className="flex-1" data-aos="fade-right">
            <p className="text-blue-500 font-bold text-sm mb-2 uppercase tracking-widest">Get In Touch</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">Have a question or need help? We are here 24/7. Reach out through any channel below and we will respond fast.</p>
            <div className="space-y-4">
              {[
                { icon: <FaWhatsapp className="text-green-500 text-xl" />, label: 'WhatsApp Us', value: '+234 9066258424' },
                { icon: <FaInstagram className="text-pink-500 text-xl" />, label: 'Instagram', value: '@snapcountai' },
                { icon: <FaTwitter className="text-blue-400 text-xl" />, label: 'Twitter / X', value: '@snapcountai' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 hover:-translate-y-0.5 transition-all duration-200">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">{item.icon}</div>
                  <div>
                    <p className="text-xs text-gray-400">{item.label}</p>
                    <p className="text-gray-900 font-bold text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1" data-aos="fade-left">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-gray-900 font-black text-xl mb-6">Send Us a Message 📩</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Your Full Name"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition" />
                <input type="email" placeholder="Your Email Address"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition" />
                <textarea rows={4} placeholder="Your Message..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition resize-none" />
                <button className="w-full bg-blue-500 text-white font-bold py-4 rounded-xl hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200 transition-all duration-200 shadow-md">
                  Send Message 📩
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pt-16 pb-8 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div>
              <img src={logo} alt="SnapCount AI" className="h-10 w-auto mb-4 brightness-200" />
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Nigeria most powerful AI photo counting app. Built for everyone — from farmers to business owners.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: <FaWhatsapp />, href: '#', color: 'hover:bg-green-500' },
                  { icon: <FaInstagram />, href: '#', color: 'hover:bg-pink-500' },
                  { icon: <FaTwitter />, href: '#', color: 'hover:bg-blue-400' },
                  { icon: <FaFacebook />, href: '#', color: 'hover:bg-blue-600' },
                ].map((s, i) => (
                  <a key={i} href={s.href}
                    className={`w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-lg ${s.color} hover:-translate-y-1 transition-all duration-200`}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {Object.entries(footerLinks).map(([title, links], i) => (
              <div key={i}>
                <p className="font-black text-sm mb-4 text-white">{title}</p>
                <ul className="space-y-2.5">
                  {links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-gray-400 text-sm hover:text-blue-400 hover:translate-x-1 transition-all duration-200 inline-block">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* NEWSLETTER */}
          <div data-aos="fade-up" className="bg-gray-800 rounded-2xl p-6 mb-10 flex flex-col md:flex-row items-center gap-4 justify-between">
            <div>
              <p className="font-black text-white mb-1">Stay Updated 📬</p>
              <p className="text-gray-400 text-sm">Get the latest SnapCount AI updates and tips in your inbox</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input type="email" placeholder="Enter your email"
                className="flex-1 md:w-64 bg-gray-700 border border-gray-600 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition" />
              <button className="bg-blue-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-blue-600 hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-gray-500 text-sm">© 2026 SnapCount AI. All rights reserved.</p>
            <div className="flex items-center gap-4 text-gray-500 text-sm">
              <a href="#" className="hover:text-blue-400 transition">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400 transition">Terms of Service</a>
            </div>
            <p className="text-gray-500 text-sm">Made with ❤️ in Nigeria 🇳🇬</p>
          </div>
        </div>
      </footer>

    </div>
  )
}