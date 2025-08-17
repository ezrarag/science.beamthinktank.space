import Link from 'next/link'
import { Beaker, Users, GraduationCap, Heart } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Beaker className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">BEAM Science</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/projects" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                  Research Projects
                </Link>
                <Link href="/hubs" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                  Science Hubs
                </Link>
                <Link href="/classes" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                  Classes & Workshops
                </Link>
                <Link href="/donate" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                  Donate
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Advancing Science Through
              <span className="text-primary-600"> Community</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
              BEAM Science & Research Academy connects researchers, students, and supporters 
              to accelerate scientific discovery and innovation across communities.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/projects" className="btn-primary">
                Explore Research
              </Link>
              <Link href="/donate" className="btn-secondary">
                Support Science
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What We Do
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Building bridges between science and community
            </p>
          </div>
          
          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-lg bg-primary-100">
                <Beaker className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Research Projects</h3>
              <p className="mt-2 text-sm text-gray-500">
                Discover and support cutting-edge scientific research
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-lg bg-primary-100">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Science Hubs</h3>
              <p className="mt-2 text-sm text-gray-500">
                Connect with local universities, labs, and research centers
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-lg bg-primary-100">
                <GraduationCap className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Education</h3>
              <p className="mt-2 text-sm text-gray-500">
                Classes and workshops for all skill levels
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-lg bg-primary-100">
                <Heart className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Support</h3>
              <p className="mt-2 text-sm text-gray-500">
                Fund equipment, stipends, and research initiatives
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Make a Difference?
            </h2>
            <p className="mt-4 text-lg text-primary-100">
              Your support helps advance scientific research and education in communities worldwide.
            </p>
            <div className="mt-8">
              <Link href="/donate" className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors duration-200">
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
