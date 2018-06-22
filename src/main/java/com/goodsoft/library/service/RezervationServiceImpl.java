package com.goodsoft.library.service;

import com.goodsoft.library.dao.RezervationRepository;
import com.goodsoft.library.domain.Persona;
import com.goodsoft.library.domain.Rezervation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Service
public class RezervationServiceImpl implements RezervationService {

    private final RezervationRepository rezervationRepository;

    @Override
    public Rezervation read(long id) {
        return rezervationRepository.findById(id).get();
    }

    @Override
    public List<Rezervation> findAll() {
        return rezervationRepository.findAll();
    }

    @Override
    public List<Rezervation> findAllByPersona(Persona persona) {
        return rezervationRepository.findAllByPersona(persona);
    }

    @Override
    public void save(Rezervation rezervation) {
        rezervation.setDateToRezerv(LocalDateTime.now());
        rezervationRepository.save(rezervation);
    }

    @Override
    public void deleteRezervation(Long id) {
        rezervationRepository.deleteById(id);
    }

    @Override
    public void deleteAll(List<Rezervation> rezervations) {
        rezervationRepository.deleteAll(rezervations);
    }
}
