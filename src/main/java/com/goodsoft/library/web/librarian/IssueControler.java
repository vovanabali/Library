package com.goodsoft.library.web.librarian;

import com.goodsoft.library.domain.Book;
import com.goodsoft.library.domain.BookInStock;
import com.goodsoft.library.domain.IssuedBooks;
import com.goodsoft.library.dto.ExtraditionDTO;
import com.goodsoft.library.service.BookInStockService;
import com.goodsoft.library.service.IssuedBooksService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/librarian/json/")
public class IssueControler {
    private final IssuedBooksService issuedBooksService;
    private final BookInStockService bookInStockService;

    @PostMapping("issue")
    public List<BookInStock> issuedBooks(@RequestBody ExtraditionDTO extraditionDTO) throws Exception {
        return issuedBooksService.issuedBooks(extraditionDTO);
    }

    @PostMapping("checkIssuedBooks")
    public List<BookInStock> checkIssuedBooks(@RequestBody ExtraditionDTO extraditionDTO) throws Exception {
        return bookInStockService.getAllBooks(extraditionDTO.getBooks());
    }

    @GetMapping("available_books_in_stock")
    public List<Book> getAvailabelBooks(Pageable pageable, @RequestParam("name") String name) {
        return bookInStockService.getAvailabelBooks(pageable, name);
    }

    @GetMapping("available_books_in_stock_count")
    public Long getAvailabelBooksCount(String name) {
        return bookInStockService.getAvailabelCount(name);
    }

}
