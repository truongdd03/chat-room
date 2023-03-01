package com.truongdd03.ChatRoom.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class UserController {
    private ArrayList<String> users = new ArrayList<>();

    @CrossOrigin
    @PostMapping("/register")
    public ResponseEntity RegisterUser(@RequestParam("username") String username) {
        if (users.contains(username)) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("There is already an user with this username in the chat.");
        }
        users.add(username);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin
    @RequestMapping("/users")
    @ResponseBody
    public ArrayList<String> GetUsers() {
        return users;
    }
}
