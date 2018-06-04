import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, LazyLoadEvent, Message} from 'primeng/api';
import {Author} from '../../../domains/author';
import {Router} from '@angular/router';
import {AuthorService} from '../../../services/author.service';
import {DataTable} from "primeng/primeng";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  @ViewChild('authorsTable') dataTableComponent: DataTable;
  authors: Author[];
  selectAuthor: Author;
  cols: any[];
  msgs: Message[] = [];
  loading: boolean;
  totalRecords: number;

  constructor(private authorService: AuthorService, private router: Router, private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.cols = [
      {field: 'surname', header: 'Фамилия'},
      {field: 'name', header: 'Имя'},
      {field: 'patronymic', header: 'Имя'},
      {field: 'birthday', header: 'Дата рождения'},
      {field: 'country', header: 'Страна'},
    ];

    this.authorService.getAuthors().subscribe(books => this.totalRecords = books.length);
    this.loading = true;
  }

  loadAuthorsLazy(event: LazyLoadEvent): void {
    this.loading = true;
    this.authorService.slice(event.first / event.rows, event.rows, event.sortField, event.sortOrder).subscribe(authors => {
      this.authors = authors;
      this.loading = false;
    });
  }

  editEntry(id: number): void {
    if (id != null) {
      this.router.navigate(['admin/editAuthor'], {queryParams: {'id': id}});
    }
  }

  deleteAuthor(id: number): void {
    this.confirmationService.confirm({
      message: 'Вы действительно хотите удалить эту запись?',
      header: 'Подтверждение',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.authorService.deleteAuthorById(id).subscribe((result) => {
          if (result) {
            this.selectAuthor = new Author();
            this.loading = true;
            this.authorService.slice(0, this.dataTableComponent.rows, this.dataTableComponent.sortField, this.dataTableComponent.sortOrder)
              .subscribe(authors => {
                this.authors = authors;
                this.loading = false;
              });
            this.msgs = [{severity: 'success', summary: 'Успех', detail: 'Запись была успешно удалена!'}];
          } else {
            this.msgs = [{severity: 'error', summary: 'Провал', detail: 'Не удалось удалить запись!'}];
          }
        });
      }
    });
  }


}
