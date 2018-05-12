package com.goodsoft.library.web.admin;

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
@RequestMapping("/admin/json")
public class GenreAdminController {
    private final GenreService genreService;

    @Autowired
    public GenreAdminController(GenreService genreService) {
        this.genreService = genreService;
    }

    @GetMapping("genres")
    private List<Genre> getGenres() {
        return genreService.all();
    }

    @GetMapping("ganresSlice")
    private List<Genre> getSliceGenres(Pageable pageable) {
        return genreService.slice(pageable);
    }

    @GetMapping("genre")
    private Genre getGenreById(@RequestParam long id) {
        return this.genreService.getById(id);
    }

    @PostMapping("addGenre")
    private boolean addGenre(@RequestBody @Valid Genre genre, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return false;
        } else {
            return genreService.save(genre) != null;
        }
    }

    @PostMapping("updateGenre")
    private boolean updateGenre(@RequestBody @Valid Genre genre, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return false;
        } else {
            return genreService.save(genre) != null;
        }
    }

    @GetMapping("deleteGenre")
    private boolean deleteGenre(@RequestParam long id) {
        this.genreService.deletById(id);
        return true;
    }
}
