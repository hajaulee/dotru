import {Component, OnInit} from '@angular/core';
import {ScreenTransmission} from "../../shares/injectable/screen-transmission";
import {GlobalSearchPageComponent} from "./tabs/sources/global-search-page/global-search-page.component";
import {SwipeDirection} from "../../shares/directives/touch-swipe.directive";


@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent implements OnInit {

  activeTab = 0;
  loaded = true;
  searching: boolean
  searchQuery: string;

  constructor(private screenTransmission: ScreenTransmission) {
  }

  ngOnInit(): void {
  }


  refresh() {
    this.loaded = false;
    setTimeout(() => this.loaded = true, 100);
  }

  toggleSearching(searching: boolean) {
    this.searching = searching;
  }

  gotoGlobalSearch(query: string) {
    this.screenTransmission.goToScreen(GlobalSearchPageComponent, {searchQuery: query})
  }

  swipe(swipeTo: SwipeDirection){
    if (swipeTo === 'left' && this.activeTab < 2){
      this.activeTab++;
    }else if (swipeTo === 'right' && this.activeTab > 0){
      this.activeTab--;
    }
  }


}
