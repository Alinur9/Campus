package com.bubt.campus3.service;

import com.bubt.campus3.Comment;
import com.bubt.campus3.DBConfig;
import com.bubt.campus3.Post;
import com.google.gson.Gson;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/api/comment/*")
public class CommentServlet extends HttpServlet {
    private final Gson gson = new Gson();

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String id = gson.fromJson(request.getReader(), String.class);
        System.out.println(id);
        Comment[] comments = DBConfig.getComments(id);
        System.out.println("fetched comments succesfully");
        if (comments != null) {
            response.getWriter().write(gson.toJson(comments));
        }
        else {
            response.getOutputStream().println("{}");
        }
    }
    public void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Comment comment = gson.fromJson(request.getReader(), Comment.class);
        DBConfig.putComment(comment);
        System.out.println("Comment posted successfully");
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String id = request.getParameter("id");
        System.out.println(id);
        Post post =  DBConfig.getSinglePost(id);
        System.out.println("got post successfully");

        if (post != null){
            response.getWriter().write(gson.toJson(post));
        }else {
            response.getOutputStream().println("{}");
        }
    }
}
