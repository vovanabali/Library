package com.goodsoft.library.domain;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Date;

@Entity
@Data
public class Rezervation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    @NotNull
    private Persona persona;
    @ManyToOne
    @JoinColumn(name = "book_in_stock_id")
    @NotNull
    private BookInStock bookInStock;
    private Date dateToRezerv;
}
