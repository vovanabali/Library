package com.goodsoft.library.service;

import com.goodsoft.library.dao.BlackListRepository;
import com.goodsoft.library.dao.IssuedBooksRepository;
import com.goodsoft.library.dao.PersonaRepository;
import com.goodsoft.library.domain.Persona;
import com.goodsoft.library.domain.Role;
import com.goodsoft.library.dto.PersonaDTO;
import com.goodsoft.library.dto.UserProfileDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static java.util.Objects.nonNull;

@Service
@Slf4j
@RequiredArgsConstructor
public class PersonaServiceImpl implements PersonaService {

    private final PersonaRepository personaRepository;

    private final BlackListRepository blackListRepository;

    private final IssuedBooksRepository issuedBooksRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final RezervationService rezervationService;

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
                role.setId(1);
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
            if (!personaRepository.findByLogin(persona.getLogin()).getPassword().equals(bCryptPasswordEncoder.encode(persona.getPassword()))) {
                persona.setPassword(bCryptPasswordEncoder.encode(persona.getPassword()));
            }
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

    @Override
    public List<Persona> getNotBanedUsers() {
        try {
            List<Persona> personas = (List<Persona>) personaRepository.findAll();
            return personas.stream().filter(persona -> !blackListRepository.existsByPersona(persona)).collect(Collectors.toList());
        } catch (Exception ex) {
            log.error("Failed to load all persons", ex);
            return new ArrayList<>();
        }
    }

    @Override
    public List<Persona> getNotBanedUsersSlice(Pageable pageable) {
        try {
            return personaRepository.findAll(pageable).getContent().stream().filter(persona -> !blackListRepository.existsByPersona(persona)).collect(Collectors.toList());
        } catch (Exception ex) {
            log.error("Failed to load all persons", ex);
            return new ArrayList<>();
        }
    }

    @Override
    public List<PersonaDTO> getNotBanedUsersSliceLibrary(Pageable pageable) {
        List<PersonaDTO> dtos = new ArrayList<>();
        getNotBanedUsersSlice(pageable).forEach(persona -> {
            PersonaDTO dto = new PersonaDTO();
            dto.setBirhday(persona.getBirhday());
            dto.setId(persona.getId());
            dto.setLogin(persona.getLogin());
            dto.setName(persona.getName());
            dto.setPatronymic(persona.getPatronymic());
            dto.setSurname(persona.getSurname());
            dto.setIssiedBooks(issuedBooksRepository.findAllByPersonaId(persona.getId()).stream().filter(issuedBooks -> Objects.isNull(issuedBooks.getReturnTime())).count());
            dto.setIndebtedness(issuedBooksRepository.findAllByPersonaId(persona.getId()).stream().filter(books -> books.getIssueUpTo().before(new Date()) && Objects.nonNull(books.getReturnTime())).count());
            dto.setIndebtednessNow(issuedBooksRepository.findAllByPersonaId(persona.getId()).stream().filter(books -> books.getIssueUpTo().before(new Date()) && Objects.isNull(books.getReturnTime())).count());
            dtos.add(dto);
        });
        return dtos;
    }

    @Override
    public UserProfileDTO getUserProfile(final String login) {
        UserProfileDTO userProfileDTO = new UserProfileDTO();
        userProfileDTO.setPersona(personaRepository.findByLogin(login));
        userProfileDTO.setIssuedBooks(issuedBooksRepository.findAllByPersonaId(userProfileDTO.getPersona().getId()));
        userProfileDTO.setRezervationBooks(rezervationService.findAllByPersona(userProfileDTO.getPersona()));
        return userProfileDTO;
    }
}
