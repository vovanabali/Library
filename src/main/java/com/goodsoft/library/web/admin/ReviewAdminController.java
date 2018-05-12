package com.goodsoft.library.web.admin;

import com.goodsoft.library.domain.ReviewsOfTheBook;
import com.goodsoft.library.service.ReviewsOfTheBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    private List<ReviewsOfTheBook> reviews() {
        return  reviewsOfTheBookService.all();
    }

    @GetMapping("reviewsSlice")
    private List<ReviewsOfTheBook> sliceReviews(Pageable pageable) {
        return this.reviewsOfTheBookService.slice(pageable);
    }

    @GetMapping("deleteReview")
    private boolean deleteReview(long id) {
        reviewsOfTheBookService.deleteById(id);
        return true;
    }
}
