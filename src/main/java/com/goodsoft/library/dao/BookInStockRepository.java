package com.goodsoft.library.dao;

import com.goodsoft.library.domain.Author;
import com.goodsoft.library.domain.Book;
import com.goodsoft.library.domain.BookInStock;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookInStockRepository extends PagingAndSortingRepository<BookInStock, Long> {
    List<BookInStock> findAllByBookAuthor(Author author);

    Page<BookInStock> findAll(Pageable pageable);

    List<BookInStock> findAll();

    List<BookInStock> findAllByBookId(final Long id);

    BookInStock findByInventoryNumber(String inventoryNumber);

    List<BookInStock> findAllByBook(Book book);

    BookInStock findFirstByBook(Book book);

    BookInStock findById(long id);
}
