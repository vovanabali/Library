package com.goodsoft.library.domain;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class ReviewsOfTheBook {
    @Id
    @GeneratedValue
    private long id;
    @ManyToOne
    @JoinColumn(name = "persona_id")
    private Persona persona;
    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;
    private String reviews;
    private int rating;
}
