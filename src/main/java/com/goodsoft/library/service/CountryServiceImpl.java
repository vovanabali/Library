package com.goodsoft.library.service;

import com.goodsoft.library.dao.CountryRepository;
import com.goodsoft.library.domain.Country;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class CountryServiceImpl implements CountryService {
    private final CountryRepository countryRepository;

    @Autowired
    public CountryServiceImpl(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    @Override
    public List<Country> all() {
        try {
            return (List<Country>) countryRepository.findAll();
        } catch (Exception ex) {
            log.error("failed to load countyes", ex.fillInStackTrace());
            return new ArrayList<>();
        }
    }

    @Override
    public List<Country> slice(Pageable pageable) {
        try {
            return countryRepository.findAll(pageable).getContent();
        } catch (Exception ex) {
            log.error("Failed to load slice countries", ex.fillInStackTrace());
            return new ArrayList<>();
        }
    }

    @Override
    public List<Country> slice(Pageable pageable, String name) {
        try {
            return countryRepository.findAllByNameIsContaining(pageable, name);
        } catch (Exception ex) {
            log.error("Failed to load slice countries with filter by name", ex.fillInStackTrace());
            return new ArrayList<>();
        }
    }

    @Override
    public Country addCountry(Country country) {
        try {
            if (countryRepository.existsByName(country.getName())) return null;
            else return countryRepository.save(country);
        } catch (Exception ex) {
            log.error("Failed to add new country", ex.fillInStackTrace());
            return null;
        }
    }

    @Override
    public Country updateCountry(Country country) {
        try {
            if (countryRepository.existsByName(country.getName())) return null;
            else return countryRepository.save(country);
        } catch (Exception ex) {
            log.error("Failed to update country", ex.fillInStackTrace());
            return null;
        }
    }

    @Override
    public Country getCountryById(long id) {
        try {
            return countryRepository.findById(id);
        } catch (Exception ex) {
            log.error("Failed to get country by id", ex.fillInStackTrace());
            return null;
        }
    }

    @Override
    public boolean deleteById(long id) {
        try {
            countryRepository.deleteById(id);
            return true;
        } catch (Exception ex) {
            log.error("Failed to delete country by id", ex.fillInStackTrace());
            return  false;
        }
    }

    @Override
    public long getCount() {
        try {
            return countryRepository.count();
        } catch (Exception ex) {
            log.error("failed to get count countries", ex.fillInStackTrace());
            return 0;
        }
    }
}
