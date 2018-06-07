package com.goodsoft.library.web;

import com.goodsoft.library.domain.Book;
import com.goodsoft.library.domain.Resources;
import com.goodsoft.library.service.BookService;
import com.goodsoft.library.service.ResourcesService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/server_resources/")
public class ResourcesController {

    private final ResourcesService resourcesService;
    private final BookService bookService;

    @GetMapping(value = "/image/{id}", produces = IMAGE_JPEG_VALUE)
    public byte[] getImmage(@PathVariable String id) {
        return resourcesService.read(Long.parseLong(id)).getSources();
    }

    @PostMapping("loadBookPicture")
    public boolean load(@RequestParam("demo") MultipartFile file, @RequestParam("bookId") Long bookId) throws IOException {
        Resources resources = new Resources();
        resources.setFileName(file.getName());
        resources.setSources(file.getBytes());
        resourcesService.save(resources);
        Book book = bookService.getById(bookId);
        book.setPictureId(resources.getId());
        bookService.updateBook(book);
        return false;
    }
}
