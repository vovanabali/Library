package com.goodsoft.library.service;

import com.goodsoft.library.domain.BlackList;
import com.goodsoft.library.domain.Persona;
import org.apache.catalina.User;

import java.util.List;

public interface BlackListService {
    List<BlackList> getAllBlackList();

    BlackList getBlackListByUser(Persona persona);

    BlackList getBlackListById(long id);

    void deleteByUser(Persona persona);

    void deleteById(long id);

    void saveBlackList(BlackList blackList);
}
