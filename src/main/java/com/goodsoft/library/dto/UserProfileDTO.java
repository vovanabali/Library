package com.goodsoft.library.dto;

import com.goodsoft.library.domain.IssuedBooks;
import com.goodsoft.library.domain.Persona;
import com.goodsoft.library.domain.Rezervation;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class UserProfileDTO {
    private Persona persona;
    private List<IssuedBooks> issuedBooks;
    private List<Rezervation> rezervationBooks;
}
