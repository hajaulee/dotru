import {Component, OnInit} from '@angular/core';
import {inAppExtensions} from "../../../../shares/constants";
import {ExtSettingsComponent} from "./ext-settings/ext-settings.component";
import {AddCodeComponent} from "./add-code/add-code.component";
import {ScreenTransmission} from "../../../../shares/injectable/screen-transmission";
import {
  loadFromCodeExtensions,
  loadInstalledExtensions,
  saveInstalledExtensions
} from "../../../../shares/storages/extensions";
import {Extension} from "../../../../shares/models/extension";
import {BehaviorSubject, Observable, ReplaySubject} from "rxjs";
import {installExtension, loadOnlineExtensions} from "../../../../shares/services/extensions";
import {ExtensionInfo} from "../../../../shares/models/extension-info";
import {map, switchMap} from "rxjs/operators";
import {groupByKey} from "../../../../shares/utils/source-utils";

@Component({
  selector: 'app-extensions',
  templateUrl: './extensions.component.html',
  styleUrls: ['./extensions.component.scss']
})
export class ExtensionsComponent implements OnInit {

  onlineExtensions$: Observable<ExtensionInfo[]>;
  onlineExtensionsGroupedByLang$: Observable<ExtensionInfo[][]>;
  onlineExtensionsUpdate$ = new BehaviorSubject<any>("init");
  extensionToInstall$ = new ReplaySubject<ExtensionInfo>(1);

  fromCodeExtensions: Extension[] = [];
  inAppExtensions = inAppExtensions;
  installedExtensions: Extension[] = [];
  installedExtensionsGroupedByLang: Extension[][] = [];


  constructor(private screenTransmission: ScreenTransmission) {
  }

  ngOnInit(): void {
    this.fromCodeExtensions = loadFromCodeExtensions();
    this.installedExtensions = loadInstalledExtensions();
    this.onlineExtensions$ = this.onlineExtensionsUpdate$.pipe(
      switchMap((_) => loadOnlineExtensions().pipe(map((onlineExtensions) => {
        const installedExtsMap = this.installedExtensions.reduce((extMap, ext) => {
          extMap[ext.name] = ext;
          return extMap;
        }, {} as { [k: string]: Extension });

        return onlineExtensions.reduce((arr, ext) => {
          if (ext.name in installedExtsMap) {
            if (ext.version !== installedExtsMap[ext.name].version) {
              ext.isUpdate = true;
              arr.push(ext);
            }
          } else {
            arr.push(ext);
          }
          return arr;
        }, [] as ExtensionInfo[]);
      }))));
    this.onlineExtensionsGroupedByLang$ = this.onlineExtensions$.pipe(
      map((extensionInfos) => groupByKey(extensionInfos, 'lang'))
    );

    this.extensionToInstall$.pipe(
      switchMap((extInfo) => installExtension(extInfo))
    ).subscribe((extension) => {
      let installedExtensions = loadInstalledExtensions();
      installedExtensions = installedExtensions.filter(ext => ext.name !== extension.name);
      installedExtensions.push(extension);
      saveInstalledExtensions(installedExtensions);
      this.installedExtensions = installedExtensions;
      this.groupExtensionsByLang();
      this.onlineExtensionsUpdate$.next('installed');
    });

    this.groupExtensionsByLang();
  }

  goAddCodePage() {
    this.screenTransmission.goToScreen(AddCodeComponent, {});
  }

  goSettings(ext: Extension) {
    this.screenTransmission.goToScreen(ExtSettingsComponent, {ext});
  }

  install(extInfo: ExtensionInfo) {
    this.extensionToInstall$.next(extInfo);
  }

  groupExtensionsByLang() {
    this.installedExtensionsGroupedByLang = groupByKey(this.installedExtensions, 'lang');
  }

}
