package com.goodsoft.library.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
@EqualsAndHashCode(callSuper = false)
public class BookInStock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private int rack;
    @NotNull
    private int rowNumber;
    @NotNull
    private String inventoryNumber;
    @NotNull
    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;
}
