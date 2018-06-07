package com.goodsoft.library.dao;

import com.goodsoft.library.domain.Persona;
import com.goodsoft.library.domain.Rezervation;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RezervationRepository extends PagingAndSortingRepository<Rezervation, Long> {
    List<Rezervation> findAll();

    List<Rezervation> findAllByPersona(final Persona persona);

    boolean existsByBookInStockId(final Long id);
}
