package com.goodsoft.library.service;

import com.goodsoft.library.dao.BookInStockRepository;
import com.goodsoft.library.dao.BookRepository;
import com.goodsoft.library.dao.IssuedBooksRepository;
import com.goodsoft.library.dao.RezervationRepository;
import com.goodsoft.library.domain.Author;
import com.goodsoft.library.domain.Book;
import com.goodsoft.library.domain.BookInStock;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

@Service
@Slf4j
@RequiredArgsConstructor
public class BookInStockServiceImpl implements BookInStockService {
    private final BookInStockRepository bookInStockRepository;
    private final IssuedBooksRepository issuedBooksRepository;
    private final RezervationRepository rezervationRepository;
    private final BookRepository bookRepository;

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
    public boolean deleteById(long id) {
        try {
           issuedBooksRepository.findAll().forEach(issuedBooks -> {
               if (Objects.nonNull(issuedBooks.getReturnTime()) && issuedBooks.getBookInStock().getId() == id) {
                   issuedBooksRepository.deleteById(issuedBooks.getId());
               }
           });
            bookInStockRepository.deleteById(id);
            return true;
        } catch (Exception ex) {
            log.error("Failed to save book in stock", ex.fillInStackTrace());
            return false;
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
                .filter(bookInStock -> !issuedBooksRepository.existsByBookInStockAndReturnTimeIsNull(bookInStock) && !rezervationRepository.existsByBookInStockId(bookInStock.getId()))
                .map(BookInStock::getBook)
                .filter(book ->
                        book.getName().toUpperCase().contains(Optional.ofNullable(name.toUpperCase()).orElse(""))
                ).distinct().collect(toList());
    }

    @Override
    public Long getAvailabelCount(String serch) {
        return bookInStockRepository.findAll().stream().map(BookInStock::getBook).filter(book -> book.getName().contains(Optional.ofNullable(serch.toUpperCase()).orElse(""))).distinct().count();
    }

    @Override
    public Long getAvailabelCountByBookId(Long id) {
        return bookInStockRepository.findAllByBook(bookRepository.findById(id).get())
                .stream()
                .filter(bookInStock -> !issuedBooksRepository.existsByBookInStockAndReturnTimeIsNull(bookInStock) && !rezervationRepository.existsByBookInStockId(bookInStock.getId()))
                .count();

    }

    @Override
    public BookInStock getAvailabelBookIsStockByBook(Book book) {
        return bookInStockRepository.findAllByBook(book)
                .stream()
                .filter(bookInStock -> !issuedBooksRepository.existsByBookInStockAndReturnTimeIsNull(bookInStock) && !rezervationRepository.existsByBookInStockId(bookInStock.getId()))
                .findFirst().get();
    }
}
