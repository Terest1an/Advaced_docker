package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;

import ru.kata.spring.boot_security.demo.service.RoleServiceImpl;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.security.Principal;

@Controller
@RequestMapping("/users")
public class UserController {
    private UserServiceImpl userService;
    private RoleServiceImpl roleService;

    @Autowired
    public UserController(UserServiceImpl userService, RoleServiceImpl roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    // Стартовая страница
    @GetMapping
    public String startPage() {
        return "startPage";
    }

    // Созадние нового пользователя
    @GetMapping(value = "/newUser")
    public String newUser(Model model) {
        model.addAttribute("user", new User());
        model.addAttribute("roles", roleService.findAll());
        return "newUser";
    }

    // Сохранение нового пользователя
    @PostMapping()
    public String save(@ModelAttribute("user") User user) {
        userService.saveUser(user);
        return "redirect:/users";
    }

    //  Principal запоминает данные пользователя после авторизации
    // Показываем данные авторизованного пользователя
    @GetMapping("/showUser")
    public String showUser(Principal principal, Model model) {
        User user = userService.findByUsername(principal.getName()).get();
        model.addAttribute("user", user);
        return "showUser";
    }


//    @GetMapping("/")
//    public String homePage(Principal principal) {
//        return "home";
//    }
//
//    @GetMapping("/authenticated")
//    public String pageForAuthenticatedUsers(Principal principal) {
//        User user = userService.findByUsername(principal.getName());
//        return "secured part of web service: " + user.getUsername() + " " + user.getEmail();
//    }
//
//    @GetMapping("/read_profile")
//    public String pageForReadProfile() {
//        return "read profile page";
//    }
//
//    @GetMapping("/only_for_admins")
//    public String pageOnlyForAdmins() {
//        return "admins page";
//    }
//
//
//    @GetMapping("/")
//    public String homePage() {
//        return "index";
//    }
//    @GetMapping("/index")
//    public String pageOnlyForAdmins() {
//        return "user";
//    }
}






