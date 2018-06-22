package com.goodsoft.library.service;

import com.goodsoft.library.domain.BookInStock;
import com.goodsoft.library.domain.IssuedBooks;
import com.goodsoft.library.domain.TypeOfIssue;
import com.goodsoft.library.dto.ExtraditionDTO;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IssuedBooksService {
    List<IssuedBooks> all();

    List<IssuedBooks> allByPersonaId(long id);

    List<IssuedBooks> allByType(TypeOfIssue typeOfIssue);

    IssuedBooks getById(long id);

    IssuedBooks getByBookInStock(BookInStock bookInStock);

    IssuedBooks addIssuedBook(IssuedBooks issuedBooks);

    IssuedBooks updateIssuedBook(IssuedBooks issuedBooks);

    void deleteById(long id);

    List<IssuedBooks> slice(Pageable pageable);

    List<IssuedBooks> slice(Pageable pageable, String serch);

    long getCount();

    List<BookInStock> issuedBooks(ExtraditionDTO extradition) throws Exception;

    boolean returnBook(Long id);

    void save(final IssuedBooks issuedBooks);

    List<IssuedBooks> sliceHistory(Pageable pageable);

    List<IssuedBooks> sliceHistory(Pageable pageable, String serch);
}
