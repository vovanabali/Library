package com.goodsoft.library.domain;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
@Data
public class ReviewsOfTheBook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn(name = "persona_id")
    @NotNull
    private Persona persona;
    @ManyToOne
    @JoinColumn(name = "book_id")
    @NotNull
    private Book book;
    @NotEmpty
    private String reviews;
    private int rating;
}
