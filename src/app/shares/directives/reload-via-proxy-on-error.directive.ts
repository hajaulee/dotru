import {Directive, ElementRef, Input} from '@angular/core';
import {httpGetAsync} from "../utils/http-utils";
import {spinnerBase64} from "../constants/base64";

@Directive({
  selector: '[reloadViaProxyOnError]'
})
export class ReloadViaProxyOnErrorDirective {
  img: HTMLImageElement;

  @Input() headers: {[k: string]: string};

  constructor(private imageRef: ElementRef) {
  }

  ngOnInit(): void {
    this.img = this.imageRef.nativeElement;
    this.addEvents();
  }

  addEvents() {
    this.img.addEventListener("error", (e) => {
      this.tryLoadImageViaProxy(e);
    });
  }

  tryLoadImageViaProxy(event: any) {
    const originalSrc = event.target.src;
    event.target.src = spinnerBase64;
    event.target.classList.add("loading-spinner-img");
    if (!originalSrc.startsWith('data')) {
      console.log("trying to reload image via proxy");
      httpGetAsync(
        originalSrc,
        true,
        true,
        {contentType: 'base64'},
        this.headers
      ).subscribe((data) => {
        event.target.src = "data:image/png;base64, " + data;
        event.target.classList.remove("loading-spinner-img");
      })
    }
  }

}
