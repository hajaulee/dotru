import {ReadingModeEnum} from "./saved-manga";

export interface AppSettings {
  darkMode?: boolean;
  logHistory?: boolean;
  defaultReadingMode?: ReadingModeEnum;
}
