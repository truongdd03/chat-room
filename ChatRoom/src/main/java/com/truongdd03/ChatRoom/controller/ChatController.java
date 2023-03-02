package com.truongdd03.ChatRoom.controller;

import com.truongdd03.ChatRoom.model.Group;
import com.truongdd03.ChatRoom.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.truongdd03.ChatRoom.model.Message;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Objects;

@Controller
public class ChatController {
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    private final ArrayList<User> users = new ArrayList<>();
    private final ArrayList<Group> groups = new ArrayList<>();

    /**
     * Register a user
     * @param user The user to register
     */
    @PostMapping("/register")
    public ResponseEntity<String> RegisterUser(@RequestBody User user) {
        System.out.println(user.getUsername());
        if (users.contains(user)) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("There is already an user with this username in the chat.");
        }
        users.add(user);
        return ResponseEntity.ok().build();
    }

    /**
     * Remove a user
     * @param user The user to remove
     */
    @PostMapping("/unregister")
    public ResponseEntity<String> UnregisterUser(@RequestBody User user) {
        users.remove(user);
        return ResponseEntity.ok().build();
    }

//    @PostMapping("/new_group")
//    public ResponseEntity<String>

    /**
     * Get all users
     * @return All users in the server
     */
    @RequestMapping("/users")
    @ResponseBody
    public ArrayList<User> GetUsers() {
        return users;
    }

    /**
     * Function to handle a public message sent
     * @param message The message sent
     */
    @MessageMapping("/message")
    @SendTo("/chatroom/public")
    public Message receivePublicMessage(@Payload Message message) {
        return message;
    }

    /**
     * Function to handle a private message sent
     * @param message The message sent
     */
    @MessageMapping("/private-message")
    public Message receivePrivatMessage(@Payload Message message) {
        try {
            Group group = getGroupById(message.getReceiverId());
            group.sendMessageToMembers(simpMessagingTemplate, message);
            return message;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private Group getGroupById(String id) throws Exception {
        for (Group group : groups) {
            if (group.isGroup(id)) {
                return group;
            }
        }

        throw new Exception("Group not found!");
    }

}
