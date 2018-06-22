import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutes} from './app.routes';
import 'rxjs/add/operator/toPromise';

import {
  AccordionModule,
  AutoCompleteModule,
  BreadcrumbModule,
  ButtonModule,
  CalendarModule,
  CarouselModule,
  ChartModule,
  CheckboxModule,
  ChipsModule,
  CodeHighlighterModule,
  ColorPickerModule,
  ConfirmDialogModule,
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
  InputTextareaModule,
  InputTextModule,
  LightboxModule,
  ListboxModule,
  MegaMenuModule,
  MenubarModule,
  MenuModule,
  MessagesModule,
  MultiSelectModule,
  OrderListModule,
  OrganizationChartModule,
  OverlayPanelModule,
  PaginatorModule,
  PanelMenuModule,
  PanelModule,
  PasswordModule,
  PickListModule,
  ProgressBarModule,
  RadioButtonModule,
  RatingModule,
  ScheduleModule,
  SelectButtonModule,
  SharedModule,
  SlideMenuModule,
  SliderModule,
  SpinnerModule,
  SplitButtonModule,
  StepsModule,
  TabMenuModule,
  TabViewModule,
  TerminalModule,
  TieredMenuModule,
  ToggleButtonModule,
  ToolbarModule,
  TooltipModule,
  TreeModule,
  TreeTableModule
} from 'primeng/primeng';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {TableModule} from 'primeng/table';
import {SidebarModule} from 'primeng/sidebar';

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
import {TypeOffIssuedBookAdminComponent} from './components/admin/type-off-issued-book-admin/type-off-issued-book-admin.component';
import {TypeOfIssuedService} from './services/type-of-issued.service';
import {WorkWithTypeOfIssuedComponent} from './components/admin/work-with-type-of-issued/work-with-type-of-issued.component';
import {CountryAdminComponent} from './components/admin/country-admin/country-admin.component';
import {AdminGuard} from './guards/admin.guard';
import {UserBooksComponent} from './components/user/user-books/user-books.component';
import {UserBookComponent} from './components/user/user-book/user-book.component';
import {AddToStorageComponent} from './components/admin/add-to-storage/add-to-storage.component';
import {UsersComponent} from './components/admin/users/users.component';
import {WorkWithUserComponent} from './components/admin/work-with-user/work-with-user.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {WorkWithCountryComponent} from './components/admin/work-with-country/work-with-country.component';
import {UserAuthorComponent} from './components/user/user-author/user-author.component';
import {RoleService} from "./services/role.service";
import {LibrarianMainComponent} from './components/librarian/librarian-main/librarian-main.component';
import {LibrarianBooksComponent} from './components/librarian/librarian-books/librarian-books.component';
import {LibrarianUsersComponent} from './components/librarian/librarian-users/librarian-users.component';
import {LibrarianGuard} from "./guards/librarian.guard";
import {LibrarianIssueComponent} from './components/librarian/librarian-issue/librarian-issue.component';
import {IssueService} from "./services/issue.service";
import {BlackListComponent} from './components/black-list/black-list.component';
import {BlackListService} from "./services/blackList.service";
import {LibrarianDebtorsComponent} from './components/librarian/librarian-debtors/librarian-debtors.component';
import {LibrarianIssuesBooksComponent} from './components/librarian/librarian-issues-books/librarian-issues-books.component';
import {ProfileComponent} from './components/profile/profile.component';
import {RezervationBooksComponent} from './components/librarian/rezervation-books/rezervation-books.component';
import {RezervationService} from "./services/rezervation.service";
import {IssueBooksHistoryComponent} from './components/issue-books-history/issue-books-history.component';
import {ReadingRoomComponent} from './components/librarian/reading-room/reading-room.component';

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
    TreeTableModule,
    SidebarModule
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
    RegistrationComponent,
    WorkWithCountryComponent,
    UserAuthorComponent,
    LibrarianMainComponent,
    LibrarianBooksComponent,
    LibrarianUsersComponent,
    LibrarianIssueComponent,
    BlackListComponent,
    LibrarianDebtorsComponent,
    LibrarianIssuesBooksComponent,
    ProfileComponent,
    RezervationBooksComponent,
    IssueBooksHistoryComponent,
    ReadingRoomComponent,
  ],
  providers: [
    AuthorService,
    AuthService,
    BookService,
    GenreService,
    RoleService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    ConfirmationService,
    BookInStockService,
    CountryService,
    ReviewService,
    IssuedBookService,
    PersonaService,
    TypeOfIssuedService,
    AdminGuard,
    LibrarianGuard,
    IssueService,
    BlackListService,
    RezervationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
