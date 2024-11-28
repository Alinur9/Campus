package com.bubt.campus3;



import java.io.FileOutputStream;
import java.security.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.time.LocalDateTime;
import java.util.*;

public class DBConfig {
    public static Connection getConnection (){
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            return  DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/campus","root","password");
        }catch (Exception e){
            throw new RuntimeException(e);
        }

    }

    public static User getUserByEmail(String email) {
        try {
            Connection connection = getConnection();
            String getNameStmt = "select * from user where email = \"" + email +"\"";

            PreparedStatement preparedStatement = connection.prepareStatement(getNameStmt);
            ResultSet rs = preparedStatement.executeQuery();
            if(!rs.next()){
                return  null;
            }

            return new User(rs.getString("name"), rs.getString("id"),
                    rs.getString("department"), rs.getString("email"));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static void putUser(String id, String name, String password, String department, String email){
        try {
            Connection connection = getConnection();
            String putStmt = "insert into user (id, name, password, department, email) values " +
                    "(\"" +id + "\", \"" + name + "\", \"" + password + "\", \"" + department + "\", \"" + email + "\")";
            PreparedStatement preparedStatement = connection.prepareStatement(putStmt);
            preparedStatement.executeUpdate();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static boolean verifyUser(String email, String password) throws RuntimeException {
        try {
            Connection connection = getConnection();
            String getNameStmt = "select * from user where email = \"" + email +"\"";

            PreparedStatement preparedStatement = connection.prepareStatement(getNameStmt);
            ResultSet rs = preparedStatement.executeQuery();

            if(!rs.next()){
                return  false;
            }
            String p = rs.getString("password");

            if (p.equals(password)){
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        return false;
    }

    public static void  putPost(String text, String name, String email){
        LocalDateTime time = LocalDateTime.now();
        String timeStr = time.toString();
        int likes = 0;
        String id = UUID.randomUUID() + name;
        try {
            Connection connection = getConnection();
            String putStmt = "insert into post ( name, email, text, time, likes, id) values " +
                    "(\""  + name + "\",  \"" + email + "\", \"" + text + "\", \"" + timeStr + "\", " + likes + ", \""
                    + id +"\" )";
            PreparedStatement preparedStatement = connection.prepareStatement(putStmt);
            preparedStatement.executeUpdate();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static Post[] getPosts(String email){
        try {
            Connection connection = getConnection();
            String getNameStmt = "select * from post";

            PreparedStatement preparedStatement = connection.prepareStatement(getNameStmt);
            ResultSet rs = preparedStatement.executeQuery();
//            if (!rs.next()) {
//                return null;
//            }

            ArrayList<String> likedPosts = getLikedPosts(email);
            Stack<Post> postStack = new Stack<>();


            int i = 0;
            while (rs.next()){
                Post post = new Post(rs.getString("name"),
                                     rs.getString("text"),
                                     rs.getString("email"),
                                     rs.getInt("likes"),
                                     rs.getString("id"));
                post.setTime(rs.getString("time"));
                if (likedPosts.contains(rs.getString("id"))){
                    post.setStatus();
                }

                postStack.push(post);

            }
            return  postStack.toArray(new Post[0]);

        }catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("Error getting posts");
        }
    }


    public static ArrayList<String> getLikedPosts(String email){
        try {
            Connection connection = getConnection();
            String getNameStmt = "select * from likes where email = \"" + email + "\"";

            PreparedStatement preparedStatement = connection.prepareStatement(getNameStmt);
            ResultSet rs = preparedStatement.executeQuery();

            ArrayList<String> list = new ArrayList<>();
            while (rs.next()){
                String id = rs.getString("id");
                list.add(id);
            }
            return list;
        }catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
    public static void putLike(String id, String email, int likes){
        try {
            Connection connection = getConnection();
            likes++;
            System.out.printf("Setting like: %d to id: %s\n", likes, id );
            String putStmt = "update post set likes = " + likes +" where id = \"" + id + "\"";
            System.out.println(putStmt);
            PreparedStatement preparedStatement = connection.prepareStatement(putStmt);
            preparedStatement.executeUpdate();

            putStmt = "insert into likes (id, email) values (\"" + id + "\", \"" + email + "\")";
            preparedStatement = connection.prepareStatement(putStmt);
            preparedStatement.executeUpdate();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static void main(String[] args) {
        getConnection();
//        try {
//            KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
//            generator.initialize(2048);
//            KeyPair pair = generator.generateKeyPair();
//            PrivateKey privateKey = pair.getPrivate();
//            PublicKey publicKey = pair.getPublic();
//
//            FileOutputStream fs = new FileOutputStream("public.key");
//            fs.write(publicKey.getEncoded());
//            FileOutputStream fs1 = new FileOutputStream("private.key");
//            fs1.write(privateKey.getEncoded());
//
//
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
    }
}
