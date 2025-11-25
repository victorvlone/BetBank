package com.betbank.betbank.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "matches")
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne 
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "home", length = 100, nullable = false)
    private String home;

    @Column(name = "away", length = 100, nullable = false)
    private String away;

    @Column(name = "homeWin", nullable = false)
    private Integer homeWin;

    @Column(name = "over15", nullable = false)
    private Integer over15;

    @Column(name = "over25", nullable = false)
    private Integer over25;

    @Column(name = "over05Ht", nullable = false)
    private Integer over05Ht;

    @Column(name = "btts", nullable = false)
    private Integer btts;

    @Enumerated(EnumType.STRING)
    @Column(name = "result")
    private Result result;

}
