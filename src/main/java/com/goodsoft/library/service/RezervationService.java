package com.goodsoft.library.service;

import com.goodsoft.library.domain.Persona;
import com.goodsoft.library.domain.Rezervation;

import java.util.List;

public interface RezervationService {
    Rezervation read(final long id);

    List<Rezervation> findAll();

    List<Rezervation> findAllByPersona(final Persona persona);

    void save(final Rezervation rezervation);

    void deleteRezervation(final Long id);

    void deleteAll(final List<Rezervation> rezervations);
}
