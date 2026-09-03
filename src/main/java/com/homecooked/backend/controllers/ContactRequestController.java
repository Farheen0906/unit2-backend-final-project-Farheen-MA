package com.homecooked.backend.controllers;


import com.homecooked.backend.model.ContactRequest;
import com.homecooked.backend.repositories.ContactRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/contact")

public class ContactRequestController {

    @Autowired
    private ContactRequestRepository contactRequestRepository;

    @PostMapping
    public ContactRequest createContactRequest(@RequestBody ContactRequest contactRequest) {
        return contactRequestRepository.save(contactRequest);
    }

}