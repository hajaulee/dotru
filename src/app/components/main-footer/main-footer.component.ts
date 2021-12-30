import {Component, Input, OnInit} from '@angular/core';
import {LibraryComponent} from "../../pages/library/library.component";
import {UpdatesComponent} from "../../pages/updates/updates.component";
import {BrowserComponent} from "../../pages/browser/browser.component";
import {MoreComponent} from "../../pages/more/more.component";
import {HistoryComponent} from "../../pages/history/history.component";
import {ScreenTransmission} from "../../shares/injectable/screen-transmission";

export type ActivePage = 'lib' | 'update' | 'history' | 'browser' | 'more' | undefined;

@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.scss']
})
export class MainFooterComponent implements OnInit {

  @Input() activePage?: ActivePage;

  constructor(private screenTransmission: ScreenTransmission) { }

  ngOnInit(): void {
  }

  gotoLibrary(){
    this.screenTransmission.goToScreen(LibraryComponent, {});
  }

  gotoUpdates(){
    this.screenTransmission.goToScreen(UpdatesComponent, {});
  }

  gotoHistory(){
    this.screenTransmission.goToScreen(HistoryComponent, {});
  }

  gotoBrowser(){
    this.screenTransmission.goToScreen(BrowserComponent, {});
  }

  gotoMore(){
    this.screenTransmission.goToScreen(MoreComponent, {});
  }

}
