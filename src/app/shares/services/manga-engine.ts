import {PROXY_URL} from "../constants";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Source} from "../models/source";
import {SManga} from "../models/smanga";
import {loadLibraryMangaList} from "../storages/library-manga-list";
import {loadSavedManga} from "../storages/manga";
import {SChapter} from "../models/schapter";
import {SPage} from "../models/spage";
import {FilterList} from "../models/filter-list";
import {httpGetAsync} from "../utils/http-utils";


export class Engine {
  proxy = PROXY_URL;
  source: Source;

  constructor(
    source: Source
  ) {
    this.source = source
  }

  getPopularMangaList(loadMore: boolean = true): Observable<SManga[]> {

    if (!loadMore && this.source.loadedPopularMangaList && this.source.loadedPopularMangaList.length > 0) {
      return of(this.source.loadedPopularMangaList);
    }

    return httpGetAsync(this.source.parser.popularMangaRequest(this.source.popularPageIndex))
      .pipe(
        map((text) => {
          console.log("parsing:" + this.source.parser.popularMangaRequest(this.source.popularPageIndex));
          let newMangaList: SManga[] = [];
          const domParser = new DOMParser();
          const doc = domParser.parseFromString(text, 'text/html');
          if (this.source.parser.popularMangaParse) {
            newMangaList = this.source.parser.popularMangaParse(doc);
          } else {
            doc.querySelectorAll(this.source.parser.popularMangaSelector()).forEach((ele) => {
              newMangaList.push(this.source.parser.popularMangaFromElement(ele));
            });
          }
          if (newMangaList.length > 0) {
            this.source.loadedPopularMangaList.push(...newMangaList);
            this.source.popularPageIndex += 1;
          }
          return [...this.source.loadedPopularMangaList];
        })
      );
  }

  getLatestMangaList(loadMore: boolean = true): Observable<SManga[]> {

    if (!loadMore && this.source.loadedLatestMangaList && this.source.loadedLatestMangaList.length > 0) {
      return of(this.source.loadedLatestMangaList);
    }

    return httpGetAsync(this.source.parser.latestUpdatesRequest(this.source.latestPageIndex))
      .pipe(
        map((text) => {
          console.log("parsing:" + this.source.parser.latestUpdatesRequest(this.source.latestPageIndex));
          const newMangaList: SManga[] = [];
          const domParser = new DOMParser();
          const doc = domParser.parseFromString(text, 'text/html');
          doc.querySelectorAll(this.source.parser.latestUpdatesSelector()).forEach((ele) => {
            newMangaList.push(this.source.parser.latestUpdatesFromElement(ele));
          });
          if (newMangaList.length > 0) {
            this.source.loadedLatestMangaList.push(...newMangaList);
            this.source.latestPageIndex += 1;
          }
          return [...this.source.loadedLatestMangaList];
        })
      );
  }

  getSearchMangaList(query: string, filters: FilterList, loadMore: boolean = true): Observable<SManga[]> {

    if (query != this.source.searchQuery) {
      // reset search data
      this.source.searchQuery = query;
      this.source.searchPageIndex = 1;
      this.source.loadedSearchMangaList = [];
    }

    if (!loadMore && this.source.loadedSearchMangaList && this.source.loadedSearchMangaList.length > 0) {
      return of(this.source.loadedSearchMangaList);
    }

    return httpGetAsync(this.source.parser.searchMangaRequest(this.source.searchPageIndex, query, {}))
      .pipe(
        map((text) => {
          console.log("parsing:" +
            this.source.parser.searchMangaRequest(this.source.searchPageIndex, query, {})
          );
          const newMangaList: SManga[] = [];
          const domParser = new DOMParser();
          const doc = domParser.parseFromString(text, 'text/html');
          doc.querySelectorAll(this.source.parser.searchMangaSelector()).forEach((ele) => {
            newMangaList.push(this.source.parser.searchMangaFromElement(ele));
          });
          if (newMangaList.length > 0) {
            this.source.loadedSearchMangaList.push(...newMangaList);
            this.source.searchPageIndex += 1;
          }
          return [...this.source.loadedSearchMangaList];
        })
      );
  }

  updateMangaReadStatus(baseManga: SManga, detailManga: SManga): SManga {
    detailManga.inLibrary = loadLibraryMangaList().includes(baseManga.url);
    const savedManga = loadSavedManga(baseManga.url);

    detailManga.chapters.forEach((chapter, index) => {
      chapter.read = Boolean(savedManga.readChapters?.includes(chapter.chapterNumber));
      if (!Number.isInteger(chapter.chapterNumber)){
        // assume that default order is new to old
        chapter.chapterNumber = detailManga.chapters.length - index - 1;
      }
    });
    detailManga.chapters = detailManga.chapters
      .sort((a, b) => a.chapterNumber - b.chapterNumber)
      .reverse();
    if (detailManga.chapters.length > 0) {
      detailManga.latestChapter = detailManga.chapters[0];
    }

    return {
      ...baseManga,
      ...detailManga
    }
  }

  getDetailManga(manga: SManga): Observable<SManga> {
    if (this.source.loadedManga && manga.url === this.source.loadedManga.url) {
      this.source.loadedManga = this.updateMangaReadStatus(manga, this.source.loadedManga);
      return of(this.source.loadedManga);
    }
    return httpGetAsync(manga.url).pipe(
      map((text) => {
          console.log("parsing:" + manga.url);
          const domParser = new DOMParser();
          const doc = domParser.parseFromString(text, 'text/html');
          const detailManga = this.source.parser.mangaDetailsParse(doc);
          detailManga.chapters = [];
          if (this.source.parser.chapterListParse) {
            detailManga.chapters = this.source.parser.chapterListParse(doc);
          } else {
            doc.querySelectorAll(this.source.parser.chapterListSelector()).forEach((element) => {
              const chapter = this.source.parser.chapterFromElement(element);
              detailManga.chapters.push(chapter);
            });
          }
          // check relative url
          detailManga.chapters.forEach(chapter => {
            if (chapter.relativeUrl) {
              chapter.url = new URL(chapter.relativeUrl, manga.url).href;
            }
          });
          this.source.loadedManga = this.updateMangaReadStatus(manga, detailManga);
          return this.source.loadedManga;
        }
      ),
      catchError((err) => {
        console.log(err);
        return of({
          ...manga,
          author: "UNKNOWN",
          artist: "UNKNOWN",
          genre: "UNKNOWN",
          description: "Load fail, please reload.",
          status: "UNKNOWN",
          chapters: []
        });
      })
    );
  }

  getPages(chapter: SChapter): Observable<SPage[]> {
    return httpGetAsync(chapter.url).pipe(
      map((text) => {
        console.log("parsing:" + chapter.url);
        const domParser = new DOMParser();
        const doc = domParser.parseFromString(text, 'text/html');
        return this.source.parser.pageListParse(doc)
      })
    )
  }
}
