"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  MessageSquare, 
  Settings, 
  Bell,
  Search,
  Filter,
  MoreVertical,
  GitBranch,
  Slack,
  Github,
  Send,
  Bot,
  User,
  Clock,
  TrendingUp,
  AlertCircle,
  Play,
  Pause,
  Eye,
  Zap,
  BarChart3,
  PieChart,
  LineChart,
  Target,
  Shield,
  Wifi,
  Database,
  Cpu,
  HardDrive,
  Network,
  ChevronRight,
  ChevronDown,
  Plus,
  Download,
  Share2,
  Copy,
  Edit,
  Trash2,
  ExternalLink,
  Info,
  HelpCircle,
  Star,
  Heart,
  Sparkles,
  Code,
  ArrowRight
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Pie } from 'recharts';
import { integrations, logs, performanceMetrics, LogEntry, Integration } from '../data/logs';
import { AICopilot, CopilotResponse } from '../services/ai-copilot';

// Enhanced mock data for charts
const chartData = [
  { time: '00:00', requests: 45, errors: 2, responseTime: 1.2 },
  { time: '02:00', requests: 32, errors: 1, responseTime: 0.9 },
  { time: '04:00', requests: 28, errors: 0, responseTime: 0.8 },
  { time: '06:00', requests: 67, errors: 3, responseTime: 1.5 },
  { time: '08:00', requests: 89, errors: 5, responseTime: 1.8 },
  { time: '10:00', requests: 156, errors: 8, responseTime: 2.1 },
  { time: '12:00', requests: 134, errors: 6, responseTime: 1.9 },
  { time: '14:00', requests: 178, errors: 4, responseTime: 1.3 },
  { time: '16:00', requests: 145, errors: 7, responseTime: 1.6 },
  { time: '18:00', requests: 98, errors: 3, responseTime: 1.1 },
  { time: '20:00', requests: 76, errors: 2, responseTime: 0.9 },
  { time: '22:00', requests: 54, errors: 1, responseTime: 0.8 },
];

const pieData = [
  { name: 'Success', value: 94.2, color: '#10B981' },
  { name: 'Errors', value: 5.8, color: '#EF4444' },
];

const COLORS = ['#10B981', '#EF4444', '#F59E0B', '#3B82F6', '#8B5CF6'];

export default function IntegrationDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Array<{id: number, type: 'user' | 'ai', message: string, timestamp: string, response?: CopilotResponse}>>([
    { id: 1, type: 'ai', message: "Hi! I'm Ostrich Copilot. I can help you monitor integrations, analyze errors, and optimize performance. What would you like to know?", timestamp: '14:21' },
    { id: 2, type: 'user', message: "Show me recent errors", timestamp: '14:22' },
    { id: 3, type: 'ai', message: "I found 3 recent errors:\n\n• GitHub → Slack: Rate limit exceeded (2 min ago)\n• Salesforce → HubSpot: Authentication failed (15 min ago)\n• Stripe → QuickBooks: Network timeout (1 hour ago)\n\nWould you like me to help resolve any of these?", timestamp: '14:22', response: {
      type: 'analysis',
      message: "I found 3 recent errors:\n\n• GitHub → Slack: Rate limit exceeded (2 min ago)\n• Salesforce → HubSpot: Authentication failed (15 min ago)\n• Stripe → QuickBooks: Network timeout (1 hour ago)\n\nWould you like me to help resolve any of these?",
      confidence: 0.95,
      actions: [
        { id: 'retry_github', title: 'Retry GitHub Integration', description: 'Attempt to reconnect GitHub to Slack', type: 'retry', execute: async () => { console.log('Retry GitHub'); return Promise.resolve(); } },
        { id: 'fix_salesforce', title: 'Fix Salesforce Auth', description: 'Update authentication credentials', type: 'configure', execute: async () => { console.log('Fix Salesforce'); return Promise.resolve(); } },
        { id: 'check_stripe', title: 'Check Stripe Connection', description: 'Verify network connectivity', type: 'investigate', execute: async () => { console.log('Check Stripe'); return Promise.resolve(); } }
      ]
    }},
    { id: 4, type: 'user', message: "How's our overall performance?", timestamp: '14:23' },
    { id: 5, type: 'ai', message: "Your overall performance is good! 📊\n\n• Success Rate: 94.2%\n• Average Response Time: 1.3s\n• Active Integrations: 8/8\n• Uptime: 99.7%\n\nGitHub integration is performing exceptionally well with 99.9% success rate. Consider optimizing the Salesforce integration which has the highest error rate.", timestamp: '14:23' }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [showIntegrationDetails, setShowIntegrationDetails] = useState(false);
  const [realTimeData, setRealTimeData] = useState(integrations);
  const [copilot] = useState(new AICopilot(integrations, logs));

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => prev.map(integration => ({
        ...integration,
        lastSync: new Date().toISOString(),
        successCount: integration.successCount + Math.floor(Math.random() * 3),
        errorCount: integration.errorCount + (Math.random() > 0.9 ? 1 : 0)
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMessage = {
      id: messages.length + 1,
      type: 'user' as const,
      message: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsLoading(true);
    
    try {
      const response = await copilot.analyzeQuery(chatInput);
      const aiMessage = {
        id: messages.length + 2,
        type: 'ai' as const,
        message: response.message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        response
      };
      
      setTimeout(() => {
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Copilot error:', error);
      setIsLoading(false);
    }
  };

  const retryIntegration = async (integrationId: string) => {
    console.log(`Retrying integration ${integrationId}`);
    // Add retry logic here
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'paused': return <Pause className="w-4 h-4 text-gray-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         log.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.target.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || log.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'paused': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div 
              className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Activity className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Ostrich Integration Hub</h1>
              <p className="text-sm text-gray-500">Enterprise Integration Monitoring</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button 
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5" />
            </motion.button>
            <motion.button 
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Settings className="w-5 h-5" />
            </motion.button>
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Enhanced Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen shadow-sm">
          <nav className="p-4 space-y-2">
            {[
              { id: 'dashboard', icon: Activity, label: 'Dashboard', badge: null },
              { id: 'integrations', icon: GitBranch, label: 'Integrations', badge: realTimeData.filter(i => i.status === 'error').length },
              { id: 'logs', icon: Eye, label: 'Logs', badge: null },
              { id: 'copilot', icon: Bot, label: 'AI Copilot', badge: 'AI' },
              { id: 'analytics', icon: BarChart3, label: 'Analytics', badge: null },
              { id: 'workflows', icon: Zap, label: 'Workflows', badge: null },
            ].map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                  activeTab === item.id 
                    ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-700 border border-yellow-200 shadow-sm' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    typeof item.badge === 'number' 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </motion.button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
                    <p className="text-gray-600">Real-time integration monitoring and analytics</p>
                  </div>
                  <motion.button 
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white px-6 py-3 rounded-xl flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Refresh All</span>
                  </motion.button>
                </div>

                {/* Enhanced Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { 
                      title: 'Active Integrations', 
                      value: realTimeData.filter(i => i.status === 'active').length,
                      total: realTimeData.length,
                      icon: CheckCircle, 
                      color: 'green',
                      trend: '+2.5%'
                    },
                    { 
                      title: 'Failed Today', 
                      value: realTimeData.filter(i => i.status === 'error').length,
                      total: null,
                      icon: XCircle, 
                      color: 'red',
                      trend: '-12%'
                    },
                    { 
                      title: 'Success Rate', 
                      value: `${performanceMetrics.successRate}%`,
                      total: null,
                      icon: TrendingUp, 
                      color: 'yellow',
                      trend: '+1.2%'
                    },
                    { 
                      title: 'Avg Response', 
                      value: `${performanceMetrics.avgResponseTime}s`,
                      total: null,
                      icon: Clock, 
                      color: 'blue',
                      trend: '-0.3s'
                    }
                  ].map((stat, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                          <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                        </div>
                        <span className={`text-sm font-medium text-${stat.color}-600`}>
                          {stat.trend}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        {stat.total && (
                          <p className="text-sm text-gray-500">of {stat.total} total</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Request Volume Chart */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Request Volume (24h)</h3>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Requests</span>
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Errors</span>
                      </div>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsLineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
                        <YAxis stroke="#6b7280" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Line type="monotone" dataKey="requests" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} />
                        <Line type="monotone" dataKey="errors" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }} />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </motion.div>

                  {/* Success Rate Chart */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Success Rate</h3>
                      <span className="text-2xl font-bold text-green-600">{performanceMetrics.successRate}%</span>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsPieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center space-x-4 mt-4">
                      {pieData.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-sm text-gray-600">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Recent Activity */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm"
                >
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                      <button className="text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                        View All
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {logs.slice(0, 5).map((log, idx) => (
                        <motion.div
                          key={log.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          {getLogIcon(log.status)}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900">{log.source} → {log.target}</p>
                              <p className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleString()}</p>
                            </div>
                            <p className="text-sm text-gray-600">{log.message}</p>
                            {log.details && (
                              <p className="text-xs text-gray-500 mt-1">{log.details}</p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'integrations' && (
              <motion.div
                key="integrations"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Integrations</h2>
                    <p className="text-gray-600">Monitor and manage your service integrations</p>
                  </div>
                  <motion.button 
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white px-6 py-3 rounded-xl flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Integration</span>
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {realTimeData.map((integration, idx) => (
                    <motion.div
                      key={integration.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(integration.status)}
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{integration.name}</h3>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(integration.status)}`}>
                              {integration.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <motion.button 
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <MoreVertical className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-2xl font-bold text-green-600">{integration.successCount}</p>
                          <p className="text-xs text-gray-600">Success</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-2xl font-bold text-red-600">{integration.errorCount}</p>
                          <p className="text-xs text-gray-600">Errors</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Last Sync:</span>
                          <span className="text-gray-900">{new Date(integration.lastSync).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Response Time:</span>
                          <span className="text-gray-900">{integration.avgResponseTime}s</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Uptime:</span>
                          <span className="text-gray-900">{integration.uptime}%</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <motion.button 
                          onClick={() => retryIntegration(integration.id)}
                          className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white px-3 py-2 rounded-lg text-sm flex items-center justify-center space-x-1 transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <RefreshCw className="w-4 h-4" />
                          <span>Retry</span>
                        </motion.button>
                        <motion.button 
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Configure
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'logs' && (
              <motion.div
                key="logs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Logs</h2>
                    <p className="text-gray-600">Detailed integration activity and error tracking</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search logs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                      <option value="all">All Types</option>
                      <option value="success">Success</option>
                      <option value="failed">Error</option>
                      <option value="warning">Warning</option>
                    </select>
                    <motion.button 
                      className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Download className="w-4 h-4" />
                      <span>Export</span>
                    </motion.button>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="divide-y divide-gray-200">
                    {filteredLogs.map((log, idx) => (
                      <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start space-x-3">
                          {getLogIcon(log.status)}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-sm font-medium text-gray-900">{log.source} → {log.target}</p>
                              <p className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleString()}</p>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">{log.message}</p>
                            {log.details && (
                              <p className="text-xs text-gray-500 mb-2">{log.details}</p>
                            )}
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              {log.responseTime && (
                                <span>Response: {log.responseTime}s</span>
                              )}
                              {log.errorCode && (
                                <span className="text-red-600">Error: {log.errorCode}</span>
                              )}
                              {log.retryCount && (
                                <span>Retries: {log.retryCount}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'copilot' && (
              <motion.div
                key="copilot"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">AI Copilot</h2>
                    <p className="text-sm text-gray-600">Intelligent integration monitoring and troubleshooting</p>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-green-600">
                    <motion.div 
                      className="w-1.5 h-1.5 bg-green-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span>Online</span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { icon: AlertTriangle, label: 'Check Errors', color: 'bg-red-50 text-red-700 border-red-200' },
                    { icon: TrendingUp, label: 'Performance', color: 'bg-green-50 text-green-700 border-green-200' },
                    { icon: Settings, label: 'Optimize', color: 'bg-blue-50 text-blue-700 border-blue-200' },
                    { icon: HelpCircle, label: 'Get Help', color: 'bg-purple-50 text-purple-700 border-purple-200' }
                  ].map((action, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => {
                        const questions = [
                          'Show me recent errors and their solutions',
                          'Analyze performance trends and suggest optimizations',
                          'What can I do to improve integration reliability?',
                          'How do I set up monitoring alerts?'
                        ];
                        setChatInput(questions[idx]);
                        setTimeout(() => handleSendMessage(), 100);
                      }}
                      className={`p-3 rounded-lg border text-xs font-medium transition-all duration-200 hover:scale-105 ${action.color}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <action.icon className="w-4 h-4 mb-1" />
                      <div>{action.label}</div>
                    </motion.button>
                  ))}
                </div>

                <div className="bg-white rounded-lg border border-gray-200 h-[500px] flex flex-col shadow-sm">
                  <div className="p-3 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-900">Ostrich Copilot</p>
                        <p className="text-xs text-gray-500">Ask about integrations, errors, or get help</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-3 space-y-3">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-start space-x-2 max-w-[280px] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === 'user' ? 'bg-yellow-100' : 'bg-blue-100'}`}>
                            {message.type === 'user' ? <User className="w-3 h-3 text-yellow-600" /> : <Bot className="w-3 h-3 text-blue-600" />}
                          </div>
                          <div className={`p-2.5 rounded-lg text-xs ${message.type === 'user' ? 'bg-yellow-100 text-yellow-900' : 'bg-gray-100 text-gray-900'}`}>
                            <p className="whitespace-pre-wrap leading-relaxed">{message.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
                            {message.response?.actions && (
                              <div className="mt-2 space-y-1.5">
                                {message.response.actions.map((action) => (
                                  <motion.button
                                    key={action.id}
                                    onClick={action.execute}
                                    className="w-full text-left p-1.5 bg-white rounded border border-gray-200 hover:bg-gray-50 text-xs transition-colors"
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                  >
                                    <div className="font-medium text-gray-900">{action.title}</div>
                                    <div className="text-gray-500">{action.description}</div>
                                  </motion.button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div className="flex items-start space-x-2">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                            <Bot className="w-3 h-3 text-blue-600" />
                          </div>
                          <div className="p-2.5 rounded-lg bg-gray-100">
                            <div className="flex space-x-1">
                              <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1, repeat: Infinity }} />
                              <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} />
                              <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="p-3 border-t border-gray-200">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Ask about your integrations..."
                        className="flex-1 px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <motion.button
                        onClick={handleSendMessage}
                        disabled={isLoading}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                        whileHover={{ scale: isLoading ? 1 : 1.05 }}
                        whileTap={{ scale: isLoading ? 1 : 0.95 }}
                      >
                        <Send className="w-3 h-3" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'analytics' && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Analytics</h2>
                    <p className="text-gray-600">Advanced analytics and performance insights</p>
                  </div>
                  <motion.button 
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white px-6 py-3 rounded-xl flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Report</span>
                  </motion.button>
                </div>

                {/* Analytics Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Performance Trends */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Performance Trends</h3>
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                      <RechartsLineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
                        <YAxis stroke="#6b7280" fontSize={12} />
                        <Tooltip />
                        <Line type="monotone" dataKey="responseTime" stroke="#10B981" strokeWidth={2} />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </motion.div>

                  {/* Error Analysis */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Error Analysis</h3>
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                      <RechartsPieChart>
                        <Pie
                          data={[
                            { name: 'Auth Errors', value: 45, color: '#EF4444' },
                            { name: 'Timeout', value: 25, color: '#F59E0B' },
                            { name: 'Rate Limit', value: 20, color: '#3B82F6' },
                            { name: 'Network', value: 10, color: '#8B5CF6' }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {[
                            { name: 'Auth Errors', value: 45, color: '#EF4444' },
                            { name: 'Timeout', value: 25, color: '#F59E0B' },
                            { name: 'Rate Limit', value: 20, color: '#3B82F6' },
                            { name: 'Network', value: 10, color: '#8B5CF6' }
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </motion.div>

                  {/* Integration Health */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Integration Health</h3>
                      <Shield className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="space-y-3">
                      {realTimeData.map((integration) => (
                        <div key={integration.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(integration.status)}
                            <span className="text-sm font-medium text-gray-900">{integration.name}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-gray-900">{integration.uptime}%</p>
                            <p className="text-xs text-gray-500">uptime</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Detailed Analytics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Request Volume by Integration */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Volume by Integration</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={realTimeData.map(i => ({ name: i.name, requests: i.successCount + i.errorCount, errors: i.errorCount }))}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                        <YAxis stroke="#6b7280" fontSize={12} />
                        <Tooltip />
                        <Bar dataKey="requests" fill="#3B82F6" />
                        <Bar dataKey="errors" fill="#EF4444" />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>

                  {/* Response Time Distribution */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Time Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
                        <YAxis stroke="#6b7280" fontSize={12} />
                        <Tooltip />
                        <Area type="monotone" dataKey="responseTime" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {activeTab === 'workflows' && (
              <motion.div
                key="workflows"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Workflows</h2>
                    <p className="text-gray-600">Automate your integrations with visual workflow builder</p>
                  </div>
                  <motion.button 
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white px-6 py-3 rounded-xl flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus className="w-4 h-4" />
                    <span>New Workflow</span>
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {[
                    {
                      id: '1',
                      name: 'GitHub to Slack Integration',
                      description: 'Automatically notify Slack when GitHub events occur',
                      status: 'active',
                      executions: 1256,
                      successRate: 98.5,
                      steps: ['GitHub Webhook', 'Condition Check', 'Slack Notification']
                    },
                    {
                      id: '2',
                      name: 'Salesforce Lead Sync',
                      description: 'Sync new leads from Salesforce to HubSpot',
                      status: 'paused',
                      executions: 892,
                      successRate: 94.2,
                      steps: ['Database Trigger', 'Email Notification']
                    },
                    {
                      id: '3',
                      name: 'Stripe Payment Processing',
                      description: 'Process payments and update accounting system',
                      status: 'active',
                      executions: 2341,
                      successRate: 99.1,
                      steps: ['Payment Gateway', 'Validation', 'Database Update']
                    },
                    {
                      id: '4',
                      name: 'Jira Issue Tracking',
                      description: 'Track issues and update project management tools',
                      status: 'warning',
                      executions: 567,
                      successRate: 96.8,
                      steps: ['Issue Detection', 'Status Update', 'Notification']
                    }
                  ].map((workflow, idx) => (
                    <motion.div
                      key={workflow.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{workflow.name}</h3>
                            {workflow.status === 'active' ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : workflow.status === 'paused' ? (
                              <Pause className="w-4 h-4 text-yellow-500" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-orange-500" />
                            )}
                          </div>
                          <p className="text-gray-600 mb-3">{workflow.description}</p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                            workflow.status === 'active'
                              ? 'bg-green-100 text-green-800 border-green-200'
                              : workflow.status === 'paused'
                              ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                              : 'bg-orange-100 text-orange-800 border-orange-200'
                          }`}>
                            {workflow.status}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <motion.button
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Eye className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Settings className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Steps ({workflow.steps.length})</h4>
                        <div className="space-y-2">
                          {workflow.steps.map((step, stepIdx) => (
                            <div key={stepIdx} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                              <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Code className="w-3 h-3 text-purple-600" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{step}</p>
                              </div>
                              {stepIdx < workflow.steps.length - 1 && (
                                <ArrowRight className="w-4 h-4 text-gray-400" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{workflow.executions.toLocaleString()}</p>
                          <p className="text-xs text-gray-600">Executions</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">{workflow.successRate}%</p>
                          <p className="text-xs text-gray-600">Success Rate</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{workflow.steps.length}</p>
                          <p className="text-xs text-gray-600">Steps</p>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <motion.button
                          className="flex-1 bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white px-3 py-2 rounded-lg text-sm flex items-center justify-center space-x-1 transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Play className="w-4 h-4" />
                          <span>{workflow.status === 'active' ? 'Running' : 'Start'}</span>
                        </motion.button>
                        <motion.button
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Edit
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}