package com.goodsoft.library.dao;

import com.goodsoft.library.domain.Author;
import com.goodsoft.library.domain.Book;
import com.goodsoft.library.domain.Genre;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends PagingAndSortingRepository<Book, Long> {
    List<Book> findAllByAuthor(Author author);

    List<Book> findAllByGenre(Genre genre);

    List<Book> findByName(String name);

    List<Book> findAllByNameIsContaining(Pageable pageable, String name);

    Page<Book> findAll(Pageable pageable);

    Book findById(long id);

    long countAllByNameIsContaining(String name);

    boolean existsByAuthorAndName(Author author, String name);
}
