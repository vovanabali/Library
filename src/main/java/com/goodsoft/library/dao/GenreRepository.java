package com.goodsoft.library.dao;

import com.goodsoft.library.domain.Genre;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GenreRepository extends PagingAndSortingRepository<Genre, Long> {
    Genre findByName(String name);

    Genre findById(long id);
}
