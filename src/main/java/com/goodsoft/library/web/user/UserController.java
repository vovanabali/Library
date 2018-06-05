package com.goodsoft.library.web.user;

import com.goodsoft.library.dto.UserProfileDTO;
import com.goodsoft.library.service.PersonaService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping
@RequiredArgsConstructor
public class UserController {
    private final PersonaService personaService;

    @GetMapping("/profile")
    private UserProfileDTO userProfileDTO() {
        return personaService.getUserProfile(SecurityContextHolder.getContext().getAuthentication().getName());
    }
}
