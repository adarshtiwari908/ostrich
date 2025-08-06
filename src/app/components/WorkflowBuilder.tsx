"use client"
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Plus,
  Trash2,
  Settings,
  Play,
  Pause,
  Eye,
  Edit,
  Copy,
  Download,
  Share2,
  Zap,
  GitBranch,
  MessageSquare,
  Database,
  Globe,
  Mail,
  Calendar,
  FileText,
  Image,
  Video,
  Music,
  Code,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  MoreVertical,
  Save,
  RotateCcw,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface WorkflowStep {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'transform';
  name: string;
  description: string;
  icon: any;
  config: any;
  position: { x: number; y: number };
  connections: string[];
}

interface WorkflowConnection {
  id: string;
  from: string;
  to: string;
  condition?: string;
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  connections: WorkflowConnection[];
  status: 'draft' | 'active' | 'paused' | 'error';
  createdAt: string;
  updatedAt: string;
}

const availableSteps = [
  {
    type: 'trigger',
    name: 'GitHub Webhook',
    description: 'Trigger when GitHub events occur',
    icon: GitBranch,
    category: 'Source Control'
  },
  {
    type: 'trigger',
    name: 'Slack Message',
    description: 'Trigger on Slack channel messages',
    icon: MessageSquare,
    category: 'Communication'
  },
  {
    type: 'trigger',
    name: 'Database Change',
    description: 'Trigger on database modifications',
    icon: Database,
    category: 'Data'
  },
  {
    type: 'action',
    name: 'Send Slack Notification',
    description: 'Send message to Slack channel',
    icon: MessageSquare,
    category: 'Communication'
  },
  {
    type: 'action',
    name: 'Create Jira Ticket',
    description: 'Create new Jira issue',
    icon: Target,
    category: 'Project Management'
  },
  {
    type: 'action',
    name: 'Send Email',
    description: 'Send email notification',
    icon: Mail,
    category: 'Communication'
  },
  {
    type: 'condition',
    name: 'If/Else',
    description: 'Conditional logic branching',
    icon: ChevronDown,
    category: 'Logic'
  },
  {
    type: 'transform',
    name: 'Data Transform',
    description: 'Transform data format',
    icon: Code,
    category: 'Data Processing'
  }
];

export default function WorkflowBuilder() {
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: '1',
      name: 'GitHub to Slack Integration',
      description: 'Automatically notify Slack when GitHub events occur',
      steps: [
        {
          id: 'step-1',
          type: 'trigger',
          name: 'GitHub Webhook',
          description: 'Trigger when GitHub events occur',
          icon: GitBranch,
          config: { repository: 'my-repo', events: ['push', 'pull_request'] },
          position: { x: 100, y: 100 },
          connections: ['step-2']
        },
        {
          id: 'step-2',
          type: 'condition',
          name: 'If/Else',
          description: 'Check if it\'s a critical event',
          icon: ChevronDown,
          config: { condition: 'event.type === "pull_request"' },
          position: { x: 400, y: 100 },
          connections: ['step-3', 'step-4']
        },
        {
          id: 'step-3',
          type: 'action',
          name: 'Send Slack Notification',
          description: 'Send to critical alerts channel',
          icon: MessageSquare,
          config: { channel: '#critical-alerts', template: 'urgent' },
          position: { x: 700, y: 50 },
          connections: []
        },
        {
          id: 'step-4',
          type: 'action',
          name: 'Send Slack Notification',
          description: 'Send to general channel',
          icon: MessageSquare,
          config: { channel: '#general', template: 'normal' },
          position: { x: 700, y: 150 },
          connections: []
        }
      ],
      connections: [
        { id: 'conn-1', from: 'step-1', to: 'step-2' },
        { id: 'conn-2', from: 'step-2', to: 'step-3', condition: 'true' },
        { id: 'conn-3', from: 'step-2', to: 'step-4', condition: 'false' }
      ],
      status: 'active',
      createdAt: '2025-01-30T10:00:00Z',
      updatedAt: '2025-01-30T14:30:00Z'
    }
  ]);

  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(workflows[0]);
  const [selectedStep, setSelectedStep] = useState<WorkflowStep | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showStepLibrary, setShowStepLibrary] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const handleDragEnd = useCallback((result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    
    if (source.droppableId === 'step-library' && destination.droppableId === 'workflow-canvas') {
      // Add new step to workflow
      const stepTemplate = availableSteps[source.index];
      const newStep: WorkflowStep = {
        id: `step-${Date.now()}`,
        type: stepTemplate.type as any,
        name: stepTemplate.name,
        description: stepTemplate.description,
        icon: stepTemplate.icon,
        config: {},
        position: { x: destination.x, y: destination.y },
        connections: []
      };

      if (selectedWorkflow) {
        const updatedWorkflow = {
          ...selectedWorkflow,
          steps: [...selectedWorkflow.steps, newStep]
        };
        setSelectedWorkflow(updatedWorkflow);
        setWorkflows(prev => prev.map(w => w.id === selectedWorkflow.id ? updatedWorkflow : w));
      }
    }
  }, [selectedWorkflow]);

  const addStepToWorkflow = (stepTemplate: any, position: { x: number; y: number }) => {
    if (!selectedWorkflow) return;

    const newStep: WorkflowStep = {
      id: `step-${Date.now()}`,
      type: stepTemplate.type as any,
      name: stepTemplate.name,
      description: stepTemplate.description,
      icon: stepTemplate.icon,
      config: {},
      position,
      connections: []
    };

    const updatedWorkflow = {
      ...selectedWorkflow,
      steps: [...selectedWorkflow.steps, newStep]
    };
    setSelectedWorkflow(updatedWorkflow);
    setWorkflows(prev => prev.map(w => w.id === selectedWorkflow.id ? updatedWorkflow : w));
  };

  const deleteStep = (stepId: string) => {
    if (!selectedWorkflow) return;

    const updatedWorkflow = {
      ...selectedWorkflow,
      steps: selectedWorkflow.steps.filter(s => s.id !== stepId),
      connections: selectedWorkflow.connections.filter(c => c.from !== stepId && c.to !== stepId)
    };
    setSelectedWorkflow(updatedWorkflow);
    setWorkflows(prev => prev.map(w => w.id === selectedWorkflow.id ? updatedWorkflow : w));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'paused': return <Pause className="w-4 h-4 text-yellow-500" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
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
              <h1 className="text-xl font-bold text-gray-900">Workflow Builder</h1>
              <p className="text-sm text-gray-500">Design and automate your integrations</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <motion.button 
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </motion.button>
            <motion.button 
              className="px-4 py-2 bg-gradient-to-r from-purple-400 to-purple-500 text-white rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-4 h-4 mr-2" />
              Deploy Workflow
            </motion.button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Sidebar - Workflow List */}
        <aside className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Workflows</h2>
              <motion.button 
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-4 h-4" />
              </motion.button>
            </div>
            <div className="space-y-2">
              {workflows.map((workflow) => (
                <motion.div
                  key={workflow.id}
                  onClick={() => setSelectedWorkflow(workflow)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedWorkflow?.id === workflow.id
                      ? 'border-purple-300 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{workflow.name}</h3>
                    {getStatusIcon(workflow.status)}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{workflow.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(workflow.status)}`}>
                      {workflow.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(workflow.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Step Library */}
          <div className="flex-1 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Step Library</h3>
              <motion.button 
                onClick={() => setShowStepLibrary(!showStepLibrary)}
                className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {showStepLibrary ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </motion.button>
            </div>
            
            <AnimatePresence>
              {showStepLibrary && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-2"
                >
                  {availableSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      draggable
                      className="p-3 border border-gray-200 rounded-lg bg-white cursor-move hover:border-purple-300 hover:bg-purple-50 transition-all duration-200"
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <step.icon className="w-4 h-4 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">{step.name}</h4>
                          <p className="text-xs text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </aside>

        {/* Main Canvas */}
        <main className="flex-1 relative overflow-hidden">
          {/* Canvas Toolbar */}
          <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 bg-white rounded-lg border border-gray-200 p-2 shadow-lg">
            <motion.button 
              onClick={() => setZoom(Math.min(zoom + 0.1, 2))}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Maximize2 className="w-4 h-4" />
            </motion.button>
            <span className="text-sm text-gray-600 min-w-[60px] text-center">{Math.round(zoom * 100)}%</span>
            <motion.button 
              onClick={() => setZoom(Math.max(zoom - 0.1, 0.5))}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Minimize2 className="w-4 h-4" />
            </motion.button>
            <div className="w-px h-6 bg-gray-300"></div>
            <motion.button 
              onClick={() => setPan({ x: 0, y: 0 })}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <RotateCcw className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Workflow Canvas */}
          <div 
            className="w-full h-full bg-gray-50 relative"
            style={{
              backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          >
            <div 
              className="absolute inset-0"
              style={{
                transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
                transformOrigin: '0 0'
              }}
            >
              {selectedWorkflow?.steps.map((step) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute"
                  style={{ left: step.position.x, top: step.position.y }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-4 shadow-lg min-w-[200px]">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          step.type === 'trigger' ? 'bg-blue-100' :
                          step.type === 'action' ? 'bg-green-100' :
                          step.type === 'condition' ? 'bg-yellow-100' :
                          'bg-purple-100'
                        }`}>
                          <step.icon className={`w-4 h-4 ${
                            step.type === 'trigger' ? 'text-blue-600' :
                            step.type === 'action' ? 'text-green-600' :
                            step.type === 'condition' ? 'text-yellow-600' :
                            'text-purple-600'
                          }`} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{step.name}</h4>
                          <p className="text-xs text-gray-600">{step.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <motion.button 
                          onClick={() => setSelectedStep(step)}
                          className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Settings className="w-3 h-3" />
                        </motion.button>
                        <motion.button 
                          onClick={() => deleteStep(step.id)}
                          className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 className="w-3 h-3" />
                        </motion.button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">{step.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">ID: {step.id}</span>
                      <div className="flex items-center space-x-1">
                        {step.connections.length > 0 && (
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        )}
                        <span className="text-xs text-gray-500">{step.connections.length} connections</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Connection Lines */}
              <svg className="absolute inset-0 pointer-events-none">
                {selectedWorkflow?.connections.map((connection) => {
                  const fromStep = selectedWorkflow.steps.find(s => s.id === connection.from);
                  const toStep = selectedWorkflow.steps.find(s => s.id === connection.to);
                  
                  if (!fromStep || !toStep) return null;

                  const fromX = fromStep.position.x + 200; // Step width
                  const fromY = fromStep.position.y + 50; // Step height / 2
                  const toX = toStep.position.x;
                  const toY = toStep.position.y + 50;

                  return (
                    <g key={connection.id}>
                      <defs>
                        <marker
                          id={`arrow-${connection.id}`}
                          markerWidth="10"
                          markerHeight="10"
                          refX="9"
                          refY="3"
                          orient="auto"
                          markerUnits="strokeWidth"
                        >
                          <path d="M0,0 L0,6 L9,3 z" fill="#6b7280" />
                        </marker>
                      </defs>
                      <path
                        d={`M ${fromX} ${fromY} Q ${(fromX + toX) / 2} ${fromY} ${toX} ${toY}`}
                        stroke="#6b7280"
                        strokeWidth="2"
                        fill="none"
                        markerEnd={`url(#arrow-${connection.id})`}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </main>

        {/* Step Configuration Panel */}
        <AnimatePresence>
          {selectedStep && (
            <motion.aside
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              className="w-96 bg-white border-l border-gray-200 flex flex-col"
            >
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Step Configuration</h3>
                  <motion.button 
                    onClick={() => setSelectedStep(null)}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <XCircle className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
              
              <div className="flex-1 p-4 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Step Name</label>
                  <input
                    type="text"
                    value={selectedStep.name}
                    onChange={(e) => {
                      const updatedStep = { ...selectedStep, name: e.target.value };
                      setSelectedStep(updatedStep);
                      if (selectedWorkflow) {
                        const updatedWorkflow = {
                          ...selectedWorkflow,
                          steps: selectedWorkflow.steps.map(s => s.id === selectedStep.id ? updatedStep : s)
                        };
                        setSelectedWorkflow(updatedWorkflow);
                        setWorkflows(prev => prev.map(w => w.id === selectedWorkflow.id ? updatedWorkflow : w));
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={selectedStep.description}
                    onChange={(e) => {
                      const updatedStep = { ...selectedStep, description: e.target.value };
                      setSelectedStep(updatedStep);
                      if (selectedWorkflow) {
                        const updatedWorkflow = {
                          ...selectedWorkflow,
                          steps: selectedWorkflow.steps.map(s => s.id === selectedStep.id ? updatedStep : s)
                        };
                        setSelectedWorkflow(updatedWorkflow);
                        setWorkflows(prev => prev.map(w => w.id === selectedWorkflow.id ? updatedWorkflow : w));
                      }
                    }}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Configuration</label>
                  <div className="space-y-3">
                    {Object.entries(selectedStep.config).map(([key, value]) => (
                      <div key={key}>
                        <label className="block text-xs font-medium text-gray-600 mb-1">{key}</label>
                        <input
                          type="text"
                          value={value as string}
                          onChange={(e) => {
                            const updatedStep = {
                              ...selectedStep,
                              config: { ...selectedStep.config, [key]: e.target.value }
                            };
                            setSelectedStep(updatedStep);
                            if (selectedWorkflow) {
                              const updatedWorkflow = {
                                ...selectedWorkflow,
                                steps: selectedWorkflow.steps.map(s => s.id === selectedStep.id ? updatedStep : s)
                              };
                              setSelectedWorkflow(updatedWorkflow);
                              setWorkflows(prev => prev.map(w => w.id === selectedWorkflow.id ? updatedWorkflow : w));
                            }
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <motion.button 
                    className="w-full bg-gradient-to-r from-purple-400 to-purple-500 text-white py-2 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Save Configuration
                  </motion.button>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 