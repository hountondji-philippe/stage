import { Megaphone, Bell, Calendar, Info, AlertCircle, CheckCircle2, FileText, Clock, GraduationCap } from "lucide-react";

const ICON_MAP = {
  Megaphone,
  Bell,
  Calendar,
  Info,
  AlertCircle,
  CheckCircle2,
  FileText,
  Clock,
  GraduationCap,
};

export function getIconComponent(nom) {
  return ICON_MAP[nom] || Info;
}