import { Component, OnInit } from '@angular/core';
import {PersonaService} from "../../services/persona.service";
import {PersonaDTO} from "../../domains/personaDTO";
import {Message} from "primeng/api";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  msgs: Message[];

  uploadedFiles: any[] = [];

  personaDTO: PersonaDTO = new PersonaDTO();

  constructor(private persoaService: PersonaService) { }

  ngOnInit() {
    this.persoaService.getProfile().subscribe(value => {
      console.log(value);
      this.personaDTO = value;
    });
  }

  onUpload(event) {
    for(let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

}
