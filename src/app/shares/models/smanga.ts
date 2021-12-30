import {SChapter} from "./schapter";
import {Source} from "./source";
import {SavedManga} from "./saved-manga";

export interface SManga extends SavedManga {
  author?: string,
  artist?: string,
  genre?: string,
  description?: string;
  status?: string;
  source?: Source;
  chapters: SChapter[];
  lastReadingTime?: number;
}
