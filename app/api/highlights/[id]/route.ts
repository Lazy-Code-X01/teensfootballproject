import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const { title, thumbnail, videoUrl, duration, date } = await req.json()
  const highlight = await db.highlight.update({ where: { id }, data: { title, thumbnail, videoUrl, duration, date } })
  return NextResponse.json(highlight)
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  await db.highlight.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
