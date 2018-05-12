import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutes} from './app.routes';
import 'rxjs/add/operator/toPromise';

import {AccordionModule} from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';
import {BreadcrumbModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import {CarouselModule} from 'primeng/primeng';
import {ColorPickerModule} from 'primeng/primeng';
import {ChartModule} from 'primeng/primeng';
import {CheckboxModule} from 'primeng/primeng';
import {ChipsModule} from 'primeng/primeng';
import {CodeHighlighterModule} from 'primeng/primeng';
import {ConfirmDialogModule} from 'primeng/primeng';
import {SharedModule} from 'primeng/primeng';
import {ContextMenuModule} from 'primeng/primeng';
import {DataGridModule} from 'primeng/primeng';
import {DataListModule} from 'primeng/primeng';
import {DataScrollerModule} from 'primeng/primeng';
import {DataTableModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {DragDropModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {EditorModule} from 'primeng/primeng';
import {FieldsetModule} from 'primeng/primeng';
import {FileUploadModule} from 'primeng/primeng';
import {GalleriaModule} from 'primeng/primeng';
import {GMapModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import {InputMaskModule} from 'primeng/primeng';
import {InputSwitchModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {InputTextareaModule} from 'primeng/primeng';
import {LightboxModule} from 'primeng/primeng';
import {ListboxModule} from 'primeng/primeng';
import {MegaMenuModule} from 'primeng/primeng';
import {MenuModule} from 'primeng/primeng';
import {MenubarModule} from 'primeng/primeng';
import {MessagesModule} from 'primeng/primeng';
import {MultiSelectModule} from 'primeng/primeng';
import {OrderListModule} from 'primeng/primeng';
import {OrganizationChartModule} from 'primeng/primeng';
import {OverlayPanelModule} from 'primeng/primeng';
import {PaginatorModule} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import {PanelMenuModule} from 'primeng/primeng';
import {PasswordModule} from 'primeng/primeng';
import {PickListModule} from 'primeng/primeng';
import {ProgressBarModule} from 'primeng/primeng';
import {RadioButtonModule} from 'primeng/primeng';
import {RatingModule} from 'primeng/primeng';
import {ScheduleModule} from 'primeng/primeng';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {SelectButtonModule} from 'primeng/primeng';
import {SlideMenuModule} from 'primeng/primeng';
import {SliderModule} from 'primeng/primeng';
import {SpinnerModule} from 'primeng/primeng';
import {SplitButtonModule} from 'primeng/primeng';
import {StepsModule} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {TabMenuModule} from 'primeng/primeng';
import {TabViewModule} from 'primeng/primeng';
import {TerminalModule} from 'primeng/primeng';
import {TieredMenuModule} from 'primeng/primeng';
import {ToggleButtonModule} from 'primeng/primeng';
import {ToolbarModule} from 'primeng/primeng';
import {TooltipModule} from 'primeng/primeng';
import {TreeModule} from 'primeng/primeng';
import {TreeTableModule} from 'primeng/primeng';

import {AppComponent} from './app.component';
import {AppMenuComponent, AppSubMenuComponent} from './app.menu.component';
import {AppTopbarComponent} from './app.topbar.component';
import {AppFooterComponent} from './app.footer.component';
import {AppInlineProfileComponent} from './app.profile.component';
import {AuthorService} from './services/author.service';
import {AuthService} from './services/auth.service';
import {GenreService} from './services/genre.service';
import {BookService} from './services/book.service';
import {AdminBooksComponent} from './components/admin/admin-books/admin-books.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthComponent} from './components/auth/auth.component';
import {AddBookComponent} from './components/admin/add-book/add-book.component';
import {TokenInterceptor} from './token-interceptor';
import {StorageComponent} from './components/admin/storage/storage.component';
import {ConfirmationService} from 'primeng/api';
import {BookInStockService} from './services/book-in-stock.service';
import {AuthorsComponent} from './components/admin/authors/authors.component';
import {AddAuthorComponent} from './components/admin/add-author/add-author.component';
import {CountryService} from './services/country.service';
import {AdminGanresComponent} from './components/admin/admin-ganres/admin-ganres.component';
import {WorkWithGenreComponent} from './components/admin/work-with-genre/work-with-genre.component';
import {AdminReviewsComponent} from './components/admin/admin-reviews/admin-reviews.component';
import {ReviewService} from './services/review.service';
import {IssuedBooksAdminComponent} from './components/admin/issued-books-admin/issued-books-admin.component';
import {IssuedBookService} from './services/issued-book.service';
import {WorkWithIssuedBookComponent} from './components/admin/work-with-issued-book/work-with-issued-book.component';
import {PersonaService} from './services/persona.service';
import { TypeOffIssuedBookAdminComponent } from './components/admin/type-off-issued-book-admin/type-off-issued-book-admin.component';
import {TypeOfIssuedService} from './services/type-of-issued.service';
import { WorkWithTypeOfIssuedComponent } from './components/admin/work-with-type-of-issued/work-with-type-of-issued.component';
import { CountryAdminComponent } from './components/admin/country-admin/country-admin.component';
import {AdminGuard} from './guards/admin.guard';
import { UserBooksComponent } from './components/user/user-books/user-books.component';
import { UserBookComponent } from './components/user/user-book/user-book.component';
import { AddToStorageComponent } from './components/admin/add-to-storage/add-to-storage.component';
import { UsersComponent } from './components/admin/users/users.component';
import { WorkWithUserComponent } from './components/admin/work-with-user/work-with-user.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutes,
    HttpModule,
    BrowserAnimationsModule,
    AccordionModule,
    AutoCompleteModule,
    BreadcrumbModule,
    ButtonModule,
    CalendarModule,
    CarouselModule,
    ColorPickerModule,
    ChartModule,
    CheckboxModule,
    ChipsModule,
    CodeHighlighterModule,
    ConfirmDialogModule,
    SharedModule,
    ContextMenuModule,
    DataGridModule,
    DataListModule,
    DataScrollerModule,
    DataTableModule,
    DialogModule,
    DragDropModule,
    DropdownModule,
    EditorModule,
    FieldsetModule,
    FileUploadModule,
    GalleriaModule,
    GMapModule,
    GrowlModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    LightboxModule,
    ListboxModule,
    MegaMenuModule,
    MenuModule,
    MenubarModule,
    MessagesModule,
    MultiSelectModule,
    OrderListModule,
    OrganizationChartModule,
    OverlayPanelModule,
    PaginatorModule,
    PanelModule,
    PanelMenuModule,
    PasswordModule,
    PickListModule,
    ProgressBarModule,
    RadioButtonModule,
    RatingModule,
    ScheduleModule,
    ScrollPanelModule,
    SelectButtonModule,
    SlideMenuModule,
    SliderModule,
    SpinnerModule,
    SplitButtonModule,
    StepsModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TerminalModule,
    TieredMenuModule,
    ToggleButtonModule,
    ToolbarModule,
    TooltipModule,
    TreeModule,
    TreeTableModule
  ],
  declarations: [
    AppComponent,
    AppMenuComponent,
    AppSubMenuComponent,
    AppTopbarComponent,
    AppFooterComponent,
    AppInlineProfileComponent,
    AdminBooksComponent,
    AuthComponent,
    AddBookComponent,
    StorageComponent,
    AuthorsComponent,
    AddAuthorComponent,
    AdminGanresComponent,
    WorkWithGenreComponent,
    AdminReviewsComponent,
    IssuedBooksAdminComponent,
    WorkWithIssuedBookComponent,
    TypeOffIssuedBookAdminComponent,
    WorkWithTypeOfIssuedComponent,
    CountryAdminComponent,
    UserBooksComponent,
    UserBookComponent,
    AddToStorageComponent,
    UsersComponent,
    WorkWithUserComponent,
  ],
  providers: [
    AuthorService,
    AuthService,
    BookService,
    GenreService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    ConfirmationService,
    BookInStockService,
    CountryService,
    ReviewService,
    IssuedBookService,
    PersonaService,
    TypeOfIssuedService,
    AdminGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
