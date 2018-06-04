import { Component, OnInit } from '@angular/core';
import {ConfirmationService, Message} from "primeng/api";
import {BlackList} from "../../domains/black-list";
import {Router} from "@angular/router";
import {BlackListService} from "../../services/blackList.service";
import {TypeOfIssue} from "../../domains/type-of-issue";
import {Persona} from "../../domains/persona";

@Component({
  selector: 'app-black-list',
  templateUrl: './black-list.component.html',
  styleUrls: ['./black-list.component.css']
})
export class BlackListComponent implements OnInit {
  blackList: BlackList[];
  selectBlackList: BlackList;
  cols: any[];
  msgs: Message[] = [];
  loading: boolean;
  totalRecords: number;

  constructor(private blackListService: BlackListService,
              private router: Router,
              private confirmationService: ConfirmationService) {
    this.cols = [
      {field: 'persona', header: 'Пользыватель'},
      {field: 'dateOfEntry', header: 'Дата внесения'},
      {field: 'reasonForMaking', header: 'Причина внесения'}
    ];
    this.loading = true;
  }

  ngOnInit() {
    this.blackListService.getCountBlackList().subscribe(value => this.totalRecords = value);
    this.blackListService.getAllBlackLists().subscribe(value => {
      this.blackList = value;
      this.loading = false;
    });
  }

  delete(id: number): void {
    this.confirmationService.confirm({
      message: 'Вы действительно хотите удалить эту запись?',
      header: 'Подтверждение',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.blackListService.deleteBlackListById(id).subscribe((result) => {
          if (result) {
            this.selectBlackList = new BlackList();
            this.msgs = [{severity: 'success', summary: 'Успех', detail: 'Запись была успешно удалена!'}];
          } else {
            this.msgs = [{severity: 'error', summary: 'Провал', detail: 'Не удалось удалить запись!'}];
          }
        });
      }
    });
  }

  getDate(timestemp: number) {
    return new Date(timestemp).toLocaleDateString("ru-RU");
  }
}
