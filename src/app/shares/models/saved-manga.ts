export type ReadingModeEnum = "L2R" | "R2L" | "WEB_TOON"
export const ReadingModeEnum = {
  L2R: "L2R" as ReadingModeEnum,
  R2L: "R2L" as ReadingModeEnum,
  WEB_TOON: "WEB_TOON" as ReadingModeEnum
}

export interface SavedManga {
  // Minimum of SManga to save.
  url: string;
  inLibrary: boolean;
  thumbnailUrl: string;
  title: string;
  sourceName: string;
  readChapters: number[];
  readingMode?: ReadingModeEnum;
  latestChapterNumber?: number;
}
