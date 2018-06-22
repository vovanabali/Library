package com.goodsoft.library.domain;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Date;
import java.time.LocalDateTime;

@Data
@Entity
public class IssuedBooks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "persona_id")
    @NotNull
    private Persona persona;
    @ManyToOne
    @JoinColumn(name = "book_id_in_stock")
    @NotNull
    private BookInStock bookInStock;
    private LocalDateTime timeOfIssue;
    @NotNull
    @ManyToOne
    @JoinColumn(name = "type_issue_id")
    private TypeOfIssue typeOfIssue;
    private Date returnTime;
    private Date issueUpTo;
}
