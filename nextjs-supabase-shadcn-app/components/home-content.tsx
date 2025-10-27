'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { SampleInterview, SampleProfile } from '../data/mockData';
import InterviewCard from './interview-card';
import { Button, Input } from './ui';

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { when: 'beforeChildren', staggerChildren: 0.08 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.33, 1, 0.68, 1] as const } },
};

type HomeContentProps = {
  interviews: SampleInterview[];
  profiles: SampleProfile[];
};

const HomeContent = ({ interviews, profiles }: HomeContentProps) => {
  const primaryProfile = profiles[0];

  return (
    <div className="space-y-12 text-[color:var(--foreground)]">
      <motion.section
        variants={fadeIn}
        initial="hidden"
        animate="show"
        className="overflow-hidden rounded-[36px] border border-subtle bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.92),_rgba(243,233,220,0.8))] p-10 shadow-[0_40px_80px_-48px_rgba(41,34,28,0.55)] md:p-14"
      >
        <div className="flex flex-col gap-10 md:flex-row md:items-center">
          <div className="flex-1 space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Narra oral histories</p>
            <h1 className="text-4xl font-semibold leading-tight text-[color:var(--foreground)] sm:text-5xl">
              A calm home for voices, memories, and the places they belong.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted">
              Collect, curate, and share community interviews with maps, transcripts, and rich story context. Narra helps
              you publish a living archive that feels as thoughtful as the voices inside it.
            </p>
            <div className="flex flex-col gap-3 text-sm sm:flex-row">
              <Link
                href="/upload"
                className="inline-flex items-center justify-center rounded-full bg-[color:var(--accent)] px-6 py-2.5 font-medium text-white shadow-[0_24px_60px_-32px_rgba(46,107,106,0.7)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[color:var(--accent-strong)]"
              >
                Upload a story
              </Link>
              <Link
                href="/map"
                className="inline-flex items-center justify-center rounded-full border border-subtle px-6 py-2.5 font-medium text-[color:var(--accent)] shadow-[0_16px_40px_-28px_rgba(41,34,28,0.35)] transition-colors duration-200 hover:border-[color:var(--accent)] hover:text-[color:var(--accent-strong)]"
              >
                Explore the map
              </Link>
            </div>
          </div>
          <div className="relative -mx-4 flex flex-1 justify-center md:mx-0">
            <div className="relative h-64 w-64 overflow-hidden rounded-[30px] border border-subtle bg-surface shadow-[0_30px_65px_-40px_rgba(41,34,28,0.55)] sm:h-72 sm:w-72">
              {primaryProfile ? (
                <Image
                  src={primaryProfile.avatarUrl}
                  alt={primaryProfile.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-accent-soft text-[color:var(--accent)]">
                  Voices
                </div>
              )}
              <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-subtle bg-surface p-4 text-sm text-muted shadow-[0_18px_36px_-26px_rgba(41,34,28,0.38)]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">Featured narrator</p>
                <p className="mt-1 font-medium text-[color:var(--foreground)]">{primaryProfile?.name ?? 'Storyteller'}</p>
                <p className="text-xs">{primaryProfile?.headline ?? 'Community voice'}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={fadeIn}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.05 }}
        className="rounded-[28px] border border-subtle bg-surface p-6 shadow-[0_28px_60px_-44px_rgba(36,30,26,0.5)] md:p-10"
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-[color:var(--foreground)]">Search the archive</h2>
              <p className="text-sm text-muted">Discover interviews by place, theme, or narrator.</p>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted">
              <span className="inline-flex h-2 w-2 rounded-full bg-[color:var(--accent)]"></span>
              Updated weekly with new stories
            </div>
          </div>
          <form className="flex w-full flex-col gap-4 sm:flex-row">
            <Input
              placeholder="Search for civil rights, Fillmore District, mentorship…"
              className="rounded-full bg-surface-solid px-5 py-3 text-base"
            />
            <Button type="button" className="rounded-full px-8">
              Search archive
            </Button>
          </form>
        </div>
      </motion.section>

      <motion.section
        variants={staggerChildren}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        <motion.header variants={fadeIn} className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Featured storytellers</p>
            <h2 className="text-2xl font-semibold">Narrators keeping memory alive</h2>
          </div>
          {primaryProfile && (
            <Link href={`/profile/${primaryProfile.username}`} className="accent-link text-sm font-medium">
              View profile →
            </Link>
          )}
        </motion.header>
        <motion.div
          variants={staggerChildren}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {profiles.map((profile) => (
            <motion.article
              key={profile.username}
              variants={cardVariant}
              className="narra-card narra-card--compact"
            >
              <div className="narra-card__media narra-card__media--profile">
                <div className="narra-card__portrait-ring">
                  <Image
                    src={profile.avatarUrl}
                    alt={profile.name}
                    width={70}
                    height={70}
                    className="narra-card__portrait"
                  />
                </div>
                <div className="narra-card__meta">
                  <span className="narra-card__label">Storyteller</span>
                  <h3 className="narra-card__title">{profile.name}</h3>
                  <p className="text-sm text-muted">{profile.headline}</p>
                </div>
              </div>
              <p className="narra-card__description line-clamp-4">{profile.bio}</p>
              <div className="narra-card__tags">
                {profile.interviews.map((interviewId) => (
                  <span key={interviewId} className="narra-card__chip">
                    Interview #{interviewId}
                  </span>
                ))}
              </div>
              <div className="narra-card__footer">
                <p>{profile.interviews.length} published stories</p>
                <Link href={`/profile/${profile.username}`} className="narra-card__link accent-link">
                  Open profile →
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        variants={staggerChildren}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        <motion.header variants={fadeIn} className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Latest interviews</p>
            <h2 className="text-2xl font-semibold">Freshly recorded stories</h2>
          </div>
          <Link href="/interviews" className="accent-link text-sm font-medium">
            Browse archive →
          </Link>
        </motion.header>
        <motion.div
          variants={staggerChildren}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {interviews.map((interview) => (
            <motion.div key={interview.id} variants={cardVariant}>
              <InterviewCard interview={interview} showProfileLink />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </div>
  );
};

export default HomeContent;
