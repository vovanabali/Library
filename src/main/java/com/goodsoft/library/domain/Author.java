package com.goodsoft.library.domain;

import lombok.Data;

import javax.persistence.*;
import java.sql.Date;

@Data
@Entity
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String surname;
    private String patronymic;
    private Date birthday;
    @ManyToOne
    @JoinColumn(name = "country_id")
    private Country country;
    private String description;
}
