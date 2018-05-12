package com.goodsoft.library.dao;

import com.goodsoft.library.domain.Author;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuthorRepository extends PagingAndSortingRepository<Author, Long> {
    List<Author> findAllByName(String name);

    Page<Author> findAll(Pageable pageable);

    Author findById(long id);
}
