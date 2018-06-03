package com.goodsoft.library.service;

import com.goodsoft.library.domain.Author;
import com.goodsoft.library.domain.Book;
import com.goodsoft.library.domain.BookInStock;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BookInStockService {
    List<BookInStock> all();

    List<BookInStock> allByAuthor(Author author);

    List<BookInStock> allByBook(Book book);

    List<BookInStock> getAllBooks(List<Book> books) throws Exception;

    List<BookInStock> slice(Pageable pageable);

    BookInStock getById(long id);

    BookInStock getByInventoryNumber(String inventoryNumber);

    BookInStock save(BookInStock bookInStock);

    void delete(BookInStock bookInStock);

    void deleteById(long id);
}
