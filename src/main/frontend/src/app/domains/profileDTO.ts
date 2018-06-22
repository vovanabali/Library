import {IssuedBooks} from "./issued-books";
import {Persona} from "./persona";
import {Rezervation} from "./rezervation";

export class ProfileDTO {
  persona: Persona;
  issuedBooks: IssuedBooks[];
  rezervationBooks: Rezervation[];
}
