package com.goodsoft.library.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.goodsoft.library.domain.Persona;
import com.goodsoft.library.service.PersonaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Map;

@RestController
@CrossOrigin
public class AuthContoller {
    private final PersonaService personaService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public AuthContoller(PersonaService personaService, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.personaService = personaService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @RequestMapping(value = "/sign", method = RequestMethod.POST, produces = "application/json")
    public void getPersona(@RequestBody Persona user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        personaService.addPersona(user);
    }

    @GetMapping("/currentUser")
    public Persona loginUser() {
        return personaService.getByLogin(SecurityContextHolder.getContext().getAuthentication().getName());
    }
}
