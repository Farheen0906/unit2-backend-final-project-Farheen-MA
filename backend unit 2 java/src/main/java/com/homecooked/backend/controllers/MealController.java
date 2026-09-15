package com.homecooked.backend.controllers;

import com.homecooked.backend.model.Meal;
import com.homecooked.backend.repositories.MealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/meals")
@CrossOrigin(origins = "http://localhost:5173")
public class MealController {

    @Autowired
    private MealRepository mealRepository;

    // Handles: POST http://localhost:8080/api/meals
    // Takes the JSON sent by the frontend and saves it as a new Meal.
    @PostMapping
    public Meal createMeal(@RequestBody Meal meal) {
        return mealRepository.save(meal);
    }
    // Handles: GET http://localhost:8080/api/meals
    // Returns every meal currently saved in the database.
    @GetMapping
    public List<Meal> getAllMeals() {
        return mealRepository.findAll();
    }

    // Handles: GET http://localhost:8080/api/meals/3
    // Returns one specific meal by its id.
    @GetMapping("/{id}")
    public Meal getMealById(@PathVariable int id) {
        Optional<Meal> result = mealRepository.findById(id);

        if (result.isPresent()) {
            return result.get();
        } else {
            return null;
        }
    }

    // Handles UPDATE: PUT http://localhost:8080/api/meals/3
    // Takes the id from the URL and the new data from the request body,
    // then saves it. save() updates the row if the id already exists.
    @PutMapping("/{id}")
    public Meal updateMeal(@PathVariable int id, @RequestBody Meal updatedMeal) {
        updatedMeal.setId(id);
        return mealRepository.save(updatedMeal);
    }

    // Handles: DELETE http://localhost:8080/api/meals/3
    // Removes the meal with that id from the database.
    @DeleteMapping("/{id}")
    public void deleteMeal(@PathVariable int id) {
        mealRepository.deleteById(id);
    }
}