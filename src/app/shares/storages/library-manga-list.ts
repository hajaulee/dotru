import {KeyLibraryManga} from "../constants";
import {loadObject, saveObject} from "./base";

export function loadLibraryMangaList(): string[] {
  return loadObject(KeyLibraryManga, []);
}

export function saveLibraryMangaList(mangaList: string[]) {
  return saveObject(KeyLibraryManga, mangaList);
}
