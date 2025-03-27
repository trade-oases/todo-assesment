import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTranslationKey(word: string) {
  switch (word) {
    case "TODO":
      return "todo"
    case "IN_PROGRESS":
      return "in_progress"
    case "DONE":
      return "done"
    default:
      return "unknown"
  }
}