package com.goodsoft.library.service;

import com.goodsoft.library.dao.IssuedBooksRepository;
import com.goodsoft.library.domain.BookInStock;
import com.goodsoft.library.domain.IssuedBooks;
import com.goodsoft.library.domain.TypeOfIssue;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class IssuedBooksServiceImpl implements IssuedBooksService {
    private final IssuedBooksRepository issuedBooksRepository;

    @Autowired
    public IssuedBooksServiceImpl(IssuedBooksRepository issuedBooksRepository) {
        this.issuedBooksRepository = issuedBooksRepository;
    }

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
            return issuedBooksRepository.findAll(pageable).getContent();
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
}
