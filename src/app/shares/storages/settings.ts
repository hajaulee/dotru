import {AppSettings} from "../models/app-settings";
import {loadObject, saveObject} from "./base";
import {KeySettings} from "../constants";
import {ReadingModeEnum} from "../models/saved-manga";

export function loadSettings(): AppSettings {
  const defaultSettings: AppSettings = {
    darkMode: true,
    logHistory: true,
    updateLibraryOnStart: true,
    defaultReadingMode: ReadingModeEnum.WEB_TOON
  }
  const savedSettings = loadObject(KeySettings, {});
  return {...defaultSettings, ...savedSettings};
}

export function saveSettings(settings: AppSettings) {
  const savedSettings = loadSettings();
  saveObject(KeySettings, {...savedSettings, ...settings});
}
