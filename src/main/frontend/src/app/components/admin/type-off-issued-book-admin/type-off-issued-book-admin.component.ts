import {Component, OnInit} from '@angular/core';
import {ConfirmationService, LazyLoadEvent, Message} from 'primeng/api';
import {TypeOfIssue} from '../../../domains/type-of-issue';
import {TypeOfIssuedService} from '../../../services/type-of-issued.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-type-off-issued-book-admin',
  templateUrl: './type-off-issued-book-admin.component.html',
  styleUrls: ['./type-off-issued-book-admin.component.css']
})
export class TypeOffIssuedBookAdminComponent implements OnInit {
  types: TypeOfIssue[];
  selectType: TypeOfIssue;
  cols: any[];
  msgs: Message[] = [];
  loading: boolean;
  totalRecords: number;

  constructor(private typeOfIssuedService: TypeOfIssuedService, private router: Router, private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.cols = [
      {field: 'name', header: 'Тип выдачи'}
    ];
    this.typeOfIssuedService.getCount().subscribe((count) => this.totalRecords = count);
    this.loading = true;
  }

  loadGanresLazy(event: LazyLoadEvent): void {
    this.loading = true;
    this.typeOfIssuedService.getSlice(event.first / event.rows, event.rows, event.sortField, event.sortOrder).subscribe((types) => {
      this.types = types;
      this.loading = false;
    });
  }

  edit(id: number): void {
    if (id != null) {
      this.router.navigate(['admin/editIssuedType'], {queryParams: {'id': id}});
    }
  }

  delete(id: number): void {
    this.confirmationService.confirm({
      message: 'Вы действительно хотите удалить эту запись?',
      header: 'Подтверждение',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.typeOfIssuedService.deleteTypeOfIssueById(id).subscribe((result) => {
          if (result) {
            this.selectType = new TypeOfIssue();
            this.msgs = [{severity: 'success', summary: 'Успех', detail: 'Запись была успешно удалена!'}];
          } else {
            this.msgs = [{severity: 'error', summary: 'Провал', detail: 'Не удалось удалить запись!'}];
          }
        });
      }
    });
  }

}
