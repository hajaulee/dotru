import {ReadingModeEnum} from "./saved-manga";

export interface AppSettings {
  darkMode: boolean;
  logHistory: boolean;
  updateLibraryOnStart: boolean;
  defaultReadingMode: ReadingModeEnum;
  maskPreviousChapterAsRead: boolean;
}
