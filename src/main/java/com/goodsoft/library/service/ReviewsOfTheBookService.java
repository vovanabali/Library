package com.goodsoft.library.service;

import com.goodsoft.library.domain.Book;
import com.goodsoft.library.domain.Persona;
import com.goodsoft.library.domain.ReviewsOfTheBook;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ReviewsOfTheBookService {
    List<ReviewsOfTheBook> all();

    long getAvgReiting(long bookId);

    List<ReviewsOfTheBook> findeAllByBookId(long bookId);

    List<ReviewsOfTheBook> slice(Pageable pageable);

    List<ReviewsOfTheBook> slice(Pageable pageable, long bookId);

    List<ReviewsOfTheBook> allByPerson(Persona persona);

    List<ReviewsOfTheBook> allByBook(Book book);

    List<ReviewsOfTheBook> allByPersonaAndBook(Persona persona, Book book);

    ReviewsOfTheBook getById(long id);

    ReviewsOfTheBook save(ReviewsOfTheBook reviewsOfTheBook);

    void delete(ReviewsOfTheBook reviewsOfTheBook);

    void deleteById(long id);

    long getCountByBookId(long id);
}
