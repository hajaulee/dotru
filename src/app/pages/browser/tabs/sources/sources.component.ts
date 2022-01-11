import {Component, OnInit} from '@angular/core';
import {PopularMangaListPageComponent} from "./popular-manga-list-page/popular-manga-list-page.component";
import {Source} from "../../../../shares/models/source";
import {ScreenTransmission} from "../../../../shares/injectable/screen-transmission";
import {Extension} from "../../../../shares/models/extension";
import {loadAllExtensions} from "../../../../shares/storages/extensions";
import {groupByKey, initSourceFromExtension} from "../../../../shares/utils/source-utils";
import {LatestMangaListPageComponent} from "./latest-manga-list-page/latest-manga-list-page.component";

@Component({
  selector: 'app-sources',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.scss']
})
export class SourcesComponent implements OnInit {

  sources: Source[];
  sourcesGroupedByLang: Source[][] = []

  constructor(private screenTransmission: ScreenTransmission) {
  }

  ngOnInit(): void {
    const allExts: Extension[] = loadAllExtensions();
    this.sources = allExts.map(initSourceFromExtension);
    this.groupSourcesByLang();
  }

  groupSourcesByLang() {
    this.sourcesGroupedByLang = groupByKey(this.sources, 'lang');
  }

  showPopularMangaList(source: any) {
    this.screenTransmission.goToScreen(PopularMangaListPageComponent, {source});
  }

  showLatestMangaList(source: any){
    this.screenTransmission.goToScreen(LatestMangaListPageComponent, {source});
  }

}
