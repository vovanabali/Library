import {Component, OnInit} from '@angular/core';
import {BookInStock} from '../../../domains/book-in-stock';
import {Book} from '../../../domains/book';
import {BookInStockService} from '../../../services/book-in-stock.service';
import {BookService} from '../../../services/book.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Message} from 'primeng/components/common/api';

@Component({
  selector: 'app-add-to-storage',
  templateUrl: './add-to-storage.component.html',
  styleUrls: ['./add-to-storage.component.css']
})
export class AddToStorageComponent implements OnInit {

  bookInStorage: BookInStock = new BookInStock();
  books: Book[];
  msgs: Message[] = [];

  constructor(private bookService: BookService,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private bookInStorageService: BookInStockService) {
    bookService.getAllBooks().subscribe((books) => this.books = books);
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(param => {
      const bookId = param['id'];
      if (this.activeRoute.snapshot.routeConfig.path === 'updateBookInStorage') {
        if (bookId == null) {
          this.router.navigate(['admin', 'addBook']);
        } else {
          this.bookInStorageService.getBookInStockById(bookId).subscribe(book => {
            this.bookInStorage = book;
          });
        }
        document.getElementById('saveButton').style.display = 'block';
      } else {
        document.getElementById('addButton').style.display = 'block';
      }
    });
  }

  addBook(): void {
    this.bookInStorageService.addBookInStock(this.bookInStorage).subscribe((res) => {
      this.msgs = [];
      if (res) {
        this.msgs.push({severity: 'success', summary: 'Успех', detail: 'Книга была добавлена'});
        setTimeout(() => this.router.navigate(['admin', 'books']), 500);
      } else {
        this.msgs.push({severity: 'error', summary: 'Ошибка', detail: 'Не удалось добавить книгу'});
      }
    });
  }

  updateBook(): void {
    this.bookInStorageService.saveBookInStock(this.bookInStorage).subscribe(result => {
      if (result) {
        this.msgs.push({severity: 'success', summary: 'Успех', detail: 'Данные о книге были обнавлены!'});
      } else {
        this.msgs.push({severity: 'error', summary: 'Ошибка', detail: 'Не удалось обновить данные о книге!'});
      }
    });
  }
}
