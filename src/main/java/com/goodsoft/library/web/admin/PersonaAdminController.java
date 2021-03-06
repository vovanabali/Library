package com.goodsoft.library.web.admin;

import com.goodsoft.library.domain.Persona;
import com.goodsoft.library.dto.PersonaDTO;
import com.goodsoft.library.service.PersonaService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/admin/json")
@RequiredArgsConstructor
public class PersonaAdminController {
    private final PersonaService personaService;

    @GetMapping("personas")
    private List<Persona> persons() {
        return personaService.all();
    }

    @GetMapping("current_personas")
    private List<Persona> currentPersons() {
        return personaService.getNotBanedUsers();
    }

    @GetMapping("current_personas_slice")
    private List<Persona> currentPersonsSlice(Pageable pageable) {
        return personaService.getNotBanedUsersSlice(pageable);
    }

    @GetMapping("library_current_personas_slice")
    private List<PersonaDTO> libraryCurrentPersonsSlice(Pageable pageable, @RequestParam("filter") final String filter) {
        return personaService.getNotBanedUsersSliceLibrary(pageable).stream().filter(personaDTO -> personaDTO.getLogin().contains(filter) || filter.length() == 0).collect(Collectors.toList());
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
