package com.goodsoft.library.dto;

import lombok.Data;

import java.util.Date;

@Data
public class PersonaDTO {
    private long id;
    private String name;
    private String surname;
    private String patronymic;
    private Date birhday;
    private String login;
    private Long issiedBooks;
    private Long indebtedness;
    private Long indebtednessNow;
}
