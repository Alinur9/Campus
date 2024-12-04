package com.bubt.campus3;

public class Notification {
    private String id;
    private String name;
    private String email;
    private String action;
    private int likes;
    private int comments;

    public Notification(String id, String name, String email, String action){
        this.id = id;
        this.name = name ;
        this.email = email;
        this.action = action;
    }

    public void setComments(int comments) {
        this.comments = comments;
    }

    public int getComments() {
        return comments;
    }

    public String getName() {
        return name;
    }

    public String getId() {
        return id;
    }

    public String getAction() {
        return action;
    }

    public String getEmail() {
        return email;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }
}
