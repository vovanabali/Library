import {Component, OnInit} from '@angular/core';
import {Country} from '../../../domains/country';
import {Author} from '../../../domains/author';
import {AuthorService} from '../../../services/author.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CountryService} from '../../../services/country.service';
import {Message} from 'primeng/components/common/api';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {
  author = new Author();
  countryes: Country[];
  msgs: Message[] = [];

  constructor(private authorService: AuthorService,
              private countryService: CountryService,
              private activeRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(param => {
      const authorId = param['id'];
      if (this.activeRoute.snapshot.routeConfig.path === 'editAuthor') {
        if (authorId == null) {
          this.router.navigate(['admin', 'addAuthor']);
        } else {
          this.authorService.getAuthorById(authorId).subscribe(author => {
            this.author = author;
            this.author.birthday = new Date(author.birthday);
          });
        }
        document.getElementById('saveButton').style.display = 'block';
      } else {
        document.getElementById('addButton').style.display = 'block';
      }
    });
    this.countryService.getCountrys().subscribe(countries => this.countryes = countries);
  }

  addAuthor(): void {
    this.authorService.addAuthor(this.author).subscribe((res) => {
      this.msgs = [];
      if (res) {
        this.msgs.push({severity: 'success', summary: 'Успех', detail: 'Автор была добавлен'});
        setTimeout(() => this.router.navigate(['admin', 'authors']), 500);
      } else {
        this.msgs.push({severity: 'error', summary: 'Ошибка', detail: 'Не удалось добавить автора'});
      }
    });
  }

  updateAuthor(): void {
    this.authorService.updateAuthor(this.author).subscribe(result => {
      if (result) {
        this.msgs.push({severity: 'success', summary: 'Успех', detail: 'Данные об авторе были обнавлены!'});
      } else {
        this.msgs.push({severity: 'error', summary: 'Ошибка', detail: 'Не удалось обновить данные об авторе!'});
      }
    });
  }
}
