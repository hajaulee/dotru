import {Component, Inject, OnInit} from '@angular/core';
import {COMPONENT_DATA} from "../../app.component";
import {ScreenTransmission} from "../../shares/injectable/screen-transmission";

export interface WebViewComponentData {
  url: string
}

@Component({
  selector: 'app-web-view',
  templateUrl: './web-view.component.html',
  styleUrls: ['./web-view.component.scss']
})
export class WebViewComponent implements OnInit {

  constructor(
    @Inject(COMPONENT_DATA)
    public componentData: WebViewComponentData,
    private screenTransmission: ScreenTransmission
  ) {
  }

  ngOnInit(): void {
  }

  back() {
    this.screenTransmission.back();
  }

  openInNewTab() {
    window.open(this.componentData.url, '_blank');
  }

}
