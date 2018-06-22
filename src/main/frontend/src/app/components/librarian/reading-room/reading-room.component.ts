import {Component, OnInit} from '@angular/core';
import {IssuedBooks} from "../../../domains/issued-books";
import {Message} from "primeng/api";
import {IssuedBookService} from "../../../services/issued-book.service";

@Component({
  selector: 'app-reading-room',
  templateUrl: './reading-room.component.html',
  styleUrls: ['./reading-room.component.css']
})
export class ReadingRoomComponent implements OnInit {

  issuedBooks: IssuedBooks[];
  msgs: Message[] = [];
  display: boolean = false;
  bookId: number = undefined;

  constructor(private issuedBookService: IssuedBookService) {
  }

  ngOnInit() {
    this.issuedBookService.getIssuedBooksInReadingRoom().subscribe((issuedBooks) => {
      this.issuedBooks = issuedBooks;
    });
  }

  selectBook(id) {
    this.display = true;
    this.bookId = id;
  }

  getBookSrc(bookPictureId) {
    return bookPictureId ? 'http://localhost:8080/server_resources/image/' + bookPictureId : 'assets/layout/images/deffBookImg.png';
  };

  getTime(time) {
    let seconds = time[4].length > 9 ? time[4].toString() : '0' + time[4];
    return time[3] + ":" + seconds;
  }

  returnBook() {
    this.display = false;
    this.issuedBookService.returnBook(this.bookId).subscribe(value => {
      if (value) {
        this.issuedBooks.splice(this.issuedBooks.indexOf(this.issuedBooks.find(value1 => value1.id === this.bookId)), 1);
        this.msgs = [{severity: 'success', summary: 'Успех', detail: 'Книга успешно возвращена на склад'}]
      } else {
        this.msgs = [{severity: 'error', summary: 'Провал', detail: 'Не удалось вернуть книгу!'}];
      }
    });
  }
}
