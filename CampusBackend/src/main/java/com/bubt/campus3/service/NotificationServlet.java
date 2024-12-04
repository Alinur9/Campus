package com.bubt.campus3.service;

import com.bubt.campus3.DBConfig;
import com.bubt.campus3.Notification;
import com.google.gson.Gson;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/api/notification")
public class NotificationServlet extends HttpServlet {
    private final Gson gson = new Gson();

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String email = gson.fromJson(request.getReader(), String.class);

        Notification[] notifications = DBConfig.getNotifications(email);
        System.out.println("notifications fetched successfully");

        if (notifications != null){
            response.getWriter().write(gson.toJson(notifications));
        }else {
            response.getOutputStream().println("{}");
        }
    }
}
