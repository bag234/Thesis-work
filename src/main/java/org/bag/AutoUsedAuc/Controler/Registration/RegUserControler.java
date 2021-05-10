package org.bag.AutoUsedAuc.Controler.Registration;

import org.bag.AutoUsedAuc.Object.User.User;
import org.bag.AutoUsedAuc.Service.UserControlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller()
@RequestMapping("/registration")
public class RegUserControler {

	UserControlService userServ;
	@Autowired
	public void setUserServ(UserControlService userServ) {
		this.userServ = userServ;
	}
	
	@GetMapping()
	String getRegPage() {
		return "index";
	}
	
	@PostMapping(value = "/check", produces = {"text/html"})
	@ResponseBody
	String loginCheck(@RequestBody String login) {
		return userServ.getLoginState(login).toString();
	}
	
	@PostMapping(produces = {"text/html"})
	@ResponseBody
	String addNewUser(@RequestBody User user) {
		if(userServ.addNewUser(user))
			// <- why not
			;
		return "OK";
	}
	
}
