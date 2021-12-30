import {Component, OnInit} from '@angular/core';
import {SManga} from "../../shares/models/smanga";
import {ScreenTransmission} from "../../shares/injectable/screen-transmission";
import {loadSavedManga} from "../../shares/storages/manga";
import {MangaDetailComponent} from "../manga-detail/manga-detail.component";
import {loadHistoryMangaList, removeMangaHistory} from "../../shares/storages/history-manga-list";
import {formatDate} from "@angular/common";
import {dateFormat} from "../../shares/constants";

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
    const sortedList = mangaList.sort((a, b) => (a.lastReadingTime || 0) - (b.lastReadingTime || 0)).reverse();
    const byDateDic: { [k: string]: SManga[] } = sortedList.reduce((dic, manga) => {
      const date = formatDate(manga?.lastReadingTime ?? new Date(), dateFormat, 'en-us');
      dic[date] = dic[date] ?? [];
      dic[date].push(manga);
      return dic;
    }, {} as any);

    return Object.keys(byDateDic).map(date => byDateDic[date]);
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
