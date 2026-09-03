package com.homecooked.backend.repository;

import com.homecooked.backend.model.Meal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MealRepository extends JpaRepository<Meal, Integer> {
}