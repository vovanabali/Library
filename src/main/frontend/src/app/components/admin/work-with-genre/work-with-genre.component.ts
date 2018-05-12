import {Component, OnInit} from '@angular/core';
import {Genre} from '../../../domains/genre';
import {ActivatedRoute, Router} from '@angular/router';
import {GenreService} from '../../../services/genre.service';
import {Message} from 'primeng/components/common/api';

@Component({
  selector: 'app-work-with-genre',
  templateUrl: './work-with-genre.component.html',
  styleUrls: ['./work-with-genre.component.css']
})
export class WorkWithGenreComponent implements OnInit {
  genre = new Genre();
  msgs: Message[] = [];

  constructor(private genreService: GenreService,
              private activeRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(param => {
      const genreId = param['id'];
      if (this.activeRoute.snapshot.routeConfig.path === 'editGenre') {
        if (genreId == null) {
          this.router.navigate(['admin', 'addGener']);
        } else {
          this.genreService.getGenreById(genreId).subscribe(book => {
            this.genre = book;
          });
        }
        document.getElementById('saveButton').style.display = 'block';
      } else {
        document.getElementById('addButton').style.display = 'block';
      }
    });
  }

  addGenre(): void {
    this.genreService.addGenre(this.genre).subscribe((res) => {
      this.msgs = [];
      if (res) {
        this.msgs.push({severity: 'success', summary: 'Успех', detail: 'Жанр был добавлен'});
        setTimeout(() => this.router.navigate(['admin', 'genres']), 500);
      } else {
        this.msgs.push({severity: 'error', summary: 'Ошибка', detail: 'Не удалось добавить жанр'});
      }
    });
  }

  updateGenre(): void {
    this.genreService.updateGenre(this.genre).subscribe((res) => {
      this.msgs = [];
      if (res) {
        this.msgs.push({severity: 'success', summary: 'Успех', detail: 'Жанр был обнавлён'});
        setTimeout(() => this.router.navigate(['admin', 'genres']), 500);
      } else {
        this.msgs.push({severity: 'error', summary: 'Ошибка', detail: 'Не удалось обнавить жанр'});
      }
    });
  }
}
