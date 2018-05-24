package com.goodsoft.library.service;

import com.goodsoft.library.dao.ReviewsOfTheBookRepository;
import com.goodsoft.library.domain.Book;
import com.goodsoft.library.domain.Persona;
import com.goodsoft.library.domain.ReviewsOfTheBook;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class ReviewsOfTheBookServiceImpl implements ReviewsOfTheBookService {
    private final ReviewsOfTheBookRepository reviewsOfTheBookRepository;

    @Autowired
    public ReviewsOfTheBookServiceImpl(ReviewsOfTheBookRepository reviewsOfTheBookRepository) {
        this.reviewsOfTheBookRepository = reviewsOfTheBookRepository;
    }

    @Override
    public List<ReviewsOfTheBook> findeAllByBookId(long bookId) {
        try {
            return reviewsOfTheBookRepository.findAllByBookId(bookId);
        } catch (Exception ex) {
            log.error("Failed to load all reviews by book id", ex);
            return new ArrayList<>();
        }
    }

    @Override
    public long getAvgReiting(long bookId) {
        try {
            List<ReviewsOfTheBook> reviews = reviewsOfTheBookRepository.findAllByBookId(bookId);
            if (reviews.size() != 0)
                return reviews.stream().filter(reviewsOfTheBook -> reviewsOfTheBook.getRating() != 0).mapToInt(ReviewsOfTheBook::getRating).sum() / reviews.size();
            else return 0;
        } catch (Exception ex) {
            log.error("Failed to load all reviews", ex);
            return 0;
        }
    }

    @Override
    public List<ReviewsOfTheBook> all() {
        try {
            return (List<ReviewsOfTheBook>) reviewsOfTheBookRepository.findAll();
        } catch (Exception ex) {
            log.error("Failed to load all reviews", ex);
            return new ArrayList<>();
        }
    }

    @Override
    public List<ReviewsOfTheBook> allByPerson(Persona persona) {
        try {
            return reviewsOfTheBookRepository.findAllByPersona(persona);
        } catch (Exception ex) {
            log.error("Failed to load all reviews by persona", ex);
            return new ArrayList<>();
        }
    }

    @Override
    public List<ReviewsOfTheBook> allByBook(Book book) {
        try {
            return reviewsOfTheBookRepository.findAllByBook(book);
        } catch (Exception ex) {
            log.error("Failed to load all reviews by book", ex);
            return new ArrayList<>();
        }
    }

    @Override
    public long getCountByBookId(long id) {
        try {
            return reviewsOfTheBookRepository.countByBookId(id);
        } catch (Exception ex) {
            log.error("Failed to load count review book by book id", ex);
            return 0;
        }
    }

    @Override
    public List<ReviewsOfTheBook> allByPersonaAndBook(Persona persona, Book book) {
        try {
            return reviewsOfTheBookRepository.findAllByPersonaAndBook(persona, book);
        } catch (Exception ex) {
            log.error("Failed to load reviews by persona and book", ex);
            return new ArrayList<>();
        }
    }

    @Override
    public ReviewsOfTheBook getById(long id) {
        try {
            return reviewsOfTheBookRepository.findById(id);
        } catch (Exception ex) {
            log.error("Failed to load reviews oo book by id", ex);
            return new ReviewsOfTheBook();
        }
    }

    @Override
    public ReviewsOfTheBook save(ReviewsOfTheBook reviewsOfTheBook) {
        try {
            return reviewsOfTheBookRepository.save(reviewsOfTheBook);
        } catch (Exception ex) {
            log.error("Failed to save review of the book", ex);
            return reviewsOfTheBook;
        }
    }

    @Override
    public void delete(ReviewsOfTheBook reviewsOfTheBook) {
        try {
            reviewsOfTheBookRepository.delete(reviewsOfTheBook);
        } catch (Exception ex) {
            log.error("Failed to delete review of the book", ex);
        }
    }

    @Override
    public void deleteById(long id) {
        try {
            reviewsOfTheBookRepository.deleteById(id);
        } catch (Exception ex) {
            log.error("Failed to delete review by id", ex);
        }
    }

    @Override
    public List<ReviewsOfTheBook> slice(Pageable pageable, long bookId) {
        try {
            return reviewsOfTheBookRepository.findAllByBookId(pageable, bookId);
        } catch (Exception ex) {
            log.error("Failed load slice from ReviewsOfTheBook by book id", ex.fillInStackTrace());
            return new ArrayList<>();
        }
    }

    @Override
    public List<ReviewsOfTheBook> slice(Pageable pageable) {
        try {
            return reviewsOfTheBookRepository.findAll(pageable).getContent();
        } catch (Exception ex) {
            log.error("Failed load slice from ReviewsOfTheBook", ex.fillInStackTrace());
            return new ArrayList<>();
        }
    }
}
