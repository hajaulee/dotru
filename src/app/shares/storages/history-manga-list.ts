import {loadObject, saveObject} from "./base";
import {KeyHistoryManga, maxHistoryLength} from "../constants";
import {SManga} from "../models/smanga";
import {loadSettings} from "./settings";
import {removeManga, removeMangaByKey, saveManga} from "./manga";
import {loadLibraryMangaList} from "./library-manga-list";
import {ReadingHistory} from "../models/reading-history";

export function loadHistoryMangaList(): ReadingHistory[] {
  return loadObject(KeyHistoryManga, []);
}

export function saveHistoryMangaList(mangaList: ReadingHistory[]) {
  return saveObject(KeyHistoryManga, mangaList);
}

export function addMangaHistory(manga: SManga) {
  const appSettings = loadSettings();
  if (appSettings.logHistory) {
    saveManga(manga);
    let history = loadHistoryMangaList();
    history = updateIndexInHistory(history, manga);
    history.push({mangaUrl: manga.url, lastReadingTime: new Date().getTime()});
    history = clearTooOldHistory(history);
    saveHistoryMangaList(history);
  }
}

export function removeMangaHistory(manga: SManga): ReadingHistory[] {
    let history = loadHistoryMangaList();
    history = history.filter(item => item.mangaUrl !== manga.url);
    saveHistoryMangaList(history);
    if (!manga.inLibrary){
      removeManga(manga);
    }
    return history;
}

function updateIndexInHistory(history: ReadingHistory[], manga: SManga): ReadingHistory[] {
  const oldIndexInHistory = history.findIndex(it => it.mangaUrl === manga.url);
  if (oldIndexInHistory > -1) {
    history.splice(oldIndexInHistory, 1);
  }
  return history;
}

function clearTooOldHistory(history: ReadingHistory[]): ReadingHistory[] {
  if (history.length > maxHistoryLength) {
    let tooOldHistory = history.slice(0, history.length - maxHistoryLength);
    const inLibraryMangaList = loadLibraryMangaList();
    tooOldHistory.forEach((historyItem) => {
      if (!inLibraryMangaList.includes(historyItem.mangaUrl)) {
        removeMangaByKey(historyItem.mangaUrl);
      }
    });
    history = history.slice(history.length - maxHistoryLength);
  }
  return history;
}
