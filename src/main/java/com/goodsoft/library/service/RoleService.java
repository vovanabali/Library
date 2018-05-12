package com.goodsoft.library.service;

import com.goodsoft.library.domain.Role;

import java.util.List;

public interface RoleService {
    List<Role> all();

    Role getById(long id);

    Role getByName(String name);

    Role save(Role role);

    void delete(Role role);

    void deleteById(long id);
}
