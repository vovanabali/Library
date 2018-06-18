import {Component, OnInit} from '@angular/core';
import {Persona} from "../../domains/persona";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Message} from "primeng/components/common/api";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  persona = new Persona();
  msgs: Message[] = [];
  password: string = '';

  constructor(private authService: AuthService,
              private router: Router,) {
  }

  ngOnInit() {
  }

  registration(): void {
    if (this.password === this.persona.password) {
      this.authService.regUser(this.persona).subscribe((response: boolean) => {
        if (response) {
          this.msgs.push({severity: 'success', summary: 'Успех', detail: 'Вы успешно зарегистрировались'});
          this.router.navigate(['sing-in']);
        } else {
          this.msgs.push({severity: 'error', summary: 'Ошибка', detail: 'Ошибка регистрации'});
        }
      });
    } else {
      this.msgs.push({severity: 'error', summary: 'Ошибка', detail: 'Ошибка подтвердения пароля'});
    }
  }
}
