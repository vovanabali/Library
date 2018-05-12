package com.goodsoft.library.dao;

import com.goodsoft.library.domain.TypeOfIssue;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeOfIssueRepository extends PagingAndSortingRepository<TypeOfIssue, Long> {
    TypeOfIssue findById(long id);

    TypeOfIssue findByName(String name);

    boolean existsByName(String name);
}
