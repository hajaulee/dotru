import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-inline-card',
  templateUrl: './inline-card.component.html',
  styleUrls: ['./inline-card.component.scss']
})
export class InlineCardComponent implements OnInit {

  @Input() iconUrl: string;
  @Input() matIcon: string;
  @Input() title: string;
  @Input() subTitle: string;
  @Input() data: any;
  @Input() badge?: number| string | undefined;

  @Output() onClick = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  click(){
    this.onClick.emit(this.data);
  }

}
