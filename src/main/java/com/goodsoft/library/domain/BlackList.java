package com.goodsoft.library.domain;

import lombok.Data;

import javax.persistence.*;
import java.sql.Date;

@Data
@Entity
public class BlackList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn(name = "persona_id")
    private Persona persona;
    private Date dateOfEntry;
    private String reasonForMaking;
}
