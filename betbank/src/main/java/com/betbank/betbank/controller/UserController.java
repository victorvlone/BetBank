package com.betbank.betbank.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.betbank.betbank.DTO.UserDTO;
import com.betbank.betbank.service.UserService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/newUser")
    public ResponseEntity<?> newUser(@RequestBody UserDTO dto) {
        try {
            var savedUser = userService.newUser(dto);
            return ResponseEntity.ok().body(savedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao criar usuario: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
        public ResponseEntity<?> deleteMatch(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao deletar usuario: " + e.getMessage());
        }
    }
    
}
