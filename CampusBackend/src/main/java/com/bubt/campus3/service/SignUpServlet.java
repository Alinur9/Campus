package com.bubt.campus3.service;



import com.bubt.campus3.DBConfig;
import com.bubt.campus3.User;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

import static com.bubt.campus3.service.FilesServlet.FILE_FOLDER;

@WebServlet(urlPatterns = {"/api/reg/*", "/api/reg/getUser"})
public class SignUpServlet extends HttpServlet {
    private final Gson gson = new Gson();



    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
            String pathInfo = request.getPathInfo();

            pathInfo = pathInfo == null? "" : pathInfo;

            pathInfo = pathInfo.replaceAll("/$", "")
                    .replaceAll("^/", "");

            System.out.println("Path info: " + pathInfo);
            String[] pathSegments = pathInfo.split("/");

            int id = 0;
            if (pathSegments.length >= 2) {
                try {
                    id = Integer.parseInt(pathSegments[1]);
                } catch (NumberFormatException nfe) {
                    // ;handler error
                }
            }

            String username = request.getParameter("username");


            System.out.println("id: " + id);
            User user = DBConfig.getUserByEmail(id + "");
            if (user == null) {
                user = new User("Ali", "qwef", "CSE", "random@random.com");
            }


            if (user != null) {
                response.getWriter().write(gson.toJson(user));
            } else {
                response.getOutputStream().println("{}");
            }
        }catch (Exception e){
            e.printStackTrace();
            throw new IOException(e);
        }
    }
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        User user = gson.fromJson(request.getReader(), User.class);
        String name = user.getName();
        String password = user.getPassword();
        String department = user.getDepartment();
        String id = name + UUID.randomUUID() + department;
        String email = user.getEmail();
        System.out.println(user);

        try {
            DBConfig.getUserByEmail(email);
        }catch (Exception e){
            response.sendError(401,"User already exists");
        }
        DBConfig.putUser(id, name, password, department, email);
        setDefaultPic(email);
        response.setStatus(200, "successfully registered user");

    }

    private void setDefaultPic(String email)throws IOException{
        String ext = "png";


        Path dst = Path.of(FILE_FOLDER).resolve(email + "." + ext);
        Path src = Path.of(FILE_FOLDER).resolve("default" + "." + ext);

        try {
            Files.deleteIfExists(dst);
            Files.copy(src, dst);
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
