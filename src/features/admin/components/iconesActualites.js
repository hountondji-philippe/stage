import { Megaphone, Trophy, GraduationCap, Bell, Calendar, BookOpen, Award, Info } from "lucide-react";

export const ICONES_ACTUALITES = [
  { nom: "Megaphone", Icon: Megaphone },
  { nom: "Trophy", Icon: Trophy },
  { nom: "GraduationCap", Icon: GraduationCap },
  { nom: "Bell", Icon: Bell },
  { nom: "Calendar", Icon: Calendar },
  { nom: "BookOpen", Icon: BookOpen },
  { nom: "Award", Icon: Award },
  { nom: "Info", Icon: Info },
];

export function iconeParNom(nom) {
  return ICONES_ACTUALITES.find((i) => i.nom === nom)?.Icon || Megaphone;
}