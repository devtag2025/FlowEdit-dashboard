import { supabase } from '../supabase/client'
export async function fetchMyPayments() {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('contractor_payments')
    .select('*')
    .eq('contractor_id', user.id)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function fetchEarningsSummary() {
  const payments = await fetchMyPayments()
  const paid = payments.filter(p => p.status === 'paid')

  const now = new Date()
  const thisMonth = paid.filter(p => {
    const d = new Date(p.created_at)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  })
  const thisYear = paid.filter(p => new Date(p.created_at).getFullYear() === now.getFullYear())

  return {
    thisMonth: thisMonth.reduce((sum, p) => sum + p.amount, 0),
    yearToDate: thisYear.reduce((sum, p) => sum + p.amount, 0),
    totalProjects: paid.length,
    currency: payments[0]?.currency || 'gbp',
  }
}

export async function fetchContractorPayments(contractorId) {
  const { data, error } = await supabase
    .from('contractor_payments')
    .select('*')
    .eq('contractor_id', contractorId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function fetchConnectStatus(profileId) {
  const res = await fetch(`/api/stripe/connect/status?profileId=${profileId}`)
  if (!res.ok) throw new Error('Failed to fetch connect status')
  return res.json()
}

export async function startConnectOnboarding({ profileId, email }) {
  const res = await fetch('/api/stripe/connect', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profileId, email }),
  })
  if (!res.ok) throw new Error('Failed to start onboarding')
  return res.json()
}

export async function createPayment({ contractorId, adminId, amount, currency, description }) {
  const res = await fetch('/api/stripe/payout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contractorId, adminId, amount, currency, description }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to create payment')
  return data
}
