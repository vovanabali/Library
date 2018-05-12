package com.goodsoft.library.domain;

import lombok.Data;
import org.springframework.security.core.userdetails.User;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
public class Persona {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String surname;
    private String patronymic;
    private Date birhday;
    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;
    private String login;
    private String password;
}
