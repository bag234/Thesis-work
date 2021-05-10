package org.bag.AutoUsedAuc;

import org.bag.AutoUsedAuc.Object.User.User;
import org.bag.AutoUsedAuc.Service.Security.SecurityWebUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configurable
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	
	SecurityWebUserService userServiseSec;
	
	@Autowired
	public void setUserServiseSec(SecurityWebUserService userServiseSec) {
		this.userServiseSec = userServiseSec;
	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userServiseSec).passwordEncoder(User.PASS_ENC);
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
		.authorizeRequests().antMatchers("/public/**", "/main.css", "/h2-console/**", "/registration").permitAll() 
		.and().csrf().disable()
		.formLogin()
			.defaultSuccessUrl("/", true)
			.permitAll()
			.and();
		http.headers().frameOptions().disable(); // <- multiWindow 
		
	}
	
}
