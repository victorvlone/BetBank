package com.betbank.betbank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.betbank.betbank.Entities.Match;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {

}
