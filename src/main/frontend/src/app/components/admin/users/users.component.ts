import {Component, OnInit} from '@angular/core';
import {Persona} from '../../../domains/persona';
import {PersonaService} from '../../../services/persona.service';
import {IssuedBooks} from '../../../domains/issued-books';
import {Router} from '@angular/router';
import {ConfirmationService, LazyLoadEvent, Message} from 'primeng/api';
import {Role} from '../../../domains/role';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Persona[];
  selectUser: Persona;
  msgs: Message[] = [];
  cols: any[];
  totalRecords: number;
  loading: boolean;

  constructor(private personaService: PersonaService,
              private router: Router,
              private confirmationService: ConfirmationService) {
    this.personaService.count().subscribe((count) => this.totalRecords = count);
    this.selectUser = new Persona();
    this.loading = true;
  }

  ngOnInit() {
    this.cols = [
      {field: 'login', header: 'Логин'},
      {field: 'surname', header: 'Фамилия'},
      {field: 'name', header: 'Имя'},
      {field: 'patronymic', header: 'Отчество'},
      {field: 'birhday', header: 'Дата рождения'},
      {field: 'role', header: 'Роль'},
    ];
  }

  lazyLoad(event: LazyLoadEvent): void {
    this.loading = true;
    this.personaService.getSlice(event.first / event.rows, event.rows, event.sortField, event.sortOrder).subscribe(users => {
      this.users = users;
      this.loading = false;
      console.log(this.users);
    });
  }

  editEntry(id: number): void {
    if (id != null) {
      const isNavigate = this.router.navigate(['admin/editIssuedBook'], {queryParams: {'id': id}});
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
        this.personaService.deletePersonaById(id).subscribe((result) => {
          if (result) {
            this.selectUser = new Persona();
            this.msgs = [{severity: 'success', summary: 'Успех', detail: 'Запись была успешно удалена!'}];
          } else {
            this.msgs = [{severity: 'error', summary: 'Провал', detail: 'Не удалось удалить запись!'}];
          }
        });
      }
    });
  }

}
