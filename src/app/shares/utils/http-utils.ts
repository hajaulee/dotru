import {Observable} from "rxjs";
import {PROXY_URL} from "../constants";

export type ContentType = 'text' | 'base64';

export interface ProxyParams {
  contentType?: ContentType,
  tryTime?: number;
  minLength?: number;
  cacheTime?: number;
}

export  function httpGetAsync(url: string, useProxy=true, proxyParams: ProxyParams = {}, headers: {[k:string]:string} = {}): Observable<string> {
    return new Observable<string>(subscriber => {
      const xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
          subscriber.next(xmlHttp.responseText);
          subscriber.complete();
        }
      }
      if (useProxy){
        url = `${PROXY_URL}?url=${encodeURIComponent(url)}`;
        Object.keys(proxyParams).forEach(key => {
          url += `&${key}=${(proxyParams as any)[key]}`;
        });
        Object.keys(headers).forEach(key => {
          url += `&${key}=${headers[key]}`;
        });
      }
      xmlHttp.open("GET", url, true);
      xmlHttp.send(null);
    });
  }
