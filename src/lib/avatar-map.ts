import avatarRiya from "@/assets/avatar-riya.jpg";
import avatarMaya from "@/assets/avatar-maya.jpg";
import avatarSara from "@/assets/avatar-sara.jpg";
import avatarPriya from "@/assets/avatar-priya.jpg";
import avatarAnika from "@/assets/avatar-anika.jpg";
import avatarElena from "@/assets/avatar-elena.jpg";
import avatarJenny from "@/assets/avatar-jenny.jpg";
import avatarJessy from "@/assets/avatar-jessy.jpg";
import avatarKaren from "@/assets/avatar-karen.jpg";
import avatarKatherine from "@/assets/avatar-katherine.jpg";
import avatarMary from "@/assets/avatar-mary.jpg";
import avatarMia from "@/assets/avatar-mia.jpg";
import avatarPriyaSharma from "@/assets/avatar-priya-sharma.jpg";
import avatarRachael from "@/assets/avatar-rachael.jpg";
import avatarSarah from "@/assets/avatar-sarah.jpg";

// Maps mentor name slugs to avatar imports.
// DB mentor IDs have dynamic suffixes (e.g. "jenny-choo-mn6qdy7l"),
// so we match by the name portion only.
const AVATAR_BY_SLUG: Record<string, string> = {
  "riya-kapoor": avatarRiya,
  "maya-johnson": avatarMaya,
  "sara-lin": avatarSara,
  "priya-nair": avatarPriya,
  "anika-patel": avatarAnika,
  "elena-rodriguez": avatarElena,
  "jenny-choo": avatarJenny,
  "jessy-dsouza": avatarJessy,
  "karen-rodriguez": avatarKaren,
  "katherine-johnson": avatarKatherine,
  "mary-soc": avatarMary,
  "mia-chen": avatarMia,
  "priya-sharma": avatarPriyaSharma,
  "rachael-royce": avatarRachael,
  "sarah-jenkins": avatarSarah,
};

/**
 * Look up avatar for a mentor by ID.
 * Tries exact match first, then strips any trailing hash suffix.
 */
export function getMentorAvatar(mentorId: string): string | undefined {
  if (AVATAR_BY_SLUG[mentorId]) return AVATAR_BY_SLUG[mentorId];
  // Strip trailing "-xxxxx" hash from DB-generated IDs
  const nameSlug = mentorId.replace(/-[a-z0-9]{6,}$/, "");
  return AVATAR_BY_SLUG[nameSlug];
}
