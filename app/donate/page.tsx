'use client'

import { useState } from 'react'
import { Heart, CreditCard, Shield, CheckCircle } from 'lucide-react'
import { donationItems, DonationItem } from '@/lib/stripe'

export default function DonatePage() {
  const [selectedItem, setSelectedItem] = useState<DonationItem | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [donorName, setDonorName] = useState('')
  const [donorEmail, setDonorEmail] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [donationComplete, setDonationComplete] = useState(false)

  const handleDonation = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // In a real implementation, this would create a Stripe checkout session
      // For now, we'll simulate the process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setDonationComplete(true)
      setIsProcessing(false)
    } catch (error) {
      console.error('Donation error:', error)
      setIsProcessing(false)
    }
  }

  const getAmount = () => {
    if (customAmount) return parseFloat(customAmount)
    if (selectedItem) return selectedItem.amount
    return 0
  }

  if (donationComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-600 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h1>
            <p className="text-gray-600 mb-6">
              Your donation has been received and will help advance scientific research and education.
            </p>
            <button
              onClick={() => setDonationComplete(false)}
              className="btn-primary"
            >
              Make Another Donation
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Support Science</h1>
            <p className="mt-2 text-gray-600">
              Your donation helps fund equipment, student stipends, and research initiatives
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Donation Options */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose Your Impact</h2>
            
            <div className="space-y-4">
              {donationItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`card cursor-pointer transition-all duration-200 ${
                    selectedItem?.id === item.id
                      ? 'ring-2 ring-primary-500 bg-primary-50'
                      : 'hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <Heart className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                      <div className="text-primary-600 font-semibold">
                        ${item.amount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="mt-6">
              <label htmlFor="customAmount" className="block text-sm font-medium text-gray-700 mb-2">
                Or enter a custom amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  id="customAmount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value)
                    setSelectedItem(null)
                  }}
                  placeholder="0.00"
                  min="1"
                  step="0.01"
                  className="block w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          </div>

          {/* Donation Form */}
          <div>
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Complete Your Donation</h2>
              
              <form onSubmit={handleDonation} className="space-y-4">
                <div>
                  <label htmlFor="donorName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="donorName"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label htmlFor="donorEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="donorEmail"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                {/* Donation Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Donation Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-medium">${getAmount().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Processing Fee:</span>
                      <span className="font-medium">$0.00</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between">
                      <span className="text-gray-900 font-medium">Total:</span>
                      <span className="text-gray-900 font-bold">${getAmount().toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={getAmount() === 0 || isProcessing}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Donate ${getAmount().toLocaleString()}
                    </div>
                  )}
                </button>
              </form>

              {/* Security Notice */}
              <div className="mt-6 flex items-center text-sm text-gray-500">
                <Shield className="h-4 w-4 mr-2" />
                Your payment is secure and encrypted
              </div>
            </div>
          </div>
        </div>

        {/* Impact Stories */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Your Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-green-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">$5K</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Equipment Funded</h3>
              <p className="text-sm text-gray-600">
                Advanced microscopes and lab instruments for student research
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">25</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Students Supported</h3>
              <p className="text-sm text-gray-600">
                Monthly stipends enabling full-time research participation
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">12</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Labs Enhanced</h3>
              <p className="text-sm text-gray-600">
                Laboratory facilities upgraded with modern research equipment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
