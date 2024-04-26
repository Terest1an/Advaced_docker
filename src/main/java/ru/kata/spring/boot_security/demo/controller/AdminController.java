package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;

@Controller
@RequestMapping("/admin")
public class AdminController {
    private UserService userService;
    private RoleService roleService;

    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    // Показать всех пользователей Из БД
    @GetMapping()
    public String showAllUsers(Principal principal, Model model) {
        model.addAttribute("user", new User());
        model.addAttribute("admin", userService.getAllUsers());
        model.addAttribute("roles", roleService.findAll());
        model.addAttribute("thisUser", userService.findByUsername(principal.getName()).get());
        return "admin";
    }

    // Сохранение нового пользователя
    @PostMapping()
    public String save(@ModelAttribute("user") User user) {
        userService.saveUser(user);
        return "redirect:/admin";
    }

    @PatchMapping(value = "/{id}")
    public String update(@PathVariable("id") long id, @ModelAttribute("user") User user) {
        userService.editUser(id, user);
        return "redirect:/admin";
    }


    // Удалить пользователя
    @DeleteMapping(value = "/{id}")
    public String delete(@PathVariable("id") long id) {
        userService.removeUserById(id);
        return "redirect:/admin";
    }


}
