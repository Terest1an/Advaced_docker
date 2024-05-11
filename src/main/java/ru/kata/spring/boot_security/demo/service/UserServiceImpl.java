package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repositories.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private RoleService roleService;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, RoleService roleService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleService = roleService;
    }


    // Сохранить пользователя
    @Transactional
    @Override
    public void saveUser(User user) {
        user.setRoles(user.getRoles().stream()
                .map(role -> roleService.findRoleByRole(role.getRole()))
                .collect(Collectors.toSet()));
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }


    // Удалить пользователя по ID
    @Transactional
    @Override
    public void removeUserById(long id) {
        if (userRepository.findById(id).isPresent()) {
            userRepository.deleteById(id);
        }
    }

    // Получить список всех пользователей из БД
    @Transactional
    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Редактирование пользователя
    @Transactional
    @Override
    public void editUser(User user) {
        User existingUser = getUser(user.getId());
        if (user.getPassword() != null && user.getPassword().isEmpty()) {
            user.setPassword(existingUser.getPassword());
        } else {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }

        user.setRoles(user.getRoles().stream()
                .map(role -> roleService.findRoleByRole(role.getRole()))
                .collect(Collectors.toSet()));

        userRepository.save(user);

    }

    // Получение пользователя по ID

    @Override
    public User getUser(long id) {
        return userRepository.findById(id).get();
    }

    // Получение пользователя по имени
    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }


}