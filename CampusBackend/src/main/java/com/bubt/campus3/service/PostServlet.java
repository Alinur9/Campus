package com.bubt.campus3.service;

import com.bubt.campus3.DBConfig;
import com.bubt.campus3.Likes;
import com.bubt.campus3.Post;
import com.google.gson.Gson;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/api/post")
public class PostServlet  extends HttpServlet {

    private final Gson gson = new Gson();

    public void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Post post = gson.fromJson(request.getReader(), Post.class);
        String text = post.getText();
        String email = post.getEmail();
        String name = post.getName();

        DBConfig.putPost(text, name, email);
        System.out.println("post posted successfully");
    }
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        Post[] posts = DBConfig.getPosts(LoginServlet.loggedUser.getEmail());
        if (posts != null) {
            response.getWriter().write(gson.toJson(posts));
        }
        else {
            response.getOutputStream().println("{}");
        }
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Likes like = gson.fromJson(request.getReader(), Likes.class);
        System.out.println(like.getEmail());
        String email = like.getEmail();
        DBConfig.putLike(like.getId(), like.getEmail(), like.getLikes());
        response.getOutputStream().println("{liked the post successfully}");

    }

}
