package DB;

import Objects.User;

import java.sql.*;

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
            String getNameStmt = "select * from user where id = " + id;
            PreparedStatement preparedStatement = connection.prepareStatement(getNameStmt);
            ResultSet rs = preparedStatement.executeQuery();
            return new User(rs.getString("name"), Integer.parseInt(id));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static void putUser(String id, String name, String password){
        try {
            Connection connection = getConnection();
            String putStmt = "insert into user (id, name, password) values (" +id + ", " + name + ", " + password + ")";
            PreparedStatement preparedStatement = connection.prepareStatement(putStmt);
            preparedStatement.executeQuery();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }



    public static void main(String[] args) {
        getConnection();
    }
}
