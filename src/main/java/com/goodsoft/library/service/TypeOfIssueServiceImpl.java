package com.goodsoft.library.service;

import com.goodsoft.library.dao.TypeOfIssueRepository;
import com.goodsoft.library.domain.TypeOfIssue;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class TypeOfIssueServiceImpl implements TypeOfIssueService {
    private final TypeOfIssueRepository typeOfIssueRepository;

    @Autowired
    public TypeOfIssueServiceImpl(TypeOfIssueRepository typeOfIssueRepository) {
        this.typeOfIssueRepository = typeOfIssueRepository;
    }

    @Override
    public List<TypeOfIssue> all() {
        try {
            return (List<TypeOfIssue>) typeOfIssueRepository.findAll();
        } catch (Exception ex) {
            log.error("Failed to get all type of issue", ex);
            return new ArrayList<>();
        }
    }

    @Override
    public TypeOfIssue getById(long id) {
        try {
            return typeOfIssueRepository.findById(id);
        } catch (Exception ex) {
            log.error("Failed to get type of issue by id", ex);
            return null;
        }
    }

    @Override
    public TypeOfIssue getByName(String name) {
        try {
            return typeOfIssueRepository.findByName(name);
        } catch (Exception ex) {
            log.error("Failed to get type of issue by name", ex);
            return null;
        }
    }

    @Override
    public void delete(TypeOfIssue typeOfIssue) {
        try {
            typeOfIssueRepository.delete(typeOfIssue);
        } catch (Exception ex) {
            log.error("Failed to delete type of issue", ex);
        }
    }

    @Override
    public void deleteById(long id) {
        try {
            typeOfIssueRepository.deleteById(id);
        } catch (Exception ex) {
            log.error("Failed to delete type of issue by id", ex);
        }
    }

    @Override
    public List<TypeOfIssue> slice(Pageable pageable) {
        try {
            return typeOfIssueRepository.findAll(pageable).getContent();
        } catch (Exception ex) {
            log.error("Failed to load slice from issued books", ex.fillInStackTrace());
            return new ArrayList<>();
        }
    }

    @Override
    public TypeOfIssue addTypeOfIssue(TypeOfIssue typeOfIssue) {
        try {
            if (typeOfIssueRepository.existsByName(typeOfIssue.getName())) return null;
            else return typeOfIssueRepository.save(typeOfIssue);
        } catch (Exception ex) {
            log.error("Failed to add new issued book", ex.fillInStackTrace());
            return null;
        }
    }

    @Override
    public TypeOfIssue updateTypeOfIssue(TypeOfIssue typeOfIssue) {
        try {
            if (typeOfIssueRepository.existsByName(typeOfIssue.getName())) return null;
            else return typeOfIssueRepository.save(typeOfIssue);
        } catch (Exception ex) {
            log.error("Failed to update new issued book", ex.fillInStackTrace());
            return null;
        }
    }

    @Override
    public long getCount() {
        try {
            return typeOfIssueRepository.count();
        } catch (Exception ex) {
            log.error("Failed to get count type of issued", ex.fillInStackTrace());
            return 0;
        }
    }
}
