import {Author} from './author';
import {Genre} from './genre';

export class Book {
  id: number;
  name: string;
  author: Author;
  description: string;
  genre: Genre;
  releaseDate: Date;
}
