import { BILLING_PACKAGES, getBillingPackage } from '../../data/packages'
import type {
  BillingPackageId,
  CreditAccountSnapshot,
  CreditLedgerEntry,
  OrgRole,
} from './types'

const LEDGER_KEY = 'iqmaster.orgCredits.ledger.v1'
const ORGANIZATION_NAME = 'IQMaster Demo Organization'

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function createLedgerId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `credit-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function readStoredLedger(): CreditLedgerEntry[] {
  if (!canUseStorage()) return []

  try {
    const raw = window.localStorage.getItem(LEDGER_KEY)
    return raw ? (JSON.parse(raw) as CreditLedgerEntry[]) : []
  } catch {
    return []
  }
}

function writeStoredLedger(entries: CreditLedgerEntry[]) {
  if (!canUseStorage()) return
  window.localStorage.setItem(LEDGER_KEY, JSON.stringify(entries))
}

function currentBalance(entries: CreditLedgerEntry[]) {
  return entries.reduce((sum, entry) => sum + entry.amount, 0)
}

function appendLedgerEntry(entry: Omit<CreditLedgerEntry, 'id' | 'createdAt' | 'balanceAfter'>) {
  const entries = readStoredLedger()
  const nextEntry: CreditLedgerEntry = {
    ...entry,
    id: createLedgerId(),
    createdAt: new Date().toISOString(),
    balanceAfter: currentBalance(entries) + entry.amount,
  }

  writeStoredLedger([...entries, nextEntry])
  return nextEntry
}

export function getCreditLedger() {
  return [...readStoredLedger()].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
}

export function getCreditSummary(): CreditAccountSnapshot {
  const entries = readStoredLedger()
  const remainingCredits = currentBalance(entries)
  const totalPurchased = entries
    .filter((entry) => entry.amount > 0)
    .reduce((sum, entry) => sum + entry.amount, 0)
  const totalConsumed = entries
    .filter((entry) => entry.type === 'assessment_unlock')
    .reduce((sum, entry) => sum + Math.abs(entry.amount), 0)
  const apiAccess = entries.some((entry) => entry.apiAccessGranted)

  return {
    organizationName: ORGANIZATION_NAME,
    remainingCredits,
    totalPurchased,
    totalConsumed,
    apiAccess,
    roles: ['org_admin', 'coach_teacher', 'member'],
  }
}

export function purchaseCreditPackage(
  packageId: BillingPackageId,
  actorName = 'Demo org admin',
): CreditLedgerEntry {
  const plan = getBillingPackage(packageId)

  if (!plan) {
    throw new Error(`Unknown package: ${packageId}`)
  }

  return appendLedgerEntry({
    type: 'package_purchase',
    amount: plan.credits,
    actorRole: 'org_admin',
    actorName,
    packageId: plan.id,
    apiAccessGranted: plan.apiAccess,
    note: `${plan.name} package purchased (${plan.credits} credits)`,
  })
}

export function consumeAssessmentCredit(
  memberName = 'Demo member',
  actorName = 'Demo coach',
): CreditLedgerEntry | null {
  const entries = readStoredLedger()

  if (currentBalance(entries) < 1) {
    return null
  }

  return appendLedgerEntry({
    type: 'assessment_unlock',
    amount: -1,
    actorRole: 'coach_teacher',
    actorName,
    memberName,
    note: `Report unlocked for ${memberName}`,
  })
}

export function recordCreditAdjustment(
  amount: number,
  note: string,
  actorRole: OrgRole = 'org_admin',
  actorName = 'Demo org admin',
) {
  return appendLedgerEntry({
    type: 'manual_adjustment',
    amount,
    actorRole,
    actorName,
    note,
  })
}

export function clearCreditLedger() {
  if (!canUseStorage()) return
  window.localStorage.removeItem(LEDGER_KEY)
}

export function formatCreditDate(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export function packageCreditTotal() {
  return BILLING_PACKAGES.reduce((sum, plan) => sum + plan.credits, 0)
}
