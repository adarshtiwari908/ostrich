"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Plus, Play, Pause, Settings, Eye, GitBranch, MessageSquare, Database, Mail, Target, Code, CheckCircle, XCircle, Clock, ArrowRight, Sparkles } from 'lucide-react';

export default function WorkflowsPage() {
  const [workflows] = useState([
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
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div 
              className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Zap className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Workflow Automation</h1>
              <p className="text-sm text-gray-500">Design and manage your integration workflows</p>
            </div>
          </div>
          <motion.button 
            className="px-6 py-2 bg-gradient-to-r from-purple-400 to-purple-500 text-white rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Workflow
          </motion.button>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Workflows</h2>
            <p className="text-gray-600">Automate your integrations with visual workflow builder</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {workflows.map((workflow, idx) => (
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
                      ) : (
                        <Pause className="w-4 h-4 text-yellow-500" />
                      )}
                    </div>
                    <p className="text-gray-600 mb-3">{workflow.description}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      workflow.status === 'active' 
                        ? 'bg-green-100 text-green-800 border-green-200' 
                        : 'bg-yellow-100 text-yellow-800 border-yellow-200'
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to automate?</h3>
                <p className="text-gray-600">Create your first workflow in minutes with our visual builder</p>
              </div>
              <motion.button 
                className="bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="w-4 h-4" />
                <span>Create Workflow</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
} 