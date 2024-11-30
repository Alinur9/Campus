package com.bubt.campus3;

public class Comment {
    private String id;
    private String name;
    private String email;
    private String text;
    private int comments;

    public Comment(String id, String name, String email, String text, int comments){
        this.email = email;
        this.name = name;
        this.id = id;
        this.text = text;
        this.comments = comments;

    }

    public String getEmail() {
        return email;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getText() {
        return text;
    }


    public int getComments() {
        return comments;
    }
}
