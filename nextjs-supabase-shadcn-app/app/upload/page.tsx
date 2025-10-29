import UploadForm from '../../components/upload-form';
import PageTransition from '../../components/page-transition';

const UploadPage = () => {
    return (
        <PageTransition className="space-y-10">
            <header className="mx-auto max-w-6xl space-y-3 rounded-[28px] border border-subtle bg-surface p-8 shadow-[0_30px_70px_-45px_rgba(36,30,26,0.48)] md:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Upload</p>
                <div className="space-y-3">
                    <h1 className="text-3xl font-semibold text-[color:var(--foreground)] md:text-4xl">Share a new interview</h1>
                    <p className="max-w-2xl text-sm leading-relaxed text-muted">
                        Upload audio recordings, transcripts, and descriptive metadata. Narra stores files securely in Supabase and
                        publishes them for listeners with maps, transcripts, and tags.
                    </p>
                </div>
            </header>
            <div className="mx-auto max-w-6xl">
                <UploadForm />
            </div>
        </PageTransition>
    );
};

export default UploadPage;