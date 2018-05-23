import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AdminBooksComponent} from './components/admin/admin-books/admin-books.component';
import {AuthComponent} from './components/auth/auth.component';
import {AddBookComponent} from './components/admin/add-book/add-book.component';
import {StorageComponent} from './components/admin/storage/storage.component';
import {AuthorsComponent} from './components/admin/authors/authors.component';
import {AddAuthorComponent} from './components/admin/add-author/add-author.component';
import {AdminGanresComponent} from './components/admin/admin-ganres/admin-ganres.component';
import {WorkWithGenreComponent} from './components/admin/work-with-genre/work-with-genre.component';
import {AdminReviewsComponent} from './components/admin/admin-reviews/admin-reviews.component';
import {IssuedBooksAdminComponent} from './components/admin/issued-books-admin/issued-books-admin.component';
import {WorkWithIssuedBookComponent} from './components/admin/work-with-issued-book/work-with-issued-book.component';
import {TypeOffIssuedBookAdminComponent} from './components/admin/type-off-issued-book-admin/type-off-issued-book-admin.component';
import {CountryAdminComponent} from './components/admin/country-admin/country-admin.component';
import {AdminGuard} from './guards/admin.guard';
import {UserBooksComponent} from './components/user/user-books/user-books.component';
import {UserBookComponent} from './components/user/user-book/user-book.component';
import {AddToStorageComponent} from './components/admin/add-to-storage/add-to-storage.component';
import {UsersComponent} from './components/admin/users/users.component';
import {WorkWithUserComponent} from './components/admin/work-with-user/work-with-user.component';

export const routes: Routes = [
  {path: '', component: UserBooksComponent},
  {
    path: 'admin', canActivate: [AdminGuard], children: [
      {path: '', component: AdminBooksComponent},
      {path: 'books', component: AdminBooksComponent},
      {path: 'issuedBooks', component: IssuedBooksAdminComponent},
      {path: 'storage', component: StorageComponent},
      {path: 'authors', component: AuthorsComponent},
      {path: 'genres', component: AdminGanresComponent},
      {path: 'reviews', component: AdminReviewsComponent},
      {path: 'blackList', component: AdminBooksComponent},
      {path: 'countries', component: CountryAdminComponent},
      {path: 'other', component: AdminBooksComponent},
      {path: 'settings', component: AdminBooksComponent},
      {path: 'typeOfIssued', component: TypeOffIssuedBookAdminComponent},
      {path: 'users', component: UsersComponent},
      {path: 'addBook', component: AddBookComponent},
      {path: 'addAuthor', component: AddAuthorComponent},
      {path: 'addGenre', component: WorkWithGenreComponent},
      {path: 'addReview', component: WorkWithGenreComponent},
      {path: 'addIssuedBook', component: WorkWithIssuedBookComponent},
      {path: 'editAuthor', component: AddAuthorComponent},
      {path: 'editBook', component: AddBookComponent},
      {path: 'editGenre', component: WorkWithGenreComponent},
      {path: 'editReview', component: WorkWithGenreComponent},
      {path: 'addToStorage', component: AddToStorageComponent},
      {path: 'updateBookInStorage', component: AddToStorageComponent},
      {path: 'addUser', component: WorkWithUserComponent},
    ]
  },
  {path: 'books', component: UserBooksComponent},
  {path: 'book/:id', component: UserBookComponent},
  {path: 'sing-in', component: AuthComponent, pathMatch: 'full'},
  {path: 'sing-out', component: AuthComponent, pathMatch: 'full'}
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);