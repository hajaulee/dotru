import {Component, Inject, OnInit} from '@angular/core';
import {COMPONENT_DATA} from "../../../../../app.component";
import {ScreenTransmission} from "../../../../../shares/injectable/screen-transmission";
import {Source} from "../../../../../shares/models/source";
import {Extension} from "../../../../../shares/models/extension";
import {loadAllExtensions} from "../../../../../shares/storages/extensions";
import {initSourceFromExtension} from "../../../../../shares/utils/source-utils";
import {Engine} from "../../../../../shares/services/manga-engine";
import {merge} from "rxjs";
import {SManga} from "../../../../../shares/models/smanga";
import {MangaDetailComponent} from "../../../../manga-detail/manga-detail.component";
import {PopularMangaListPageComponent} from "../popular-manga-list-page/popular-manga-list-page.component";

export interface GlobalSearchPageComponentData {
  searchQuery: string;
}
@Component({
  selector: 'app-global-search-page',
  templateUrl: './global-search-page.component.html',
  styleUrls: ['./global-search-page.component.scss']
})
export class GlobalSearchPageComponent implements OnInit {

  sources: Source[];
  searching: boolean = true;
  searchQuery: string;
  engines: Engine[];

  constructor(
    @Inject(COMPONENT_DATA)
    public componentData: GlobalSearchPageComponentData,
    private screenTransmission: ScreenTransmission
  ) { }

  ngOnInit(): void {
    this.toggleSearching(true);
    this.searchQuery = this.componentData.searchQuery;

    const allExts: Extension[] = loadAllExtensions();
    this.sources = allExts.map(initSourceFromExtension);
    this.engines = this.sources.map(source => new Engine(source));

    this.applySearch(this.searchQuery);
  }

  toggleSearching(searching: boolean){
    this.searching = searching;
  }

  applySearch(query: string){
    merge(...this.engines.map((engine) => engine.getSearchMangaList(query, {})))
      .subscribe();
  }

  showDetailManga(manga: SManga) {
    this.screenTransmission.goToScreen(MangaDetailComponent, {manga});
  }

  gotoLocalSearch(source: Source){
    this.screenTransmission.goToScreen(PopularMangaListPageComponent, {
      source: source,
      searching: true,
      searchQuery: this.searchQuery
    })
  }


  back(){
    this.screenTransmission.back();
  }

}
