package com.goodsoft.library.web.user;

import com.goodsoft.library.domain.Author;
import com.goodsoft.library.service.AuthorService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping
@RequiredArgsConstructor
public class AuthorController {

    private final AuthorService authorService;

    @GetMapping("author")
    private Author getAuthorById(@RequestParam long id) {
        return authorService.getAuthorById(id);
    }
}
