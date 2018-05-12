package com.goodsoft.library.service;

import com.goodsoft.library.domain.Country;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CountryService {
    List<Country> all();

    List<Country> slice(Pageable pageable);

    List<Country> slice(Pageable pageable, String name);

    Country addCountry(Country country);

    Country updateCountry(Country country);

    Country getCountryById(long id);

    boolean deleteById(long id);

    long getCount();
}
