package com.goodsoft.library.service;

import com.goodsoft.library.dao.BookInStockRepository;
import com.goodsoft.library.dao.IssuedBooksRepository;
import com.goodsoft.library.domain.Author;
import com.goodsoft.library.domain.Book;
import com.goodsoft.library.domain.BookInStock;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static java.util.Objects.isNull;
import static java.util.stream.Collectors.toList;

@Service
@Slf4j
@RequiredArgsConstructor
public class BookInStockServiceImpl implements BookInStockService {
    private final BookInStockRepository bookInStockRepository;
    private final IssuedBooksRepository issuedBooksRepository;

    @Override
    public List<BookInStock> all() {
        try {
            return (List<BookInStock>) bookInStockRepository.findAll();
        } catch (Exception ex) {
            log.error("Failed load all books from stock", ex.fillInStackTrace());
            return new ArrayList<>();
        }
    }

    @Override
    public List<BookInStock> allByAuthor(Author author) {
        try {
            return bookInStockRepository.findAllByBookAuthor(author);
        } catch (Exception ex) {
            log.error("Failed to load all book from ftock by author", ex.fillInStackTrace());
            return new ArrayList<>();
        }
    }

    @Override
    public List<BookInStock> allByBook(Book book) {
        try {
            return bookInStockRepository.findAllByBook(book);
        } catch (Exception ex) {
            log.error("Failed to load all books in stock by book", ex.fillInStackTrace());
            return new ArrayList<>();
        }
    }

    @Override
    public BookInStock getById(long id) {
        try {
            return bookInStockRepository.findById(id);
        } catch (Exception ex) {
            log.error("Failed to load book in stock by id", ex.fillInStackTrace());
            return new BookInStock();
        }
    }

    @Override
    public BookInStock getByInventoryNumber(String inventoryNumber) {
        try {
            return bookInStockRepository.findByInventoryNumber(inventoryNumber);
        } catch (Exception ex) {
            log.error("Failed to load book in stock by inventory number", ex.fillInStackTrace());
            return new BookInStock();
        }
    }

    @Override
    public BookInStock save(BookInStock bookInStock) {
        try {
            return bookInStockRepository.save(bookInStock);
        } catch (Exception ex) {
            log.error("Failed save to book in stock", ex.fillInStackTrace());
            return bookInStock;
        }
    }

    @Override
    public void delete(BookInStock bookInStock) {
        try {
            bookInStockRepository.delete(bookInStock);
        } catch (Exception ex) {
            log.error("Failed to save book in stock", ex.fillInStackTrace());
        }
    }

    @Override
    public List<BookInStock> slice(Pageable pageable) {
        try {
            return bookInStockRepository.findAll(pageable).getContent();
        } catch (Exception ex) {
            log.error("Failed to load slice from book in stock!", ex.fillInStackTrace());
            return new ArrayList<>();
        }
    }

    @Override
    public void deleteById(long id) {
        try {
            bookInStockRepository.deleteById(id);
        } catch (Exception ex) {
            log.error("Failed to save book in stock", ex.fillInStackTrace());
        }
    }

    @Override
    public List<BookInStock> getAllBooks(List<Book> books) throws Exception {
        try {
            List<BookInStock> bookInStocks = new ArrayList<>();
            books.forEach(book -> Optional.ofNullable(bookInStockRepository.findFirstByBook(book)).ifPresent(bookInStocks::add));
            return bookInStocks;
        } catch (Exception ex) {
            log.error("Failed to load books in stock by books", ex.fillInStackTrace());
            throw new Exception("Failed to load books in stock by books");
        }
    }

    @Override
    public List<Book> getAvailabelBooks(Pageable pageable, final String name) {
        return bookInStockRepository.findAll(pageable).getContent()
                .stream()
                .filter(bookInStock -> !issuedBooksRepository.existsByBookInStock(bookInStock))
                .map(BookInStock::getBook)
                .filter(book ->
                        book.getName().toUpperCase().contains(Optional.ofNullable(name.toUpperCase()).orElse(""))
                ).distinct().collect(toList());
    }

    @Override
    public Long getAvailabelCount(String serch) {
        return  bookInStockRepository.findAll().stream().map(BookInStock::getBook).filter(book -> book.getName().contains(Optional.ofNullable(serch.toUpperCase()).orElse(""))).distinct().count();
    }
}
