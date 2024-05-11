package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    void saveUser(User user);

    List<User> getAllUsers();

    User getUser(long id);

    void editUser(User user);

    void removeUserById(long id);
    Optional<User> findByUsername(String username);


}
