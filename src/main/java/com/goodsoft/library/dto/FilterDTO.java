package com.goodsoft.library.dto;

import com.goodsoft.library.domain.Author;
import com.goodsoft.library.domain.Genre;
import lombok.Data;

import java.sql.Date;
import java.util.List;

@Data
public class FilterDTO {
    private List<Author> authors;
    private List<Genre> genres;
    private boolean haveOnSclade;
    private Date startDate;
    private Date endDate;
}
