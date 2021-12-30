import {isSavedObject, loadObject, removeObject, saveObject} from "./base";
import {loadAllExtensions} from "./extensions";
import {SManga} from "../models/smanga";
import {SavedManga} from "../models/saved-manga";
import {initSourceFromExtension} from "../utils/source-utils";
import {loadLibraryMangaList} from "./library-manga-list";

export function saveManga(manga: SManga) {
  const dataToSave: SavedManga = {
    url: manga.url,
    inLibrary: Boolean(manga.inLibrary),
    thumbnailUrl: manga.thumbnailUrl,
    title: manga.title,
    sourceName: manga.source?.name!,
    readChapters: manga.readChapters || [],
    readingMode: manga.readingMode,
    latestChapter: manga.latestChapter
  }
  saveObject(manga.url, dataToSave);
}

export function loadSavedManga(url: string): SManga {
  const savedData: SavedManga = loadObject(url, {});
  const ext = loadAllExtensions().find(e => e.name == savedData.sourceName);
  const source = ext && initSourceFromExtension(ext);
  const libraryMangaList = loadLibraryMangaList();
  return {
    ...savedData,
    author: "UNKNOWN",
    status: "UNKNOWN",
    description: source ? "Loading": "No source",
    inLibrary: libraryMangaList.includes(url),
    chapters: [],
    source
  };
}

export function removeManga(manga: SManga) {
  removeObject(manga.url);
}

export function removeMangaByKey(mangaKey: string) {
  removeObject(mangaKey);
}

export function isSavedManga(manga: SManga): boolean {
  return isSavedObject(manga.url) !== null;
}
