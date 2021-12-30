import {Observable} from "rxjs";
import {PROXY_URL} from "../constants";

export  function httpGetAsync(url: string, useProxy=true): Observable<string> {
    return new Observable<string>(subscriber => {
      const xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
          subscriber.next(xmlHttp.responseText);
      }
      xmlHttp.open("GET", (useProxy ? PROXY_URL: "") + url, true);
      xmlHttp.send(null);
    });
  }
