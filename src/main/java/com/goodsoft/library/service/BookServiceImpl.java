package com.goodsoft.library.service;

import com.goodsoft.library.dao.BookRepository;
import com.goodsoft.library.domain.Author;
import com.goodsoft.library.domain.Book;
import com.goodsoft.library.domain.Genre;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;

    @Autowired
    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public List<Book> all() {
        try {
            return (List<Book>) bookRepository.findAll();
        } catch (Exception ex) {
            log.error("Failed to load all from books", ex.fillInStackTrace());
            return new ArrayList<>();
        }
    }

    @Override
    public List<Book> allByAuthor(Author author) {
        try {
            return bookRepository.findAllByAuthor(author);
        } catch (Exception ex) {
            log.error("Failed to load all books by author", ex.fillInStackTrace());
            return new ArrayList<>();
        }
    }

    @Override
    public List<Book> allByGenre(Genre genre) {
        try {
            return bookRepository.findAllByGenre(genre);
        } catch (Exception ex) {
            log.error("Failed to load books by genre", ex.fillInStackTrace());
            return new ArrayList<>();
        }
    }

    @Override
    public List<Book> allByName(String name) {
        try {
            return bookRepository.findByName(name);
        } catch (Exception ex) {
            log.error("Failed to load books by name", ex.fillInStackTrace());
            return new ArrayList<>();
        }
    }

    @Override
    public void deleteById(long id) {
        try {
            bookRepository.deleteById(id);
        } catch (Exception ex) {
            log.error("Filed delete book by id", ex.fillInStackTrace());
        }
    }

    @Override
    public void delete(Book book) {
        try {
            bookRepository.delete(book);
        } catch (Exception ex) {
            log.error("Failed delete book by book", ex.fillInStackTrace());
        }
    }

    @Override
    public Book updateBook(Book book) {
        try {
            return bookRepository.save(book);
        } catch (Exception ex) {
            log.error("Failed update book", ex.fillInStackTrace());
            return null;
        }
    }

    @Override
    public Book getById(long id) {
        try {
            return bookRepository.findById(id);
        } catch (Exception ex) {
            log.error("Failed to load biik by id", ex.fillInStackTrace());
            return null;
        }
    }

    @Override
    public List<Book> slice(Pageable pageable) {
        try {
            return bookRepository.findAll(pageable).getContent();
        } catch (Exception ex) {
            log.error("Failed to load slice book", ex.fillInStackTrace());
            return new ArrayList<>();
        }
    }

    @Override
    public List<Book> slice(Pageable pageable, String name) {
        try {
            return bookRepository.findAllByNameIsContaining(pageable, name);
        } catch (Exception ex) {
            log.error("Failed to load slice by name", ex.fillInStackTrace());
            return new ArrayList<>();
        }
    }

    @Override
    public long bookCount() {
        try {
            return bookRepository.count();
        } catch (Exception ex) {
            log.error("Failed to load books count", ex.fillInStackTrace());
            return 0;
        }
    }

    @Override
    public Book addBook(Book book) {
        try {
            if (bookRepository.existsByAuthorAndName(book.getAuthor(), book.getName())) {
                return null;
            } else {
                 return bookRepository.save(book);
            }
        } catch (Exception ex) {
            log.error("Failed to adding new book", ex.fillInStackTrace());
            return null;
        }
    }

    @Override
    public long bookCount(String name) {
        try {
            return bookRepository.countAllByNameIsContaining(name);
        } catch (Exception ex) {
            log.error("Failed to load books count by name", ex.fillInStackTrace());
            return 0;
        }
    }
}
