package com.goodsoft.library.web;

import com.goodsoft.library.domain.IssuedBooks;
import com.goodsoft.library.domain.Rezervation;
import com.goodsoft.library.service.IssuedBooksService;
import com.goodsoft.library.service.PersonaService;
import com.goodsoft.library.service.RezervationService;
import com.goodsoft.library.service.TypeOfIssueService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Controller
@RequestMapping("/rezervation/")
public class RezervationController {
    private final RezervationService rezervationService;
    private final IssuedBooksService issuedBooksService;
    private final TypeOfIssueService ofIssueService;
    private final PersonaService personaService;

    @GetMapping("list")
    public List<Rezervation> getList() {
        return rezervationService.findAll();
    }

    @GetMapping("delete")
    public boolean delete(Long id) {
        try {
            rezervationService.deleteRezervation(id);
            return true;
        } catch (final Exception ex) {
            return false;
        }
    }

    @GetMapping("issue_rezrv")
    public List<IssuedBooks> issueRezervBook(Long id) {
        Rezervation rezervation = rezervationService.read(id);
        IssuedBooks issuedBooks = new IssuedBooks();
        issuedBooks.setPersona(rezervation.getPersona());
        issuedBooks.setTypeOfIssue(ofIssueService.all().get(0));
        issuedBooks.setIssueUpTo(Date.valueOf(LocalDate.now().plusMonths(1)));
        issuedBooks.setTimeOfIssue(LocalDateTime.now());
        issuedBooks.setBookInStock(rezervation.getBookInStock());
        issuedBooksService.save(issuedBooks);
        rezervationService.deleteRezervation(id);
        return Collections.singletonList(issuedBooks);
    }
}
