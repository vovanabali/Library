package com.goodsoft.library.service;

import com.goodsoft.library.domain.Author;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AuthorService {
    List<Author> getAllAuthors();

    List<Author> slice(Pageable pageable);

    List<Author> getAuthorByName(String name);

    Author getAuthorById(long id);

    Author saveAuthor(Author author);

    void deeteAuthor(long id);

    boolean deeteAuthorById(long id);
}
