import type { BillingPackage, BillingPackageId } from '../lib/billing/types'

export const BILLING_PACKAGES: BillingPackage[] = [
  {
    id: 'family',
    name: 'Family',
    audience: 'family',
    audienceLabel: 'Families',
    credits: 5,
    demoPrice: 49,
    cadence: 'one-time demo pack',
    description: 'A small shared pack for parents and siblings who want several report unlocks.',
    features: [
      '5 completed assessment report unlocks',
      'Parent-friendly history for household use',
      'Good for repeat attempts across family members',
    ],
  },
  {
    id: 'teacher',
    name: 'Teacher',
    audience: 'teacher',
    audienceLabel: 'Teachers',
    credits: 30,
    demoPrice: 249,
    cadence: 'classroom pack',
    description: 'Enough credits to run a class or small learning cohort through IQMaster.',
    features: [
      '30 completed assessment report unlocks',
      'Simple seat assignment placeholder',
      'Designed for school and tutoring groups',
    ],
    recommended: true,
  },
  {
    id: 'coach',
    name: 'Coach',
    audience: 'coach',
    audienceLabel: 'Coaches',
    credits: 50,
    demoPrice: 399,
    cadence: 'coaching pack',
    description: 'A larger pack for coaches and advisors who test clients throughout a season.',
    features: [
      '50 completed assessment report unlocks',
      'Coach/teacher role ready',
      'Client progress notes placeholder',
    ],
  },
  {
    id: 'company',
    name: 'Company',
    audience: 'company',
    audienceLabel: 'Companies',
    credits: 100,
    demoPrice: 749,
    cadence: 'team pack',
    description: 'Bulk report unlocks for internal learning, development, and team programs.',
    features: [
      '100 completed assessment report unlocks',
      'Org admin credit dashboard',
      'Teams and departments placeholder',
    ],
  },
  {
    id: 'hr-pro',
    name: 'HR Pro',
    audience: 'hr',
    audienceLabel: 'HR teams',
    credits: 250,
    demoPrice: 1499,
    cadence: 'enterprise demo pack',
    description: 'High-volume credits plus a future API access flag for HR workflows.',
    features: [
      '250 completed assessment report unlocks',
      'API access flag for future integration',
      'Bulk candidate and employee workflows placeholder',
    ],
    apiAccess: true,
  },
]

export function getBillingPackage(packageId: BillingPackageId) {
  return BILLING_PACKAGES.find((plan) => plan.id === packageId) ?? null
}
