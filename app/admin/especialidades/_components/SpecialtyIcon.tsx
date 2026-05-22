import {
  Heart,
  Baby,
  Stethoscope,
  Scissors,
  Sparkles,
  Dna,
  Activity,
  Brain,
  Eye,
  Bone,
  Pill,
  Microscope,
  type LucideIcon,
} from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
  heart: Heart,
  baby: Baby,
  stethoscope: Stethoscope,
  scissors: Scissors,
  sparkles: Sparkles,
  dna: Dna,
  activity: Activity,
  brain: Brain,
  eye: Eye,
  bone: Bone,
  pill: Pill,
  microscope: Microscope,
}

export default function SpecialtyIcon({
  name,
  size = 20,
  className = '',
}: {
  name: string
  size?: number
  className?: string
}) {
  const Icon = ICON_MAP[name] ?? Stethoscope
  return <Icon size={size} className={className} />
}
