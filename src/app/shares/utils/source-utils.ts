import {Extension} from "../models/extension";
import {Source} from "../models/source";


export const initSourceFromExtension = (ext: Extension): Source => {
  const Parser = eval("(" + ext.sourceCode + ")");
  const parser = new Parser();
  return {
    ...ext,
    loadedManga: undefined,
    latestPageIndex: 1,
    searchPageIndex: 1,
    searchQuery: "",
    loadedSearchMangaList: [],
    loadedPopularMangaList: [],
    loadedLatestMangaList: [],
    popularPageIndex: 1,
    parser
  };
}
