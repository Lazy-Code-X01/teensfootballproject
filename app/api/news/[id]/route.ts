import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json()
  const item = await db.newsItem.update({ where: { id: Number(params.id) }, data: body })
  return NextResponse.json(item)
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  await db.newsItem.delete({ where: { id: Number(params.id) } })
  return NextResponse.json({ ok: true })
}
