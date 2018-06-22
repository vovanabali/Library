import {Component, OnInit} from '@angular/core';
import {PersonaService} from "../../services/persona.service";
import {ProfileDTO} from "../../domains/profileDTO";
import {Message} from "primeng/api";
import {IssuedBooks} from "../../domains/issued-books";
import {Persona} from "../../domains/persona";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  data: any;
  msgs: Message[];
  issuedBooks: IssuedBooks[] = [];
  uploadedFiles: any[] = [];
  barOptions: any = {};
  personaDTO: ProfileDTO = new ProfileDTO();
  rezervations: any = [];

  constructor(private persoaService: PersonaService) {
    this.personaDTO.persona = new Persona();
    this.barOptions = {
      scales: {yAxes: [{ticks: {stepSize: 1, beginAtZero: true, min: 0, max: 7}}]}
    }
  }

  ngOnInit() {
    this.persoaService.getProfile().subscribe(value => {
      this.personaDTO = value;
      this.rezervations = value.rezervationBooks;
      this.issuedBooks = value.issuedBooks.filter(value1 => !value1.returnTime);
      this.data = {
        labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        datasets: [
          {
            label: 'Взято',
            data: this.getIssuedBooks(),
            fill: false,
            borderColor: '#4bc0c0'
          },
          {
            label: 'Возвращено',
            data: this.getReturnedBooks(),
            fill: false,
            borderColor: '#565656'
          }
        ]
      }
    });
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  getDate(timestamp) {
    return timestamp ? new Date(timestamp).toLocaleDateString("ru-RU") : 'Дата не была указанна';
  }

  getLeftDateys(timestamp) {
    const first: any = new Date();
    const second: any = new Date(timestamp);
    return timestamp ? Math.round((second - first) / (1000 * 60 * 60 * 24)) : '-';
  }

  getIssuedBooks(): number[] {
    let bookCount = [];
    for (let i = 0; i < new Date().getMonth() + 1; i++) {
      bookCount[i] = 0;
      this.issuedBooks.forEach(issuedBook => {
        if (new Date(issuedBook.timeOfIssue).getMonth() == i) {
          bookCount[i] += 1;
        }
      });
    }
    return bookCount;
  }

  getReturnedBooks(): number[] {
    let bookCount = [];
    let issuedBoks = this.personaDTO.issuedBooks.filter(value => value.returnTime);
    for (let i = 0; i < new Date().getMonth() + 1; i++) {
      bookCount[i] = 0;
      issuedBoks.forEach(issuedBook => {
        if (new Date(issuedBook.timeOfIssue).getMonth() == i) {
          bookCount[i] += 1;
        }
      });
    }
    return bookCount;
  }

  getBookSrc(bookPictureId): string {
    return bookPictureId ? 'http://localhost:8080/server_resources/image/' + bookPictureId : 'assets/layout/images/deffBookImg.png';
  }

  getHours(timestamp) {
    const first: any = new Date();
    const second: any = new Date(timestamp[0], timestamp[1], timestamp[2], timestamp[3], timestamp[4], timestamp[5], timestamp[6]);
    console.log(second);
    var timeDiff = Math.abs(first.getTime() - second.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600) / 24);
    return timestamp ? diffDays : '-';
  }
}


