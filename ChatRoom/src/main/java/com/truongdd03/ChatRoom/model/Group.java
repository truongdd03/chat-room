package com.truongdd03.ChatRoom.model;

import lombok.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.Date;
import java.util.HashSet;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Group {
    private String id;
    private String name;
    private HashSet<User> members;

    private String GetCurrentTime() {
        Date date = new Date();
        return date.toString();
    }

    /**
     * Add a member to this group
     * @param user The user to add
     */
    public void AddMember(SimpMessagingTemplate simpMessagingTemplate, User user) {
        members.add(user);
        Message joinMsg = new Message(user.getUsername(), id, "", GetCurrentTime(), Status.JOIN);
        SendMessageToMembers(simpMessagingTemplate, joinMsg);
    }

    /**
     * Remove a user from members
     * @param user The user to remove
     */
    public void RemoveMember(SimpMessagingTemplate simpMessagingTemplate,User user) {
        members.remove(user);
        Message joinMsg = new Message(user.getUsername(), id, "", GetCurrentTime(), Status.LEAVE);
        SendMessageToMembers(simpMessagingTemplate, joinMsg);
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
