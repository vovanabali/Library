import {Component, OnInit} from '@angular/core';
import {Country} from "../../../domains/country";
import {Message} from "primeng/components/common/api";
import {CountryService} from "../../../services/country.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-work-with-country',
  templateUrl: './work-with-country.component.html',
  styleUrls: ['./work-with-country.component.css']
})
export class WorkWithCountryComponent implements OnInit {

  country: Country = new Country();
  msgs: Message[] = [];

  constructor(private countryService: CountryService,
              private activeRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(param => {
      const countryId = param['id'];
      if (this.activeRoute.snapshot.routeConfig.path !== 'addCountry') {
        if (!countryId) {
          this.router.navigate(['admin', 'addCountry']);
        } else {
          this.countryService.getCountryById(countryId).subscribe(country => {
            this.country = country;
          });
        }
        document.getElementById('saveButton').style.display = 'block';
      } else {
        document.getElementById('addButton').style.display = 'block';
      }
    });
  }

  add(): void {
    this.countryService.addCountry(this.country).subscribe((res) => {
      this.msgs = [];
      if (res) {
        this.msgs.push({severity: 'success', summary: 'Успех', detail: 'Страна успешно добавлена'});
        this.country = new Country();
      } else {
        this.msgs.push({severity: 'error', summary: 'Ошибка', detail: 'Не удалось добавить страну'});
      }
    });
  }

  update(): void {
    this.countryService.updateCountry(this.country).subscribe((res) => {
      this.msgs = [];
      if (res) {
        this.msgs.push({severity: 'success', summary: 'Успех', detail: 'Назавние страны было обнавлёно'});
        this.country = new Country();
      } else {
        this.msgs.push({severity: 'error', summary: 'Ошибка', detail: 'Не удалось обнавить название страну'});
      }
    });
  }
}
