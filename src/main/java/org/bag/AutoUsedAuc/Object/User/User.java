package org.bag.AutoUsedAuc.Object.User;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class User {

	public static final PasswordEncoder PASS_ENC = new BCryptPasswordEncoder(); // so _ so
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	
	

	String name;
	
	String login;
	
	@JsonIgnore
	String password;
	
	String eMail;
	
	@Enumerated(EnumType.STRING)
	TypeUser type;
	
	public User(String name, String login, String password, String eMail) {
		this.name = name;
		this.login = login;
		this.setPassword(password);
		this.eMail = eMail;
	}
	
	public User() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}// TODO Auto-generated constructor stub

	public void setName(String name) {
		this.name = name;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = PASS_ENC.encode(password);
	}

	public String geteMail() {
		return eMail;
	}

	public void seteMail(String eMail) {
		this.eMail = eMail;
	}

	public TypeUser getType() {
		return type;
	}

	public void setType(TypeUser type) {
		this.type = type;
	}
	
	
	
}
