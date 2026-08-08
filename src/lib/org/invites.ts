import { getSupabase } from '../supabase'

export interface OrgInvite {
  token: string
  organizationName: string
  audience: string
  createdBy: string
  maxUses: number
  useCount: number
  active: boolean
  createdAt: string
}

export interface OrgParticipant {
  id: string
  inviteToken: string
  organizationName: string
  memberName: string
  testId?: string
  status: string
  createdAt: string
}

const INVITES_KEY = 'iqmaster.orgInvites.v1'
const PARTICIPANTS_KEY = 'iqmaster.orgParticipants.v1'

function readInvites(): OrgInvite[] {
  try {
    return JSON.parse(localStorage.getItem(INVITES_KEY) ?? '[]') as OrgInvite[]
  } catch {
    return []
  }
}

function writeInvites(items: OrgInvite[]) {
  localStorage.setItem(INVITES_KEY, JSON.stringify(items))
}

function readParticipants(): OrgParticipant[] {
  try {
    return JSON.parse(localStorage.getItem(PARTICIPANTS_KEY) ?? '[]') as OrgParticipant[]
  } catch {
    return []
  }
}

function writeParticipants(items: OrgParticipant[]) {
  localStorage.setItem(PARTICIPANTS_KEY, JSON.stringify(items))
}

function makeToken(): string {
  const part = Math.random().toString(36).slice(2, 10).toUpperCase()
  return `INV-${part}`
}

export function listInvites(): OrgInvite[] {
  return readInvites().sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export function listParticipants(organizationName?: string): OrgParticipant[] {
  const all = readParticipants().sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  if (!organizationName) return all
  return all.filter((p) => p.organizationName === organizationName)
}

export async function createInvite(input: {
  organizationName: string
  audience: string
  createdBy?: string
  maxUses?: number
}): Promise<OrgInvite> {
  const invite: OrgInvite = {
    token: makeToken(),
    organizationName: input.organizationName.trim() || 'IQMaster Org',
    audience: input.audience,
    createdBy: input.createdBy?.trim() || 'Org admin',
    maxUses: input.maxUses ?? 50,
    useCount: 0,
    active: true,
    createdAt: new Date().toISOString(),
  }
  const items = readInvites()
  items.unshift(invite)
  writeInvites(items)

  const sb = getSupabase()
  if (sb) {
    await sb.from('org_invites').insert({
      token: invite.token,
      organization_name: invite.organizationName,
      audience: invite.audience,
      created_by: invite.createdBy,
      max_uses: invite.maxUses,
      use_count: 0,
      active: true,
    })
  }
  return invite
}

export function getInvite(token: string): OrgInvite | null {
  return readInvites().find((i) => i.token === token.trim().toUpperCase() || i.token === token.trim()) ?? null
}

export async function acceptInvite(token: string, memberName: string): Promise<OrgParticipant | null> {
  const invite = getInvite(token)
  if (!invite || !invite.active || invite.useCount >= invite.maxUses) return null
  invite.useCount += 1
  writeInvites(readInvites().map((i) => (i.token === invite.token ? invite : i)))

  const participant: OrgParticipant = {
    id: `p_${Date.now().toString(36)}`,
    inviteToken: invite.token,
    organizationName: invite.organizationName,
    memberName: memberName.trim(),
    status: 'joined',
    createdAt: new Date().toISOString(),
  }
  const people = readParticipants()
  people.unshift(participant)
  writeParticipants(people)

  const sb = getSupabase()
  if (sb) {
    await sb.from('org_participants').insert({
      invite_token: participant.inviteToken,
      organization_name: participant.organizationName,
      member_name: participant.memberName,
      status: 'joined',
    })
    await sb
      .from('org_invites')
      .update({ use_count: invite.useCount })
      .eq('token', invite.token)
  }
  return participant
}

export function attachParticipantTest(memberName: string, inviteToken: string, testId: string) {
  const people = readParticipants().map((p) =>
    p.memberName === memberName && p.inviteToken === inviteToken ? { ...p, testId, status: 'started' } : p,
  )
  writeParticipants(people)
}

export function inviteJoinPath(token: string): string {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
  return `${base}/join/${token}`
}
