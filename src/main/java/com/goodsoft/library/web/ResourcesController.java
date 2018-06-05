package com.goodsoft.library.web;

import com.goodsoft.library.domain.Resources;
import com.goodsoft.library.service.ResourcesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/server_resources/")
public class ResourcesController {

    private final ResourcesService resourcesService;

    @GetMapping(value = "/image/{id}", produces = IMAGE_JPEG_VALUE)
    public byte[] getImmage(@PathVariable String id) {
        return resourcesService.read(Long.parseLong(id)).getSources();
    }

    @PostMapping("load")
    public boolean load(@RequestParam("demo") MultipartFile file) throws IOException {
        Resources resources = new Resources();
        resources.setFileName(file.getName());
        resources.setSources(file.getBytes());
        resourcesService.save(resources);
        return false;
    }
}
