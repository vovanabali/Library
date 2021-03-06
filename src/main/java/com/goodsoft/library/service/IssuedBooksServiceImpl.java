package com.goodsoft.library.service;

import com.goodsoft.library.dao.BookInStockRepository;
import com.goodsoft.library.dao.IssuedBooksRepository;
import com.goodsoft.library.domain.BookInStock;
import com.goodsoft.library.domain.IssuedBooks;
import com.goodsoft.library.domain.TypeOfIssue;
import com.goodsoft.library.dto.ExtraditionDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@Service
@Slf4j
@RequiredArgsConstructor
public class IssuedBooksServiceImpl implements IssuedBooksService {
    private final IssuedBooksRepository issuedBooksRepository;
    private final BookInStockRepository bookInStockRepository;

    @Override
    public List<IssuedBooks> all() {
        try {
            return (List<IssuedBooks>) issuedBooksRepository.findAll();
        } catch (Exception ex) {
            log.error("Failed to load all issued books", ex);
            return new ArrayList<>();
        }
    }

    @Override
    public List<IssuedBooks> allByPersonaId(long id) {
        try {
            return issuedBooksRepository.findAllByPersonaId(id);
        } catch (Exception ex) {
            log.error("Failed to load all books issued to the user", ex);
            return new ArrayList<>();
        }
    }

    @Override
    public List<IssuedBooks> allByType(TypeOfIssue typeOfIssue) {
        try {
            return issuedBooksRepository.findAllByTypeOfIssue(typeOfIssue);
        } catch (Exception ex) {
            log.error("Failed to load all books by type", ex);
            return new ArrayList<>();
        }
    }

    @Override
    public IssuedBooks getById(long id) {
        try {
            return issuedBooksRepository.findById(id);
        } catch (Exception ex) {
            log.error("Failed to load issued book by id", ex);
            return new IssuedBooks();
        }
    }

    @Override
    public IssuedBooks getByBookInStock(BookInStock bookInStock) {
        try {
            return issuedBooksRepository.findByBookInStock(bookInStock);
        } catch (Exception ex) {
            log.error("Failed to load issued book by book in stock", ex);
            return null;
        }
    }

    @Override
    public IssuedBooks addIssuedBook(IssuedBooks issuedBooks) {
        try {
            if (!issuedBooksRepository.existsByBookInStock(issuedBooks.getBookInStock()))
                return issuedBooksRepository.save(issuedBooks);
            else return null;
        } catch (Exception ex) {
            log.error("Failed adding issued book", ex);
            return null;
        }
    }

    @Override
    public IssuedBooks updateIssuedBook(IssuedBooks issuedBooks) {
        try {
            return issuedBooksRepository.save(issuedBooks);
        } catch (Exception ex) {
            log.error("Failed update issued book", ex);
            return null;
        }
    }

    @Override
    public void deleteById(long id) {
        try {
            issuedBooksRepository.deleteById(id);
        } catch (Exception ex) {
            log.error("Failed delete issued book", ex);
        }
    }

    @Override
    public List<IssuedBooks> slice(Pageable pageable) {
        try {
            return issuedBooksRepository.findAll(pageable).getContent().stream().filter(issuedBooks -> isNull(issuedBooks.getReturnTime())).collect(Collectors.toList());
        } catch (Exception ex) {
            log.error("failed to load slice from issued books", ex.fillInStackTrace());
            return new ArrayList<>();
        }
    }

    @Override
    public List<IssuedBooks> slice(Pageable pageable, String serch) {
        try {
            return issuedBooksRepository.findAll(pageable).getContent().stream()
                    .filter(issuedBooks -> isNull(issuedBooks.getReturnTime()))
                    .filter(issuedBooks -> issuedBooks.getBookInStock().getBook().getName().indexOf(serch) != -1 || issuedBooks.getPersona().getLogin().indexOf(serch) != -1)
                    .collect(Collectors.toList());
        } catch (Exception ex) {
            log.error("failed to load slice from issued books", ex.fillInStackTrace());
            return new ArrayList<>();
        }
    }

    @Override
    public long getCount() {
        try {
            return issuedBooksRepository.count();
        } catch (Exception ex) {
            log.error("Failed to get count issued books", ex.fillInStackTrace());
            return 0;
        }
    }

    @Override
    public List<BookInStock> issuedBooks(final ExtraditionDTO extradition) throws Exception {
        try {
            List<BookInStock> bookInStocks = new ArrayList<>();
            extradition.getBooks().forEach(
                    (book ->
                            bookInStocks.add(
                                    bookInStockRepository
                                            .findAllByBook(book)
                                            .stream()
                                            .filter(bookInStock ->
                                                    !issuedBooksRepository.existsByBookInStockAndReturnTimeIsNull(bookInStock)
                                            )
                                            .findFirst()
                                            .get())));
            bookInStocks.forEach(bookInStock -> {
                IssuedBooks issuedBooks = new IssuedBooks();
                issuedBooks.setBookInStock(bookInStock);
                issuedBooks.setPersona(extradition.getUser());
                issuedBooks.setTimeOfIssue(LocalDateTime.now());
                issuedBooks.setTypeOfIssue(extradition.getTypeOfIssue());
                issuedBooks.setIssueUpTo(extradition.getIssueUpTo());
                issuedBooksRepository.save(issuedBooks);
            });
            return bookInStocks;
        } catch (Exception ex) {
            throw new Exception("failed to issued books");
        }
    }

    @Override
    public boolean returnBook(Long id) {
        try {
            issuedBooksRepository.findById(id).ifPresent(issuedBooks -> {
                issuedBooks.setReturnTime(Date.valueOf(LocalDate.now()));
                issuedBooksRepository.save(issuedBooks);
            });
            return true;
        } catch (final Exception ex) {
            return false;
        }
    }

    @Override
    public void save(IssuedBooks issuedBooks) {
        issuedBooksRepository.save(issuedBooks);
    }

    @Override
    public List<IssuedBooks> sliceHistory(Pageable pageable) {
        try {
            return issuedBooksRepository.findAll(pageable).getContent().stream().filter(issuedBooks -> nonNull(issuedBooks.getReturnTime())).collect(Collectors.toList());
        } catch (Exception ex) {
            log.error("failed to load slice from issued books", ex.fillInStackTrace());
            return new ArrayList<>();
        }
    }

    @Override
    public List<IssuedBooks> sliceHistory(Pageable pageable, String serch) {
        try {
            return issuedBooksRepository.findAll(pageable).getContent().stream()
                    .filter(issuedBooks -> nonNull(issuedBooks.getReturnTime()))
                    .filter(issuedBooks -> issuedBooks.getBookInStock().getBook().getName().indexOf(serch) != -1 || issuedBooks.getPersona().getLogin().indexOf(serch) != -1)
                    .collect(Collectors.toList());
        } catch (Exception ex) {
            log.error("failed to load slice from issued books", ex.fillInStackTrace());
            return new ArrayList<>();
        }
    }
}
