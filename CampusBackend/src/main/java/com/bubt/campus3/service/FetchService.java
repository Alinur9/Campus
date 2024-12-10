package com.bubt.campus3.service;

import com.bubt.campus3.Comment;
import com.bubt.campus3.DBConfig;
import com.bubt.campus3.Post;
import com.bubt.campus3.User;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/api/fetch/*")
public class FetchService extends HttpServlet {

    private final Gson gson = new Gson();

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        Post post = gson.fromJson(request.getReader(), Post.class);
        String id = post.getId();
        System.out.println(id);
        post = DBConfig.getSinglePost(id);
        System.out.println("fetched single post succesfully");
        if (post != null) {
            response.getWriter().write(gson.toJson(post));
        }
        else {
            response.getOutputStream().println("{}");
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        User user = LoginServlet.getLoggedInUser(req);
        Post[] posts = DBConfig.getUserPosts(user.getEmail());

        if (posts != null){
            resp.getWriter().write(gson.toJson(posts));
        }
        else
            resp.getOutputStream().println("{}");
    }
}
