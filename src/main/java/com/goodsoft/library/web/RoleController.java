package com.goodsoft.library.web;

import com.goodsoft.library.domain.Role;
import com.goodsoft.library.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class RoleController {
    private final RoleService roleService;

    @GetMapping("roles")
    public List<Role> getAllRoles() {
        return roleService.all();
    }

    @GetMapping("role")
    public Role getRoleById(@RequestParam("id") long id) {
        return roleService.getById(id);
    }
}
