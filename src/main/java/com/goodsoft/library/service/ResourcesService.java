package com.goodsoft.library.service;

import com.goodsoft.library.domain.Resources;

public interface ResourcesService {

    Resources read(Long id);

    void save(Resources resources);
}
