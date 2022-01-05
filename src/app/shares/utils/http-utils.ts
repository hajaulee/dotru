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

export function httpGetAsync(url: string, useProxy = true, useCache: boolean = false, proxyParams: ProxyParams = {}, headers: { [k: string]: string } = {}): Observable<string> {
  // TODO use cacheTime instead of useCache
  if (useProxy) {
    url = `${PROXY_URL}?url=${encodeURIComponent(url)}`;
    Object.keys(proxyParams).forEach(key => {
      url += `&${key}=${(proxyParams as any)[key]}`;
    });
    Object.keys(headers).forEach(key => {
      url += `&${key}=${headers[key]}`;
    });
  }

  return new Observable<string>(subscriber => {

    if ('caches' in window) {
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
