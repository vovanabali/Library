import {Persona} from './persona';
import {BookInStock} from './book-in-stock';
import {TypeOfIssue} from './type-of-issue';

export class IssuedBooks {
  id: number;
  persona: Persona;
  bookInStock: BookInStock;
  timeOfIssue: any;
  typeOfIssue: TypeOfIssue;
  returnTime: Date;
  issueUpTo: Date;
}
