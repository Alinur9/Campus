package com.bubt.campus3.service;

import com.bubt.campus3.User;

import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@WebServlet("/api/files")
public class FilesServlet extends HttpServlet {

    public static final String FILE_FOLDER= "/home/alinur/campusFiles";

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getPathInfo();
        System.out.printf("path info: %s\n", pathInfo);
        String fileName = req.getParameter("f");
        System.out.println("QP: " + fileName);


        if (fileName == null){
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }


        Path path = Path.of(FILE_FOLDER).resolve(fileName);
        //



        if(!Files.exists(path)){
            resp    .sendError(HttpServletResponse.SC_NOT_FOUND);
            return;
        }

        try(ServletOutputStream os = resp.getOutputStream()){
            Files.copy(path, os);
            os.flush();
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {


        try {
            System.out.println("File uploading...");
            String fileName = req.getHeader("File-Name");
            User user = LoginServlet.getLoggedInUser(req);
            if (user == null) {
                resp.sendError(HttpServletResponse.SC_FORBIDDEN);
                return;
            }

//            int i = fileName.lastIndexOf(".");
//            String ext = fileName.substring(i);
//            System.out.println("Ext: " + ext);
            String ext = "png";


            Path path = Path.of(FILE_FOLDER).resolve(user.getEmail() + "." + ext);


            try (ServletInputStream is = req.getInputStream()) {
                Files.deleteIfExists(path);
                Files.copy(is, path);
            }

        }catch (Exception e){
            e.printStackTrace();
            throw new IOException(e);
        }

    }

}
