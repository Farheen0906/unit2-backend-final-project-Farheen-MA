package com.homecooked.backend.controllers;

import com.homecooked.backend.model.User;
import com.homecooked.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// @RestController tells Spring: this class handles web requests and sends back JSON, not HTML pages.
@RestController
// Every endpoint in this class starts with /api/users
@RequestMapping("/api/users")


public class UserController {

    // @Autowired tells Spring: give me a ready-to-use UserRepository
    @Autowired
    private UserRepository userRepository;

    // Handles: POST http://localhost:8080/api/users
    // Takes the JSON sent by the frontend and saves it as a new User.
    @PostMapping
    public User createUser(@RequestBody User user) {
        User savedUser = userRepository.save(user);
        return savedUser;
    }

    // Handles: GET http://localhost:8080/api/users
    // Returns every user currently saved in the database.
    @GetMapping
    public List<User> getAllUsers() {
        List<User> allUsers = userRepository.findAll();
        return allUsers;
    }

    // Handles: GET http://localhost:8080/api/users/3
    // Returns one specific user by their id.
    @GetMapping("/{id}")
    public User getUserById(@PathVariable int id) {
        Optional<User> result = userRepository.findById(id);

        if (result.isPresent()) {
            return result.get();
        } else {
            return null;
        }
    }
}

