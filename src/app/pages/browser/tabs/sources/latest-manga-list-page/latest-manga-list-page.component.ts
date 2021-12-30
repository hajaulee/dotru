import {Component, Inject, OnInit} from '@angular/core';
import {ReplaySubject} from "rxjs";
import {SManga} from "../../../../../shares/models/smanga";
import {Engine} from "../../../../../shares/services/manga-engine";
import {COMPONENT_DATA} from "../../../../../app.component";
import {ScreenTransmission} from "../../../../../shares/injectable/screen-transmission";
import {MangaDetailComponent} from "../../../../manga-detail/manga-detail.component";
import {WebViewComponent} from "../../../../web-view/web-view.component";
import {Source} from "../../../../../shares/models/source";

export interface LatestMangaListPageComponent {
  source: Source;
}

@Component({
  selector: 'app-latest-manga-list-page',
  templateUrl: './latest-manga-list-page.component.html',
  styleUrls: ['./latest-manga-list-page.component.scss']
})
export class LatestMangaListPageComponent implements OnInit {
  mangaList$ = new ReplaySubject<SManga[]>(1);

  engine: Engine;

  constructor(
    @Inject(COMPONENT_DATA)
    public componentData: LatestMangaListPageComponent,
    private screenTransmission: ScreenTransmission
  ) {
  }

  ngOnInit(): void {
    this.engine = new Engine(this.componentData.source);
    this.loadMangaList(false);
  }

  back() {
    this.screenTransmission.back();
  }

  loadMangaList(loadMore: boolean) {
    this.engine.getLatestMangaList(loadMore).subscribe((data) => {
      data.forEach((manga) => manga.source = this.componentData.source);
      this.mangaList$.next(data);
    });
  }

  loadMore() {
    this.loadMangaList(true);
  }

  showDetailManga(manga: SManga) {
    this.screenTransmission.goToScreen(MangaDetailComponent, {manga});
  }

  goToMangaWebView() {
    this.screenTransmission.goToScreen(WebViewComponent, {url: this.componentData.source.parser.baseUrl})
  }

}
