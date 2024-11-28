package com.bubt.campus3;



public class User {
    private String name;
    private String id;
    private String password;
    private String department;
    private String email;

    public User(String name, String id, String department, String email){
        this.name = name;
        this.id = id;
        this.department = department;
        this.email = email;
    }

    public String getId() {
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
    public String getEmail(){
        return email;
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
