package com.goodsoft.library.service;

import com.goodsoft.library.domain.Author;
import com.goodsoft.library.domain.Book;
import com.goodsoft.library.domain.Genre;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BookService {
    List<Book> all();

    List<Book> allByAuthor(Author author);

    List<Book> allByGenre(Genre genre);

    List<Book> allByName(String name);

    List<Book> slice(Pageable pageable);

    List<Book> slice(Pageable pageable, String name);

    Book getById(long id);

    void deleteById(long id);

    void delete(Book book);

    Book updateBook(Book book);

    Book addBook(Book book);

    long bookCount();

    long bookCount(String name);
}
