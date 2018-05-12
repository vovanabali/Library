package com.goodsoft.library.dao;

import com.goodsoft.library.domain.Country;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CountryRepository extends PagingAndSortingRepository<Country, Long> {
    boolean existsByName(String name);

    Country findById(long id);

    List<Country> findAllByNameIsContaining(Pageable pageable, String name);
}
