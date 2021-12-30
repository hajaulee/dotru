import {Component, Inject, OnInit} from '@angular/core';
import {COMPONENT_DATA} from "../../app.component";
import {ReplaySubject} from "rxjs";
import {MatSliderChange} from "@angular/material/slider";
import {SManga} from "../../shares/models/smanga";
import {SChapter} from "../../shares/models/schapter";
import {SPage} from "../../shares/models/spage";
import {ScreenTransmission} from "../../shares/injectable/screen-transmission";
import {Engine} from "../../shares/services/manga-engine";
import {isSavedManga, saveManga} from "../../shares/storages/manga";
import {AppSettingsLoader} from "../../shares/injectable/app-settings-loader";
import {ReadingModeEnum} from "../../shares/models/saved-manga";

export interface ReaderComponentData {
  manga: SManga;
  chapter: SChapter;
}

export interface PointerCorner {
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
}

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss']
})
export class ReaderComponent implements OnInit {

  readingModeEnum = ReadingModeEnum;

  pages$ = new ReplaySubject<SPage[]>(1);
  currentPages: SPage[] = [];

  fullscreen = false;
  fullscreenDelayTime = 500;
  timer: any;
  readingPageIndex = 0;
  engine: Engine;
  chapter: SChapter;
  readingMode: ReadingModeEnum;
  showCornerHint = false;

  constructor(
    @Inject(COMPONENT_DATA)
    public componentData: ReaderComponentData,
    public settingsLoader: AppSettingsLoader,
    private screenTransmission: ScreenTransmission
  ) {
  }

  ngOnInit(): void {
    this.engine = new Engine(this.componentData.manga.source!);
    this.chapter = this.componentData.chapter;
    this.loadPages();
    this.toFullScreen();
    this.readingMode = this.componentData.manga.readingMode ?? this.settingsLoader.settings.defaultReadingMode ?? ReadingModeEnum.WEB_TOON;
  }

  loadPages() {
    this.engine
      .getPages(this.chapter)
      .subscribe(pages => {
        this.pages$.next(pages);
        this.currentPages = pages;
      });
  }

  back() {
    this.screenTransmission.back();
  }

  refresh() {
    this.pages$.next(undefined);
    this.loadPages();
  }

  jumpPage(index: number | null) {
    const pageToScrollTo = document.getElementById('page-' + index);
    if (pageToScrollTo) {
      pageToScrollTo.scrollIntoView(true);
    }
    this.toFullScreen();
  }

  toFullScreen(instant = false) {
    if (instant) {
      this.fullscreen = true;
    } else {
      this.timer = setTimeout(() => {
        this.fullscreen = true;
      }, this.fullscreenDelayTime * 1000);
    }
  }

  pageClick(event: PointerEvent | MouseEvent) {
    const corner = this.getPointerCorner(event);

    if (this.readingMode === ReadingModeEnum.L2R) {
      if (corner.left) {
        this.previousPage()
      } else if (corner.right) {
        this.nextPage()
      } else {
        this.toggleFullScreen()
      }
    }

    if (this.readingMode === ReadingModeEnum.R2L) {
      if (corner.left) {
        this.nextPage()
      } else if (corner.right) {
        this.previousPage()
      } else {
        this.toggleFullScreen()
      }
    }
    if (this.readingMode === ReadingModeEnum.WEB_TOON) {
      if (corner.top) {
        this.previousPage()
      } else if (corner.bottom) {
        this.nextPage()
      } else {
        this.toggleFullScreen()
      }
    }
  }


  previousPage() {
    if (this.readingPageIndex > 0) {
      this.readingPageIndex--
    }
  }

  nextPage() {
    if (this.readingPageIndex < this.currentPages.length - 1) {
      this.readingPageIndex++;
    }
  }

  toggleFullScreen() {
    if (this.fullscreen) {
      this.exitFullScreen();
    } else {
      this.toFullScreen(true);
    }
  }

  exitFullScreen() {
    this.fullscreen = false;
    this.clearFullScreenTimer();
    this.toFullScreen();
  }

  clearFullScreenTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  slideChange(change: MatSliderChange) {
    this.readingPageIndex = change.value ?? 1;
    this.clearFullScreenTimer()
  }

  jumpChapter(chapter: SChapter) {
    this.chapter = chapter;
    this.chapter.read = true;
    this.componentData.manga.readChapters = [...new Set([...this.componentData.manga.readChapters ?? [], this.chapter.chapterNumber])];
    if (isSavedManga(this.componentData.manga)) {
      saveManga(this.componentData.manga); // update saved data
    }

    this.readingPageIndex = 0;
    this.pages$.next(undefined);
    this.loadPages();
  }

  nextChapter() {
    const nextChapter = this.componentData.manga.chapters.find((chapter) => chapter.chapterNumber === this.chapter.chapterNumber + 1);
    if (nextChapter) {
      this.jumpChapter(nextChapter);
    } else {
      alert("No next chapter!")
    }
  }

  previousChapter() {
    const previousChapter = this.componentData.manga.chapters.find((chapter) => chapter.chapterNumber === this.chapter.chapterNumber - 1);
    if (previousChapter) {
      this.jumpChapter(previousChapter);
    } else {
      alert("No previous chapter!")
    }
  }

  toggleReadingMode(mode: ReadingModeEnum) {
    this.readingMode = mode;
    this.componentData.manga.readingMode = mode;
    if (isSavedManga(this.componentData.manga)) {
      saveManga(this.componentData.manga); // update saved data
    }
    this.showCornerHint = true;
    setTimeout(() => this.showCornerHint = false, 2000);
  }

  getPointerCorner(event: PointerEvent | MouseEvent) {

    const percent = 0.3;
    const pointX = event.x;
    const pointY = event.y;
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    const corner: PointerCorner = {
      left: pointX < screenWidth * 0.2,
      right: pointX > screenWidth * (1 - percent),
      top: pointY < screenHeight * 0.2,
      bottom: pointY > screenHeight * (1 - percent)
    };
    return corner;
  }
}
