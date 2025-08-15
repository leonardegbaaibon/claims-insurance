import { useState } from 'react'

interface SearchResult {
  id: string
  policyholderName: string
  policyNumber: string
  claimType: string
  claimAmount: number
  incidentDate: string
  status: string
  riskScore: number
  duplicateFlag: boolean
  fraudFlag: boolean
  riskFactors: string[]
}

interface RiskHistory {
  policyholderId: string
  totalClaims: number
  totalAmount: number
  averageRiskScore: number
  claimTypes: string[]
  riskTrend: 'increasing' | 'decreasing' | 'stable'
}

interface MarketPrice {
  partName: string
  manufacturer: string
  partNumber: string
  currentPrice: number
  previousPrice: number
  priceChange: number
  priceChangePercent: number
  lastUpdated: string
  supplier: string
  availability: 'in-stock' | 'low-stock' | 'out-of-stock'
  deliveryTime: string
}

interface PartsSearchQuery {
  vehicleMake: string
  vehicleModel: string
  vehicleYear: string
  partCategory: string
  specificPart?: string
}

function ClaimsSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState<'policyholder' | 'claim' | 'risk' | 'market-prices'>('policyholder')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [riskHistory, setRiskHistory] = useState<RiskHistory | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [activeTab, setActiveTab] = useState<'search' | 'results' | 'risk-analysis' | 'market-prices'>('search')
  
  // Market prices state
  const [partsSearchQuery, setPartsSearchQuery] = useState<PartsSearchQuery>({
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    partCategory: ''
  })
  const [marketPrices, setMarketPrices] = useState<MarketPrice[]>([])
  const [isCheckingPrices, setIsCheckingPrices] = useState(false)

  const handleSearch = () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    
    // Simulate search delay
    setTimeout(() => {
      const mockResults: SearchResult[] = [
        {
          id: 'CLM-2024-001',
          policyholderName: 'John Smith',
          policyNumber: 'POL-2024-001',
          claimType: 'Auto Collision',
          claimAmount: 2500,
          incidentDate: '2024-01-15',
          status: 'Approved',
          riskScore: 0.35,
          duplicateFlag: false,
          fraudFlag: false,
          riskFactors: ['Clean driving record', 'Low claim frequency']
        },
        {
          id: 'CLM-2023-045',
          policyholderName: 'John Smith',
          policyNumber: 'POL-2023-001',
          claimType: 'Property Damage',
          claimAmount: 1800,
          incidentDate: '2023-08-22',
          status: 'Paid',
          riskScore: 0.42,
          duplicateFlag: false,
          fraudFlag: false,
          riskFactors: ['Previous property claim', 'Moderate risk']
        },
        {
          id: 'CLM-2024-002',
          policyholderName: 'Sarah Johnson',
          policyNumber: 'POL-2024-002',
          claimType: 'Auto Collision',
          claimAmount: 3200,
          incidentDate: '2024-01-18',
          status: 'Under Review',
          riskScore: 0.78,
          duplicateFlag: true,
          fraudFlag: true,
          riskFactors: ['Multiple recent claims', 'High risk pattern', 'Suspicious circumstances']
        }
      ]

      setSearchResults(mockResults)
      setIsSearching(false)
      setActiveTab('results')

      // Generate mock risk history for the first result
      if (mockResults.length > 0) {
        setRiskHistory({
          policyholderId: mockResults[0].policyholderName,
          totalClaims: 3,
          totalAmount: 7500,
          averageRiskScore: 0.52,
          claimTypes: ['Auto Collision', 'Property Damage'],
          riskTrend: 'increasing'
        })
      }
    }, 1500)
  }

  const handleMarketPriceSearch = () => {
    if (!partsSearchQuery.vehicleMake || !partsSearchQuery.vehicleModel || !partsSearchQuery.vehicleYear || !partsSearchQuery.partCategory) {
      return
    }

    setIsCheckingPrices(true)
    
    // Simulate API call to external market price service
    setTimeout(() => {
      const mockMarketPrices: MarketPrice[] = [
        {
          partName: 'Front Bumper Cover',
          manufacturer: 'OEM',
          partNumber: 'FB-2020-HONDA-CIVIC',
          currentPrice: 485.00,
          previousPrice: 420.00,
          priceChange: 65.00,
          priceChangePercent: 15.48,
          lastUpdated: new Date().toISOString(),
          supplier: 'Honda Parts Direct',
          availability: 'in-stock',
          deliveryTime: '2-3 business days'
        },
        {
          partName: 'Front Bumper Cover',
          manufacturer: 'Aftermarket',
          partNumber: 'FB-2020-CIVIC-AM',
          currentPrice: 320.00,
          previousPrice: 280.00,
          priceChange: 40.00,
          priceChangePercent: 14.29,
          lastUpdated: new Date().toISOString(),
          supplier: 'AutoParts Warehouse',
          availability: 'in-stock',
          deliveryTime: '1-2 business days'
        },
        {
          partName: 'Headlight Assembly (Left)',
          manufacturer: 'OEM',
          partNumber: 'HL-2020-HONDA-CIVIC-L',
          currentPrice: 890.00,
          previousPrice: 780.00,
          priceChange: 110.00,
          priceChangePercent: 14.10,
          lastUpdated: new Date().toISOString(),
          supplier: 'Honda Parts Direct',
          availability: 'low-stock',
          deliveryTime: '3-5 business days'
        },
        {
          partName: 'Fender (Right Front)',
          manufacturer: 'OEM',
          partNumber: 'FD-2020-HONDA-CIVIC-R',
          currentPrice: 650.00,
          previousPrice: 580.00,
          priceChange: 70.00,
          priceChangePercent: 12.07,
          lastUpdated: new Date().toISOString(),
          supplier: 'Honda Parts Direct',
          availability: 'in-stock',
          deliveryTime: '2-3 business days'
        }
      ]

      setMarketPrices(mockMarketPrices)
      setIsCheckingPrices(false)
      setActiveTab('market-prices')
    }, 2000)
  }

  const getRiskScoreColor = (score: number) => {
    if (score < 0.4) return 'text-green-600 bg-green-100'
    if (score < 0.7) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getRiskScoreLabel = (score: number) => {
    if (score < 0.4) return 'Low Risk'
    if (score < 0.7) return 'Medium Risk'
    return 'High Risk'
  }

  const getPriceChangeColor = (change: number) => {
    if (change > 0) return 'text-red-600 bg-red-100'
    if (change < 0) return 'text-green-600 bg-green-100'
    return 'text-gray-600 bg-gray-100'
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'in-stock': return 'text-green-600 bg-green-100'
      case 'low-stock': return 'text-yellow-600 bg-yellow-100'
      case 'out-of-stock': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const renderSearchForm = () => (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Claims Search</h3>
        <p className="text-gray-600">
          Search for policyholder information to detect duplicates, fraud, and access risk history
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Search Type</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: 'policyholder', label: 'Policyholder', icon: '👤', description: 'Search by name, ID, or policy number' },
              { id: 'claim', label: 'Claim', icon: '📋', description: 'Search by claim ID or incident details' },
              { id: 'risk', label: 'Risk Analysis', icon: '⚠️', description: 'Comprehensive risk assessment' },
              { id: 'market-prices', label: 'Market Prices', icon: '💰', description: 'Check current auto parts pricing' }
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setSearchType(type.id as any)}
                className={`p-4 border-2 rounded-lg text-center transition-all duration-200 ${
                  searchType === type.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="text-2xl mb-2">{type.icon}</div>
                <div className="font-medium text-gray-900">{type.label}</div>
                <div className="text-xs text-gray-600 mt-1">{type.description}</div>
              </button>
            ))}
          </div>
        </div>

        {searchType === 'market-prices' ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Make</label>
                <input
                  type="text"
                  value={partsSearchQuery.vehicleMake}
                  onChange={(e) => setPartsSearchQuery(prev => ({ ...prev, vehicleMake: e.target.value }))}
                  placeholder="e.g., Honda, Toyota, Ford"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Model</label>
                <input
                  type="text"
                  value={partsSearchQuery.vehicleModel}
                  onChange={(e) => setPartsSearchQuery(prev => ({ ...prev, vehicleModel: e.target.value }))}
                  placeholder="e.g., Civic, Camry, F-150"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Year</label>
                <input
                  type="text"
                  value={partsSearchQuery.vehicleYear}
                  onChange={(e) => setPartsSearchQuery(prev => ({ ...prev, vehicleYear: e.target.value }))}
                  placeholder="e.g., 2020, 2021, 2022"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Part Category</label>
                <select
                  value={partsSearchQuery.partCategory}
                  onChange={(e) => setPartsSearchQuery(prev => ({ ...prev, partCategory: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select part category</option>
                  <option value="body-parts">Body Parts</option>
                  <option value="mechanical">Mechanical</option>
                  <option value="electrical">Electrical</option>
                  <option value="interior">Interior</option>
                  <option value="exterior">Exterior</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specific Part (Optional)</label>
              <input
                type="text"
                value={partsSearchQuery.specificPart || ''}
                onChange={(e) => setPartsSearchQuery(prev => ({ ...prev, specificPart: e.target.value }))}
                placeholder="e.g., Front Bumper, Headlight, Fender"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleMarketPriceSearch}
                disabled={!partsSearchQuery.vehicleMake || !partsSearchQuery.vehicleModel || !partsSearchQuery.vehicleYear || !partsSearchQuery.partCategory || isCheckingPrices}
                className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isCheckingPrices ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Checking Prices...
                  </div>
                ) : (
                  'Check Market Prices'
                )}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {searchType === 'policyholder' ? 'Policyholder Name, ID, or Policy Number' :
               searchType === 'claim' ? 'Claim ID or Incident Details' :
               'Policyholder Information for Risk Analysis'}
            </label>
            <div className="flex space-x-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  searchType === 'policyholder' ? 'e.g., John Smith, POL-2024-001' :
                  searchType === 'claim' ? 'e.g., CLM-2024-001, rear-end collision' :
                  'e.g., John Smith, SSN, or policy number'
                }
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                onClick={handleSearch}
                disabled={!searchQuery.trim() || isSearching}
                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSearching ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Searching...
                  </div>
                ) : (
                  'Search'
                )}
              </button>
            </div>
          </div>
        )}

        {/* Search Tips */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Search Tips</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {searchType === 'market-prices' ? (
              <>
                <li>• Market prices are updated in real-time from multiple suppliers</li>
                <li>• Compare OEM vs. aftermarket options for cost savings</li>
                <li>• Price changes reflect current market conditions and inflation</li>
                <li>• Delivery times and availability are supplier-specific</li>
              </>
            ) : (
              <>
                <li>• Use partial names or policy numbers for broader results</li>
                <li>• Include incident dates for more specific claim searches</li>
                <li>• Risk analysis provides comprehensive fraud detection and duplicate checking</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  )

  const renderSearchResults = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">Search Results</h3>
        <button
          onClick={() => setActiveTab('search')}
          className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
        >
          ← New Search
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900">
            Found {searchResults.length} results for "{searchQuery}"
          </h4>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claim ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policyholder</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flags</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {searchResults.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{result.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.policyholderName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.claimType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${result.claimAmount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskScoreColor(result.riskScore)}`}>
                      {getRiskScoreLabel(result.riskScore)} ({result.riskScore.toFixed(2)})
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      {result.duplicateFlag && (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                          Duplicate
                        </span>
                      )}
                      {result.fraudFlag && (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                          Fraud
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => setActiveTab('risk-analysis')}
                      className="text-indigo-600 hover:text-indigo-900 font-medium transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderMarketPrices = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Market Price Analysis</h3>
          <p className="text-gray-600 mt-1">
            {partsSearchQuery.vehicleYear} {partsSearchQuery.vehicleMake} {partsSearchQuery.vehicleModel} - {partsSearchQuery.partCategory}
          </p>
        </div>
        <button
          onClick={() => setActiveTab('search')}
          className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
        >
          ← New Search
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900">
            Found {marketPrices.length} pricing options
          </h4>
          <p className="text-sm text-gray-600 mt-1">
            Prices updated in real-time from multiple suppliers via exchange API
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Part</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manufacturer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Change</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Availability</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {marketPrices.map((price, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{price.partName}</div>
                      <div className="text-xs text-gray-500">{price.partNumber}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      price.manufacturer === 'OEM' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {price.manufacturer}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">${price.currentPrice.toFixed(2)}</div>
                    <div className="text-xs text-gray-500">${price.previousPrice.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriceChangeColor(price.priceChange)}`}>
                      {price.priceChange > 0 ? '+' : ''}{price.priceChange.toFixed(2)} ({price.priceChangePercent.toFixed(1)}%)
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{price.supplier}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAvailabilityColor(price.availability)}`}>
                      {price.availability.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{price.deliveryTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Market Analysis Summary */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Market Analysis Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600 mb-1">
              +{marketPrices.reduce((sum, price) => sum + price.priceChangePercent, 0) / marketPrices.length}%
            </div>
            <div className="text-sm text-gray-600">Average Price Increase</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              ${marketPrices.reduce((sum, price) => sum + price.currentPrice, 0) / marketPrices.length}
            </div>
            <div className="text-sm text-gray-600">Average Current Price</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600 mb-1">
              {marketPrices.filter(p => p.manufacturer === 'Aftermarket').length}
            </div>
            <div className="text-sm text-gray-600">Aftermarket Options</div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>💡 Inflation Impact:</strong> Current market prices show significant increases due to supply chain challenges and inflation. 
            Consider aftermarket alternatives for cost savings while maintaining quality standards.
          </p>
        </div>
      </div>
    </div>
  )

  const renderRiskAnalysis = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">Risk Analysis</h3>
        <button
          onClick={() => setActiveTab('results')}
          className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
        >
          ← Back to Results
        </button>
      </div>

      {riskHistory && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Risk Summary */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Risk Summary</h4>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Claims:</span>
                <span className="font-semibold">{riskHistory.totalClaims}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-semibold">${riskHistory.totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average Risk Score:</span>
                <span className={`font-semibold ${getRiskScoreColor(riskHistory.averageRiskScore)}`}>
                  {riskHistory.averageRiskScore.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Risk Trend:</span>
                <span className={`font-semibold ${
                  riskHistory.riskTrend === 'increasing' ? 'text-red-600' :
                  riskHistory.riskTrend === 'decreasing' ? 'text-green-600' :
                  'text-yellow-600'
                }`}>
                  {riskHistory.riskTrend.charAt(0).toUpperCase() + riskHistory.riskTrend.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Risk Factors */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Risk Factors</h4>
            <div className="space-y-3">
              {searchResults[0]?.riskFactors.map((factor, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-gray-700">{factor}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Exchange Benefits */}
      <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
        <h4 className="text-xl font-bold text-gray-900 mb-6 text-center">Exchange Benefits</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h5 className="text-lg font-semibold text-gray-900 mb-2">Duplicate Detection</h5>
            <p className="text-gray-600">Identified potential duplicate claims across multiple insurers</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h5 className="text-lg font-semibold text-gray-900 mb-2">Fraud Detection</h5>
            <p className="text-gray-600">Flagged suspicious patterns and high-risk claims</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h5 className="text-lg font-semibold text-gray-900 mb-2">Risk History</h5>
            <p className="text-gray-600">Comprehensive risk assessment for new policyholders</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-gray-900">Claims Search</h1>
        <p className="mt-2 text-lg text-gray-600">
          Search for policyholder information to detect duplicates, fraud, and access comprehensive risk history
        </p>
      </div>

      {/* Main Content */}
      {activeTab === 'search' && renderSearchForm()}
      {activeTab === 'results' && renderSearchResults()}
      {activeTab === 'risk-analysis' && renderRiskAnalysis()}
      {activeTab === 'market-prices' && renderMarketPrices()}

      {/* Features Overview */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Exchange Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Detect Duplicate Claims</h4>
            <p className="text-gray-600">
              Prevent multiple insurers from paying the same claim by identifying duplicates across the entire insurance ecosystem
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Detect Fraudulent Claims</h4>
            <p className="text-gray-600">
              Use advanced analytics and cross-insurer data to identify suspicious patterns and potential fraud
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Access Risk History</h4>
            <p className="text-gray-600">
              Get comprehensive risk profiles for new policyholders or existing claimants from all participating insurers
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClaimsSearch
