package org.bag.AutoUsedAuc.Controler.Mail;

import java.security.Principal;

import javax.mail.MessagingException;

import org.bag.AutoUsedAuc.Service.UserControlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
@RequestMapping("/mail")
@Secured("ROLE_NOT_IDENT")
public class CheckMail {

	UserControlService userServ;
	@Autowired
	public void setUserServ(UserControlService userServ) {
		this.userServ = userServ;
	}
	
	@GetMapping()

	public String sendCheckMail(Principal principal) throws MessagingException {
		userServ.geteMailCheck(principal.getName());
		return "index";
	}
	
	@ResponseBody
	@ExceptionHandler(MessagingException.class)
	@ResponseStatus(code = HttpStatus.NOT_IMPLEMENTED)
	public String errorHandler() {
		return "Mail Service Exception";
	}
	
	@GetMapping(path = "/{token}")
	public String checkCheckMail(@PathVariable(name = "token") String token) {
		userServ.makeeMailCheack(token);
		return "redirect:/";
	}
}
