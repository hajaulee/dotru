import {Injectable} from "@angular/core";
import {ComponentType} from "@angular/cdk/overlay";
import {Observable, ReplaySubject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ComponentPortal} from "@angular/cdk/portal";

export interface ScreenTransmissionData {
  portal?: ComponentPortal<any>;
  component?: ComponentType<any>,
  componentData?: any;
}

export interface StateHistory {
  state: string;
  portal: ComponentPortal<any>;
}

@Injectable({
  providedIn: "root"
})
export class ScreenTransmission {

  protected static instance: ScreenTransmission;
  private nextScreen$ = new ReplaySubject<ScreenTransmissionData>(1);
  private portalHistory: StateHistory[] = [];
  private maxHistoryLength = 10;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Singleton
    if (ScreenTransmission.instance) {
      return ScreenTransmission.instance
    }
    ScreenTransmission.instance = this;

    this.route.queryParams
      .subscribe((queryParams) => {
        if (queryParams.hasOwnProperty("state")) {
          if (this.portalHistory.some(stateHistory => stateHistory.state === queryParams.state)) {
            this.back()
          }
        }else {
          // if no state back to first screen
          if (this.portalHistory.length > 0){
            this.nextScreen$.next(this.portalHistory[0]);
          }
        }
      });
  }

  getNextScreen(): Observable<ScreenTransmissionData> {
    return this.nextScreen$;
  }

  goToScreen(component: ComponentType<any>, componentData: any) {
    this.nextScreen$.next({component, componentData});
    this.navigate();
  }

  addHistory(portal: ComponentPortal<any>) {
    this.portalHistory.push({portal, state: this.getCurrentState()});
    this.portalHistory = this.portalHistory.slice(this.portalHistory.length - this.maxHistoryLength);
  }

  back() {
    this.portalHistory.pop();
    const parent = this.portalHistory[this.portalHistory.length - 1];
    this.nextScreen$.next({portal: parent.portal});
  }

  getCurrentState(): string {
    return this.route.snapshot.queryParams.state;
  }

  navigate() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        state: Math.random().toString().split('.')[1]
      }
    }).then()
  }

}
