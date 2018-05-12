package com.goodsoft.library.service;

import com.goodsoft.library.dao.PersonaRepository;
import com.goodsoft.library.domain.Persona;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private PersonaRepository personaRepository;

    public UserDetailsServiceImpl(PersonaRepository personaRepository) {
        this.personaRepository = personaRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        Persona persona = personaRepository.findByLogin(username);
        if (persona == null) {
            throw new UsernameNotFoundException(username);
        }
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        grantedAuthorities.add(new SimpleGrantedAuthority("ROLE" + persona.getRole().getName().toUpperCase()));
        return new User(persona.getLogin(), persona.getPassword(), grantedAuthorities);
    }
}
