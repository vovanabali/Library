package com.goodsoft.library.dao;

import com.goodsoft.library.domain.Book;
import com.goodsoft.library.domain.Persona;
import com.goodsoft.library.domain.ReviewsOfTheBook;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewsOfTheBookRepository extends PagingAndSortingRepository<ReviewsOfTheBook, Long> {
    List<ReviewsOfTheBook> findAllByPersona(Persona persona);

    List<ReviewsOfTheBook> findAllByBook(Book book);

    List<ReviewsOfTheBook> findAllByPersonaAndBook(Persona persona, Book book);

    ReviewsOfTheBook findById(long id);
}
