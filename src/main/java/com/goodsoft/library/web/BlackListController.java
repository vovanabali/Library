package com.goodsoft.library.web;

import com.goodsoft.library.domain.BlackList;
import com.goodsoft.library.service.BlackListService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/black_list/")
@RequiredArgsConstructor
public class BlackListController {
    private final BlackListService blackListService;

    @GetMapping("blackList")
    public List<BlackList> getBlackListList() {
        return blackListService.getAllBlackList();
    }

    @GetMapping("blackListCount")
    public Long getBlackListCount() {
        return (long) blackListService.getAllBlackList().size();
    }

    @GetMapping("blackListById")
    public BlackList getBlackList(@RequestParam("id") Long id) {
        return blackListService.getBlackListById(id);
    }

    @GetMapping("deleteBlackList")
    public boolean deleteById(@RequestParam("id") Long id) {
        blackListService.deleteById(id);
        return true;
    }

    @PostMapping("saveBlackList")
    public BlackList saveBlackList(@RequestBody BlackList blackList) {
        blackListService.saveBlackList(blackList);
        return blackList;
    }
}
