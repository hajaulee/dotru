import {Component, Inject, OnInit} from '@angular/core';
import {COMPONENT_DATA} from "../../../../../app.component";
import {AddCodeComponent} from "../add-code/add-code.component";
import {Extension} from "../../../../../shares/models/extension";
import {ScreenTransmission} from "../../../../../shares/injectable/screen-transmission";
import {
  loadFromCodeExtensions,
  loadInstalledExtensions,
  saveFromCodeExtensions, saveInstalledExtensions
} from "../../../../../shares/storages/extensions";

interface ExtSettingsComponentData {
  ext: Extension
}

@Component({
  selector: 'app-ext-settings',
  templateUrl: './ext-settings.component.html',
  styleUrls: ['./ext-settings.component.scss']
})
export class ExtSettingsComponent implements OnInit {

  constructor(
    @Inject(COMPONENT_DATA)
    public componentData: ExtSettingsComponentData,
    private screenTransmission: ScreenTransmission
  ) {
  }

  ngOnInit(): void {
  }

  uninstallExt() {
    if (confirm(`Uninstall extension: ${this.componentData.ext.name}?`)) {
      if (this.componentData.ext.fromCode) {
        let fromCodeExts: Extension[] = loadFromCodeExtensions();
        fromCodeExts = fromCodeExts.filter((ext) => ext.name !== this.componentData.ext.name);
        saveFromCodeExtensions(fromCodeExts);
      }else {
        let installedExts: Extension[] = loadInstalledExtensions();
        installedExts = installedExts.filter((ext) => ext.name !== this.componentData.ext.name);
        saveInstalledExtensions(installedExts);
      }
      this.back();
    } else {
      // Do nothing
    }
  }

  back() {
    this.screenTransmission.back();
  }

  viewSource() {
    this.screenTransmission.goToScreen(AddCodeComponent, {code: this.componentData.ext.sourceCode});
  }
}
