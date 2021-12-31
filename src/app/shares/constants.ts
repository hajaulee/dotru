import {Extension} from "./models/extension";

export const dateFormat: string = 'yyyy/MM/dd';
export const KeyFromCodeExtensions = "KeyFromCodeExtensions";
export const KeyInstalledExtensions = "KeyInstalledExtensions";
export const KeyLibraryManga = "KeyLibraryManga";
export const KeyHistoryManga = "KeyHistoryManga";
export const KeySettings = "KeySettings";

export const maxHistoryLength = 30;

export const PROXY_URL = "https://script.google.com/macros/s/AKfycbznYb4dcHRUQF5kk2ZA4DayEPePqLYxCfMj4drt6KrHdJ__uv_rp4vc-C7VSJcChbPr/exec?url=";
export const EXTENSIONS_UPDATE_URL = "https://raw.githubusercontent.com/hajaulee/dotru-extensions/main/extensions.json";

export const inAppExtensions: Extension[] = [
    {
    fromCode: false,
    name: "MeDocTruyenTranh",
    version: "0.0.1",
    lang: "vi",
    thumbnail: "https://raw.githubusercontent.com/tachiyomiorg/tachiyomi-extensions/master/src/vi/medoctruyentranh/res/mipmap-hdpi/ic_launcher.png",
    sourceCode: `
  function MeDocTruyenTranh() {

  this.name = "MeDocTruyenTranh";
  this.version = "0.0.1";
  this.thumbnail = "https://raw.githubusercontent.com/tachiyomiorg/tachiyomi-extensions/master/src/vi/medoctruyentranh/res/mipmap-hdpi/ic_launcher.png";
  this.lang = "vi";
  this.baseUrl = "https://www.medoctruyentranh.net";
  this.supportsLatest = false;

  this.headerBuilder = () => {
    return {}
  }

  // Popular
  this.popularMangaRequest = (page) => this.baseUrl + "/tim-truyen/toan-bo" + ( page > 1 ? "/" + page : "");
  this.popularMangaNextPageSelector = () => "div.page_floor a.focus + a + a";
  this.popularMangaSelector = () => "div.classifyList a";
  this.popularMangaParse = (doc) => {
      const nextData = JSON.parse(doc.querySelector("script#__NEXT_DATA__").innerText);
      const titleCoverMap = nextData.props.pageProps.initialState.classify.comics
          .reduce((_map, item) => {
            _map[item.title] = item.coverimg;
            return _map;
          }, {});
      let mangas = [];
      doc.querySelectorAll(this.popularMangaSelector()).forEach(element  => {
              const manga = this.popularMangaFromElement(element);
              manga.thumbnailUrl = titleCoverMap[manga.title];
              mangas.push(manga);
          }
      )
      return mangas;
  }
  this.popularMangaFromElement = (e) => {
      const url = e.getAttribute("href");
      const title = e.querySelector("div.storytitle").innerText;
      return {url, title};
  }

  // Latest
  this.latestUpdatesRequest =  null;
  this.latestUpdatesNextPageSelector = null;
  this.latestUpdatesSelector = null;
  this.latestUpdatesFromElement = null;


  // Search
  this.searchMangaRequest = (page, query, filters) => {
      return \`\${this.baseUrl}/search/\${query}\`
      // Todo Filters
  }

  this.searchMangaNextPageSelector = this.popularMangaNextPageSelector;
  this.searchMangaSelector  = () => ".listCon a";
  this.searchMangaFromElement  = (e) => {
      const jsonData = e.ownerDocument.querySelector("#__NEXT_DATA__").innerText;

      const url = e.getAttribute("href");
      const title = e.querySelector("div.storytitle").innerText;

      const indexOfManga = jsonData.indexOf(title);
      const startIndex = jsonData.indexOf("coverimg", indexOfManga) + 11;
      const endIndex = jsonData.indexOf("}", startIndex) - 1;
      const thumbnailUrl = jsonData.substring(startIndex, endIndex);
      return {url, title, thumbnailUrl};
   };


  //Detail

  this.mangaDetailsParse = (doc) => {
      const nextData = JSON.parse(doc.querySelector("script#__NEXT_DATA__").innerText);

      const mangaDetail = nextData.props.pageProps.initialState.detail.story_item;
      const title = mangaDetail.title;
      const author = mangaDetail.author_list.join(", ");
      const artist = author;
      const genre = mangaDetail.category_list.join(", ");
      const description = mangaDetail.summary;
      const status = this.parseStatus(mangaDetail.is_updating);
      const thumbnailUrl = mangaDetail.coverimg;
      return {
        title, author, artist, genre, description, thumbnailUrl, status
      }
   }

  this.parseStatus = (status) => {
      status = status?.toString() ?? "";
      return status.includes("1") ? "ONGOING" :
      status.includes("0") ? "COMPLETED" :
      "UNKNOWN"
   }

  // Chapters
  this.chapterListSelector = () => "div.chapters  a";
  this.chapterListParse = (doc) => {
      const nextData = JSON.parse(doc.querySelector("script#__NEXT_DATA__").innerText);
      return nextData.props
          .pageProps
          .initialState
          .detail
          .story_chapters
          .flat()
          .map((chapterObj, chapterNumber) => {
              const name = chapterObj.title;
              const dateUpload = new Date(chapterObj.time).getTime();
              const relativeUrl = chapterObj.chapter_index;
              const chapter = {relativeUrl, name, dateUpload, chapterNumber};
              return chapter;
          })
          .reverse();
  }
  this.chapterFromElement = null;

  // Pages

  this.pageListParse = (doc) => {
      const jsonStr = doc.querySelector("script#__NEXT_DATA__").innerText;
      if (!jsonStr){
        return [];
      }
      const nextData = JSON.parse(jsonStr);
      return nextData.props
      .pageProps.initialState
      .read.detail_item
      .elements.map((item, index) => {
          return {
            index,
            name: "",
            url: item.content
          }
      });
  }

}
  `
  }
]
