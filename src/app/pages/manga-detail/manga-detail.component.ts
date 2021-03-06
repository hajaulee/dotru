import {Component, Inject, OnInit} from '@angular/core';
import {COMPONENT_DATA} from "../../app.component";
import {ReplaySubject} from "rxjs";
import {WebViewComponent} from "../web-view/web-view.component";
import {ReaderComponent} from "../reader/reader.component";
import {Engine} from "../../shares/services/manga-engine";
import {SManga} from "../../shares/models/smanga";
import {ScreenTransmission} from "../../shares/injectable/screen-transmission";
import {isSavedManga, removeManga, saveManga} from "../../shares/storages/manga";
import {loadLibraryMangaList, saveLibraryMangaList} from "../../shares/storages/library-manga-list";
import {SChapter} from "../../shares/models/schapter";
import {addMangaHistory, loadHistoryMangaList} from "../../shares/storages/history-manga-list";
import {AppSettingsLoader} from "../../shares/injectable/app-settings-loader";


export interface MangaDetailComponentData {
  manga: SManga
}

@Component({
  selector: 'app-manga-detail',
  templateUrl: './manga-detail.component.html',
  styleUrls: ['./manga-detail.component.scss']
})
export class MangaDetailComponent implements OnInit {

  // Presentation streams
  detailManga$ = new ReplaySubject<SManga>(1);

  engine: Engine;

  constructor(
    @Inject(COMPONENT_DATA)
    public componentData: MangaDetailComponentData,
    private screenTransmission: ScreenTransmission,
    private settingsLoader: AppSettingsLoader,
  ) {

  }

  ngOnInit(): void {
    if (this.componentData.manga.source) {
      this.engine = new Engine(this.componentData.manga.source);
      this.loadDetail();
    } else {
      this.detailManga$.next(this.componentData.manga);
    }
  }

  loadDetail() {
    this.engine.getDetailManga(this.componentData.manga).subscribe((manga) => {
      this.detailManga$.next(manga);
      addMangaHistory(manga);
    });
  }

  back() {
    this.screenTransmission.back();
  }

  refresh() {
    this.detailManga$.next(undefined);
    this.loadDetail();
  }

  goToMangaWebView() {
    this.screenTransmission.goToScreen(WebViewComponent, {url: this.componentData.manga.url});
  }


  addToLibrary(manga: SManga) {
    manga.inLibrary = true;
    saveManga(manga);
    const libraryMangaList = loadLibraryMangaList();
    libraryMangaList.push(manga.url);
    saveLibraryMangaList(libraryMangaList);
  }

  removeFromLibrary(manga: SManga) {
    manga.inLibrary = false;
    if (loadHistoryMangaList().every(it => it.mangaUrl !== manga.url)) {
      removeManga(manga);
    }
    let libraryMangaList = loadLibraryMangaList();
    libraryMangaList = libraryMangaList.filter(url => url != manga.url);
    saveLibraryMangaList(libraryMangaList);
  }

  readChapter(manga: SManga, chapter: SChapter) {
    chapter.read = true;
    if (this.settingsLoader.settings.maskPreviousChapterAsRead){
      const maxReadChapterNumber = Math.max(...(manga.readChapters ?? []), chapter.chapterNumber);
      manga.readChapters = manga.chapters
        .filter(chapter => chapter.chapterNumber <= maxReadChapterNumber)
        .map(chapter => chapter.chapterNumber)
    }else{
      manga.readChapters = [...new Set([...manga.readChapters ?? [], chapter.chapterNumber])].sort();
    }
    this.componentData.manga = {...manga};
    if (isSavedManga(manga)) {
      saveManga(manga); // update saved data
    }
    this.screenTransmission.goToScreen(ReaderComponent, {manga, chapter});
  }

  markAllChapterAsRead(manga: SManga){
    manga.readChapters = manga.chapters.map(chapter => chapter.chapterNumber);
    manga.chapters.forEach((chapter) => {
      chapter.read = true;
    });
    this.componentData.manga = {...manga};
    if (isSavedManga(manga)) {
      saveManga(manga); // update saved data
    }
    this.detailManga$.next({...manga});
  }

  resume(manga: SManga) {
    const noReadChapter = manga.chapters
      .slice()
      .sort((a, b) => a.chapterNumber - b.chapterNumber)
      .find(chapter => !chapter.read);
    if (noReadChapter) {
      this.readChapter(manga, noReadChapter);
    }
  }

}
