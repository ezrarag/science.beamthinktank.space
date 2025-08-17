import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export interface DonationItem {
  id: string
  name: string
  description: string
  amount: number
  type: 'equipment' | 'stipend' | 'lab_funding' | 'general'
}

export const donationItems: DonationItem[] = [
  {
    id: 'equipment',
    name: 'Research Equipment',
    description: 'Fund laboratory equipment and scientific instruments',
    amount: 5000,
    type: 'equipment'
  },
  {
    id: 'stipend',
    name: 'Student Stipend',
    description: 'Support student researchers with monthly stipends',
    amount: 2500,
    type: 'stipend'
  },
  {
    id: 'lab_funding',
    name: 'Laboratory Funding',
    description: 'General laboratory operations and maintenance',
    amount: 10000,
    type: 'lab_funding'
  },
  {
    id: 'general',
    name: 'General Support',
    description: 'Unrestricted funding for research initiatives',
    amount: 1000,
    type: 'general'
  }
]
