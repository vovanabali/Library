package com.goodsoft.library.web.admin;

import com.goodsoft.library.domain.Persona;
import com.goodsoft.library.service.PersonaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/admin/json")
public class PersonaAdminController {
    private final PersonaService personaService;

    @Autowired
    public PersonaAdminController(PersonaService personaService) {
        this.personaService = personaService;
    }

    @GetMapping("personas")
    private List<Persona> persons() {
        return personaService.all();
    }

    @GetMapping("personas_count")
    private long getCountUsers() {
        return personaService.getCount();
    }

    @GetMapping("personaSlice")
    private List<Persona> persons(Pageable pageable) {
        return personaService.slice(pageable);
    }

    @GetMapping("persona")
    private Persona getPersonaById(long id) {
        return personaService.getById(id);
    }

    @PostMapping("addPersona")
    private boolean addPersona(@RequestBody @Valid Persona persona, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return false;
        } else {
            return personaService.addPersona(persona) != null;
        }
    }

    @PostMapping("updatePersona")
    private boolean updatePersona(@RequestBody @Valid Persona persona, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return false;
        } else {
            return personaService.updatePersona(persona) != null;
        }
    }

    @GetMapping("deletePersona")
    private boolean deletePersona(long id) {
        return personaService.deleteById(id);
    }
}
