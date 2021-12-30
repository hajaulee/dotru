import {Component, OnInit} from '@angular/core';
import {SManga} from "../../shares/models/smanga";
import {ScreenTransmission} from "../../shares/injectable/screen-transmission";
import {loadSavedManga} from "../../shares/storages/manga";
import {MangaDetailComponent} from "../manga-detail/manga-detail.component";
import {loadHistoryMangaList, removeMangaHistory} from "../../shares/storages/history-manga-list";
import {groupObjectByDate} from "../../shares/utils/utils";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  mangaList: SManga[];
  groupedByDateMangaLists: SManga[][] = [];

  constructor(private screenTransmission: ScreenTransmission) {
  }

  ngOnInit(): void {
    this.mangaList = loadHistoryMangaList().map(historyItem => {
      const manga = loadSavedManga(historyItem.mangaUrl);
      manga.lastReadingTime = historyItem.lastReadingTime;
      return manga;
    });

    this.groupedByDateMangaLists = this.groupByDate(this.mangaList);
  }

  showDetailManga(manga: SManga) {
    this.screenTransmission.goToScreen(MangaDetailComponent, {manga});
  }

  groupByDate(mangaList: SManga[]): SManga[][] {
    return groupObjectByDate(mangaList, (manga) => manga?.lastReadingTime);
  }

  removeHistory(mangaToRemove: SManga) {
    removeMangaHistory(mangaToRemove);
    this.mangaList = this.mangaList.filter(manga => manga.url != mangaToRemove.url);
    this.groupedByDateMangaLists = this.groupByDate(this.mangaList);
  }

  resumeReading(manga: SManga) {
    this.screenTransmission.goToScreen(MangaDetailComponent, {manga});
  }

}
