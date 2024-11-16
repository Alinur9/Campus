package com.bubt.campus3;



public class User {
    private String name;
    private int id;
    private String password;
    private String department;

    public User(String name, int id, String department){
        this.name = name;
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDepartment() {
        return department;
    }
    public String getPassword(){
        return password;
    }


    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", id='" + id + '\'' +
                ", department='" + department +
                '}';
    }
}
