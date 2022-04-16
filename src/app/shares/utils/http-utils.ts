import {Observable, Subscriber} from "rxjs";
import {PROXY_URL, RESOURCE_CACHE} from "../constants";

export type ContentType = 'text' | 'base64';

export interface ProxyParams {
  contentType?: ContentType,
  tryTime?: number;
  minLength?: number;
  cacheTime?: number;
}

function fetchData(url: string, subscriber: Subscriber<any>, useCache: boolean) {
  fetch(url).then((res) => {
    let clone = res.clone()
    res.text().then(text => {
      subscriber.next(text);
    });

    if ('caches' in window && useCache) {
      caches.open(RESOURCE_CACHE).then(cache => {
        cache.put(url, clone).then()
      });
    }
  });
}

function httpGet(theUrl: string) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

export function createUrl(url: string, useProxy = true, proxyParams: ProxyParams = {}, headers: { [k: string]: string } = {}): string {
  if (useProxy) {
    url = `${PROXY_URL}?url=${encodeURIComponent(url)}`;
    if (proxyParams) {
      Object.keys(proxyParams).forEach(key => {
        url += `&${key}=${(proxyParams as any)[key]}`;
      });
    }
    if (headers) {
      Object.keys(headers).forEach(key => {
        url += `&${key}=${headers[key]}`;
      });
    }
  }
  return url;
}

export function httpGetAsync(url: string, useProxy = true, useCache: boolean = false, proxyParams: ProxyParams = {}, headers: { [k: string]: string } = {}): Observable<string> {
  // TODO use cacheTime instead of useCache
  url = createUrl(url, useProxy, proxyParams, headers);
  return new Observable<string>(subscriber => {

    if ('caches' in window && useCache) {
      caches.open(RESOURCE_CACHE).then(cache => {
        cache.match(url).then(cached => {
          if (cached) {
            cached.text().then(text => {
              subscriber.next(text);
            });
          } else {
            fetchData(url, subscriber, useCache);
          }
        })
      });
    } else {
      fetchData(url, subscriber, useCache);
    }

  });
}

export function httpGetSync(url: string, useProxy = true, useCache: boolean = false, proxyParams: ProxyParams = {}, headers: { [k: string]: string } = {}, timeout = 2): string {
  url = createUrl(url, useProxy, proxyParams, headers);
  return httpGet(url);
}
