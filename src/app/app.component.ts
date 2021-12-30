import {Component, InjectionToken, Injector, OnInit} from '@angular/core';
import {ComponentPortal, PortalInjector} from "@angular/cdk/portal";
import {LibraryComponent} from "./pages/library/library.component";
import {ScreenTransmission, ScreenTransmissionData} from "./shares/injectable/screen-transmission";
import {AppSettingsLoader} from "./shares/injectable/app-settings-loader";
import {AppSettings} from "./shares/models/app-settings";

export const COMPONENT_DATA = new InjectionToken<{}>(
  "COMPONENT_DATA"
);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dotru';

  portal: ComponentPortal<any>;
  appSettings: AppSettings = {};

  constructor(
    private settingsLoader: AppSettingsLoader,
    private screenTransmission: ScreenTransmission,
    private _injector: Injector,
  ) {
  }

  ngOnInit(): void {

    this.screenTransmission.getNextScreen().subscribe((data) => {
      this.initView(data);
    });
    this.settingsLoader.settingsChange().subscribe((settings) => {
      this.appSettings = settings;
    });

    // Default start screen
    this.initView({
      // component: BrowserComponent,
      component: LibraryComponent,
      componentData: {}
    })
  }

  initView(data: ScreenTransmissionData) {
    if (data.component) {
      this.portal = new ComponentPortal(
        data.component,
        null,
        this.createInjector(data.componentData)
      );
      this.screenTransmission.addHistory(this.portal);
    } else if (data.portal) {
      this.portal = data.portal;
    }
  }

  createInjector(dataToPass: any): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(COMPONENT_DATA, dataToPass);
    return new PortalInjector(this._injector, injectorTokens);
  }

}
