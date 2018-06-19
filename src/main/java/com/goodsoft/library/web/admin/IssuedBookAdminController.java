package com.goodsoft.library.web.admin;

import com.goodsoft.library.domain.IssuedBooks;
import com.goodsoft.library.service.IssuedBooksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin
@RequestMapping("/admin/json")
public class IssuedBookAdminController {
    private final IssuedBooksService issuedBooksService;

    @Autowired
    public IssuedBookAdminController(IssuedBooksService issuedBooksService) {
        this.issuedBooksService = issuedBooksService;
    }

    @GetMapping("issuedBooks")
    private List<IssuedBooks> issuedBooks() {
        return issuedBooksService.all();
    }

    @GetMapping("issuedBookSlice")
    private List<IssuedBooks> issuedBooks(Pageable pageable, @RequestParam("sortField") String sortFild) {
        if (Objects.isNull(sortFild) || sortFild.equals("null")) {
            return issuedBooksService.slice(pageable);
        } else {
            return issuedBooksService.slice(pageable, sortFild);
        }
    }

    @GetMapping("issuedBook")
    private IssuedBooks getIssuedBookById(long id) {
        return issuedBooksService.getById(id);
    }

    @PostMapping("addIssuedBook")
    private boolean addIssuedBook(@RequestBody @Valid IssuedBooks issuedBook, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return false;
        } else {
            return issuedBooksService.addIssuedBook(issuedBook) != null;
        }
    }

    @PostMapping("updateIssuedBook")
    private boolean updateIssuedBook(@RequestBody @Valid IssuedBooks issuedBook, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return false;
        } else {
            return issuedBooksService.updateIssuedBook(issuedBook) != null;
        }
    }

    @GetMapping("deleteIssuedBook")
    private boolean deleteIssuedBook(long id) {
        issuedBooksService.deleteById(id);
        return true;
    }

    @GetMapping("countIssuedBooks")
    private long countIssuedBooks() {
        return this.issuedBooksService.getCount();
    }

    @GetMapping("return_book")
    private boolean returnBook(@RequestParam("id") Long id) {
        return issuedBooksService.returnBook(id);
    }
}
