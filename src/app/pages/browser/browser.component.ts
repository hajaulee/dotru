import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent implements OnInit {

  activeTab = 0;
  loaded = true;

  constructor() {
  }

  ngOnInit(): void {
  }


  refresh(){
    this.loaded = false;
    setTimeout(() => this.loaded = true, 100);
  }

}
