package com.goodsoft.library.service;

import com.goodsoft.library.domain.Persona;
import com.goodsoft.library.domain.Role;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PersonaService {
    List<Persona> all();

    List<Persona> allByRole(Role role);

    List<Persona> allByNameAndSurnameAndPatronymic(String name, String surname, String patronymic);

    List<Persona> slice(Pageable pageable);

    Persona getById(long id);

    Persona getByLogin(String login);

    Persona addPersona(Persona persona);

    Persona updatePersona(Persona persona);

    long getCount();

    void delete(Persona persona);

    boolean deleteById(long id);

    Persona getPersonaByLoginAndPassword(String login, String password);
}
