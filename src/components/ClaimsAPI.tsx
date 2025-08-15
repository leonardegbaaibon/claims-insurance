import { useState } from 'react'

interface APIDocumentation {
  endpoint: string
  method: string
  description: string
  parameters: string[]
  responseExample: string
  status: 'active' | 'deprecated' | 'beta'
}

interface ClaimData {
  id: string
  timestamp: string
  source: string
  dataType: string
  status: 'intercepted' | 'processed' | 'error'
  details: string
}

function ClaimsAPI() {
  const [activeTab, setActiveTab] = useState<'documentation' | 'monitoring' | 'testing'>('documentation')
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('')

  const apiEndpoints: APIDocumentation[] = [
    {
      endpoint: '/api/v1/claims/intercept',
      method: 'POST',
      description: 'Intercepts claims filed electronically by policyholders',
      parameters: ['claimData', 'policyholderId', 'timestamp', 'source'],
      responseExample: '{"status": "intercepted", "claimId": "CLM-2024-001", "processingTime": "45ms"}',
      status: 'active'
    },
    {
      endpoint: '/api/v1/claims/validate',
      method: 'POST',
      description: 'Validates claim data format and completeness',
      parameters: ['claimData', 'validationRules'],
      responseExample: '{"valid": true, "errors": [], "warnings": []}',
      status: 'active'
    },
    {
      endpoint: '/api/v1/claims/enrich',
      method: 'POST',
      description: 'Enriches claim data with additional risk information',
      parameters: ['claimId', 'enrichmentTypes'],
      responseExample: '{"enrichedData": {...}, "riskScore": 0.75}',
      status: 'active'
    },
    {
      endpoint: '/api/v1/claims/duplicate-check',
      method: 'GET',
      description: 'Checks for potential duplicate claims',
      parameters: ['policyholderId', 'incidentDate', 'claimType'],
      responseExample: '{"duplicates": [], "similarClaims": [...]}',
      status: 'active'
    },
    {
      endpoint: '/api/v1/claims/fraud-analysis',
      method: 'POST',
      description: 'Performs automated fraud detection analysis',
      parameters: ['claimData', 'analysisLevel'],
      responseExample: '{"fraudScore": 0.15, "riskFactors": [...], "recommendations": [...]}',
      status: 'beta'
    }
  ]

  const sampleClaimData: ClaimData[] = [
    {
      id: 'INT-001',
      timestamp: '2024-01-25T10:30:00Z',
      source: 'Policyholder Portal',
      dataType: 'Auto Claim',
      status: 'intercepted',
      details: 'Claim filed electronically for rear-end collision'
    },
    {
      id: 'INT-002',
      timestamp: '2024-01-25T11:15:00Z',
      source: 'Mobile App',
      dataType: 'Property Claim',
      status: 'processed',
      details: 'Water damage claim with photos uploaded'
    },
    {
      id: 'INT-003',
      timestamp: '2024-01-25T12:00:00Z',
      source: 'Third-party System',
      dataType: 'Medical Claim',
      status: 'intercepted',
      details: 'Emergency room visit claim from hospital system'
    }
  ]

  const renderDocumentation = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">API Endpoints</h3>
          <p className="text-sm text-gray-600">Complete API documentation for claims interception and processing</p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {apiEndpoints.map((endpoint) => (
            <div key={endpoint.endpoint} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                      endpoint.method === 'POST' ? 'bg-indigo-100 text-indigo-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {endpoint.method}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      endpoint.status === 'active' ? 'bg-green-100 text-green-800' :
                      endpoint.status === 'beta' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {endpoint.status}
                    </span>
                  </div>
                  
                  <h4 className="text-lg font-medium text-gray-900 mb-2">{endpoint.endpoint}</h4>
                  <p className="text-gray-600 mb-3">{endpoint.description}</p>
                  
                  <div className="mb-3">
                    <span className="text-sm font-medium text-gray-700">Parameters:</span>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {endpoint.parameters.map((param) => (
                        <span key={param} className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                          {param}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-gray-700">Response Example:</span>
                    <pre className="mt-1 p-3 bg-gray-50 rounded text-xs text-gray-800 overflow-x-auto">
                      {endpoint.responseExample}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderMonitoring = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Claims Today</p>
              <p className="text-2xl font-semibold text-gray-900">1,247</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Success Rate</p>
              <p className="text-2xl font-semibold text-gray-900">99.2%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg Response Time</p>
              <p className="text-2xl font-semibold text-gray-900">45ms</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Real-time Claims Interception</h3>
          <p className="text-sm text-gray-600">Live monitoring of claims being intercepted from various sources</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sampleClaimData.map((claim) => (
                <tr key={claim.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{claim.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{claim.timestamp}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{claim.source}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{claim.dataType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      claim.status === 'processed' 
                        ? 'bg-green-100 text-green-800' 
                        : claim.status === 'error'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{claim.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderTesting = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">API Testing Console</h3>
          <p className="text-gray-600">Test the claims API endpoints with sample data</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Endpoint</label>
            <select
              value={selectedEndpoint}
              onChange={(e) => setSelectedEndpoint(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Choose an endpoint to test</option>
              {apiEndpoints.map((endpoint) => (
                <option key={endpoint.endpoint} value={endpoint.endpoint}>
                  {endpoint.method} {endpoint.endpoint}
                </option>
              ))}
            </select>
          </div>

          {selectedEndpoint && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Request Body (JSON)</label>
                <textarea
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
                  placeholder="Enter JSON request body..."
                  defaultValue={JSON.stringify({
                    claimData: {
                      type: "Auto Collision",
                      amount: 2500,
                      incidentDate: "2024-01-25",
                      description: "Rear-end collision"
                    },
                    policyholderId: "POL-001",
                    timestamp: new Date().toISOString(),
                    source: "Test Console"
                  }, null, 2)}
                />
              </div>

              <div className="flex space-x-4">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                  Send Request
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors">
                  Clear
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Response</label>
                <div className="bg-gray-50 rounded-md p-4">
                  <p className="text-sm text-gray-500">Click "Send Request" to see the API response</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-gray-900">Claims API</h1>
        <p className="mt-2 text-lg text-gray-600">
          API documentation and monitoring for claims interception and processing
        </p>
      </div>

      {/* API Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'documentation', label: 'API Documentation', icon: '📚' },
              { id: 'monitoring', label: 'Real-time Monitoring', icon: '📊' },
              { id: 'testing', label: 'Testing Console', icon: '🧪' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'documentation' && renderDocumentation()}
          {activeTab === 'monitoring' && renderMonitoring()}
          {activeTab === 'testing' && renderTesting()}
        </div>
      </div>

      {/* Process Flow */}
      <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Claims Interception Process</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">1. Claims Filed</h4>
            <p className="text-gray-600">Policyholders file claims electronically through various channels</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">2. Intercepted</h4>
            <p className="text-gray-600">Our API automatically intercepts and processes all claim data</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">3. Analyzed</h4>
            <p className="text-gray-600">Claims are analyzed for duplicates, fraud, and risk assessment</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClaimsAPI
