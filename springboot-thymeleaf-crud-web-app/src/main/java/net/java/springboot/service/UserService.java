package net.java.springboot.service;

import java.util.List;

import net.java.springboot.model.User;

public interface UserService {
    List<User> getAllUsers();
    
    void saveUser(User user);
    
    User getUserById(long id);
    void deleteUserById(long id);
}