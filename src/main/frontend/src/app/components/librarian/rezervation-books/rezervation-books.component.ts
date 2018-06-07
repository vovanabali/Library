import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ConfirmationService, Message} from "primeng/api";
import {BookService} from "../../../services/book.service";
import {Extradition} from "../../../domains/extradition";
import {Book} from "../../../domains/book";
import {BookInStockService} from "../../../services/book-in-stock.service";
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

  constructor(private rezervationService: RezervationService) { }

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
      this.msgs = [{severity: 'success', summary: 'Успех', detail: 'Книга выдана! её данные:\nПолка ' + value[0].bookInStock.rowNumber + ';\nCтелаж ' + value[0].bookInStock.rack + ';\nИнвентарный номер ' + value[0].bookInStock.inventoryNumber}];
    });
  }

  delete(id: number): void {
    this.rezervationService.delete(id).subscribe(value =>
      value?
        this.msgs = [{severity: 'success', summary: 'Успех', detail: 'Запись была успешно удалена!'}] :
        this.msgs = [{severity: 'error', summary: 'Провал', detail: 'Не удалось удалить запись!'}]
  );
  }
}
