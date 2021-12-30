import {Extension} from "./extension";
import {SManga} from "./smanga";
import {BaseParser} from "./base-parser";

export interface Source extends Extension {
  parser: BaseParser;

  popularPageIndex: number;
  loadedPopularMangaList: SManga[];

  latestPageIndex: number;
  loadedLatestMangaList: SManga[];

  searchPageIndex: number;
  searchQuery: string;
  loadedSearchMangaList: SManga[];

  loadedManga?: SManga;
}
