import {inAppExtensions, KeyFromCodeExtensions, KeyInstalledExtensions} from "../constants";
import {loadObject, saveObject} from "./base";
import {Extension} from "../models/extension";

export function loadFromCodeExtensions(): Extension[] {
  return loadObject(KeyFromCodeExtensions, []);
}

export function saveFromCodeExtensions(extensions: Extension[]) {
  saveObject(KeyFromCodeExtensions, extensions);
}

export function loadInstalledExtensions(): Extension[] {
  return loadObject(KeyInstalledExtensions, []);
}

export function saveInstalledExtensions(extensions: Extension[]) {
  saveObject(KeyInstalledExtensions, extensions);
}

export function loadAllExtensions(): Extension[] {
  return loadFromCodeExtensions()
    .concat(loadInstalledExtensions())
    .concat(inAppExtensions);
}
