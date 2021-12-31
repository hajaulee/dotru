import {Component, OnInit} from '@angular/core';
import {SManga} from "../../shares/models/smanga";
import {ScreenTransmission} from "../../shares/injectable/screen-transmission";
import {loadLibraryMangaList} from "../../shares/storages/library-manga-list";
import {loadSavedManga, saveManga} from "../../shares/storages/manga";
import {MangaDetailComponent} from "../manga-detail/manga-detail.component";
import {groupObjectByDate} from "../../shares/utils/utils";
import {merge} from "rxjs";
import {Engine} from "../../shares/services/manga-engine";

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss']
})
export class UpdatesComponent implements OnInit {

  mangaList: SManga[];
  groupedByDateMangaLists: SManga[][] = [];
  updatedMangaTitle?: string;

  constructor(private screenTransmission: ScreenTransmission) {
  }

  ngOnInit(): void {
    this.loadSavedData();
  }

  loadSavedData() {
    this.mangaList = loadLibraryMangaList().map(loadSavedManga).filter((manga => manga.latestChapter));
    this.groupedByDateMangaLists = this.groupByDate(this.mangaList);
  }

  groupByDate(mangaList: SManga[]): SManga[][] {
    return groupObjectByDate(mangaList, (manga: SManga) => manga?.latestChapter?.dateUpload);
  }

  showDetailManga(manga: SManga) {
    this.screenTransmission.goToScreen(MangaDetailComponent, {manga});
  }

  updateManga() {
    const mangaList = [...this.mangaList];
    let updateCompletedMangaNumber = 0;
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
        setTimeout(() => this.updatedMangaTitle = undefined, 2000);
      }
    });
  }

}
