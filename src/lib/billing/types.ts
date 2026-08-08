export type OrgRole = 'org_admin' | 'coach_teacher' | 'member'

export type PackageAudience = 'family' | 'teacher' | 'coach' | 'company' | 'hr'

export type BillingPackageId = 'family' | 'teacher' | 'coach' | 'company' | 'hr-pro'

export interface BillingPackage {
  id: BillingPackageId
  name: string
  audience: PackageAudience
  audienceLabel: string
  credits: number
  demoPrice: number
  cadence: string
  description: string
  features: string[]
  recommended?: boolean
  apiAccess?: boolean
}

export type CreditLedgerEntryType = 'package_purchase' | 'assessment_unlock' | 'manual_adjustment'

export interface CreditLedgerEntry {
  id: string
  type: CreditLedgerEntryType
  createdAt: string
  amount: number
  balanceAfter: number
  actorRole: OrgRole
  actorName: string
  note: string
  packageId?: BillingPackageId
  memberName?: string
  apiAccessGranted?: boolean
}

export interface CreditAccountSnapshot {
  organizationName: string
  remainingCredits: number
  totalPurchased: number
  totalConsumed: number
  apiAccess: boolean
  roles: OrgRole[]
}
