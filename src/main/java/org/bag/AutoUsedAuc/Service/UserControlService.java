package org.bag.AutoUsedAuc.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import javax.mail.MessagingException;

import org.bag.AutoUsedAuc.Object.User.TypeUser;
import org.bag.AutoUsedAuc.Object.User.User;
import org.bag.AutoUsedAuc.Repository.IUserRep;
import org.bag.AutoUsedAuc.Service.Mail.MailServise;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserControlService {

	
	MailServise mailServise;
	@Autowired
	public void setMailServise(MailServise mailServise) {
		this.mailServise = mailServise;
	}
	
	
	IUserRep userRep;
	
	Map<String, User> mailRep;
	
	int leftLimit = 48; // numeral '0'
    int rightLimit = 122; // letter 'z'
    int targetStringLength = 10;
    
	Random random = new Random();
	
	String getNewStringPath() {
		String str;
		while (true) {
			str = random.ints(leftLimit, rightLimit + 1)
		      .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
		      .limit(targetStringLength)
		      .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
		      .toString();
			System.out.println(str);
			return str;
		}
	}
	
	@Autowired
	public void setUserRep(IUserRep userRep) {
		this.userRep = userRep;
	}
	
	/**
	 * "HARDWARE" check length string   
	 * @param str - string check
	 * @return - if length more 4 return true
	 */
	private boolean validSrting(String str) {
		return str.length() > 4;
	}
	
	
	public UserControlService() {
		mailRep = new HashMap<String, User>();
	}
	
	public User getUser(String login) {
		return userRep.findByLogin(login).orElse(null);
	}
	
	public boolean addNewUser(User user) {
		user.setType(TypeUser.NOT_IDENT);
		if (userRep.findByLogin(user.getLogin()).isEmpty() 
				&& validSrting(user.getLogin()) && validSrting(user.getPassword())) 
		{
			userRep.save(user);
			return true;
		}
		return false;
	}
	
	public LoginStateAnswer getLoginState(String login) { 
		if(!validSrting(login))
			return LoginStateAnswer.SHORT;
		if(userRep.findByLogin(login).isEmpty()) {
			return LoginStateAnswer.FREE;
		}
		return LoginStateAnswer.BUSY;
	}

	/**
	 * User update method. <b>The entire user must be transferred </b>
	 * @param user
	 * @return success operation;
	 */
	public boolean updateUser(User user) {
		if (userRep.findByLogin(user.getLogin()).isPresent() 
				&& validSrting(user.getLogin()) && validSrting(user.getPassword())) 
		{
			userRep.save(user);
			return true;
		}
		return false;
	}
	/**
	 * Make method check in Service Future
	 *  user go page check email ->
	 *  input login ->
	 *  [server] send mail (specLink) ->
	 *  user click link on mail ->
	 *  [server] make check mail 
	 * Now: return mail;
	 * @param login
	 * @return
	 * @throws MessagingException 
	 */
	public String geteMailCheck(String login) throws MessagingException {
		Optional<User> user = userRep.findByLogin(login);
		if( user.isPresent()) {
			String token = getNewStringPath();
			mailRep.put(token, user.get());
			mailServise.mailCodeSend(user.get().geteMail(), token);
			return token;
		}
		return null;
	}
	
	public boolean makeeMailCheack(String token) {
		User user = mailRep.getOrDefault(token, null);
		if (user == null)
			return false;
		user.setType(TypeUser.IDENT);
		userRep.save(user);
		return true;
	}
	
	public boolean updatePassword(String login, String newPassword) throws Exception {
		if(login == null ||  !validSrting(newPassword))
			return false;
		User user = userRep.findByLogin(login).orElseThrow(() -> new Exception("[CRITICAL] User not find in db") );
		user.setPassword(newPassword);
		mailServise.mailChangePasswordSend(user.geteMail());
		userRep.save(user);
		return true;
	}
	
	public boolean updateeMail(String login, String neweMail) throws Exception {
		if(login == null ||  !validSrting(neweMail))
			return false;
		User user = userRep.findByLogin(login).orElseThrow(() -> new Exception("[CRITICAL] User not find in db") );
		mailServise.mailChangeeMailSend(user.geteMail(), neweMail);
		user.seteMail(neweMail);
		user.setType(TypeUser.NOT_IDENT);
		userRep.save(user);
		return true;
	}
	
	public boolean updateName(String login, String newName) throws Exception {
		if(login == null)
			return false;
		User user = userRep.findByLogin(login).orElseThrow(() -> new Exception("[CRITICAL] User not find in db") );
		mailServise.mailChangeNameSend(user.geteMail(), newName);
		user.setName(newName);
		userRep.save(user);
		return true;
	}
	
}
