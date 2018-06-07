import {Persona} from './persona';
import {BookInStock} from './book-in-stock';
import {TypeOfIssue} from './type-of-issue';

export class IssuedBooks {
  id: number;
  persona: Persona;
  bookInStock: BookInStock;
  timeOfIssue: Date;
  typeOfIssue: TypeOfIssue;
  returnTime: Date;
  issueUpTo: Date;
}
