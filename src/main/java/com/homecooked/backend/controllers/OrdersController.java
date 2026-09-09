package com.homecooked.backend.controllers;

import com.homecooked.backend.model.Orders;
import com.homecooked.backend.repositories.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


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
    @GetMapping("/{id}")
    public Orders getOrderById(@PathVariable int id) {
        Optional<Orders> result = ordersRepository.findById(id);
        return result.isPresent() ? result.get() : null;
    }
    @PutMapping("/{id}")
    public Orders updateOrder(@PathVariable int id, @RequestBody Orders updatedOrder) {
        updatedOrder.setId(id);
        return ordersRepository.save(updatedOrder);
    }
    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable int id) {
        ordersRepository.deleteById(id);
    }
}