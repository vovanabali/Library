import {Persona} from './persona';
import {Book} from './book';

export class ReviewsOfTheBook {
  id: number;
  persona: Persona;
  book: Book;
  reviews: string;
  rating: number;
}
