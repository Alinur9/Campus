package com.bubt.campus3;



import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class DBConfig {
    public static Connection getConnection (){
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            return  DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/campus","root","password");
        }catch (Exception e){
            throw new RuntimeException(e);
        }

    }

    public static User getUserById(String id) {
        try {
            Connection connection = getConnection();
            String getNameStmt = "select * from user where id = \"" + id +"\"";

            PreparedStatement preparedStatement = connection.prepareStatement(getNameStmt);
            ResultSet rs = preparedStatement.executeQuery();
            if(!rs.next()){
                return  null;
            }

            return new User(rs.getString("name"), Integer.parseInt(id), rs.getString("department"));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static void putUser(int id, String name, String password, String department){
        try {
            Connection connection = getConnection();
            String putStmt = "insert into user (id, name, password, department) values " +
                    "(" +id + ", \"" + name + "\", \"" + password + "\", \"" + department + "\")";
            PreparedStatement preparedStatement = connection.prepareStatement(putStmt);
            preparedStatement.executeUpdate();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }



    public static void main(String[] args) {
        getConnection();
    }
}
