package com.betbank.betbank.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.betbank.betbank.Entities.User;

public interface UserRepository extends JpaRepository<User, Long> {


}
