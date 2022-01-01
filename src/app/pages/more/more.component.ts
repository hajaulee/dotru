import {Component, OnInit} from '@angular/core';
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {ScreenTransmission} from "../../shares/injectable/screen-transmission";
import {AppSettingsLoader} from "../../shares/injectable/app-settings-loader";
import {environment} from "../../../environments/environment.prod";
import {ReadingModeEnum} from "../../shares/models/saved-manga";
import {WebViewComponent} from "../web-view/web-view.component";

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss']
})
export class MoreComponent implements OnInit {

  version = environment.version;

  // Enums
  readingModeEnum = ReadingModeEnum;

  constructor(
    public settingsLoader: AppSettingsLoader,
    private screenTransmission: ScreenTransmission
  ) {
  }

  ngOnInit(): void {
  }

  toggleDarkMode(event: MatSlideToggleChange) {
    this.settingsLoader.changeSettings({
      darkMode: event.checked
    })
  }

  toggleIncognitoMode(event: MatSlideToggleChange) {
    this.settingsLoader.changeSettings({
      logHistory: !event.checked
    })
  }

  toggleAutoUpdate(event: MatSlideToggleChange){
    this.settingsLoader.changeSettings({
      updateLibraryOnStart: event.checked
    })
  }

  toggleReadingMode(mode: ReadingModeEnum) {
    this.settingsLoader.changeSettings({
      defaultReadingMode: mode
    })
  }


  gotoRepo(){
    window.open("https://github.com/hajaulee/dotru", '_blank');
  }


}
