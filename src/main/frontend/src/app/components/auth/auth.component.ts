import {Component, OnInit} from '@angular/core';
import {Persona} from '../../domains/persona';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {AppComponent} from "../../app.component";
import {HttpResponse} from "@angular/common/http";
import {AppMenuComponent} from "../../app.menu.component";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  user = new Persona();

  constructor(private authService: AuthService, private router: Router, private app: AppComponent) {
  }

  ngOnInit() {
    if (localStorage.getItem('AuthToken') != null) {
      this.router.navigate(['admin']);
    }
  }

  login(): void {
    this.authService.login(this.user).subscribe((resp: HttpResponse<any>) => {
      const token = resp.headers.get('Authorization');
      localStorage.setItem('AuthToken', token);
      this.authService.getCurrentUser().subscribe(
        (currentUser) => {
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          window.location.href = '';
        }
      );
    });
  }
}
