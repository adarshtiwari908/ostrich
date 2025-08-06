"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Sparkles,
  Rocket,
  Bot,
  Code2,
  Smartphone,
  Lightbulb,
  Sun,
  Moon,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Zap,
  Github,
  Monitor
} from "lucide-react";

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Rocket,
      title: "AI-Powered Email Replies",
      description: "Automatically draft replies to common messages with personalized tone and speed.",
      delay: 0.3
    },
    {
      icon: Bot,
      title: "Automated Meeting Notes",
      description: "Instantly summarize your meetings and action items from Google Meet or Zoom.",
      delay: 0.5
    },
    {
      icon: Code2,
      title: "Code Snippet Suggestions",
      description: "Supercharge your workflow with context-aware developer assistance.",
      delay: 0.7
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Use Copilot anywhere—optimized for mobile productivity on the go.",
      delay: 0.9
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users", icon: Users },
    { number: "99.9%", label: "Uptime", icon: CheckCircle },
    { number: "50+", label: "Integrations", icon: Zap },
    { number: "4.9★", label: "User Rating", icon: Star }
  ];

  return (
    <main className={`min-h-screen font-sans relative transition-all duration-700 ${
      darkMode 
        ? "bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white" 
        : "bg-gradient-to-br from-white via-yellow-50/30 to-white text-gray-900"
    }`}>
      {/* Enhanced Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-500 ${
          scrolled 
            ? darkMode 
              ? "backdrop-blur-xl bg-slate-900/80 border-b border-slate-700/50 shadow-2xl shadow-black/20" 
              : "backdrop-blur-xl bg-white/80 border-b border-yellow-200/30 shadow-2xl shadow-black/5"
            : darkMode
              ? "backdrop-blur-md bg-slate-900/20 border-b border-slate-700/20"
              : "backdrop-blur-md bg-white/20 border-b border-white/20"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left - Logo and Brand */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex items-center space-x-3"
          >
            <motion.div
              className={`w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg relative ${
                darkMode ? "shadow-yellow-500/30" : "shadow-yellow-500/20"
              }`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {/* Ostrich Icon */}
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM12 8C14.2 8 16 9.8 16 12V14C16 16.2 14.2 18 12 18C9.8 18 8 16.2 8 14V12C8 9.8 9.8 8 12 8ZM6 14C6 15.1 5.1 16 4 16C2.9 16 2 15.1 2 14C2 12.9 2.9 12 4 12C5.1 12 6 12.9 6 14ZM22 14C22 15.1 21.1 16 20 16C18.9 16 18 15.1 18 14C18 12.9 18.9 12 20 12C21.1 12 22 12.9 22 14ZM12 20C13.1 20 14 20.9 14 22C14 23.1 13.1 24 12 24C10.9 24 10 23.1 10 22C10 20.9 10.9 20 12 20Z"/>
              </svg>
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <div>
              <h1 className={`text-xl font-bold transition-colors duration-500 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}>Ostrich Copilot</h1>
            </div>
          </motion.div>

          {/* Center - Navigation Icons */}
          <motion.div 
            className="flex items-center space-x-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/dashboard">
              <motion.div
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className={`flex flex-col items-center space-y-1 transition-all duration-300 cursor-pointer group ${
                  darkMode 
                    ? "text-slate-300 hover:text-yellow-400" 
                    : "text-gray-600 hover:text-yellow-600"
                }`}
              >
                <div className={`p-2 rounded-lg transition-all duration-300 ${
                  darkMode 
                    ? "group-hover:bg-yellow-400/10" 
                    : "group-hover:bg-yellow-100/60"
                }`}>
                  <Monitor className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium">Dashboard</span>
              </motion.div>
            </Link>
            
            <motion.div
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className={`flex flex-col items-center space-y-1 transition-all duration-300 cursor-pointer group ${
                darkMode 
                  ? "text-slate-300 hover:text-yellow-400" 
                  : "text-gray-600 hover:text-yellow-600"
              }`}
            >
              <div className={`p-2 rounded-lg transition-all duration-300 ${
                darkMode 
                  ? "group-hover:bg-yellow-400/10" 
                  : "group-hover:bg-yellow-100/60"
              }`}>
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium">Workflows</span>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className={`flex flex-col items-center space-y-1 transition-all duration-300 cursor-pointer group ${
                darkMode 
                  ? "text-slate-300 hover:text-yellow-400" 
                  : "text-gray-600 hover:text-yellow-600"
              }`}
            >
              <div className={`p-2 rounded-lg transition-all duration-300 ${
                darkMode 
                  ? "group-hover:bg-yellow-400/10" 
                  : "group-hover:bg-yellow-100/60"
              }`}>
                <Code2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium">Logs</span>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className={`flex flex-col items-center space-y-1 transition-all duration-300 cursor-pointer group ${
                darkMode 
                  ? "text-slate-300 hover:text-yellow-400" 
                  : "text-gray-600 hover:text-yellow-600"
              }`}
            >
              <div className={`p-2 rounded-lg transition-all duration-300 ${
                darkMode 
                  ? "group-hover:bg-yellow-400/10" 
                  : "group-hover:bg-yellow-100/60"
              }`}>
                <Bot className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium">Docs</span>
            </motion.div>
          </motion.div>

          {/* Right - Dark Mode Toggle */}
          <motion.button
            onClick={() => setDarkMode(!darkMode)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
              darkMode 
                ? "bg-slate-800/60 hover:bg-yellow-500/20 backdrop-blur-sm border border-slate-600/30" 
                : "bg-white/60 hover:bg-yellow-100/80 backdrop-blur-sm border border-yellow-200/30"
            }`}
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: darkMode ? 180 : 0 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
            </motion.div>
          </motion.button>
        </div>
      </motion.nav>

      {/* Enhanced Hero with Subtle Animations */}  
      <section className="relative z-10 px-6 pt-24 pb-16 text-center min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className={`absolute top-20 left-10 w-64 h-64 rounded-full opacity-20 ${
              darkMode ? "bg-yellow-400/10" : "bg-yellow-300/30"
            }`}
            animate={{ 
              x: [0, 30, -20, 0],
              y: [0, -20, 10, 0],
              scale: [1, 1.1, 0.9, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className={`absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-10 ${
              darkMode ? "bg-blue-400/10" : "bg-blue-300/20"
            }`}
            animate={{ 
              x: [0, -40, 20, 0],
              y: [0, 30, -15, 0],
              scale: [1, 0.8, 1.2, 1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${
                darkMode ? "bg-yellow-400/30" : "bg-yellow-500/40"
              }`}
              style={{
                left: `${20 + (i * 15)}%`,
                top: `${30 + (i * 10)}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
            />
          ))}
        </div>
        
        {/* Background Image with enhanced overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('/copy.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
            top: '80px'
          }}
        />
        
        {/* Enhanced Gradient Overlay */}
        <motion.div 
          className={`absolute inset-0 z-0 transition-all duration-700 ${
            darkMode 
              ? "bg-gradient-to-br from-slate-900/85 via-gray-900/75 to-slate-800/85" 
              : "bg-gradient-to-br from-white/70 via-yellow-50/50 to-white/70"
          }`}
          animate={{ opacity: [0.8, 0.9, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`backdrop-blur-2xl rounded-3xl py-16 px-10 shadow-2xl border transition-all duration-700 ${
              darkMode 
                ? "bg-slate-900/30 border-slate-700/40 shadow-black/30" 
                : "bg-white/30 border-white/40 shadow-black/10"
            }`}
          >
            {/* Enhanced Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border mb-6 transition-all duration-500 ${
                darkMode 
                  ? "bg-yellow-500/15 border-yellow-400/40 backdrop-blur-sm" 
                  : "bg-yellow-100/80 border-yellow-200/60 backdrop-blur-sm"
              }`}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className={`w-4 h-4 ${darkMode ? "text-yellow-400" : "text-yellow-600"}`} />
              </motion.div>
              <span className={`text-sm font-medium ${darkMode ? "text-yellow-300" : "text-yellow-700"}`}>
                AI-Powered Productivity
              </span>
              <motion.div
                className={`w-2 h-2 rounded-full ${darkMode ? "bg-green-400" : "bg-green-500"}`}
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 tracking-tight">
              <motion.span
                className={`block font-serif italic transition-colors duration-500 ${
                  darkMode ? "text-slate-100" : "text-gray-900"
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              >
                Work Smarter,
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 bg-clip-text text-transparent font-sans"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
              >
                Not Harder
              </motion.span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
              className={`text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed font-light transition-colors duration-500 ${
                darkMode ? "text-slate-300" : "text-gray-700"
              }`}
            >
              Ostrich Copilot is your AI assistant for emails, meetings, and development workflows. 
              <motion.span 
                className={`font-medium ${darkMode ? "text-yellow-300" : "text-yellow-700"}`}
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {" "}Supercharge your day in minutes.
              </motion.span>
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            >
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: darkMode 
                      ? "0 20px 40px rgba(251, 191, 36, 0.4)" 
                      : "0 20px 40px rgba(251, 191, 36, 0.3)" 
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="px-8 py-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 group"
                >
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                  Get Started Free
                  <motion.div
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: darkMode ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.8)" 
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className={`px-8 py-3 rounded-2xl backdrop-blur-sm border-2 font-bold text-lg transition-all duration-300 ${
                  darkMode 
                    ? "bg-white/5 border-yellow-400/50 text-slate-100 hover:text-white" 
                    : "bg-white/60 border-yellow-300 text-gray-800 hover:text-gray-900"
                }`}
              >
                Watch Demo
              </motion.button>
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              // Removed duplicate 'transition' prop to fix lint error
            >
              <ChevronDown className={`w-6 h-6 mx-auto transition-colors duration-500 ${
                darkMode ? "text-slate-400" : "text-gray-600"
              }`} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className={`px-6 py-20 transition-all duration-700 ${
        darkMode 
          ? "bg-gradient-to-br from-slate-800/50 to-gray-800/50" 
          : "bg-gradient-to-br from-yellow-50 to-yellow-100"
      }`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl font-bold mb-4 transition-colors duration-500 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>Trusted by thousands of professionals</h2>
            <p className={`text-lg transition-colors duration-500 ${
              darkMode ? "text-slate-300" : "text-gray-600"
            }`}>Join the productivity revolution</p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`text-center rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  darkMode 
                    ? "bg-slate-800/40 backdrop-blur-sm border border-slate-700/30" 
                    : "bg-white shadow-lg hover:shadow-xl"
                }`}
              >
                <motion.div 
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl mb-4 shadow-md"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>
                <div className={`text-3xl font-bold mb-2 transition-colors duration-500 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>{stat.number}</div>
                <div className={`font-medium transition-colors duration-500 ${
                  darkMode ? "text-slate-300" : "text-gray-600"
                }`}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className={`px-6 py-24 transition-all duration-700 ${
        darkMode ? "bg-slate-900" : "bg-white"
      }`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className={`text-5xl md:text-6xl font-bold mb-6 transition-colors duration-500 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>
              What <span className="bg-gradient-to-r from-yellow-500 to-yellow-400 bg-clip-text text-transparent font-serif italic">Ostrich Copilot</span> Can Do
            </h2>
            <p className={`text-xl max-w-3xl mx-auto leading-relaxed transition-colors duration-500 ${
              darkMode ? "text-slate-300" : "text-gray-600"
            }`}>
              Transform your workflow with AI-powered tools designed for modern productivity
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: feature.delay }}
                className="group relative"
              >
                <div className={`p-8 rounded-3xl shadow-lg border-2 hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 ${
                  darkMode 
                    ? "bg-slate-800/50 border-slate-700/50 hover:border-yellow-400/30" 
                    : "bg-white border-yellow-100 hover:border-yellow-200"
                }`}>
                  <div className="flex items-start space-x-6 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-2xl font-bold mb-4 transition-colors duration-500 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}>{feature.title}</h3>
                      <p className={`text-lg leading-relaxed transition-colors duration-500 ${
                        darkMode ? "text-slate-300" : "text-gray-600"
                      }`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-yellow-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    Learn more <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Ready to <span className="font-serif italic">Supercharge</span> Your Productivity?
            </h2>
            <p className="text-xl text-yellow-100 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of users who have transformed their workflow with Ostrich Copilot
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 rounded-2xl bg-white text-yellow-600 font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3"
                >
                  <Sparkles className="w-5 h-5" />
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 rounded-2xl border-2 border-white text-white font-bold text-lg hover:bg-white/10 transition-all duration-300"
              >
                Schedule Demo
              </motion.button>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-12 text-sm text-yellow-100">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">14-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className={`px-6 py-16 border-t transition-all duration-700 ${
        darkMode 
          ? "bg-slate-900 border-slate-700" 
          : "bg-gray-50 border-yellow-100"
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div className="flex items-center space-x-4 mb-8 md:mb-0">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                <Lightbulb className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className={`text-2xl font-bold transition-colors duration-500 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>Ostrich Copilot</h3>
                <p className={`text-sm transition-colors duration-500 ${
                  darkMode ? "text-slate-400" : "text-gray-600"
                }`}>Your AI Productivity Partner</p>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className={`mb-3 text-lg transition-colors duration-500 ${
                darkMode ? "text-slate-300" : "text-gray-700"
              }`}>
                Built with <span className="text-yellow-500">❤️</span> by <span className={`font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>Adarsh Tiwari</span>
              </p>
              <a
                href="https://github.com/adarshtiwari908"
                className="inline-flex items-center space-x-2 text-yellow-600 hover:text-yellow-700 transition-colors font-medium"
              >
                <Github className="w-5 h-5" />
                <span>View on GitHub</span>
              </a>
            </div>
          </div>
          
          <div className={`pt-8 border-t text-center transition-all duration-500 ${
            darkMode ? "border-slate-700" : "border-gray-200"
          }`}>
            <p className={`transition-colors duration-500 ${
              darkMode ? "text-slate-400" : "text-gray-500"
            }`}>
              &copy; 2025 Ostrich Copilot. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}