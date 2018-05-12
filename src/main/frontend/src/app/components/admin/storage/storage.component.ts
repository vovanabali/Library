import {Component, OnInit} from '@angular/core';
import {ConfirmationService, LazyLoadEvent, Message} from 'primeng/api';
import {BookInStock} from '../../../domains/book-in-stock';
import {Router} from '@angular/router';
import {BookInStockService} from '../../../services/book-in-stock.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {
  bookInStock: BookInStock[];
  selectedBookInStock: BookInStock;
  cols: any[];
  msgs: Message[] = [];
  loading: boolean;
  totalRecords: number;

  constructor(private bookInStockService: BookInStockService, private router: Router, private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.cols = [
      {field: 'rack', header: 'Стелаж'},
      {field: 'rowNumber', header: 'Номер полки'},
      {field: 'inventoryNumber', header: 'Инвентарный номер'},
      {field: 'book', header: 'Книга'}
    ];
    this.bookInStockService.getAllBookInStock().subscribe(booksInStock => this.totalRecords = booksInStock.length);
    this.loading = true;
  }

  loadBookInStockLazy(event: LazyLoadEvent): void {
    this.loading = true;
    this.bookInStockService.slice(event.first / event.rows, event.rows, event.sortField, event.sortOrder).subscribe(bookInStock => {
      this.bookInStock = bookInStock;
      this.loading = false;
    });
  }

  editEntry(id: number): void {
    if (id != null) {
      const isNavigate = this.router.navigate(['admin/updateBookInStorage'], {queryParams: {'id': id}});
      if (!isNavigate) {
        this.msgs = [{severity: 'error', summary: 'Провал', detail: 'Не открыть запись на редактирование!'}];
      }
    }
  }

  delete(id: number): void {
    this.confirmationService.confirm({
      message: 'Вы действительно хотите удалить эту запись?',
      header: 'Подтверждение',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.bookInStockService.deleteBookInStockById(id).subscribe((result) => {
          if (result) {
            this.selectedBookInStock = new BookInStock();
            this.msgs = [{severity: 'success', summary: 'Успех', detail: 'Запись была успешно удалена!'}];
          } else {
            this.msgs = [{severity: 'error', summary: 'Провал', detail: 'Не удалось удалить запись!'}];
          }
        });
      }
    });
  }
}
