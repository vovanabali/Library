package com.goodsoft.library.web.admin;

import com.goodsoft.library.dao.ReviewsOfTheBookRepository;
import com.goodsoft.library.domain.ReviewsOfTheBook;
import com.goodsoft.library.service.ReviewsOfTheBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/admin/json")
public class ReviewAdminController {
    private final ReviewsOfTheBookService reviewsOfTheBookService;

    @Autowired
    public ReviewAdminController(ReviewsOfTheBookService reviewsOfTheBookService) {
        this.reviewsOfTheBookService = reviewsOfTheBookService;
    }

    @GetMapping("reviews")
    public List<ReviewsOfTheBook> reviews() {
        return  reviewsOfTheBookService.all();
    }

    @PostMapping("addReview")
    public boolean addReview(@RequestBody ReviewsOfTheBook reviewsOfTheBook) {
        return reviewsOfTheBookService.save(reviewsOfTheBook) != null;
    }

    @GetMapping("reviewsSlice")
    public List<ReviewsOfTheBook> sliceReviews(Pageable pageable) {
        return this.reviewsOfTheBookService.slice(pageable);
    }

    @GetMapping("reviewsSliceByBookId")
    public List<ReviewsOfTheBook> sliceReviewsByBookId(Pageable pageable,@RequestParam("bookId") long id) {
        return this.reviewsOfTheBookService.slice(pageable, id);
    }

    @GetMapping("bookRaiting")
    public long getBookRaiting(long id) {
        return reviewsOfTheBookService.getAvgReiting(id);
    }

    @GetMapping("bookReviewsCount")
    public long getBookReviewsCount(long id) {
        return reviewsOfTheBookService.getCountByBookId(id);
    }

    @GetMapping("deleteReview")
    public boolean deleteReview(long id) {
        reviewsOfTheBookService.deleteById(id);
        return true;
    }
}
