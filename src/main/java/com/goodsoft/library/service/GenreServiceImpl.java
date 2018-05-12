package com.goodsoft.library.service;

import com.goodsoft.library.dao.GenreRepository;
import com.goodsoft.library.domain.Genre;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class GenreServiceImpl implements GenreService {
    private final GenreRepository genreRepository;

    @Autowired
    public GenreServiceImpl(GenreRepository genreRepository) {
        this.genreRepository = genreRepository;
    }

    @Override
    public List<Genre> all() {
        try {
            return (List<Genre>) genreRepository.findAll();
        } catch (Exception ex) {
            log.error("Failed to get all genre", ex.fillInStackTrace());
            return new ArrayList<>();
        }
    }

    @Override
    public Genre getById(long id) {
        try {
            return genreRepository.findById(id);
        } catch (Exception ex) {
            log.error("Failed to get genre by id", ex.fillInStackTrace());
            return new Genre();
        }
    }

    @Override
    public Genre getByName(String name) {
        try {
            return genreRepository.findByName(name);
        } catch (Exception ex) {
            log.error("Failed to get genre by name", ex.fillInStackTrace());
            return new Genre();
        }
    }

    @Override
    public Genre save(Genre genre) {
        try {
            return genreRepository.save(genre);
        } catch (Exception ex) {
            log.error("Failed to save genre", ex.fillInStackTrace());
            return genre;
        }
    }

    @Override
    public void delete(Genre genre) {
        try {
            genreRepository.delete(genre);
        } catch (Exception ex) {
            log.error("Failed to delete genre", ex.fillInStackTrace());
        }
    }

    @Override
    public void deletById(long id) {
        try {
            genreRepository.deleteById(id);
        } catch (Exception ex) {
            log.error("Failed to delete genre by id", ex.fillInStackTrace());
        }
    }

    @Override
    public List<Genre> slice(Pageable pageable) {
        try {
            return genreRepository.findAll(pageable).getContent();
        } catch (Exception ex) {
            log.error("Failed to get slice from genres", ex.fillInStackTrace());
            return null;
        }
    }
}
