package com.goodsoft.library.service;

import com.goodsoft.library.dao.PersonaRepository;
import com.goodsoft.library.domain.Persona;
import com.goodsoft.library.domain.Role;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static java.util.Objects.nonNull;

@Service
@Slf4j
public class PersonaServiceImpl implements PersonaService {

    private final PersonaRepository personaRepository;

    @Autowired
    public PersonaServiceImpl(PersonaRepository personaRepository) {
        this.personaRepository = personaRepository;
    }

    @Override
    public List<Persona> all() {
        try {
            return (List<Persona>) personaRepository.findAll();
        } catch (Exception ex) {
            log.error("Failed to load all persons", ex);
            return new ArrayList<>();
        }
    }

    @Override
    public List<Persona> allByRole(Role role) {
        try {
            return personaRepository.findAllByRole(role);
        } catch (Exception ex) {
            log.error("Failed to load all persons by role", ex);
            return new ArrayList<>();
        }
    }

    @Override
    public List<Persona> allByNameAndSurnameAndPatronymic(String name, String surname, String patronymic) {
        try {
            return personaRepository.findAllByNameAndSurnameAndPatronymic(name, surname, patronymic);
        } catch (Exception ex) {
            log.error("Failed to load all persons by Name, Surname, Patronymic", ex);
            return new ArrayList<>();
        }
    }

    @Override
    public Persona getById(long id) {
        try {
            return personaRepository.findById(id);
        } catch (Exception ex) {
            log.error("Failed get persona by id", ex);
            return new Persona();
        }
    }

    @Override
    public void delete(Persona persona) {
        try {
            personaRepository.delete(persona);
        } catch (Exception ex) {
            log.error("Failed to delete persona", ex);
        }
    }

    @Override
    public boolean deleteById(long id) {
        try {
            personaRepository.deleteById(id);
            return true;
        } catch (Exception ex) {
            log.error("Failed to delete persona by id", ex);
            return false;
        }
    }

    @Override
    public Persona getPersonaByLoginAndPassword(String login, String password) {
        try {
            return personaRepository.findByLoginAndAndPassword(login, password);
        } catch (Exception ex) {
            log.error("Failed to load persona by login and password", ex);
            return null;
        }
    }

    @Override
    public Persona getByLogin(String login) {
        try {
            return personaRepository.findByLogin(login);
        } catch (Exception ex) {
            log.error("Failed to load persona by login and password", ex);
            return null;
        }
    }

    @Override
    public List<Persona> slice(Pageable pageable) {
        try {
            return personaRepository.findAll(pageable).getContent();
        } catch (Exception ex) {
            log.error("Failed to load slice from persona table", ex.fillInStackTrace());
            return new ArrayList<>();
        }
    }

    @Override
    public Persona addPersona(Persona persona) {
        try {
            if (personaRepository.existsByLogin(persona.getLogin())) return null;
            else {
                Role role = new Role();
                role.setId(2);
                if (!nonNull(persona.getRole()))
                    persona.setRole(role);
                return personaRepository.save(persona);
            }
        } catch (Exception ex) {
            log.error("Failed to adding persona", ex.fillInStackTrace());
            return null;
        }
    }

    @Override
    public Persona updatePersona(Persona persona) {
        try {
            return personaRepository.save(persona);
        } catch (Exception ex) {
            log.error("Failed to adding persona", ex.fillInStackTrace());
            return null;
        }
    }

    @Override
    public long getCount() {
        try {
            return personaRepository.count();
        } catch (Exception ex) {
            log.error("Failed to load users count", ex.fillInStackTrace());
            return 0;
        }
    }
}
