import {Directive, ElementRef, Output, EventEmitter} from '@angular/core';

export type SwipeDirection = 'left' | 'right';
export type TouchEventWhen = 'start' | 'end';
@Directive({
  selector: '[appTouchSwipe]'
})
export class TouchSwipeDirective {
  element: HTMLImageElement;
  swipeCoord: [number, number];
  swipeTime: number;
  @Output() onSwipe = new EventEmitter<SwipeDirection>();

  constructor(private eleRef: ElementRef) {
  }


  ngOnInit(): void {
    this.element = this.eleRef.nativeElement;
    this.addEvents();
  }

  addEvents() {
    this.element.addEventListener("touchstart", (e) => {
      this.onTouch(e, 'start');
    });
    this.element.addEventListener("touchend", (e) => {
      this.onTouch(e, 'end')
    });
  }

  onTouch(e: TouchEvent, when: TouchEventWhen) {
    // Reference: https://medium.com/@sarvesh.y305/add-swipe-gesture-to-angular-material-tabs-in-angular-10-2112d3275c6e
    const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
    const time = new Date().getTime();
    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    } else if (when === 'end') {
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
      const duration = time - this.swipeTime;
      if (duration < 1000 //
        && Math.abs(direction[0]) > 30 // Long enough
        && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { // Horizontal enough
        const swipe: SwipeDirection = direction[0] < 0 ? 'left' : 'right';
        this.onSwipe.emit(swipe);
      }
    }
  }

}
