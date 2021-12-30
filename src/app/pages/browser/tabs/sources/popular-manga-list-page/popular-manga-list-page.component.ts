import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {COMPONENT_DATA} from "../../../../../app.component";
import {ReplaySubject} from "rxjs";
import {MangaDetailComponent} from "../../../../manga-detail/manga-detail.component";
import {WebViewComponent} from "../../../../web-view/web-view.component";
import {Source} from "../../../../../shares/models/source";
import {SManga} from "../../../../../shares/models/smanga";
import {ScreenTransmission} from "../../../../../shares/injectable/screen-transmission";
import {Engine} from "../../../../../shares/services/manga-engine";
import {MatInput} from "@angular/material/input";

export interface PopularMangaListPageComponentData {
  source: Source;
}

@Component({
  selector: 'app-popular-manga-list-page',
  templateUrl: './popular-manga-list-page.component.html',
  styleUrls: ['./popular-manga-list-page.component.scss']
})
export class PopularMangaListPageComponent implements OnInit {
  @ViewChild("searchInput", {static: false}) searchInput: ElementRef;

  mangaList$ = new ReplaySubject<SManga[]>(1);

  engine: Engine;
  searching: boolean = false;
  searchQuery: string = "";

  constructor(
    @Inject(COMPONENT_DATA)
    public componentData: PopularMangaListPageComponentData,
    private screenTransmission: ScreenTransmission
  ) {
  }

  ngOnInit(): void {
    this.engine = new Engine(this.componentData.source);
    this.loadMangaList(false);
  }

  back() {
    if (this.searching) {
      this.toggleSearching(false);
    } else {
      this.screenTransmission.back();
    }
  }

  loadMangaList(loadMore: boolean) {
    this.engine.getPopularMangaList(loadMore).subscribe((data) => {
      data.forEach((manga) => manga.source = this.componentData.source);
      this.mangaList$.next(data);
    });
  }

  loadMore() {
    if (this.searching) {
      this.loadSearchManga(true);
    } else {
      this.loadMangaList(true);
    }
  }

  showDetailManga(manga: SManga) {
    this.screenTransmission.goToScreen(MangaDetailComponent, {manga});
  }

  goToMangaWebView() {
    this.screenTransmission.goToScreen(WebViewComponent, {url: this.componentData.source.parser.baseUrl})
  }

  toggleSearching(value: boolean) {
    this.searching = value;
    if (this.searching) {
      if (this.componentData.source.loadedSearchMangaList && this.componentData.source.loadedSearchMangaList.length > 0){
        this.mangaList$.next(this.componentData.source.loadedSearchMangaList);
      }
      setTimeout(() => {
        console.log(this.searchInput);
        this.searchInput?.nativeElement.focus();
      }, );
    } else {
      this.loadMangaList(false);
    }
  }

  applySearch(searchQuery: string){
    this.mangaList$.next(undefined);
    this.searchQuery = searchQuery;
    this.loadSearchManga(false);
  }

  loadSearchManga(loadMore: boolean = false) {
    this.engine.getSearchMangaList(this.searchQuery, {}, loadMore).subscribe((data) => {
      data.forEach((manga) => manga.source = this.componentData.source);
      this.mangaList$.next(data);
    });
  }

}
