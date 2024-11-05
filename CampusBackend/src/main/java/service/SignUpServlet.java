package service;

import DB.DBConfig;
import Objects.User;
import org.json.JSONObject;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class SignUpServlet extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String reqUrl = request.getRequestURI();
        String id = reqUrl.substring(4,7);
        User user = DBConfig.getUserById(id);
        if (user != null) {
            String json = "{\n";
            json += "\"name\": " + JSONObject.quote(user.getName()) + ", \n";
            json += "\"id\": " + JSONObject.quote(user.getId() + "") + "}";
            response.getOutputStream().println(json);
        }
        else {
            response.getOutputStream().println("{}");
        }
    }
    public void doPost(HttpServletRequest request, HttpServletResponse response){
        String name = request.getParameter("name");
        String id = request.getParameter("id");
        String password = request.getParameter("password");
    }
}
