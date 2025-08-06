// Enhanced data model for integration monitoring
export interface Integration {
  id: string;
  name: string;
  source: string;
  target: string;
  status: 'active' | 'error' | 'warning' | 'paused' | 'configuring';
  lastSync: string;
  successCount: number;
  errorCount: number;
  avgResponseTime: number;
  uptime: number;
  config: {
    webhookUrl?: string;
    apiKey?: string;
    retryAttempts: number;
    timeout: number;
    rateLimit: number;
  };
  health: {
    isHealthy: boolean;
    lastHealthCheck: string;
    consecutiveFailures: number;
    nextRetry?: string;
  };
}

export interface LogEntry {
  id: string;
  integrationId: string;
  source: string;
  target: string;
  timestamp: string;
  status: 'success' | 'failed' | 'warning' | 'pending';
  message: string;
  details?: string;
  errorCode?: string;
  responseTime?: number;
  retryCount?: number;
  metadata?: {
    userId?: string;
    requestId?: string;
    payload?: any;
    headers?: any;
  };
}

export interface PerformanceMetrics {
  totalRequests: number;
  successRate: number;
  avgResponseTime: number;
  errorRate: number;
  uptime: number;
  throughput: number;
}

// Mock data for integrations
export const integrations: Integration[] = [
  {
    id: "1",
    name: "GitHub → Slack",
    source: "GitHub",
    target: "Slack",
    status: "active",
    lastSync: "2025-01-30T14:23:45Z",
    successCount: 1256,
    errorCount: 3,
    avgResponseTime: 1.2,
    uptime: 99.8,
    config: {
      webhookUrl: "https://hooks.slack.com/services/...",
      retryAttempts: 3,
      timeout: 5000,
      rateLimit: 100
    },
    health: {
      isHealthy: true,
      lastHealthCheck: "2025-01-30T14:23:45Z",
      consecutiveFailures: 0
    }
  },
  {
    id: "2",
    name: "Jira → Teams",
    source: "Jira",
    target: "Microsoft Teams",
    status: "error",
    lastSync: "2025-01-30T14:08:12Z",
    successCount: 892,
    errorCount: 7,
    avgResponseTime: 2.1,
    uptime: 98.5,
    config: {
      apiKey: "jira-api-key-123",
      retryAttempts: 5,
      timeout: 10000,
      rateLimit: 50
    },
    health: {
      isHealthy: false,
      lastHealthCheck: "2025-01-30T14:08:12Z",
      consecutiveFailures: 3,
      nextRetry: "2025-01-30T14:18:12Z"
    }
  },
  {
    id: "3",
    name: "Salesforce → HubSpot",
    source: "Salesforce",
    target: "HubSpot",
    status: "warning",
    lastSync: "2025-01-30T14:15:33Z",
    successCount: 2341,
    errorCount: 12,
    avgResponseTime: 0.8,
    uptime: 99.2,
    config: {
      apiKey: "sf-api-key-456",
      retryAttempts: 3,
      timeout: 8000,
      rateLimit: 200
    },
    health: {
      isHealthy: true,
      lastHealthCheck: "2025-01-30T14:15:33Z",
      consecutiveFailures: 0
    }
  },
  {
    id: "4",
    name: "Stripe → Analytics",
    source: "Stripe",
    target: "Google Analytics",
    status: "active",
    lastSync: "2025-01-30T14:20:05Z",
    successCount: 567,
    errorCount: 1,
    avgResponseTime: 0.5,
    uptime: 99.9,
    config: {
      apiKey: "stripe-secret-key-789",
      retryAttempts: 2,
      timeout: 3000,
      rateLimit: 500
    },
    health: {
      isHealthy: true,
      lastHealthCheck: "2025-01-30T14:20:05Z",
      consecutiveFailures: 0
    }
  },
  {
    id: "5",
    name: "Notion → Discord",
    source: "Notion",
    target: "Discord",
    status: "paused",
    lastSync: "2025-01-30T13:45:22Z",
    successCount: 445,
    errorCount: 8,
    avgResponseTime: 1.8,
    uptime: 97.8,
    config: {
      webhookUrl: "https://discord.com/api/webhooks/...",
      retryAttempts: 4,
      timeout: 6000,
      rateLimit: 75
    },
    health: {
      isHealthy: false,
      lastHealthCheck: "2025-01-30T13:45:22Z",
      consecutiveFailures: 5
    }
  }
];

// Enhanced logs data
export const logs: LogEntry[] = [
  {
    id: "1",
    integrationId: "1",
    source: "GitHub",
    target: "Slack",
    timestamp: "2025-01-30T14:23:45Z",
    status: "success",
    message: "Successfully synced 5 pull requests",
    details: "Processed PRs: #123, #124, #125, #126, #127",
    responseTime: 1.2,
    metadata: {
      requestId: "req_123456",
      payload: { event: "pull_request", action: "opened" }
    }
  },
  {
    id: "2",
    integrationId: "2",
    source: "Jira",
    target: "Microsoft Teams",
    timestamp: "2025-01-30T14:20:12Z",
    status: "failed",
    message: "Authentication failed - token expired",
    details: "Error: Invalid token. Please refresh authentication.",
    errorCode: "AUTH_401",
    responseTime: 2.1,
    retryCount: 3,
    metadata: {
      requestId: "req_789012",
      payload: { issue: "PROJ-123", action: "created" }
    }
  },
  {
    id: "3",
    integrationId: "3",
    source: "Salesforce",
    target: "HubSpot",
    timestamp: "2025-01-30T14:18:33Z",
    status: "warning",
    message: "Rate limit approaching (80%)",
    details: "Current usage: 4800/6000 requests per hour",
    responseTime: 0.8,
    metadata: {
      requestId: "req_345678",
      payload: { contact: "lead_456", action: "updated" }
    }
  },
  {
    id: "4",
    integrationId: "1",
    source: "GitHub",
    target: "Slack",
    timestamp: "2025-01-30T14:15:22Z",
    status: "success",
    message: "Webhook received and processed",
    details: "Event: push to main branch",
    responseTime: 0.9,
    metadata: {
      requestId: "req_901234",
      payload: { event: "push", branch: "main" }
    }
  },
  {
    id: "5",
    integrationId: "4",
    source: "Stripe",
    target: "Google Analytics",
    timestamp: "2025-01-30T14:12:11Z",
    status: "failed",
    message: "Failed to process payment event",
    details: "Payment ID: pi_1234567890 - Connection timeout",
    errorCode: "TIMEOUT_408",
    responseTime: 3.0,
    retryCount: 2,
    metadata: {
      requestId: "req_567890",
      payload: { payment: "pi_1234567890", amount: 99.99 }
    }
  },
  {
    id: "6",
    integrationId: "5",
    source: "Notion",
    target: "Discord",
    timestamp: "2025-01-30T14:10:45Z",
    status: "failed",
    message: "Integration paused due to consecutive failures",
    details: "5 consecutive failures detected. Manual intervention required.",
    errorCode: "PAUSED_503",
    responseTime: 2.5,
    retryCount: 5,
    metadata: {
      requestId: "req_234567",
      payload: { page: "page_789", action: "updated" }
    }
  }
];

// Performance metrics
export const performanceMetrics: PerformanceMetrics = {
  totalRequests: 5501,
  successRate: 94.2,
  avgResponseTime: 1.3,
  errorRate: 5.8,
  uptime: 99.4,
  throughput: 125.5
};

// Real-time status updates
export const getRealTimeStatus = () => {
  return integrations.map(integration => ({
    id: integration.id,
    status: integration.status,
    lastSync: integration.lastSync,
    isHealthy: integration.health.isHealthy,
    consecutiveFailures: integration.health.consecutiveFailures
  }));
};

// Error patterns for AI analysis
export const errorPatterns = [
  {
    pattern: "AUTH_401",
    description: "Authentication token expired",
    solution: "Refresh OAuth token or regenerate API key",
    frequency: 15,
    impact: "high"
  },
  {
    pattern: "TIMEOUT_408",
    description: "Request timeout",
    solution: "Increase timeout settings or check network connectivity",
    frequency: 8,
    impact: "medium"
  },
  {
    pattern: "RATE_LIMIT_429",
    description: "Rate limit exceeded",
    solution: "Implement exponential backoff or reduce request frequency",
    frequency: 12,
    impact: "medium"
  }
];
  