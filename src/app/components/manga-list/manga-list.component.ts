import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {SManga} from "../../shares/models/smanga";

export type LoadStatusEnum = "LOADING" | "RETRY" | "LOADED";

export const LoadStatusEnum = {
  LOADING: "LOADING" as LoadStatusEnum,
  RETRY: "RETRY" as LoadStatusEnum,
  LOADED: "LOADED" as LoadStatusEnum
}

@Component({
  selector: 'app-manga-list',
  templateUrl: './manga-list.component.html',
  styleUrls: ['./manga-list.component.scss']
})
export class MangaListComponent implements OnInit, OnChanges {

  @Input() mangaList: SManga[];
  @Input() showLoadMore = true;
  @Input() oneRow = false;
  @Output() loadMore = new EventEmitter<any>();
  @Output() mangaClick = new EventEmitter<SManga>();

  // Enums
  loadStatusEnum = LoadStatusEnum;

  loadStatus = LoadStatusEnum.LOADED;
  cols = 3;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty("mangaList")) {
      const newLength = changes.mangaList.currentValue?.length ?? 0;
      const oldLength = changes.mangaList.previousValue?.length ?? 0;
      if (newLength > oldLength) {
        this.loadStatus = LoadStatusEnum.LOADED;
      } else {
        this.loadStatus = LoadStatusEnum.RETRY;
      }
    }
  }

  loadMoreManga() {
    this.loadStatus = LoadStatusEnum.LOADING;
    this.loadMore.emit();
  }

}
