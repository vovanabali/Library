import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthorService} from "../../../services/author.service";
import {Author} from "../../../domains/author";

@Component({
  selector: 'app-user-author',
  templateUrl: './user-author.component.html',
  styleUrls: ['./user-author.component.css']
})
export class UserAuthorComponent implements OnInit {

  author: Author = new Author();

  constructor(private route: ActivatedRoute,
              private authorService: AuthorService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.authorService.getAuthorById(id).subscribe((author: Author) => {
        this.author = author;
        this.author.FIO = this.author.surname + ' ' + this.author.name + ' ' + this.author.patronymic;
        console.log(this.author);
      });
    });
  }

}
