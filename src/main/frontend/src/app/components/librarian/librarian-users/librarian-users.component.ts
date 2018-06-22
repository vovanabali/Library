import {Component, OnDestroy, OnInit} from '@angular/core';
import {Extradition} from "../../../domains/extradition";
import {Router} from "@angular/router";
import {ConfirmationService, LazyLoadEvent, Message} from "primeng/api";
import {PersonaService} from "../../../services/persona.service";
import {BlackListService} from "../../../services/blackList.service";
import {BlackList} from "../../../domains/black-list";
import {PersonaDto} from "../../../domains/persona-dto";

@Component({
  selector: 'app-librarian-users',
  templateUrl: './librarian-users.component.html',
  styleUrls: ['./librarian-users.component.css']
})
export class LibrarianUsersComponent implements OnInit, OnDestroy {

  users: PersonaDto[];
  msgs: Message[] = [];
  cols: any[];
  totalRecords: number;
  loading: boolean;
  extradition = new Extradition();
  display: boolean = false;
  blackList = new BlackList();
  name: string = '';

  constructor(private personaService: PersonaService,
              private router: Router,
              private blackListService: BlackListService,
              private confirmationService: ConfirmationService) {
    this.personaService.count().subscribe((count) => this.totalRecords = count);
    this.loading = true;
  }

  ngOnInit() {
    this.extradition = JSON.parse(localStorage.getItem('extradition'));
    this.cols = [
      {field: 'login', header: 'Логин'},
      {field: 'surname', header: 'Фамилия'},
      {field: 'name', header: 'Имя'},
      {field: 'patronymic', header: 'Отчество'},
    ];
  }

  lazyLoad(event: LazyLoadEvent): void {
    this.loading = true;
    this.personaService.getSliceAppruvedLibrary(event.first / event.rows, event.rows, event.sortField, event.sortOrder, event.globalFilter).subscribe(users => {
      console.log(users);
      this.users = users;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    localStorage.setItem('extradition', JSON.stringify(this.extradition));
  }

  toBlackList(id: number): void {
    this.personaService.getPersonaById(id).subscribe(value => this.blackList.persona = value);
    this.display = true;
  }

  acceptAddToBlackList(): void {
    this.display = false;
    this.blackListService.save(this.blackList).subscribe(value => this.blackList = value);
  }
}
