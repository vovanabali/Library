package com.goodsoft.library.dao;

import com.goodsoft.library.domain.BookInStock;
import com.goodsoft.library.domain.IssuedBooks;
import com.goodsoft.library.domain.TypeOfIssue;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssuedBooksRepository extends PagingAndSortingRepository<IssuedBooks, Long> {
    List<IssuedBooks> findAllByPersonaId(long id);

    List<IssuedBooks> findAllByTypeOfIssue(TypeOfIssue typeOfIssue);

    IssuedBooks findByBookInStock(BookInStock bookInStock);

    IssuedBooks findById(long id);

    boolean existsByBookInStock(BookInStock bookInStock);

    boolean existsByBookInStockAndReturnTimeIsNull(BookInStock bookInStock);
}
