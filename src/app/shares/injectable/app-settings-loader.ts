import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {loadSettings, saveSettings} from "../storages/settings";
import {AppSettings} from "../models/app-settings";


@Injectable({
  providedIn: 'root'
})
export class AppSettingsLoader {

  private _settings: AppSettings = loadSettings();
  private settings$ = new BehaviorSubject<AppSettings>(this._settings);

  changeSettings(settings: Partial<AppSettings>) {
    saveSettings(settings);
    this._settings = loadSettings();
    this.settings$.next(this.settings);
  }

  settingsChange(): Observable<AppSettings> {
    return this.settings$;
  }

  get settings(): AppSettings {
    return this._settings;
  }

}
