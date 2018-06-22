package com.goodsoft.library.service;

import com.goodsoft.library.domain.Author;
import com.goodsoft.library.domain.Book;
import com.goodsoft.library.domain.BookInStock;
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

    boolean deleteById(long id);

    List<Book> getAvailabelBooks(Pageable pageable, String serch);

    BookInStock getAvailabelBookIsStockByBook(final Book book);

    Long getAvailabelCount(String name);

    Long getAvailabelCountByBookId(final Long id);
}
