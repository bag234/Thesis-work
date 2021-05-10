package org.bag.AutoUsedAuc.Controler.Api.Image;

import java.security.Principal;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/User")
public class UserUtilControler {

	@GetMapping(path = "/getLogin")
	public String getLogin(Principal p) {
		return p != null ? 
				p.getName() : "null";
	}
	
}
