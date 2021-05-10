package org.bag.AutoUsedAuc.Service.Security;

import java.util.Optional;

import org.bag.AutoUsedAuc.Object.User.TypeUser;
import org.bag.AutoUsedAuc.Object.User.User;
import org.bag.AutoUsedAuc.Repository.IUserRep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class SecurityWebUserService implements UserDetailsService{

	IUserRep userRep;
	
	@Autowired
	public void setUserRep(IUserRep userRep) {
		this.userRep = userRep;
	}
	
	@Override
	public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
		Optional<User> optUser = userRep.findByLogin(login);
		if (optUser.isPresent()) {
			User user = optUser.get();
			if(user.getType() == TypeUser.ALL_RULE) {
				return new org.springframework.security.core.userdetails.User
						(user.getLogin(),user.getPassword(), AuthorityUtils.createAuthorityList(user.getType().name()));
			}
			if(user.getType() == TypeUser.ALL_RULE) {
				return new org.springframework.security.core.userdetails.User
						(user.getLogin(),user.getPassword(), AuthorityUtils.createAuthorityList(TypeUser.ADMIN.name(), TypeUser.IDENT.name()));
			}
			return new org.springframework.security.core.userdetails.User
					(user.getLogin(),user.getPassword(), AuthorityUtils.createAuthorityList(user.getType().name()));
		}
		throw new UsernameNotFoundException("user din't find in repository");
	}

}
