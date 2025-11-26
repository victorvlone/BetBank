package com.betbank.betbank.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.betbank.betbank.DTO.UserDTO;
import com.betbank.betbank.Entities.User;
import com.betbank.betbank.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UserService {
     @Autowired
    private UserRepository userRepository;

    public User newUser(UserDTO dto) {
        User user = new User();
        user.setName(dto.name());
        user.setEmail(dto.email());
        user.setPassword(dto.password());

        return userRepository.save(user);
    }

    public void deleteUser(Long id) {

        if (!userRepository.existsById(id)) {
            throw new EntityNotFoundException("Usuário não encontrado");
        }
        userRepository.deleteById(id);
    }
}
