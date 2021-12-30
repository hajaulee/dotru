import {Component, OnInit} from '@angular/core';
import {MangaDetailComponent} from "../manga-detail/manga-detail.component";
import {SManga} from "../../shares/models/smanga";
import {ScreenTransmission} from "../../shares/injectable/screen-transmission";
import {loadLibraryMangaList} from "../../shares/storages/library-manga-list";
import {loadSavedManga} from "../../shares/storages/manga";
@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  mangaList: SManga[] = [];

  constructor(private screenTransmission: ScreenTransmission) {
  }

  ngOnInit(): void {
    this.mangaList = loadLibraryMangaList().map(loadSavedManga);
  }

  showDetailManga(manga: SManga) {
    this.screenTransmission.goToScreen(MangaDetailComponent, {manga});
  }

}
