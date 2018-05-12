package com.goodsoft.library.dao;

import com.goodsoft.library.domain.BlackList;
import com.goodsoft.library.domain.Persona;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlackListRepository extends PagingAndSortingRepository<BlackList, Long> {
    BlackList findByPersona(Persona persona);

    void deleteByPersona(Persona persona);
}
