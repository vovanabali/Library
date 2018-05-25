package com.goodsoft.library.web.admin;

import com.goodsoft.library.domain.Author;
import com.goodsoft.library.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/admin/json")
public class AuthorAdminController {
    private final AuthorService authorService;

    @Autowired
    public AuthorAdminController(AuthorService authorService) {
        this.authorService = authorService;
    }

    @GetMapping("authors")
    private List<Author> getAuthors() {
        return authorService.getAllAuthors();
    }

    @GetMapping("authorsSlice")
    private List<Author> getSliceAuthors(Pageable pageable) {
        return this.authorService.slice(pageable);
    }

    @PostMapping("addAuthor")
    private boolean addAuthor(@RequestBody @Valid Author author, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return false;
        } else {
            return authorService.saveAuthor(author) != null;
        }
    }

    @PostMapping("updateAuthor")
    private boolean updateAuthor(@RequestBody @Valid Author author, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return false;
        } else {
            return authorService.saveAuthor(author) != null;
        }
    }

    @GetMapping("deleteAuthorById")
    private boolean deleteAuthorById(@RequestParam long id) {
        return authorService.deeteAuthorById(id);
    }
}
