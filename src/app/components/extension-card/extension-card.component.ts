import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Extension} from "../../shares/models/extension";
import {Source} from "../../shares/models/source";
@Component({
  selector: 'app-extension-card',
  templateUrl: './extension-card.component.html',
  styleUrls: ['./extension-card.component.scss']
})
export class ExtensionCardComponent implements OnInit {

  @Input() extension: Extension | Source;
  @Input() showVersion = true;
  @Output() click = new EventEmitter<Extension | Source>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onClick() {
    this.click.emit(this.extension);
  }

}
