import { useState } from 'react'

interface Claim {
  id: string
  policyholderName: string
  policyNumber: string
  claimType: string
  claimAmount: number
  incidentDate: string
  description: string
  status: 'pending' | 'submitted' | 'error'
  policyholderEmail?: string
  phoneNumber?: string
  address?: string
  vehicleInfo?: string
  propertyInfo?: string
}

function BulkClaimsSubmission() {
  const [claims, setClaims] = useState<Claim[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFileName, setUploadedFileName] = useState('')
  const [uploadError, setUploadError] = useState<string | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File size exceeds 10MB limit. Please select a smaller file.')
      return
    }

    // Validate file type
    const allowedTypes = ['.csv', '.xlsx', '.json']
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'))
    if (!allowedTypes.includes(fileExtension)) {
      setUploadError('Invalid file type. Please upload CSV, Excel (.xlsx), or JSON files only.')
      return
    }

    setUploadError(null)
    setUploadedFileName(file.name)
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate file processing with realistic timing
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          processUploadedFile(file)
          return 100
        }
        return prev + Math.random() * 15 + 5 // Variable progress increments
      })
    }, 300)
  }

  const processUploadedFile = (file: File) => {
    // Generate claims based on file type and size
    const fileSize = file.size
    const isLargeFile = fileSize > 50000 // 50KB threshold
    
    if (isLargeFile) {
      generateLargeDataset()
    } else {
      generateStandardDataset()
    }
  }

  const generateStandardDataset = () => {
    const standardClaims: Claim[] = [
      {
        id: 'CLM-2024-001',
        policyholderName: 'John Smith',
        policyNumber: 'POL-2024-001',
        claimType: 'Auto Collision',
        claimAmount: 2500,
        incidentDate: '2024-01-15',
        description: 'Rear-end collision on Highway 101',
        status: 'pending',
        policyholderEmail: 'john.smith@email.com',
        phoneNumber: '555-0101',
        address: '123 Main St, Anytown CA',
        vehicleInfo: '2020 Honda Civic - VIN:1HGBH41JXMN109186'
      },
      {
        id: 'CLM-2024-002',
        policyholderName: 'Sarah Johnson',
        policyNumber: 'POL-2024-002',
        claimType: 'Property Damage',
        claimAmount: 1800,
        incidentDate: '2024-01-18',
        description: 'Water damage from burst pipe',
        status: 'pending',
        policyholderEmail: 'sarah.j@email.com',
        phoneNumber: '555-0102',
        address: '456 Oak Ave, Somewhere NY',
        propertyInfo: '123 Oak Ave - Single family home'
      },
      {
        id: 'CLM-2024-003',
        policyholderName: 'Michael Brown',
        policyNumber: 'POL-2024-003',
        claimType: 'Medical',
        claimAmount: 3200,
        incidentDate: '2024-01-20',
        description: 'Emergency room visit for chest pain',
        status: 'pending',
        policyholderEmail: 'mike.brown@email.com',
        phoneNumber: '555-0103',
        address: '789 Pine Rd, Elsewhere TX'
      }
    ]
    setClaims(standardClaims)
  }

  const generateLargeDataset = () => {
    const largeClaims: Claim[] = Array.from({ length: 15 }, (_, index) => ({
      id: `CLM-2024-${String(index + 1).padStart(3, '0')}`,
      policyholderName: `Policyholder ${index + 1}`,
      policyNumber: `POL-2024-${String(index + 1).padStart(3, '0')}`,
      claimType: ['Auto Collision', 'Property Damage', 'Medical', 'Auto Theft'][index % 4],
      claimAmount: Math.floor(Math.random() * 10000) + 1000,
      incidentDate: new Date(2024, 0, 15 + index).toISOString().split('T')[0],
      description: `Claim description for incident ${index + 1}`,
      status: 'pending',
      policyholderEmail: `policyholder${index + 1}@email.com`,
      phoneNumber: `555-${String(index + 1).padStart(4, '0')}`,
      address: `${100 + index} Main St, City ${index + 1}, ST`
    }))
    setClaims(largeClaims)
  }

  const submitClaims = async () => {
    if (claims.length === 0) return

    // Simulate API call
    const updatedClaims = claims.map(claim => ({ ...claim, status: 'submitted' as const }))
    setClaims(updatedClaims)

    // Show success notification
    setTimeout(() => {
      // In a real app, this would show a toast notification
      console.log(`${claims.length} claims submitted successfully`)
    }, 1000)
  }

  const removeClaim = (id: string) => {
    setClaims(prev => prev.filter(claim => claim.id !== id))
  }

  const clearAll = () => {
    setClaims([])
    setUploadedFileName('')
    setUploadProgress(0)
    setUploadError(null)
  }

  const getTotalAmount = () => {
    return claims.reduce((sum, claim) => sum + claim.claimAmount, 0)
  }

  const getClaimTypeBreakdown = () => {
    const breakdown = claims.reduce((acc, claim) => {
      acc[claim.claimType] = (acc[claim.claimType] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    return breakdown
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-gray-900">Bulk Claims Submission</h1>
        <p className="mt-2 text-lg text-gray-600">
          Submit multiple claims for processing through our secure bulk upload system
        </p>
      </div>

      {/* File Upload Section */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-6 py-8">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Claims File</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Supported formats: CSV, Excel (.xlsx), JSON. Maximum file size: 10MB
            </p>
            
            <div className="space-y-4">
              <input
                type="file"
                accept=".csv,.xlsx,.json"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                disabled={isUploading}
              />
              <label
                htmlFor="file-upload"
                className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer transition-colors ${
                  isUploading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isUploading ? 'Processing...' : 'Select File'}
              </label>
            </div>

            {uploadError && (
              <div className="mt-4 p-3 bg-red-50 rounded-md border border-red-200">
                <p className="text-sm text-red-800">{uploadError}</p>
              </div>
            )}

            {uploadedFileName && (
              <div className="mt-4 p-3 bg-green-50 rounded-md border border-green-200">
                <p className="text-sm text-green-800">
                  <strong>File uploaded:</strong> {uploadedFileName}
                </p>
              </div>
            )}

            {isUploading && (
              <div className="mt-6">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{Math.round(uploadProgress)}% Complete</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Claims Summary */}
      {claims.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Claims Summary
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {claims.length} claims • Total: ${getTotalAmount().toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  Types: {Object.entries(getClaimTypeBreakdown()).map(([type, count]) => `${type}: ${count}`).join(', ')}
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={clearAll}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={submitClaims}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Submit All Claims
                </button>
              </div>
            </div>
          </div>

          {/* Claims Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claim ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policyholder</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {claims.map((claim) => (
                  <tr key={claim.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{claim.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{claim.policyholderName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{claim.policyNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{claim.claimType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${claim.claimAmount.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{claim.incidentDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        claim.status === 'submitted' 
                          ? 'bg-green-100 text-green-800' 
                          : claim.status === 'error'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => removeClaim(claim.id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Submission Guidelines</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-gray-900 mb-2">Required Fields</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Claim ID (unique identifier)</li>
              <li>• Policyholder name</li>
              <li>• Policy number</li>
              <li>• Claim type</li>
              <li>• Claim amount</li>
              <li>• Incident date</li>
              <li>• Description</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-gray-900 mb-2">File Requirements</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Maximum file size: 10MB</li>
              <li>• Supported formats: CSV, Excel (.xlsx), JSON</li>
              <li>• UTF-8 encoding recommended</li>
              <li>• Headers should match field names exactly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BulkClaimsSubmission
