package com.betbank.betbank.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.betbank.betbank.DTO.MatchDTO;
import com.betbank.betbank.Entities.Match;
import com.betbank.betbank.Entities.Result;
import com.betbank.betbank.repository.MatchRepository;

@Service
public class MatchService {

    @Autowired
    private MatchRepository matchRepository;

    public Match newMatch(MatchDTO dto) {
        Match match = new Match();
        match.setHome(dto.home());
        match.setAway(dto.away());
        match.setHomeWin(dto.homeWin());
        match.setOver15(dto.over15());
        match.setOver25(dto.over25());
        match.setOver05Ht(dto.over05Ht());
        match.setBtts(dto.btts());

        return matchRepository.save(match);
    }

    public List<Match> listMatch() {
        return matchRepository.findAll();
    }

    public Match saveResult(Long id, Result result) {

        Match match = matchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Match não encontrada"));

        match.setResult(result);
        return matchRepository.save(match);
    }

    public void deleteMatch(Long id) {

        if (!matchRepository.existsById(id)) {
            throw new RuntimeException("Match não encontrada");
        }
        matchRepository.deleteById(id);
    }
}
