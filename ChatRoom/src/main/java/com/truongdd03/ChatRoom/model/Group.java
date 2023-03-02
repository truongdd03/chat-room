package com.truongdd03.ChatRoom.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.ArrayList;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Group {
    private String id;
    private ArrayList<User> members;

    /**
     * Add a member to this group
     * @param user The user to add
     */
    public void AddMember(User user) {
        members.add(user);
    }

    /**
     * Return true if the group has a specific id.
     * @param groupId The group's id to compare
     * @return boolean
     */
    public boolean isGroup(String groupId) {
        return id == groupId;
    }

    /**
     * Send message to all members
     * @param simpMessagingTemplate The object providing a method to send message
     * @param message The message to send
     */
    public void sendMessageToMembers(SimpMessagingTemplate simpMessagingTemplate, Message message) {
        for (User user : members) {
            simpMessagingTemplate.convertAndSendToUser(user.getUsername(), "/private", message);
        }
    }
}
