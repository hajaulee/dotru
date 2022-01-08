import {Directive, ElementRef, Input} from '@angular/core';
import {httpGetAsync} from "../utils/http-utils";

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
    if (!event.target.src.startsWith('data')) {
      console.log("trying to reload image via proxy");
      httpGetAsync(
        event.target.src,
        true,
        true,
        {contentType: 'base64'},
        this.headers
      ).subscribe((data) => {
        event.target.src = "data:image/png;base64, " + data;
      })
    }
  }

}
