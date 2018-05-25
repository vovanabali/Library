import {Component, OnInit} from '@angular/core';
import {Persona} from '../../../domains/persona';
import {Message} from 'primeng/components/common/api';
import {ActivatedRoute, Router} from "@angular/router";
import {PersonaService} from "../../../services/persona.service";
import {Role} from "../../../domains/role";
import {RoleService} from "../../../services/role.service";

@Component({
  selector: 'app-work-with-user',
  templateUrl: './work-with-user.component.html',
  styleUrls: ['./work-with-user.component.css']
})
export class WorkWithUserComponent implements OnInit {

  user: Persona = new Persona();
  roles: Role[] = [];
  msgs: Message[] = [];

  constructor(private personaService: PersonaService,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private roleService: RoleService) {
    this.user = new Persona();
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(param => {
      const genreId = param['id'];
      this.roleService.getAllRoles().subscribe((roles: Role[]) => {
        this.roles = roles;
        console.log(this.roles);
      });
      if (this.activeRoute.snapshot.routeConfig.path === 'editUser') {
        if (genreId == null) {
          this.router.navigate(['admin', 'addUser']);
        } else {
          this.personaService.getPersonaById(genreId).subscribe(persona => {
            this.user = persona;
          });
        }
        document.getElementById('saveButton').style.display = 'block';
      } else {
        document.getElementById('addButton').style.display = 'block';
      }
    });
  }

  add(): void {
    this.personaService.addPersona(this.user).subscribe((res) => {
      this.msgs = [];
      if (res) {
        this.msgs.push({severity: 'success', summary: 'Успех', detail: 'Пользыватель был добавлен'});
        setTimeout(() => this.router.navigate(['admin', 'users']), 500);
      } else {
        this.msgs.push({severity: 'error', summary: 'Ошибка', detail: 'Не удалось добавить пользывателя'});
      }
    });
  }

  update(): void {
    this.personaService.updatePersona(this.user).subscribe((res) => {
      this.msgs = [];
      if (res) {
        this.msgs.push({severity: 'success', summary: 'Успех', detail: 'Данные о пользывателе были обновлены'});
        setTimeout(() => this.router.navigate(['admin', 'users']), 500);
      } else {
        this.msgs.push({severity: 'error', summary: 'Ошибка', detail: 'Не удалось обновить пользывателя'});
      }
    });
  }

}
