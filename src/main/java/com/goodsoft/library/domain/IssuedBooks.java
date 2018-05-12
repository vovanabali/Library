package com.goodsoft.library.domain;

import lombok.Data;

import javax.persistence.*;
import java.sql.Date;

@Data
@Entity
public class IssuedBooks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "persona_id")
    private Persona persona;
    @ManyToOne
    @JoinColumn(name = "book_id_in_stock")
    private BookInStock bookInStock;
    private Date timeOfIssue;
    @ManyToOne
    @JoinColumn(name = "type_issue_id")
    private TypeOfIssue typeOfIssue;
    private Date returnTime;
}
