package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.exception.NoSuchUserException;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
public class RestControll {
    private UserService userService;

    @Autowired
    public RestControll(UserService userService) {
        this.userService = userService;
    }
    @GetMapping("/admin/{id}")
    public ResponseEntity<User> getUser(@PathVariable long id) {
        User user = userService.getUser(id);
        if (user == null) {
            throw new NoSuchUserException("There is no user in DB with ID: " + id);
        }
        return ResponseEntity.ok(user);
    }

    @PutMapping("/admin/update")
    public ResponseEntity<User> editUser(@RequestBody User user) {
        userService.editUser(user);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/admin")
    public ResponseEntity<User> saveNewUser(@RequestBody User user) {
        userService.saveUser(user);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/user")
    public ResponseEntity<User> showUser(Principal principal) {
        return ResponseEntity.ok(userService.findByUsername(principal.getName()).orElse(null));
    }

    @GetMapping("/admin")
    public ResponseEntity<List<User>> showAllUser() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }






}
