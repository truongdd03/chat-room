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

import java.util.*;

@Controller
public class ChatController {
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    private final ArrayList<User> users = new ArrayList<>();
    private final HashMap<String, Group> groups = new HashMap<>() {{
        put("public", new Group("public", "Public", new HashSet<>()));
    }};

    /**
     * Register a user
     * @param user The user to register
     */
    @PostMapping("/register")
    public ResponseEntity<String> RegisterUser(@RequestBody User user) {
        System.out.println(groups.toString());
        if (users.contains(user)) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("There is already an user with this username in the chat.");
        }
        users.add(user);
        groups.get("public").AddMember(user);
        return ResponseEntity.ok().build();
    }

    /**
     * Remove a user
     * @param user The user to remove
     */
    @PostMapping("/unregister")
    public ResponseEntity<String> UnregisterUser(@RequestBody User user) {
        users.remove(user);
        RemoveUserFromGroups(user);
        return ResponseEntity.ok().build();
    }

    /**
     * Add a new group
     * @param group The group to add
     */
    @PostMapping("/new_group")
    public ResponseEntity<String> CreateGroup(@RequestBody Group group) {
        String id = UUID.randomUUID().toString();
        group.setId(id);
        groups.put(id, group);
        return ResponseEntity.ok().build();
    }

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
     * Get all groups that a user is in
     * @return All groups of a user
     */
    @RequestMapping("/get_groups/user")
    @ResponseBody
    public ArrayList<Group> GetGroupsOfUser(@RequestBody User user) {
        ArrayList<Group> result = new ArrayList<>();
        groups.forEach((key, group) -> {
            if (group.ContainsUser(user)) {
                result.add(group);
            }
        });
        return result;
    }

    /**
     * Given a group id return the group
     * @return The group associated with the id
     */
    @RequestMapping("/get_group")
    @ResponseBody
    public Group GetGroupById(@RequestBody String id) {
        return groups.get(id);
    }

    /**
     * Function to handle a public message sent
     * @param message The message sent
     */
    @MessageMapping("/message")
    @SendTo("/chatroom/public")
    public Message ReceivePublicMessage(@Payload Message message) {
        return message;
    }

    /**
     * Function to handle a private message sent
     * @param message The message sent
     */
    @MessageMapping("/private-message")
    public Message ReceivePrivateMessage(@Payload Message message) {
        try {
            Group group = groups.get(message.getReceiverId());
            group.SendMessageToMembers(simpMessagingTemplate, message);
            return message;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Remove a specific user from all groups
     * @param user The user to remove
     */
    private void RemoveUserFromGroups(User user) {
        groups.forEach((key, group) -> group.RemoveMember(user));
    }

}
