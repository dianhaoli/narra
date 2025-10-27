import Link from "next/link"
import { Calendar, MapPin, User, Play, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { SampleInterview, SampleProfile } from "@/data/mockData"

type InterviewCardProps = {
  interview: SampleInterview
  uploader?: SampleProfile | null
  showProfileLink?: boolean
  className?: string
}

const formatInterviewDate = (value: string) => {
  try {
    return new Intl.DateTimeFormat(undefined, { month: "long", day: "numeric", year: "numeric" }).format(
      new Date(value),
    )
  } catch (error) {
    return "Date to be announced"
  }
}

const getUploaderInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((segment) => segment[0]?.toUpperCase())
    .join("") || "N"

const InterviewCard = ({ interview, uploader, showProfileLink = false, className }: InterviewCardProps) => {
  const interviewDate = formatInterviewDate(interview.scheduledFor)
  const locationLabel = interview.location?.label ?? "Unknown location"
  const tags = interview.tags ?? []
  const uploaderName = uploader?.name ?? interview.candidateName ?? "Archive Contributor"
  const uploaderAvatar = uploader?.avatarUrl
  const profileHref = uploader ? `/profile/${uploader.username}` : undefined
  const interviewHref = `/interviews/${interview.id}`

  return (
    <Card className={cn("group overflow-hidden transition-all shadow-md shadow-black/5 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 hover:-translate-y-1", className)}>
      <Link href={interviewHref} className="block">
        <div className="relative aspect-video overflow-hidden bg-accent/10">
          <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-transparent" />
          </div>
          <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(58,125,124,0.32),_rgba(255,253,247,0.92)_55%,_rgba(243,233,220,0.88)_100%)] text-sm font-medium text-foreground/70">
            Listen to the story
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Button size="icon" className="h-14 w-14 rounded-full bg-primary/90 hover:bg-primary">
              <Play className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </Link>

      <CardHeader className="space-y-3 pb-3">
        <Link href={interviewHref} className="group/heading block space-y-2">
          <h3 className="text-lg font-semibold leading-tight tracking-tight text-balance line-clamp-2 transition-colors group-hover/heading:text-primary">
            {interview.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4 flex-shrink-0" />
            <span className="font-medium text-foreground">{interview.candidateName}</span>
            {interview.role && <span className="text-muted-foreground">· {interview.role}</span>}
          </div>
        </Link>
      </CardHeader>

      <CardContent className="space-y-4 pb-4">
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">{interview.description}</p>

        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span>{interviewDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            <span className="line-clamp-1">{locationLabel}</span>
          </div>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs font-normal">
                #{tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs font-normal">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>

  <CardFooter className="flex flex-col gap-3 border-t border-border pt-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-9 w-9 ring-2 ring-border/80 group-hover:ring-primary/40 transition-all">
            {uploaderAvatar ? (
              <AvatarImage src={uploaderAvatar} alt={uploaderName} />
            ) : (
              <AvatarFallback className="text-sm font-semibold bg-primary/10 text-primary">
                {getUploaderInitials(uploaderName)}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex flex-col text-sm text-muted-foreground">
            <span className="text-xs uppercase tracking-wide">Uploaded by</span>
            <span className="font-medium text-foreground">{uploaderName}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" className="flex-1">
            <Link href={interviewHref} className="inline-flex items-center justify-center gap-1">
              View interview
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
          {showProfileLink && profileHref && (
            <Button asChild variant="outline" className="flex-1">
              <Link href={profileHref} className="inline-flex items-center justify-center gap-1">
                View profile
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

export default InterviewCard
