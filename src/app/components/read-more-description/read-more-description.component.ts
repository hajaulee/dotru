import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-read-more-description',
  templateUrl: './read-more-description.component.html',
  styleUrls: ['./read-more-description.component.scss']
})
export class ReadMoreDescriptionComponent implements OnInit {

  @Input() text: string;
  @Input() maxHeight: number = 16;
  @Input() unit: string = 'px';

  expanding = false;

  textBoxStyle = {
    maxHeight: this.maxHeight + this.unit
  }

  constructor() { }

  ngOnInit(): void {
    this.textBoxStyle.maxHeight = this.maxHeight + this.unit;
  }

  expandToggle(){
    this.expanding = !this.expanding;
    if (this.expanding){
      this.textBoxStyle.maxHeight = 'unset';
    }else{
      this.textBoxStyle.maxHeight = this.maxHeight + this.unit;
    }
  }


}
