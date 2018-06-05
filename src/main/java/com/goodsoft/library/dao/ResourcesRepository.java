package com.goodsoft.library.dao;

import com.goodsoft.library.domain.Resources;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResourcesRepository extends PagingAndSortingRepository<Resources, Long> {
}
