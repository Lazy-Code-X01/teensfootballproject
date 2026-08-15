import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  const body = await req.json()
  const { name, email, phone, ageGroup, message } = body

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const submission = await db.contactSubmission.create({
    data: { name, email, phone: phone ?? '', ageGroup: ageGroup ?? '', message },
  })

  return NextResponse.json({ ok: true, id: submission.id }, { status: 201 })
}
