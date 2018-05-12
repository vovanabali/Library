package com.goodsoft.library.dao;

import com.goodsoft.library.domain.Persona;
import com.goodsoft.library.domain.Role;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonaRepository extends PagingAndSortingRepository<Persona, Long> {
    List<Persona> findAllByRole(Role role);

    List<Persona> findAllByNameAndSurnameAndPatronymic(String name, String surname, String patronymic);

    Persona findById(long id);

    Persona findByLoginAndAndPassword(String login, String password);

    Persona findByLogin(String login);

    boolean existsByLogin(String login);
}
