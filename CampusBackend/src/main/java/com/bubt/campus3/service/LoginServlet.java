package com.bubt.campus3.service;

import com.bubt.campus3.DBConfig;
import com.bubt.campus3.Post;
import com.bubt.campus3.User;
import com.google.gson.Gson;
import io.jsonwebtoken.Jwts;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.spec.EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@WebServlet("/api/login/*")
public class LoginServlet extends HttpServlet {

    private final Gson gson = new Gson();
    public static User loggedUser;


    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doOptions(req, resp);
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        User user = loggedUser;
        System.out.println(loggedUser.getName());
        System.out.println(loggedUser.getDepartment());
        if (user == null){
            user = new User("Ali", "qwwee", "CSE", "random@random.com");
        }


        if (user != null) {
            response.getWriter().write(gson.toJson(user));
        }
        else {
            response.getOutputStream().println("{}");
        }
    }
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        User user = gson.fromJson(request.getReader(), User.class);
        String password = user.getPassword();
        String email = user.getEmail();


        if (DBConfig.verifyUser(email,password)){
            User corrUser = DBConfig.getUserByEmail(email);
            String jwtToken = generateToken(corrUser);
            System.out.println("token: " + jwtToken);
            loggedUser = corrUser;

            response.addCookie(new Cookie("sessionId",jwtToken));
          //  response.getOutputStream().write(gson.toJson());
            response.setStatus(200);
        }
        else {
            response.sendError(401);
        }

        System.out.println("login successfull");
    }

    public void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Post post = gson.fromJson(request.getReader(), Post.class);
        String text = post.getText();
        String email = post.getEmail();
        String name = post.getName();
        DBConfig.putPost(text, name, email);
        System.out.println("post posted successfully");
    }

    public String generateToken(User user){
        try {
//            File privateFile = new File("private.key");
//            byte[] privateBytes = Files.readAllBytes(privateFile.toPath());
//            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
//            EncodedKeySpec keySpec = new X509EncodedKeySpec(privateBytes);
//            PrivateKey privateKey = keyFactory.generatePrivate(keySpec);
            Instant now = Instant.now();
            String jwtToken = Jwts.builder()
                    .claim("name", user.getName())
                    .claim("department", user.getDepartment())
                    .claim("email", user.getEmail())
                    .setId(user.getId())
                    .setIssuedAt(Date.from(now))
                    .setExpiration(Date.from(now.plus(50L, ChronoUnit.MINUTES)))
                    .compact();

            return jwtToken;
        } catch (Exception e){
            e.printStackTrace();
        }
        return "error";
    }
}

