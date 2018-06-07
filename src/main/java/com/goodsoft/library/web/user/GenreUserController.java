package com.goodsoft.library.web.user;

import com.goodsoft.library.domain.Genre;
import com.goodsoft.library.service.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
public class GenreUserController {
    private final GenreService genreService;

    @Autowired
    public GenreUserController(GenreService genreService) {
        this.genreService = genreService;
    }

    @GetMapping("genres")
    private List<Genre> getGenres() {
        return genreService.all();
    }

    @GetMapping("genre")
    private Genre getGenreById(@RequestParam long id) {
        return this.genreService.getById(id);
    }
}
