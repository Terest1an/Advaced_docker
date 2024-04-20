//package ru.kata.spring.boot_security.demo.dao;
//
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Repository;
//import ru.kata.spring.boot_security.demo.model.User;
//
//
//import javax.persistence.EntityManager;
//import javax.persistence.PersistenceContext;
//import java.util.List;
//
//
//@Repository
///*если кратко, то аннотация repository является частным случаем component,
// поэтому не нужно использовать их вместе. Repository используется для классов ДАО
// */
//public class UserDaoImp implements UserDao {
//    @PersistenceContext
//    private EntityManager entityManager;
////    private PasswordEncoder passwordEncoder;
////
////    @Autowired
////    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
////        this.passwordEncoder = passwordEncoder;
////    }
//
//    @Override
//    public void add(User user) {
////        user.setPassword(passwordEncoder.encode((user.getPassword())));
//        entityManager.persist(user);
//    }
//
//
//    @Override
//    public List<User> getUsers() {
//        return entityManager.createQuery(
//                "SELECT u FROM User u", User.class).getResultList();
//    }
//
//    @Override
//    public User getUser(int id) {
//        return entityManager.find(User.class, id);
//    }
//
//    @Override
//    public void update(User user) {
//        entityManager.merge(user);
//    }
//
//    @Override
//    public void removeUserById(int id) {
//        entityManager.remove(entityManager.find(User.class, id));
//    }
//
//
//
//}
