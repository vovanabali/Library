package com.goodsoft.library.service;

import com.goodsoft.library.dao.ResourcesRepository;
import com.goodsoft.library.domain.Resources;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ResourcesServiceImpl implements ResourcesService {

    private final ResourcesRepository resourcesRepository;

    @Override
    public Resources read(Long id) {
        return resourcesRepository.findById(id).get();
    }

    @Override
    public void save(Resources resources) {
        resourcesRepository.save(resources);
    }
}
