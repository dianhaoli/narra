"use client";

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from './ui';

export type UploadFormValues = {
  title: string;
  description: string;
  recordedAt: string;
  location: string;
  tags: string;
  audioFile: File | null;
  transcriptFile: File | null;
};

const defaultValues: UploadFormValues = {
  title: '',
  description: '',
  recordedAt: '',
  location: '',
  tags: '',
  audioFile: null,
  transcriptFile: null,
};

const UploadForm = () => {
  const [values, setValues] = useState<UploadFormValues>(defaultValues);
  const [status, setStatus] = useState<'idle' | 'saving'>('idle');
  const router = useRouter();

  const handleChange = (field: keyof UploadFormValues) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, files } = event.target as HTMLInputElement;

    if (files) {
      setValues((current) => ({ ...current, [field]: files[0] ?? null }));
      return;
    }

    setValues((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus('saving');

    try {
      const form = new FormData();
      form.set('title', values.title);
      form.set('description', values.description);
      form.set('recordedAt', values.recordedAt);
      form.set('location', values.location);
      form.set('tags', values.tags);
      if (values.audioFile) form.set('audioFile', values.audioFile);
      if (values.transcriptFile) form.set('transcriptFile', values.transcriptFile);

      const res = await fetch('/api/interviews', {
        method: 'POST',
        body: form,
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload.error || 'Upload failed');
      }

      const payload = (await res.json()) as { id?: number };
      setStatus('idle');
      if (payload?.id) {
        router.push(`/interviews/${payload.id}`);
        router.refresh();
      } else {
        router.push('/interviews');
      }
    } catch (err) {
      console.error('Upload failed:', err);
      setStatus('idle');
      // Non-blocking: keep user on page; in a real app show a toast
    }
  };

  const isSaving = status === 'saving';

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
  <section className="grid gap-8 rounded-3xl border border-subtle bg-surface-solid p-8 shadow-[0_32px_60px_-40px_rgba(35,29,24,0.45)] transition duration-300 md:grid-cols-2 md:p-10">
        <div className="space-y-6">
          <header className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Story details</p>
            <h2 className="text-2xl font-semibold text-[color:var(--foreground)]">Interview information</h2>
            <p className="text-sm leading-relaxed text-muted">
              These details help listeners discover the story. You can revise them once the upload is saved.
            </p>
          </header>

          <Input
            label="Title"
            placeholder="Remembering the Fillmore District"
            value={values.title}
            onChange={handleChange('title')}
            required
          />

          <label className="flex flex-col gap-2 text-sm font-medium text-[color:var(--foreground)]">
            <span className="text-xs uppercase tracking-[0.18em] text-muted">Description</span>
            <textarea
              className="min-h-[140px] w-full rounded-2xl border border-subtle bg-surface-solid px-4 py-3 text-sm leading-relaxed text-[color:var(--foreground)] shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] transition-all duration-200 placeholder:text-[color:var(--foreground-muted)] focus-visible:border-[color:var(--accent)] focus-visible:shadow-[0_0_0_4px_var(--accent-soft)] focus-visible:outline-none"
              placeholder="Give listeners an overview of the interview."
              value={values.description}
              onChange={handleChange('description')}
              required
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Recorded on" type="date" value={values.recordedAt} onChange={handleChange('recordedAt')} />
            <Input
              label="Location"
              placeholder="San Francisco, CA"
              value={values.location}
              onChange={handleChange('location')}
            />
          </div>

          <Input
            label="Tags"
            placeholder="community, civil-rights, jazz"
            helperText="Comma-separated keywords to help others find this interview."
            value={values.tags}
            onChange={handleChange('tags')}
          />
        </div>

        <div className="space-y-6">
          <header className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Media uploads</p>
            <h2 className="text-2xl font-semibold text-[color:var(--foreground)]">Audio & transcript</h2>
            <p className="text-sm leading-relaxed text-muted">
              Upload the primary audio recording along with an optional transcript document for accessibility.
            </p>
          </header>

          <label className="flex flex-col gap-2 text-sm font-medium text-[color:var(--foreground)]">
            <span className="text-xs uppercase tracking-[0.18em] text-muted">Audio file</span>
            <input
              type="file"
              accept="audio/*"
              onChange={handleChange('audioFile')}
              className="w-full cursor-pointer rounded-2xl border border-dashed border-subtle bg-soft px-4 py-4 text-sm text-muted transition hover:border-[color:var(--accent)] file:mr-4 file:rounded-full file:border-0 file:bg-[color:var(--accent)] file:px-5 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-[color:var(--accent-strong)]"
              required
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-[color:var(--foreground)]">
            <span className="text-xs uppercase tracking-[0.18em] text-muted">Transcript (optional)</span>
            <input
              type="file"
              accept="text/plain,application/pdf"
              onChange={handleChange('transcriptFile')}
              className="w-full cursor-pointer rounded-2xl border border-dashed border-subtle bg-soft px-4 py-4 text-sm text-muted transition hover:border-[color:var(--accent)] file:mr-4 file:rounded-full file:border-0 file:bg-accent-soft file:px-5 file:py-2 file:text-sm file:font-medium file:text-[color:var(--accent)] hover:file:bg-[rgba(58,125,124,0.2)]"
            />
          </label>

          <div className="rounded-2xl border border-subtle bg-soft p-5 text-sm leading-relaxed text-muted">
            Files are stored in Supabase Storage. After upload, metadata is written to the <code className="rounded bg-accent-soft px-1 py-0.5">interviews</code> table for the archive.
          </div>

          {isSaving && (
            <div className="space-y-2 rounded-2xl border border-[color:var(--accent)] bg-accent-soft p-4 text-sm text-[color:var(--accent)]">
              <div className="flex items-center justify-between">
                <span>Uploading interview…</span>
                <span className="text-xs uppercase tracking-[0.2em]">In progress</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-accent-soft">
                <div className="h-full w-2/3 animate-[pulse_1.2s_ease-in-out_infinite] rounded-full bg-[color:var(--accent)]"></div>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="flex flex-col-reverse gap-3 text-sm sm:flex-row sm:justify-end">
        <Button type="button" variant="ghost" onClick={() => setValues(defaultValues)}>
          Reset form
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Uploading…' : 'Upload interview'}
        </Button>
      </div>
    </form>
  );
};

export default UploadForm;
