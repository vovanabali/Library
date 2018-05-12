package com.goodsoft.library.web.admin;

import com.goodsoft.library.domain.BookInStock;
import com.goodsoft.library.service.AuthorService;
import com.goodsoft.library.service.BookInStockService;
import com.goodsoft.library.service.BookService;
import com.goodsoft.library.service.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/admin/json")
public class BookInStockAdminController {
    private final BookService bookService;

    private final AuthorService authorService;

    private final GenreService genreService;

    private final BookInStockService bookInStockService;

    @Autowired
    public BookInStockAdminController(BookService bookService, AuthorService authorService, GenreService genreService, BookInStockService bookInStockService) {
        this.bookService = bookService;
        this.authorService = authorService;
        this.genreService = genreService;
        this.bookInStockService = bookInStockService;
    }

    @GetMapping("storageBooks")
    private List<BookInStock> getAllBookInStorage() {
        return bookInStockService.all();
    }

    @GetMapping("storageBooksSlice")
    private List<BookInStock> getBookInStorageSlice(Pageable pageable) {
        return this.bookInStockService.slice(pageable);
    }

    @PostMapping("addStorageBooks")
    private boolean addToStorageBook(@RequestBody @Valid BookInStock bookInStock, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return false;
        } else {
            return bookInStockService.save(bookInStock).getId() != 0;
        }
    }

    @PostMapping("deleteStorageBooks")
    private boolean deleteBookInStock(@RequestBody @Valid BookInStock bookInStock, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return false;
        } else {
            bookInStockService.delete(bookInStock);
            return true;
        }
    }

    @GetMapping("deleteStorageBooksById")
    private boolean deleteBookInStockById(@RequestParam long id) {
        this.bookInStockService.deleteById(id);
        return true;
    }

    @GetMapping("getStorageBooksById")
    private BookInStock getStorageBooksById(@RequestParam long id) {
        return bookInStockService.getById(id);
    }

    @PostMapping("saveStorageBook")
    private boolean saveStorageBook(@RequestBody @Valid BookInStock saveStorageBooks, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return false;
        } else {
            bookInStockService.save(saveStorageBooks);
            return true;
        }
    }
}
