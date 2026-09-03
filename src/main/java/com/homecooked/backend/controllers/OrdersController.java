package com.homecooked.backend.controllers;

import com.homecooked.backend.model.Orders;
import com.homecooked.backend.repositories.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")

public class OrdersController {

    @Autowired
    private OrdersRepository ordersRepository;

    @PostMapping
    public Orders createOrder(@RequestBody Orders order) {
        return ordersRepository.save(order);
    }

    @GetMapping
    public List<Orders> getAllOrders() {
        return ordersRepository.findAll();
    }

}