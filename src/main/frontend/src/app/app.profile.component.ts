import {animate, Component, state, style, transition, trigger} from '@angular/core';
import {AppComponent} from './app.component';
import {Persona} from "./domains/persona";

@Component({
  selector: 'app-inline-profile',
  template: `
    <div class="profile" [ngClass]="{'profile-expanded':active}">
      <a href="#" (click)="onClick($event)">
        <img class="profile-image" src="assets/layout/images/avatar.png"/>
        <span class="profile-name">{{userFIO}}</span>
        <i class="material-icons">keyboard_arrow_down</i>
      </a>
    </div>
    <ul class="ultima-menu profile-menu" [@menu]="active ? 'visible' : 'hidden'">
      <li role="menuitem">
        <a href="#" routerLink="profile" class="ripplelink" [attr.tabindex]="!active ? '-1' : null">
          <i class="material-icons">person</i>
          <span>Личный кабинет</span>
        </a>
      </li>
     <!-- <li role="menuitem">
        <a href="#" class="ripplelink" [attr.tabindex]="!active ? '-1' : null">
          <i class="material-icons">security</i>
          <span>Privacy</span>
        </a>
      </li>-->
<!--      <li role="menuitem">
        <a href="#" class="ripplelink" [attr.tabindex]="!active ? '-1' : null">
          <i class="material-icons">settings_application</i>
          <span>Settings</span>
        </a>
      </li>-->
      <li role="menuitem">
        <a href="#" (click)="logOut()" class="ripplelink" [attr.tabindex]="!active ? '-1' : null">
          <i class="material-icons">power_settings_new</i>
          <span>Выйти</span>
        </a>
      </li>
    </ul>
  `,
  animations: [
    trigger('menu', [
      state('hidden', style({
        height: '0px'
      })),
      state('visible', style({
        height: '*'
      })),
      transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
      transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class AppInlineProfileComponent {
  userFIO: string;
  active: boolean;

  constructor(public app: AppComponent) {
    const user: Persona = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      this.userFIO = user.surname + ' ' + user.name + ' ' + user.patronymic;
    } else {
      this.userFIO = '';
    }
  }

  onClick(event) {
    this.active = !this.active;
    setTimeout(() => {
      this.app.layoutMenuScrollerViewChild.moveBar();
    }, 450);
    event.preventDefault();
  }

  logOut(): void {
    localStorage.clear();
    location.href = '/books';
  }
}
