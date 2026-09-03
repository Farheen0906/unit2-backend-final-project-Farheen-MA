package com.homecooked.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "app_user") // using Table annotation to rename the table ,as user is a reserved keyword in MYSQL
public class User {

    @Id
    @GeneratedValue
    private int id;

    private String username;
    private String password;
    private String profile;
    private String role;

    public User() {}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getProfile() {
        return profile;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}