import {Component, OnInit} from '@angular/core';
import {MangaDetailComponent} from "../manga-detail/manga-detail.component";
import {SManga} from "../../shares/models/smanga";
import {ScreenTransmission} from "../../shares/injectable/screen-transmission";
import {loadLibraryMangaList} from "../../shares/storages/library-manga-list";
import {loadSavedManga, saveManga} from "../../shares/storages/manga";
import {merge} from "rxjs";
import {Engine} from "../../shares/services/manga-engine";
import {AppSettingsLoader} from "../../shares/injectable/app-settings-loader";

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  mangaList: SManga[] = [];
  updatedMangaTitle?: string;


  constructor(
    public settingsLoader: AppSettingsLoader,
    private screenTransmission: ScreenTransmission) {
  }

  ngOnInit(): void {
    this.loadSavedData();
    if (this.settingsLoader.settings.updateLibraryOnStart && this.screenTransmission.isStartScreen()){
      this.updateManga();
    }
  }

  loadSavedData() {
    this.mangaList = loadLibraryMangaList().map(loadSavedManga);
  }

  showDetailManga(manga: SManga) {
    this.screenTransmission.goToScreen(MangaDetailComponent, {manga});
  }


  updateManga() {
    const mangaList = [...this.mangaList];
    let updateCompletedMangaNumber = 0;
    this.updatedMangaTitle = "...";
    merge(...mangaList.map(manga => {
      const engine = new Engine(manga.source!);
      return engine.getDetailManga(manga);
    })).subscribe((detailManga) => {
      this.updatedMangaTitle = detailManga.title;
      saveManga(detailManga);
      this.loadSavedData();

      updateCompletedMangaNumber++;
      if (updateCompletedMangaNumber == mangaList.length) {
        this.updatedMangaTitle = "Updated all!";
        if ('Notification' in window) {
          new Notification("Updated all!");
        }
        setTimeout(() => this.updatedMangaTitle = undefined, 2000);
      }

      if (Math.max(...detailManga.readChapters) != detailManga.chapters[0].chapterNumber){
        this.notifyUnreadChapter(detailManga.title, detailManga.chapters[0]?.name);
      }
    });
  }

  notifyUnreadChapter(mangaTitle: string, chapterTitle: string){
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification(mangaTitle, {
            body: chapterTitle,
            vibrate: [1]
          }
        );
      }
    }
  }

}
