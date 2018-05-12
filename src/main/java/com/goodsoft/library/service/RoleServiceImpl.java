package com.goodsoft.library.service;

import com.goodsoft.library.dao.RoleRepository;
import com.goodsoft.library.domain.Role;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public List<Role> all() {
        try {
            return (List<Role>) roleRepository.findAll();
        } catch (Exception ex) {
            log.error("Failed to load all roles", ex);
            return new ArrayList<>();
        }
    }

    @Override
    public Role getById(long id) {
        try {
            return roleRepository.findById(id);
        } catch (Exception ex) {
            log.error("Failed to load role by id", ex);
            return null;
        }
    }

    @Override
    public Role getByName(String name) {
        try {
            return roleRepository.findByName(name);
        } catch (Exception ex) {
            log.error("Failed load role by name", ex);
            return null;
        }
    }

    @Override
    public Role save(Role role) {
        try {
            return roleRepository.save(role);
        } catch (Exception ex) {
            log.error("Failed to save role", ex);
            return role;
        }
    }

    @Override
    public void delete(Role role) {
        try {
            roleRepository.delete(role);
        } catch (Exception ex) {
            log.error("Failed to delete role", ex);
        }
    }

    @Override
    public void deleteById(long id) {
        try {
            roleRepository.deleteById(id);
        } catch (Exception ex) {
            log.error("Failed to delete role by id", ex);
        }
    }
}
