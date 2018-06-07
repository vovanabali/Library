package com.goodsoft.library.web.user;

import com.goodsoft.library.domain.Book;
import com.goodsoft.library.domain.Rezervation;
import com.goodsoft.library.dto.FilterDTO;
import com.goodsoft.library.service.BookInStockService;
import com.goodsoft.library.service.BookService;
import com.goodsoft.library.service.PersonaService;
import com.goodsoft.library.service.RezervationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;

    private final PersonaService personaService;

    private final RezervationService rezervationService;

    private final BookInStockService bookInStockService;

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

    @GetMapping("rezelv_book")
    private boolean rezelvBook(@RequestParam Long book_id) {
        try {
            Rezervation rezervation = new Rezervation();
            rezervation.setPersona(personaService.getByLogin(SecurityContextHolder.getContext().getAuthentication().getName()));
            rezervation.setBookInStock(bookInStockService.getAvailabelBookIsStockByBook(bookService.getById(book_id)));
            rezervationService.save(rezervation);
            return true;
        } catch (final Exception ex) {
            return false;
        }
    }

    @GetMapping("availabel_book_count_by_id")
    public Long getAvailabelBookCountByBookId(final Long book_id) {
        return bookInStockService.getAvailabelCountByBookId(book_id);
    }
}
