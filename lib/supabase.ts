import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface ResearchProject {
  id: string
  title: string
  description: string
  category: string
  city: string
  funding_goal: number
  current_funding: number
  researcher_name: string
  status: 'active' | 'completed' | 'funded'
  created_at: string
  updated_at: string
}

export interface ScienceHub {
  id: string
  name: string
  city: string
  type: 'university' | 'lab' | 'research_center'
  description: string
  contact_email: string
  website: string
  latitude: number
  longitude: number
}

export interface ClassWorkshop {
  id: string
  title: string
  description: string
  instructor: string
  city: string
  start_date: string
  end_date: string
  max_participants: number
  current_participants: number
  price: number
  category: string
  status: 'upcoming' | 'active' | 'completed'
}
