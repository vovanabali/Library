package com.goodsoft.library.web.user;

import com.goodsoft.library.domain.Book;
import com.goodsoft.library.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping
public class BookController {
    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("books")
    private List<Book> getBooks() {
        return bookService.all();
    }

    @GetMapping("getBookById")
    private Book getBookById(@RequestParam long id) {
        return bookService.getById(id);
    }

    @GetMapping("bookCount")
    private long bookCount() {
        return bookService.bookCount();
    }

    @GetMapping("booksSlice")
    private List<Book> getBooksSlice(Pageable pageable, String name) {
        return bookService.slice(pageable, name);
    }

    @GetMapping("bookCountByName")
    private long bookCountByName(@NotNull String name) {
        return bookService.bookCount(name);
    }
}
