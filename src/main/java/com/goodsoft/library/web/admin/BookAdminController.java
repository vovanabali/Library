package com.goodsoft.library.web.admin;

import com.goodsoft.library.domain.Book;
import com.goodsoft.library.service.BookService;
import com.goodsoft.library.service.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin
@RequestMapping("/admin")
public class BookAdminController {
    private final BookService bookService;

    private final GenreService genreService;

    @Autowired
    public BookAdminController(BookService bookService, GenreService genreService) {
        this.bookService = bookService;
        this.genreService = genreService;
    }

    @PostMapping("addBook")
    private boolean addBook(@RequestBody @Valid Book book, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return false;
        } else {
            return bookService.addBook(book) != null;
        }
    }

    @PostMapping("deleteBook")
    private boolean deleteBook(@RequestBody @Valid Book book, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return false;
        } else {
            bookService.delete(book);
            return true;
        }
    }

    @PostMapping("saveBook")
    private boolean saveBook(@RequestBody @Valid Book book, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return false;
        } else {
            return bookService.updateBook(book) != null;
        }
    }

    @GetMapping("deleteBookById")
    private boolean deleteBookById(@RequestParam long id) {
        this.bookService.deleteById(id);
        return true;
    }
}
