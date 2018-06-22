import {Component, OnInit} from '@angular/core';
import {Persona} from '../../../domains/persona';
import {BookInStock} from '../../../domains/book-in-stock';
import {TypeOfIssue} from '../../../domains/type-of-issue';
import {IssuedBooks} from '../../../domains/issued-books';
import {BookInStockService} from '../../../services/book-in-stock.service';
import {PersonaService} from '../../../services/persona.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Message} from 'primeng/components/common/api';
import {IssuedBookService} from '../../../services/issued-book.service';

@Component({
  selector: 'app-work-with-issued-book',
  templateUrl: './work-with-issued-book.component.html',
  styleUrls: ['./work-with-issued-book.component.css']
})
export class WorkWithIssuedBookComponent implements OnInit {
  persons: Persona[];
  booksInStocks: BookInStock[];
  typeOfIssued: TypeOfIssue;
  issuedBook = new IssuedBooks();
  persona: Persona;
  msgs: Message[] = [];
  ru: any = {};

  constructor(private bookInStockService: BookInStockService, private personaService: PersonaService, private activeRoute: ActivatedRoute,
              private router: Router, private issuedBookService: IssuedBookService) {
    this.ru = {
      firstDayOfWeek: 0,
      dayNames: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
      dayNamesShort: ["Воск", "Пон", "Вто", "Сре", "Чет", "Пят", "Суб"],
      dayNamesMin: ["Вс","Пн","Вт","Ср","Чт","Пн","Сб"],
      monthNames: [ "Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь" ],
      monthNamesShort: [ "Янв", "Фев", "Мар", "Апр", "Май", "Июнь","Июль", "Авг", "Сен", "Окт", "Ноя", "Дек" ],
      today: 'Сегодня',
      clear: 'Обчистить'
    };
  }

  ngOnInit() {
    this.bookInStockService.getAllBookInStock().subscribe((books) => this.booksInStocks = books);
    this.personaService.getPersons().subscribe((personas) => this.persons = personas);
    this.activeRoute.queryParams.subscribe(param => {
      const genreId = param['id'];
      if (this.activeRoute.snapshot.routeConfig.path === 'editIssuedBook') {
        if (genreId == null) {
          this.router.navigate(['admin', 'addIssuedBook']);
        } else {
          this.personaService.getPersonaById(genreId).subscribe(persona => {
            this.persona = persona;
          });
        }
        document.getElementById('saveButton').style.display = 'block';
      } else {
        document.getElementById('addButton').style.display = 'block';
      }
    });
  }

  add(): void {
    this.issuedBookService.addIssuedBook(this.issuedBook).subscribe((res) => {
      this.msgs = [];
      if (res) {
        this.msgs.push({severity: 'success', summary: 'Успех', detail: 'Книага была добавлена'});
        setTimeout(() => this.router.navigate(['admin', 'issuedBooks']), 500);
      } else {
        this.msgs.push({severity: 'error', summary: 'Ошибка', detail: 'Не удалось добавить книгу в выданные'});
      }
    });
  }

  update(): void {
    this.issuedBookService.updateIssuedBook(this.issuedBook).subscribe((res) => {
      this.msgs = [];
      if (res) {
        this.msgs.push({severity: 'success', summary: 'Успех', detail: 'Выданная книга была обнавлена'});
        setTimeout(() => this.router.navigate(['admin', 'issuedBooks']), 500);
      } else {
        this.msgs.push({severity: 'error', summary: 'Ошибка', detail: 'Не удалось обновить книгу'});
      }
    });
  }
}
