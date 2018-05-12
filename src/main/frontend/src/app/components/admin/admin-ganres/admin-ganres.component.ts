import {Component, OnInit} from '@angular/core';
import {ConfirmationService, LazyLoadEvent, Message} from 'primeng/api';
import {Genre} from '../../../domains/genre';
import {GenreService} from '../../../services/genre.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-ganres',
  templateUrl: './admin-ganres.component.html',
  styleUrls: ['./admin-ganres.component.css']
})
export class AdminGanresComponent implements OnInit {
  genres: Genre[];
  selectGenre: Genre;
  cols: any[];
  msgs: Message[] = [];
  loading: boolean;
  totalRecords: number;

  constructor(private genreService: GenreService, private router: Router, private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.cols = [
      {field: 'name', header: 'Название'}
    ];
    this.genreService.getGenres().subscribe((genres) => this.totalRecords = genres.length);
    this.loading = true;
  }

  loadGanresLazy(event: LazyLoadEvent): void {
    this.loading = true;
    this.genreService.getSlice(event.first / event.rows, event.rows, event.sortField, event.sortOrder).subscribe((genres) => {
      this.genres = genres;
      this.loading = false;
    });
  }

  editEntry(id: number): void {
    if (id != null) {
      this.router.navigate(['admin/editGenre'], {queryParams: {'id': id}});
    }
  }

  deleteGenre(id: number): void {
    this.confirmationService.confirm({
      message: 'Вы действительно хотите удалить эту запись?',
      header: 'Подтверждение',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.genreService.deleteGenreById(id).subscribe((result) => {
          if (result) {
            this.selectGenre = new Genre();
            this.msgs = [{severity: 'success', summary: 'Успех', detail: 'Запись была успешно удалена!'}];
          } else {
            this.msgs = [{severity: 'error', summary: 'Провал', detail: 'Не удалось удалить запись!'}];
          }
        });
      }
    });
  }
}
