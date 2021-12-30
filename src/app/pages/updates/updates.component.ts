import { Component, OnInit } from '@angular/core';
import {SManga} from "../../shares/models/smanga";
import {ScreenTransmission} from "../../shares/injectable/screen-transmission";
import {loadLibraryMangaList} from "../../shares/storages/library-manga-list";
import {loadSavedManga} from "../../shares/storages/manga";
import {MangaDetailComponent} from "../manga-detail/manga-detail.component";
import {groupObjectByDate} from "../../shares/utils/utils";

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss']
})
export class UpdatesComponent implements OnInit {

    mangaList: SManga[];
  groupedByDateMangaLists: SManga[][] = [];

  constructor(private screenTransmission: ScreenTransmission) {
  }

  ngOnInit(): void {
    this.mangaList = loadLibraryMangaList().map(loadSavedManga).filter((manga => manga.latestChapter));
    this.groupedByDateMangaLists = this.groupByDate(this.mangaList);
  }

  groupByDate(mangaList: SManga[]): SManga[][] {
    return groupObjectByDate(mangaList, (manga: SManga) => manga?.latestChapter?.dateUpload);
  }

  showDetailManga(manga: SManga) {
    this.screenTransmission.goToScreen(MangaDetailComponent, {manga});
  }

}
