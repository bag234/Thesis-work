package org.bag.AutoUsedAuc.Controler;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.slf4j.Logger;

//import org.slf4j.internal.Logger;

//import org.apache.log4j.Logger;
import org.slf4j.LoggerFactory;

@Controller
@RequestMapping(path = "/login")
public class LoginControler {
	
	@GetMapping()
	public String getLoginPage() {
		return "index";
	}
	
}
