package com.homecooked.backend.controllers;

import com.homecooked.backend.model.Meal;
import com.homecooked.backend.repositories.MealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/meals")

public class MealController {

    @Autowired
    private MealRepository mealRepository;

    @PostMapping
    public Meal createMeal(@RequestBody Meal meal) {
        return mealRepository.save(meal);
    }

    @GetMapping
    public List<Meal> getAllMeals() {
        return mealRepository.findAll();
    }
}