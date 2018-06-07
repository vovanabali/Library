package com.goodsoft.library.domain;

import lombok.Data;
import org.hibernate.exception.DataException;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.sql.Date;

@Entity
@Data
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotEmpty
    private String name;
    @ManyToOne
    @JoinColumn(name = "author_id")
    @NotNull
    private Author author;
    private String description;
    @ManyToOne
    @JoinColumn(name = "genre_id")
    @NotNull
    private Genre genre;
    @NotNull
    private Date releaseDate;

    private Long pictureId;
}
