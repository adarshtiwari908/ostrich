import { Integration, LogEntry, errorPatterns } from '../data/logs';

export interface CopilotResponse {
  type: 'analysis' | 'solution' | 'suggestion' | 'error';
  message: string;
  confidence: number;
  actions?: CopilotAction[];
  relatedLogs?: string[];
  metrics?: {
    impact: 'low' | 'medium' | 'high';
    urgency: 'low' | 'medium' | 'high';
    estimatedResolutionTime: string;
  };
}

export interface CopilotAction {
  id: string;
  title: string;
  description: string;
  type: 'retry' | 'configure' | 'investigate' | 'optimize';
  execute: () => Promise<void>;
}

export class AICopilot {
  private integrations: Integration[];
  private logs: LogEntry[];

  constructor(integrations: Integration[], logs: LogEntry[]) {
    this.integrations = integrations;
    this.logs = logs;
  }

  async analyzeQuery(query: string): Promise<CopilotResponse> {
    const lowerQuery = query.toLowerCase();
    
    // Analyze integration health
    if (lowerQuery.includes('health') || lowerQuery.includes('status')) {
      return this.analyzeSystemHealth();
    }
    
    // Analyze specific integration
    if (lowerQuery.includes('github') || lowerQuery.includes('slack')) {
      return this.analyzeIntegration('1'); // GitHub → Slack
    }
    
    if (lowerQuery.includes('jira') || lowerQuery.includes('teams')) {
      return this.analyzeIntegration('2'); // Jira → Teams
    }
    
    // Analyze errors
    if (lowerQuery.includes('error') || lowerQuery.includes('fail') || lowerQuery.includes('issue')) {
      return this.analyzeErrors();
    }
    
    // Performance analysis
    if (lowerQuery.includes('performance') || lowerQuery.includes('slow') || lowerQuery.includes('speed')) {
      return this.analyzePerformance();
    }
    
    // General help
    return this.provideGeneralHelp();
  }

  private analyzeSystemHealth(): CopilotResponse {
    const unhealthyIntegrations = this.integrations.filter(i => !i.health.isHealthy);
    const errorCount = this.logs.filter(l => l.status === 'failed').length;
    const successRate = this.calculateSuccessRate();

    return {
      type: 'analysis',
      message: `System Health Analysis:\n\n🔴 ${unhealthyIntegrations.length} integrations are unhealthy\n📊 Overall success rate: ${successRate.toFixed(1)}%\n❌ ${errorCount} errors in the last 24 hours\n\n${unhealthyIntegrations.length > 0 ? 'I recommend checking the authentication tokens and network connectivity for the failing integrations.' : 'All integrations are performing well!'}`,
      confidence: 0.95,
      actions: unhealthyIntegrations.length > 0 ? [
        {
          id: 'retry-all',
          title: 'Retry All Failed Integrations',
          description: 'Attempt to retry all integrations that are currently failing',
          type: 'retry',
          execute: async () => {
            console.log('Retrying all failed integrations...');
            // Implementation would go here
          }
        },
        {
          id: 'health-check',
          title: 'Run Health Check',
          description: 'Perform a comprehensive health check on all integrations',
          type: 'investigate',
          execute: async () => {
            console.log('Running health check...');
            // Implementation would go here
          }
        }
      ] : undefined,
      metrics: {
        impact: unhealthyIntegrations.length > 2 ? 'high' : 'medium',
        urgency: unhealthyIntegrations.length > 0 ? 'medium' : 'low',
        estimatedResolutionTime: unhealthyIntegrations.length > 0 ? '15-30 minutes' : 'No action needed'
      }
    };
  }

  private analyzeIntegration(integrationId: string): CopilotResponse {
    const integration = this.integrations.find(i => i.id === integrationId);
    if (!integration) {
      return {
        type: 'error',
        message: 'Integration not found',
        confidence: 0
      };
    }

    const recentLogs = this.logs.filter(l => l.integrationId === integrationId).slice(0, 5);
    const errorLogs = recentLogs.filter(l => l.status === 'failed');
    const avgResponseTime = recentLogs.reduce((sum, log) => sum + (log.responseTime || 0), 0) / recentLogs.length;

    let message = `**${integration.name} Analysis:**\n\n`;
    message += `📊 Status: ${integration.status}\n`;
    message += `⚡ Avg Response Time: ${avgResponseTime.toFixed(2)}s\n`;
    message += `✅ Success Rate: ${((integration.successCount / (integration.successCount + integration.errorCount)) * 100).toFixed(1)}%\n`;
    message += `🔄 Last Sync: ${new Date(integration.lastSync).toLocaleString()}\n\n`;

    if (errorLogs.length > 0) {
      message += `**Recent Issues:**\n`;
      errorLogs.forEach(log => {
        message += `• ${log.message} (${log.errorCode})\n`;
      });
      message += `\n**Recommendations:**\n`;
      
      if (integration.health.consecutiveFailures > 3) {
        message += `• High failure rate detected. Consider pausing and investigating.\n`;
      }
      if (avgResponseTime > 2) {
        message += `• Response time is slow. Check network connectivity and API limits.\n`;
      }
    } else {
      message += `✅ No recent issues detected. Integration is performing well!`;
    }

    return {
      type: 'analysis',
      message,
      confidence: 0.9,
      actions: [
        {
          id: 'retry-integration',
          title: `Retry ${integration.name}`,
          description: `Attempt to retry the ${integration.name} integration`,
          type: 'retry',
          execute: async () => {
            console.log(`Retrying ${integration.name}...`);
            // Implementation would go here
          }
        },
        {
          id: 'configure-integration',
          title: `Configure ${integration.name}`,
          description: `Open configuration panel for ${integration.name}`,
          type: 'configure',
          execute: async () => {
            console.log(`Opening configuration for ${integration.name}...`);
            // Implementation would go here
          }
        }
      ],
      relatedLogs: recentLogs.map(l => l.id),
      metrics: {
        impact: integration.status === 'error' ? 'high' : 'low',
        urgency: integration.health.consecutiveFailures > 3 ? 'high' : 'low',
        estimatedResolutionTime: integration.status === 'error' ? '5-10 minutes' : 'No action needed'
      }
    };
  }

  private analyzeErrors(): CopilotResponse {
    const recentErrors = this.logs.filter(l => l.status === 'failed').slice(0, 10);
    const errorPatterns = this.identifyErrorPatterns(recentErrors);

    let message = `**Error Analysis:**\n\n`;
    message += `📊 Total Errors: ${recentErrors.length}\n`;
    message += `🔍 Error Patterns: ${errorPatterns.length}\n\n`;

    if (errorPatterns.length > 0) {
      message += `**Common Issues:**\n`;
      errorPatterns.forEach(pattern => {
        message += `• ${pattern.pattern}: ${pattern.count} occurrences\n`;
      });
      message += `\n**Recommended Actions:**\n`;
      
      if (errorPatterns.find(p => p.pattern === 'AUTH_401')) {
        message += `• Refresh authentication tokens for affected integrations\n`;
      }
      if (errorPatterns.find(p => p.pattern === 'TIMEOUT_408')) {
        message += `• Increase timeout settings or check network connectivity\n`;
      }
      if (errorPatterns.find(p => p.pattern === 'RATE_LIMIT_429')) {
        message += `• Implement exponential backoff or reduce request frequency\n`;
      }
    }

    return {
      type: 'analysis',
      message,
      confidence: 0.85,
      actions: [
        {
          id: 'fix-auth-errors',
          title: 'Fix Authentication Errors',
          description: 'Automatically refresh expired tokens',
          type: 'configure',
          execute: async () => {
            console.log('Fixing authentication errors...');
            // Implementation would go here
          }
        },
        {
          id: 'optimize-timeouts',
          title: 'Optimize Timeout Settings',
          description: 'Adjust timeout settings based on error patterns',
          type: 'optimize',
          execute: async () => {
            console.log('Optimizing timeout settings...');
            // Implementation would go here
          }
        }
      ],
      metrics: {
        impact: recentErrors.length > 5 ? 'high' : 'medium',
        urgency: recentErrors.length > 10 ? 'high' : 'medium',
        estimatedResolutionTime: recentErrors.length > 5 ? '20-30 minutes' : '10-15 minutes'
      }
    };
  }

  private analyzePerformance(): CopilotResponse {
    const slowIntegrations = this.integrations.filter(i => i.avgResponseTime > 2);
    const highErrorIntegrations = this.integrations.filter(i => i.errorCount > 5);

    let message = `**Performance Analysis:**\n\n`;
    message += `🐌 Slow Integrations: ${slowIntegrations.length}\n`;
    message += `❌ High Error Rate: ${highErrorIntegrations.length}\n\n`;

    if (slowIntegrations.length > 0) {
      message += `**Slow Integrations:**\n`;
      slowIntegrations.forEach(integration => {
        message += `• ${integration.name}: ${integration.avgResponseTime}s\n`;
      });
      message += `\n**Optimization Suggestions:**\n`;
      message += `• Implement caching for frequently accessed data\n`;
      message += `• Use connection pooling for database integrations\n`;
      message += `• Consider async processing for non-critical operations\n`;
    }

    return {
      type: 'analysis',
      message,
      confidence: 0.8,
      actions: [
        {
          id: 'optimize-performance',
          title: 'Optimize Performance',
          description: 'Apply performance optimizations to slow integrations',
          type: 'optimize',
          execute: async () => {
            console.log('Optimizing performance...');
            // Implementation would go here
          }
        }
      ],
      metrics: {
        impact: slowIntegrations.length > 2 ? 'high' : 'medium',
        urgency: 'low',
        estimatedResolutionTime: '30-60 minutes'
      }
    };
  }

  private provideGeneralHelp(): CopilotResponse {
    return {
      type: 'suggestion',
      message: `**Ostrich Copilot Help:**\n\nI can help you with:\n\n🔍 **Analysis:**\n• "How is the system health?"\n• "Analyze GitHub → Slack integration"\n• "What errors are occurring?"\n\n⚡ **Actions:**\n• "Retry failed integrations"\n• "Fix authentication errors"\n• "Optimize performance"\n\n📊 **Monitoring:**\n• "Show me recent logs"\n• "What's the success rate?"\n• "Which integrations are slow?"\n\nJust ask me anything about your integrations!`,
      confidence: 0.9
    };
  }

  private calculateSuccessRate(): number {
    const totalRequests = this.logs.length;
    const successfulRequests = this.logs.filter(l => l.status === 'success').length;
    return totalRequests > 0 ? (successfulRequests / totalRequests) * 100 : 0;
  }

  private identifyErrorPatterns(errors: LogEntry[]): Array<{pattern: string, count: number}> {
    const patterns: {[key: string]: number} = {};
    
    errors.forEach(error => {
      if (error.errorCode) {
        patterns[error.errorCode] = (patterns[error.errorCode] || 0) + 1;
      }
    });

    return Object.entries(patterns)
      .map(([pattern, count]) => ({ pattern, count }))
      .sort((a, b) => b.count - a.count);
  }

  async suggestOptimizations(): Promise<CopilotResponse> {
    const suggestions = [];
    
    // Check for high error rates
    const highErrorIntegrations = this.integrations.filter(i => i.errorCount > 5);
    if (highErrorIntegrations.length > 0) {
      suggestions.push(`Consider implementing exponential backoff for ${highErrorIntegrations.map(i => i.name).join(', ')}`);
    }

    // Check for slow integrations
    const slowIntegrations = this.integrations.filter(i => i.avgResponseTime > 2);
    if (slowIntegrations.length > 0) {
      suggestions.push(`Optimize response times for ${slowIntegrations.map(i => i.name).join(', ')}`);
    }

    // Check for authentication issues
    const authErrors = this.logs.filter(l => l.errorCode === 'AUTH_401');
    if (authErrors.length > 0) {
      suggestions.push('Set up automatic token refresh to prevent authentication failures');
    }

    return {
      type: 'suggestion',
      message: suggestions.length > 0 
        ? `**Optimization Suggestions:**\n\n${suggestions.map(s => `• ${s}`).join('\n')}`
        : 'No optimization suggestions at this time. Your integrations are well-configured!',
      confidence: 0.8
    };
  }
} 