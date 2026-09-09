package com.homecooked.backend.controllers;


import com.homecooked.backend.model.ContactRequest;
import com.homecooked.backend.repositories.ContactRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/contact")

public class ContactRequestController {

    @Autowired
    private ContactRequestRepository contactRequestRepository;

    @PostMapping
    public ContactRequest createContactRequest(@RequestBody ContactRequest contactRequest) {
        return contactRequestRepository.save(contactRequest);
    }
    @GetMapping
    public List<ContactRequest> getAllContactRequests() {
        return contactRequestRepository.findAll();
    }
    @GetMapping("/{id}")
    public ContactRequest getContactRequestById(@PathVariable int id) {
        Optional<ContactRequest> result = contactRequestRepository.findById(id);
        return result.isPresent() ? result.get() : null;
    }
    @PutMapping("/{id}")
    public ContactRequest updateContactRequest(@PathVariable int id, @RequestBody ContactRequest updated) {
        updated.setId(id);
        return contactRequestRepository.save(updated);
    }
}