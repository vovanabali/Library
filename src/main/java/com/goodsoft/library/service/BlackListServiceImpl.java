package com.goodsoft.library.service;

import com.goodsoft.library.dao.BlackListRepository;
import com.goodsoft.library.domain.BlackList;
import com.goodsoft.library.domain.Persona;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class BlackListServiceImpl implements BlackListService {
    private final BlackListRepository blackListRepository;

    @Autowired
    public BlackListServiceImpl(BlackListRepository blackListRepository) {
        this.blackListRepository = blackListRepository;
    }

    @Override
    public List<BlackList> getAllBlackList() {
        try {
            return (List<BlackList>) blackListRepository.findAll();
        } catch (Exception ex) {
            log.error("Failed load all black list", ex.fillInStackTrace());
            return new ArrayList<>();
        }
    }

    @Override
    public BlackList getBlackListByUser(Persona persona) {
        try {
            return blackListRepository.findByPersona(persona);
        } catch (Exception ex) {
            log.error("Failed finde from black list by user", ex.fillInStackTrace());
            return new BlackList();
        }
    }

    @Override
    public void deleteByUser(Persona persona) {
        try {
            blackListRepository.deleteByPersona(persona);
        } catch (Exception ex) {
            log.error("Failed delete persona", ex.fillInStackTrace());
        }
    }

    @Override
    public void deleteById(long id) {
        try {
            blackListRepository.deleteById(id);
        } catch (Exception ex) {
            log.error("Failed delete persona by id", ex.fillInStackTrace());
        }
    }

    @Override
    public void saveBlackList(BlackList blackList) {
        try {
            blackListRepository.save(blackList);
        } catch (Exception ex) {
            log.error("Failed save to black list", ex.fillInStackTrace());
        }
    }
}
