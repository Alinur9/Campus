package com.bubt.campus3;

public class Likes {
    private String id;
    private int likes;
    private String email;

    public Likes(String id, int likes, String email){
        this.email = email;
        this.id = id;
        this.email = email;
    }

    public int getLikes() {
        return likes;
    }

    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }
    
}
