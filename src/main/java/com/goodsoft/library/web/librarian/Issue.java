package com.goodsoft.library.web.librarian;

import com.goodsoft.library.domain.BookInStock;
import com.goodsoft.library.domain.IssuedBooks;
import com.goodsoft.library.dto.ExtraditionDTO;
import com.goodsoft.library.service.BookInStockService;
import com.goodsoft.library.service.IssuedBooksService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/librarian/json/")
public class Issue {
    private final IssuedBooksService issuedBooksService;
    private final BookInStockService bookInStockService;

    @PostMapping("issue")
    public List<IssuedBooks> issuedBooks(@RequestBody ExtraditionDTO extraditionDTO) {
        return null;
    }

    @PostMapping("checkIssuedBooks")
    public List<BookInStock> checkIssuedBooks(@RequestBody ExtraditionDTO extraditionDTO) throws Exception {
      return bookInStockService.getAllBooks(extraditionDTO.getBooks());
    }
}
