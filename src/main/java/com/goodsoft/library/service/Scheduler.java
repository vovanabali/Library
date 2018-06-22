package com.goodsoft.library.service;

import com.goodsoft.library.domain.Rezervation;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class Scheduler {
    private final RezervationService rezervationService;

    @Scheduled(fixedRate = 10000)
    public void checkRezerv() {
        List<Rezervation> oldRezervations = rezervationService.findAll()
                .stream()
                .filter(rezervation -> rezervation.getDateToRezerv().plusDays(1).isBefore(LocalDateTime.now()))
                .collect(Collectors.toList());
        if (!oldRezervations.isEmpty()) {
            rezervationService.deleteAll(oldRezervations);
        }
    }
}
