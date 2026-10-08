import {
  Building2,
  CalendarDays,
  Compass,
  ConciergeBell,
  FlaskConical,
  Flag,
  GraduationCap,
  Hammer,
  HeartPulse,
  Laptop,
  Leaf,
  type LucideIcon,
  Palette,
  PiggyBank,
  Scale,
  School,
  Signpost,
  Sparkles,
  Sun,
  Users,
} from 'lucide-react';

/** One icon per field: used for the field cards and the direction stop on the map. */
export const FIELD_ICONS: Record<string, LucideIcon> = {
  helse: HeartPulse,
  oppvekst: School,
  bygg: Hammer,
  natur: Leaf,
  kreativ: Palette,
  service: ConciergeBell,
  okonomi: PiggyBank,
  it: Laptop,
  samfunn: Scale,
  forskning: FlaskConical,
};

const QUESTION_ICONS: Record<string, LucideIcon> = {
  felt: Compass,
  arbeidsform: Users,
  storrelse: Building2,
  sted: Sun,
  hverdag: CalendarDays,
  rolle: Flag,
  utdanning: GraduationCap,
  drivkraft: Sparkles,
};

/** The icon for a stop on the map; a field's direction step gets the field's icon. */
export function questionIcon(questionId: string): LucideIcon {
  return QUESTION_ICONS[questionId] ?? FIELD_ICONS[questionId] ?? Signpost;
}
