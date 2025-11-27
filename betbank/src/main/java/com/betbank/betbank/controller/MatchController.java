package com.betbank.betbank.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.betbank.betbank.DTO.MatchDTO;
import com.betbank.betbank.Entities.Match;
import com.betbank.betbank.Entities.Result;
import com.betbank.betbank.service.MatchService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/matches")
public class MatchController {

    @Autowired
    private MatchService matchService;

    @PostMapping("/create")
    public ResponseEntity<?> newMatch(@RequestBody MatchDTO dto) {
        try {
            var savedMatch = matchService.newMatch(dto);
            return ResponseEntity.ok().body(savedMatch);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao salvar match: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> saveResult(@PathVariable Long id, @RequestBody Result result) {
        try {
            var savedResult = matchService.saveResult(id, result);
            return ResponseEntity.ok().body(savedResult);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao salvar resultado: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMatch(@PathVariable Long id) {
        try {
            matchService.deleteMatch(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao deletar match: " + e.getMessage());
        }
    }

    @GetMapping("/list")
    public ResponseEntity<?> listMatch() {
        try {
            List<Match> matches = matchService.listMatch();
            return ResponseEntity.ok(matches);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao listar matchs: " + e.getMessage());
        }
    }

}
