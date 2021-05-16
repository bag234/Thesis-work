package org.bag.AutoUsedAuc.Controler.Api.User;

import java.security.Principal;

import org.bag.AutoUsedAuc.Object.User.User;
import org.bag.AutoUsedAuc.Service.UserControlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/User")
public class UserUtilControler {

	UserControlService userServ;
	
	@Autowired
	public void setUserServ(UserControlService userServ) {
		this.userServ = userServ;
	}
	
	@GetMapping(path = "/getLogin")
	public String getLogin(Principal p) {
		return p != null ? 
				p.getName() : "null";
	}
	
	@GetMapping(path = "/me", produces = "application/hal+json")
	public User getMe(Principal p) {
		return p != null ? 
				userServ.getUser(p.getName()) : null;
	}
	
	
	@PutMapping(path= "/password")
	public boolean updatePassword(Principal p, @RequestBody String newPassword) throws Exception {
		return p != null ? 
			 userServ.updatePassword(p.getName(), newPassword) : false;
	}
	
	@PutMapping(path= "/eMail")
	public boolean updateeMail(Principal p, @RequestBody String neweMail) throws Exception {
		return p != null ? 
			 userServ.updateeMail(p.getName(), neweMail) : false;
	}
	
	@PutMapping(path= "/name")
	public boolean updateName(Principal p, @RequestBody String newName) throws Exception {
		return p != null ? 
			 userServ.updateName(p.getName(), newName) : false;
	}
	
	
}
