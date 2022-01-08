import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {LibraryComponent} from './pages/library/library.component';
import {UpdatesComponent} from './pages/updates/updates.component';
import {HistoryComponent} from './pages/history/history.component';
import {BrowserComponent} from './pages/browser/browser.component';
import {MoreComponent} from './pages/more/more.component';
import {SourcesComponent} from './pages/browser/tabs/sources/sources.component';
import {ExtensionsComponent} from './pages/browser/tabs/extensions/extensions.component';
import {MigrateComponent} from './pages/browser/tabs/migrate/migrate.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatTabGroupGestureModule} from "@angular-material-gesture/mat-tab-group-gesture";
import {AddCodeComponent} from './pages/browser/tabs/extensions/add-code/add-code.component';
import {FormsModule} from "@angular/forms";
import {ExtensionCardComponent} from './components/extension-card/extension-card.component';
import {ExtSettingsComponent} from './pages/browser/tabs/extensions/ext-settings/ext-settings.component';
import {LangNamePipe} from "./shares/pipes/lang-name";
import {MangaListComponent} from './components/manga-list/manga-list.component';
import {MatOptionModule, MatRippleModule} from "@angular/material/core";
import {MangaCardComponent} from './components/manga-card/manga-card.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MangaDetailComponent} from './pages/manga-detail/manga-detail.component';
import {MainFooterComponent} from './components/main-footer/main-footer.component';
import {HeaderComponent} from './components/header/header.component';
import {PortalModule} from "@angular/cdk/portal";
import {PopularMangaListPageComponent} from './pages/browser/tabs/sources/popular-manga-list-page/popular-manga-list-page.component';
import {BackButtonComponent} from './components/back-button/back-button.component';
import {ReadMoreModule} from "ng-readmore";
import {MatChipsModule} from "@angular/material/chips";
import {ReadMoreDescriptionComponent} from './components/read-more-description/read-more-description.component';
import {IconButtonComponent} from './components/icon-button/icon-button.component';
import {WebViewComponent} from './pages/web-view/web-view.component';
import {SafePipe} from "./shares/pipes/safe-url";
import { ReaderComponent } from './pages/reader/reader.component';
import {MatSliderModule} from "@angular/material/slider";
import { InlineCardComponent } from './components/inline-card/inline-card.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatDividerModule} from "@angular/material/divider";
import { LatestMangaListPageComponent } from './pages/browser/tabs/sources/latest-manga-list-page/latest-manga-list-page.component';
import {MatInputModule} from "@angular/material/input";
import {MaxLengthPipe} from "./shares/pipes/max-length";
import {RelativeDatePipe} from "./shares/pipes/releative-date";
import {LoadingBarModule} from "@ngx-loading-bar/core";
import {DeferLoadModule} from "@trademe/ng-defer-load";
import {MatSelectModule} from "@angular/material/select";
import {MatMenuModule} from "@angular/material/menu";
import { CornerCoverComponent } from './components/corner-cover/corner-cover.component';
import {MatBadgeModule} from "@angular/material/badge";
import {NgxCodejarModule} from "ngx-codejar";


@NgModule({
  declarations: [
    AppComponent,
    LibraryComponent,
    UpdatesComponent,
    HistoryComponent,
    BrowserComponent,
    MoreComponent,
    SourcesComponent,
    ExtensionsComponent,
    MigrateComponent,
    AddCodeComponent,
    ExtensionCardComponent,
    ExtSettingsComponent,
    LangNamePipe,
    MangaListComponent,
    MangaCardComponent,
    MangaDetailComponent,
    MainFooterComponent,
    HeaderComponent,
    PopularMangaListPageComponent,
    BackButtonComponent,
    ReadMoreDescriptionComponent,
    IconButtonComponent,
    WebViewComponent,
    SafePipe,
    MaxLengthPipe,
    RelativeDatePipe,
    ReaderComponent,
    InlineCardComponent,
    LatestMangaListPageComponent,
    CornerCoverComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatTabsModule,
        MatTabGroupGestureModule,
        FormsModule,
        MatRippleModule,
        MatGridListModule,
        MatProgressSpinnerModule,
        PortalModule,
        ReadMoreModule,
        MatChipsModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatDividerModule,
        MatInputModule,
        LoadingBarModule,
        DeferLoadModule,
        MatSelectModule,
        MatOptionModule,
        MatMenuModule,
        MatBadgeModule,
        NgxCodejarModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
