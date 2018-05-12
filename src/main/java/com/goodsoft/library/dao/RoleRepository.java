package com.goodsoft.library.dao;

import com.goodsoft.library.domain.Role;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends PagingAndSortingRepository<Role, Long> {
    Role findById(long id);

    Role findByName(String name);
}
