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
    const originalStyle = {...event.target.style};
    event.target.src = spinnerBase64;
    event.target.style.width = "unset";
    event.target.style.height = "unset";
    event.target.style.margin = "auto";
    event.target.style.top = "0";
    event.target.style.right = "0";
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
        event.target.style.width = originalStyle.width;
        event.target.style.height = originalStyle.height;
        event.target.style.margin = originalStyle.margin;
        event.target.style.top = originalStyle.top;
        event.target.style.right = originalStyle.right;
      })
    }
  }

}
