package com.goodsoft.library.web;

import com.goodsoft.library.domain.TypeOfIssue;
import com.goodsoft.library.service.TypeOfIssueService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class TypeOffIssuedController {
    private final TypeOfIssueService ofIssueService;

    @GetMapping("typeOfIssues")
    private List<TypeOfIssue> persons() {
        return ofIssueService.all();
    }


    @GetMapping("typeOfIssue")
    private TypeOfIssue getTypeOfIssueById(long id) {
        return ofIssueService.getById(id);
    }
}
