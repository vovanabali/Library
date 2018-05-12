import {Component, OnInit} from '@angular/core';
import {Persona} from '../../../domains/persona';
import {Message} from 'primeng/components/common/api';
import {ActivatedRoute, Router} from "@angular/router";
import {PersonaService} from "../../../services/persona.service";
import {IssuedBookService} from "../../../services/issued-book.service";
import {BookInStockService} from "../../../services/book-in-stock.service";

@Component({
  selector: 'app-work-with-user',
  templateUrl: './work-with-user.component.html',
  styleUrls: ['./work-with-user.component.css']
})
export class WorkWithUserComponent implements OnInit {

  user: Persona;
  msgs: Message[] = [];

  constructor(private personaService: PersonaService,
              private activeRoute: ActivatedRoute,
              private router: Router) {
    this.user = new Persona();
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(param => {
      const genreId = param['id'];
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

}
