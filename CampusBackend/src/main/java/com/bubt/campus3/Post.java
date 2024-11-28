package com.bubt.campus3;

public class Post {
   private String name;
   private String text;
   private String email;
   private String time;
   private int likes;
   private String id;
   private String status = "like";

   public Post(String name, String text, String email, int likes, String id){
       this.name = name;
       this.text = text;
       this.email = email;
       this.id = id;
       this.likes = likes;
   }

    public String getEmail(){
        return email;
    }
    public String getName(){
        return name;
    }

    public String getText(){
        return text;
    }

    public String getTime(){
        return time;
    }

    public int getLikes() {
        return likes;
    }

    public String getId() {
        return id;
    }

    public String setStatus() {
        status = "liked";
        return status;
    }

    public String getStatus() {
        return status;
    }

    public void setTime(String time){
       this.time = time;
    }

    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", text='" + text + '\'' +
                ", email='" + email +
                '}';
    }
}
