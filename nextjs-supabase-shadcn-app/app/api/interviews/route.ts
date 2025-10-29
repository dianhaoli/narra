import { NextResponse } from 'next/server'
import { isSupabaseConfigured, supabase } from '@/lib/supabaseClient'
import { revalidatePath } from 'next/cache'

export async function POST(request: Request) {
  if (!isSupabaseConfigured || !supabase) {
    return NextResponse.json(
      { error: 'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.' },
      { status: 501 }
    )
  }

  const form = await request.formData()
  const title = String(form.get('title') ?? '').trim()
  const description = String(form.get('description') ?? '')
  const recordedAt = String(form.get('recordedAt') ?? '')
  const locationLabel = String(form.get('location') ?? '')
  const tagsRaw = String(form.get('tags') ?? '')
  const audioFile = form.get('audioFile') as File | null
  const transcriptFile = form.get('transcriptFile') as File | null

  if (!title || !audioFile) {
    return NextResponse.json({ error: 'Title and audio file are required.' }, { status: 400 })
  }

  try {
    // 1) Upload files to Supabase Storage (bucket: 'interviews')
    const timestamp = Date.now()
    const safeTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const audioPath = `audio/${timestamp}-${safeTitle}-${audioFile.name}`

    const audioUpload = await supabase.storage.from('interviews').upload(audioPath, audioFile, {
      contentType: audioFile.type || 'audio/mpeg',
      upsert: false,
    })
    if (audioUpload.error) throw audioUpload.error

    let transcriptUrl: string | null = null
    if (transcriptFile) {
      const transcriptPath = `transcripts/${timestamp}-${safeTitle}-${transcriptFile.name}`
      const transcriptUpload = await supabase.storage.from('interviews').upload(transcriptPath, transcriptFile, {
        contentType: transcriptFile.type || 'application/octet-stream',
        upsert: false,
      })
      if (transcriptUpload.error) throw transcriptUpload.error
      const { data: tPub } = supabase.storage.from('interviews').getPublicUrl(transcriptPath)
      transcriptUrl = tPub.publicUrl
    }

    // Build public URL for the audio
    const { data: aPub } = supabase.storage.from('interviews').getPublicUrl(audioPath)
    const audioUrl = aPub.publicUrl

    // 2) Insert interview row
    const tags = tagsRaw
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    const insertPayload = {
      title,
      description: description || null,
      candidate_name: null as string | null,
      role: null as string | null,
      scheduled_for: recordedAt || new Date().toISOString(),
      location_label: locationLabel || null,
      location_latitude: null as number | null,
      location_longitude: null as number | null,
      tags: tags.length ? tags : null,
      audio_url: audioUrl,
      transcript: transcriptUrl, // storing URL in transcript column
      profile_username: null as string | null,
    }

    const { data, error } = await supabase
      .from('interviews')
      .insert(insertPayload)
      .select('id')
      .maybeSingle()

    if (error) throw error

    // Revalidate archive pages so the new interview appears
    revalidatePath('/interviews')
    revalidatePath('/')

    return NextResponse.json({ id: data?.id, ok: true })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Upload failed' }, { status: 400 })
  }
}
