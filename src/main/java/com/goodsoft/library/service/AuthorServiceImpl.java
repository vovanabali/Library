package com.goodsoft.library.service;

import com.goodsoft.library.dao.AuthorRepository;
import com.goodsoft.library.domain.Author;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class AuthorServiceImpl implements AuthorService {
    private final AuthorRepository authorRepository;

    @Autowired
    public AuthorServiceImpl(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    @Override
    public List<Author> getAllAuthors() {
        try {
            return (List<Author>) authorRepository.findAll();
        } catch (Exception ex) {
            log.error("Failed to get all authors", ex.fillInStackTrace());
            return new ArrayList<>();
        }
    }

    @Override
    public List<Author> getAuthorByName(String name) {
        try {
            return authorRepository.findAllByName(name);
        } catch (Exception ex) {
            log.error("Failed to get all authors by name", ex.fillInStackTrace());
            return new ArrayList<>();
        }
    }

    @Override
    public Author getAuthorById(long id) {
        try {
            return authorRepository.findById(id);
        } catch (Exception ex) {
            log.error("Failed to get author by id", ex.fillInStackTrace());
            return new Author();
        }
    }

    @Override
    public Author saveAuthor(Author author) {
        try {
            return authorRepository.save(author);
        } catch (Exception ex) {
            log.error("Failed save author", ex.fillInStackTrace());
            return null;
        }
    }

    @Override
    public void deeteAuthor(long id) {
        try {
            authorRepository.deleteById(id);
        } catch (Exception ex) {
            log.error("Failed delete author", ex.fillInStackTrace());
        }
    }

    @Override
    public List<Author> slice(Pageable pageable) {
        try {
            return this.authorRepository.findAll(pageable).getContent();
        } catch (Exception ex) {
            log.error("Failed to load slice from Authors", ex.fillInStackTrace());
            return new ArrayList<>();
        }
    }

    @Override
    public boolean deeteAuthorById(long id) {
        try {
            this.authorRepository.deleteById(id);
            return true;
        } catch (Exception ex) {
            log.error("Failed to delete author by id", ex.fillInStackTrace());
            return false;
        }
    }
}
