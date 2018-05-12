package com.goodsoft.library.service;

import com.goodsoft.library.domain.Genre;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface GenreService {
    List<Genre> all();

    List<Genre> slice(Pageable pageable);

    Genre getById(long id);

    Genre getByName(String name);

    Genre save(Genre genre);

    void delete(Genre genre);

    void deletById(long id);
}
