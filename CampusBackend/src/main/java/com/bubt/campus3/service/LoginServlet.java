package com.bubt.campus3.service;

import com.bubt.campus3.DBConfig;
import com.bubt.campus3.Post;
import com.bubt.campus3.User;
import com.google.gson.Gson;
import io.jsonwebtoken.*;

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


    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doOptions(req, resp);
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        User user = getLoggedInUser(request);

        if (user == null){
            user = new User("Ali", "null", "CSE", "null");
        }


        System.out.println(user.getName());
        System.out.println(user.getDepartment());
        if (user != null) {
            response.getWriter().write(gson.toJson(user));
        }
        else {
            response.getOutputStream().println("{}");
        }
    }


    public static User getLoggedInUser(HttpServletRequest req){
        String sid = getSessionId(req);
        if (sid == null){
            return null;
        }


        Jwt<Header, Claims> jwt = Jwts.parser().parseClaimsJwt(sid);

        Claims body = jwt.getBody();
        String id = body.getId();
        String name = body.get("name", String.class);
        String email = body.get("email", String.class);
        String department = body.get("department", String.class);
        return new User(name, id, department, email);
    }

    public static String getSessionId(HttpServletRequest req) {
        if (null == req.getCookies()){
            return null;
        }
        for (Cookie cookie : req.getCookies()) {
           if("sessionId".equals(  cookie.getName())){
               return cookie.getValue();
            }
        }

        return null;
    }



    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        User user = gson.fromJson(request.getReader(), User.class);
        String password = user.getPassword();
        String email = user.getEmail();


        if (DBConfig.verifyUser(email,password)){
            User corrUser = DBConfig.getUserByEmail(email);
            String jwtToken = generateToken(corrUser);
            System.out.println("token: " + jwtToken);

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

    public void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {
        if (null == request.getCookies()){
            response.getOutputStream().println("{logged out already");

        }

        Cookie cookie = new Cookie("sessionId", null);
        cookie.setMaxAge(0);
        response.addCookie(cookie);


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

