package com.goodsoft.library.web.admin;

import com.goodsoft.library.domain.Country;
import com.goodsoft.library.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/admin/json")
public class CountryAdminController {
    private final CountryService countryService;

    @Autowired
    public CountryAdminController(CountryService countryService) {
        this.countryService = countryService;
    }

    @GetMapping("countries")
    private List<Country> getCountries() {
        return countryService.all();
    }

    @GetMapping("countriesSlice")
    private List<Country> getSliceCountries(Pageable pageable, String name) {
        return countryService.slice(pageable, name);
    }

    @GetMapping("country")
    private Country getCountryById(@RequestParam long id) {
        return this.countryService.getCountryById(id);
    }

    @PostMapping("addCountry")
    private boolean addCountry(@RequestBody @Valid Country country, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return false;
        } else {
            return countryService.addCountry(country) != null;
        }
    }

    @PostMapping("updateCountry")
    private boolean updateCountry(@RequestBody @Valid Country country, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return false;
        } else {
            return countryService.updateCountry(country) != null;
        }
    }

    @GetMapping("deleteCountry")
    private boolean deleteCountry(@RequestParam long id) {
        return countryService.deleteById(id);
    }

    @GetMapping("getCount")
    private long getCount() {
        return countryService.getCount();
    }
}
