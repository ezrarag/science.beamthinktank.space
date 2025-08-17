'use client'

import { useState, useEffect } from 'react'
import { MapPin, Globe, Mail, Building, University, FlaskConical } from 'lucide-react'
import { supabase, ScienceHub } from '@/lib/supabase'

export default function HubsPage() {
  const [hubs, setHubs] = useState<ScienceHub[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCity, setSelectedCity] = useState('all')
  const [selectedType, setSelectedType] = useState('all')

  const cities = ['all', 'San Francisco', 'New York', 'Boston', 'Austin', 'Seattle', 'Los Angeles', 'Chicago', 'Denver']
  const hubTypes = ['all', 'university', 'lab', 'research_center']

  useEffect(() => {
    fetchHubs()
  }, [selectedCity, selectedType])

  const fetchHubs = async () => {
    try {
      let query = supabase
        .from('science_hubs')
        .select('*')
        .order('name', { ascending: true })

      if (selectedCity !== 'all') {
        query = query.eq('city', selectedCity)
      }
      if (selectedType !== 'all') {
        query = query.eq('type', selectedType)
      }

      const { data, error } = await query
      
      if (error) throw error
      setHubs(data || [])
    } catch (error) {
      console.error('Error fetching hubs:', error)
    } finally {
      setLoading(false)
    }
  }

  const getHubTypeIcon = (type: string) => {
    switch (type) {
      case 'university':
        return <University className="h-5 w-5 text-blue-600" />
      case 'lab':
        return <FlaskConical className="h-5 w-5 text-green-600" />
      case 'research_center':
        return <Building className="h-5 w-5 text-purple-600" />
      default:
        return <Building className="h-5 w-5 text-gray-600" />
    }
  }

  const getHubTypeLabel = (type: string) => {
    switch (type) {
      case 'university':
        return 'University'
      case 'lab':
        return 'Laboratory'
      case 'research_center':
        return 'Research Center'
      default:
        return type
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading science hubs...</p>
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
            <h1 className="text-3xl font-bold text-gray-900">Science Hubs</h1>
            <p className="mt-2 text-gray-600">
              Connect with local universities, laboratories, and research centers
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <select
                id="city"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                {cities.map(city => (
                  <option key={city} value={city}>
                    {city === 'all' ? 'All Cities' : city}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                id="type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                {hubTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : getHubTypeLabel(type)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Hubs Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {hubs.length === 0 ? (
          <div className="text-center py-12">
            <Building className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hubs found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your filters or check back later for new hubs.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hubs.map((hub) => (
              <div key={hub.id} className="card hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {getHubTypeIcon(hub.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {hub.name}
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {getHubTypeLabel(hub.type)}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">
                      {hub.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="truncate">{hub.city}</span>
                      </div>
                      
                      {hub.contact_email && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                          <a 
                            href={`mailto:${hub.contact_email}`}
                            className="text-primary-600 hover:text-primary-700 truncate"
                          >
                            {hub.contact_email}
                          </a>
                        </div>
                      )}
                      
                      {hub.website && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Globe className="h-4 w-4 mr-2 flex-shrink-0" />
                          <a 
                            href={hub.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:text-primary-700 truncate"
                          >
                            Visit Website
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Map Placeholder */}
      <div className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Interactive Map</h2>
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                <p className="text-gray-600">Interactive map showing science hub locations</p>
                <p className="text-sm text-gray-500 mt-1">Coming soon with real-time location data</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
