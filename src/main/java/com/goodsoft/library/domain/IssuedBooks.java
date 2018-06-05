package com.goodsoft.library.domain;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Date;

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
    private Date timeOfIssue;
    @NotNull
    @ManyToOne
    @JoinColumn(name = "type_issue_id")
    private TypeOfIssue typeOfIssue;
    private Date returnTime;
    private Date issueUpTo;
}
