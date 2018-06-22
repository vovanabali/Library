import {Component, OnInit} from '@angular/core';
import {Message} from "primeng/api";
import {RezervationService} from "../../../services/rezervation.service";
import {Rezervation} from "../../../domains/rezervation";

@Component({
  selector: 'app-rezervation-books',
  templateUrl: './rezervation-books.component.html',
  styleUrls: ['./rezervation-books.component.css']
})
export class RezervationBooksComponent implements OnInit {

  rezervations: Rezervation[] = [];
  cols: any[];
  msgs: Message[] = [];
  totalRecords: number;
  name = '';

  constructor(private rezervationService: RezervationService) {
  }

  ngOnInit() {
    this.cols = [
      {field: 'persona', header: 'Логин пользывателя зарезервировшего книгу'},
      {field: 'bookInStock', header: 'Название'}
    ];
    this.rezervationService.getAllRezervations().subscribe(value => {
      this.rezervations = value;
    });
  }

  issue(id: number): void {
    this.rezervationService.issueRezrv(id).subscribe(value => {
      this.rezervations.splice(this.rezervations.indexOf(this.rezervations.find(value1 => value1['id'] === id)), 1);
      this.msgs = [{
        severity: 'success',
        summary: 'Успех',
        detail: 'Книга выдана! её данные:\nПолка ' + value[0].bookInStock.rowNumber + ';\nCтелаж ' + value[0].bookInStock.rack + ';\nИнвентарный номер ' + value[0].bookInStock.inventoryNumber
      }];
    });
  }

  delete(id: number): void {
    this.rezervationService.delete(id).subscribe(value => {
        if (value) {
          this.rezervations.splice(this.rezervations.indexOf(this.rezervations.find(value1 => value1['id'] === id)), 1);
          this.msgs = [{severity: 'success', summary: 'Успех', detail: 'Запись была успешно удалена!'}];
        } else {
          this.msgs = [{severity: 'error', summary: 'Провал', detail: 'Не удалось удалить запись!'}];
        }
      }
    );
  }

  getBookSrc(bookPictureId): string {
    console.log(bookPictureId);
    return bookPictureId ? 'http://localhost:8080/server_resources/image/' + bookPictureId : 'assets/layout/images/deffBookImg.png';
  }
}
