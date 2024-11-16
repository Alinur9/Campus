package com.bubt.campus3.service;



import com.bubt.campus3.DBConfig;
import com.bubt.campus3.User;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/api/reg/*")
public class SignUpServlet extends HttpServlet {
    private final Gson gson = new Gson();

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doOptions(req, resp);
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String pathInfo = request.getPathInfo();


       pathInfo =  pathInfo.replaceAll("/$", "")
                .replaceAll("^/", "");

        System.out.println("Path info: " + pathInfo);
        String[] pathSegments = pathInfo.split("/");

        int id = 0;
        if(pathSegments.length >= 2){
            try {
                id = Integer.parseInt(pathSegments[1]);
            }catch (NumberFormatException nfe){
                // ;handler error
            }
        }

        String username = request.getParameter("username");



        System.out.println("id: " + id);
        User user = DBConfig.getUserById(id + "");
        if (user == null){
            user = new User("Ali", 100, "CSE");
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
        String name = user.getName();
        int id = 2;
        String password = user.getPassword();
        String department = user.getDepartment();
        System.out.println(user);

        DBConfig.putUser(id, name, password, department);
    }
}
