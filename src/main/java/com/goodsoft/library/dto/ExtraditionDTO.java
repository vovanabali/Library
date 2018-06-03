package com.goodsoft.library.dto;

import com.goodsoft.library.domain.Book;
import com.goodsoft.library.domain.Persona;
import com.goodsoft.library.domain.TypeOfIssue;
import lombok.Data;

import java.util.List;

@Data
public class ExtraditionDTO {
    private Persona user;
    private List<Book> books;
    private TypeOfIssue typeOfIssue;
}
