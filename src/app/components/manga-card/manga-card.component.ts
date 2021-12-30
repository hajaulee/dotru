import {Component, Input, OnInit} from '@angular/core';
import {SManga} from "../../shares/models/smanga";
@Component({
  selector: 'app-manga-card',
  templateUrl: './manga-card.component.html',
  styleUrls: ['./manga-card.component.scss']
})
export class MangaCardComponent implements OnInit {

  @Input() manga: SManga;
  constructor() { }

  ngOnInit(): void {
  }

}
