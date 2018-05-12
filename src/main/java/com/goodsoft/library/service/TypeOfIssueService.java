package com.goodsoft.library.service;

import com.goodsoft.library.domain.TypeOfIssue;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TypeOfIssueService {
    List<TypeOfIssue> all();

    List<TypeOfIssue> slice(Pageable pageable);

    TypeOfIssue getById(long id);

    TypeOfIssue getByName(String name);

    TypeOfIssue addTypeOfIssue(TypeOfIssue typeOfIssue);

    TypeOfIssue updateTypeOfIssue(TypeOfIssue typeOfIssue);

    void delete(TypeOfIssue typeOfIssue);

    void deleteById(long id);

    long getCount();
}
