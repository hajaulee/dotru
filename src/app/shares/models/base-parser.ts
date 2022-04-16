import {SManga} from "./smanga";
import {SChapter} from "./schapter";
import {SPage} from "./spage";
import {FilterList} from "./filter-list";
import {httpGetSync, ProxyParams} from "../utils/http-utils";

export class BaseParser {

  name: string;
  version: string;
  thumbnail: string;
  lang: string;
  baseUrl: string;
  supportsLatest: boolean;
  httpGetSync: (
    url: string,
    useProxy: boolean,
    useCache: boolean,
    proxyParams: ProxyParams,
    headers: { [k: string]: string },
    timeout : number
  ) => string;

  headerBuilder: () => any;

  // Popular
  popularMangaRequest: (page: number) => string;
  popularMangaNextPageSelector: () => string;
  popularMangaSelector: () => string;
  popularMangaParse?: (doc: any) => SManga[];
  popularMangaFromElement: (e: any) => SManga;

  // Latest
  latestUpdatesRequest: (page: number) => string;
  latestUpdatesNextPageSelector: () => string;
  latestUpdatesSelector: () => string;
  latestMangaParse?: (doc: any) => SManga[];
  latestUpdatesFromElement: (element: any) => SManga;

  // Search
  searchMangaRequest: (page: number, query: string, filters: FilterList) => string;
  searchMangaNextPageSelector: () => string;
  searchMangaSelector: () => string;
  searchMangaParse?: (doc: any) => SManga[];
  searchMangaFromElement: (element: any) => SManga;

  // Detail
  mangaDetailsParse: (doc: any) => SManga;

  // Chapters

  chapterListSelector: () => string;
  chapterListParse?: (doc: any) => SChapter[];
  chapterFromElement: (element: any) => SChapter;

  // Pages
  pageListParse: (doc: any) => SPage[];

}
