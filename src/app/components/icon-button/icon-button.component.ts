import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent implements OnInit {

  @Input() icon: string;
  @Input() label: string;
  @Input() color?: ThemePalette;
  @Output() click = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
