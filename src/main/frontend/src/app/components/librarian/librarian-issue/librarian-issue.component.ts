import {Component, OnInit} from '@angular/core';
import {Extradition} from "../../../domains/extradition";
import {Router} from "@angular/router";
import {ConfirmationService, Message} from "primeng/api";

@Component({
  selector: 'app-librarian-issue',
  templateUrl: './librarian-issue.component.html',
  styleUrls: ['./librarian-issue.component.css']
})
export class LibrarianIssueComponent implements OnInit {

  msgs: Message[] = [];
  extradition = new Extradition();

  constructor(private router: Router,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.extradition = JSON.parse(localStorage.getItem('extradition'));
  }

}
