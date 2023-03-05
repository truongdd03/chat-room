package com.truongdd03.ChatRoom.model;

import lombok.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Objects;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Group {
    private String id;
    private String name;
    private HashSet<User> members;

    /**
     * Add a member to this group
     * @param user The user to add
     */
    public void AddMember(User user) {
        members.add(user);
    }

    /**
     * Remove a user from members
     * @param user The user to remove
     */
    public void RemoveMember(User user) {
        members.remove(user);
    }

    /**
     * Returns true if a user is an member of this group
     * @param user The user to check
     * @return boolean
     */
    public boolean ContainsUser(User user) {
        return members.contains(user);
    }

    /**
     * Send message to all members
     * @param simpMessagingTemplate The object providing a method to send message
     * @param message The message to send
     */
    public void SendMessageToMembers(SimpMessagingTemplate simpMessagingTemplate, Message message) {
        for (User user : members) {
            simpMessagingTemplate.convertAndSendToUser(user.getUsername(), "/private", message);
        }
    }

}
