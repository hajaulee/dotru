import {Observable} from "rxjs";
import {ExtensionInfo} from "../models/extension-info";
import {httpGetAsync} from "../utils/http-utils";
import {EXTENSIONS_UPDATE_URL} from "../constants";
import {map} from "rxjs/operators";
import {Extension} from "../models/extension";


export function loadOnlineExtensions(): Observable<ExtensionInfo[]> {
  return httpGetAsync(EXTENSIONS_UPDATE_URL, false)
    .pipe(
      map((text) => {
          return JSON.parse(text);
      })
    )
}


export function installExtension(extensionInfo: ExtensionInfo): Observable<Extension> {
  return httpGetAsync(extensionInfo.sourceCodeUrl!, false)
    .pipe(
      map((text) => {
        return {...extensionInfo, fromCode: false, sourceCode: text};
      })
    )
}
