package com.goodsoft.library.web.admin;

import com.goodsoft.library.domain.TypeOfIssue;
import com.goodsoft.library.domain.TypeOfIssue;
import com.goodsoft.library.service.TypeOfIssueService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/admin/json")
@RequiredArgsConstructor
public class TypeOffIssuedAdminController {
    private final TypeOfIssueService ofIssueService;

    @GetMapping("typeOfIssueSlice")
    private List<TypeOfIssue> persons(Pageable pageable) {
        return ofIssueService.slice(pageable);
    }

    @PostMapping("addTypeOfIssue")
    private boolean addTypeOfIssue(@RequestBody @Valid TypeOfIssue typeOfIssue, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return false;
        } else {
            return ofIssueService.addTypeOfIssue(typeOfIssue) != null;
        }
    }

    @PostMapping("updateTypeOfIssue")
    private boolean updateTypeOfIssue(@RequestBody @Valid TypeOfIssue typeOfIssue, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return false;
        } else {
            return ofIssueService.updateTypeOfIssue(typeOfIssue) != null;
        }
    }

    @GetMapping("deleteTypeOfIssue")
    private boolean deleteTypeOfIssue(long id) {
        ofIssueService.deleteById(id);
        return true;
    }

    @GetMapping("countTypeOfIssued")
    private long countTypeOfIssued() {
        return ofIssueService.getCount();
    }
}
