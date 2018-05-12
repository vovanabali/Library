import {Component, OnInit} from '@angular/core';
import {Country} from '../../../domains/country';
import {Message} from 'primeng/components/common/api';
import {CountryService} from '../../../services/country.service';
import {Router} from '@angular/router';
import {ConfirmationService, LazyLoadEvent} from 'primeng/api';
import {DataTable} from "primeng/primeng";

@Component({
  selector: 'app-country-admin',
  templateUrl: './country-admin.component.html',
  styleUrls: ['./country-admin.component.css']
})
export class CountryAdminComponent implements OnInit {
  counties: Country[];
  selectCountry: Country;
  cols: any[];
  msgs: Message[] = [];
  loading: boolean;
  totalRecords: number;

  constructor(private contryService: CountryService, private router: Router, private confirmationService: ConfirmationService) {
    this.cols = [
      {field: 'name', header: 'Название'},
    ];
    this.contryService.getCount().subscribe((count) => this.totalRecords = count);
    this.loading = true;
  }

  ngOnInit() {
  }

  lazyLoad(event: LazyLoadEvent): void {
    this.loading = true;
    this.contryService.getSlice(event.first / event.rows, event.rows, event.sortField, event.sortOrder).subscribe((counties) => {
      this.counties = counties;
      this.loading = false;
    });
  }

  edit(id: number): void {
    if (id != null) {
      this.router.navigate(['admin', 'editCountry'], {queryParams: {'id': id}});
    }
  }

  delete(id: number, table: DataTable): void {
    this.confirmationService.confirm({
      message: 'Вы действительно хотите удалить эту запись?',
      header: 'Подтверждение',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.contryService.deleteCountryById(id).subscribe((result) => {
          if (result) {
            this.selectCountry = new Country();
            this.loading = true;
            this.contryService.getCount().subscribe((count) => this.totalRecords = count);
            this.contryService.getSlice(table.first, table.rows, table.sortField, table.sortOrder).subscribe((counties) => {
              this.counties = counties;
              this.loading = false;
            });
            this.msgs = [{severity: 'success', summary: 'Успех', detail: 'Запись была успешно удалена!'}];
          } else {
            this.msgs = [{severity: 'error', summary: 'Провал', detail: 'Не удалось удалить запись!'}];
          }
        });
      }
    });
  }
}
