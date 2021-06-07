package org.bag.AutoUsedAuc.Service;

import java.util.Optional;

import org.bag.AutoUsedAuc.Object.Bet.Bet;
import org.bag.AutoUsedAuc.Object.User.User;
import org.bag.AutoUsedAuc.Repository.IUserRep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BetService {

	IUserRep userRep;
	
	@Autowired
	public void setUserRep(IUserRep userRep) {
		this.userRep = userRep;
	}
	
	public Optional<Bet> creatBet(String login, double count) {
		Optional<User> optUser = userRep.findByLogin(login);
		if(optUser.isPresent())
			return Optional.of(new Bet(optUser.get(), count));
		return Optional.empty();
	}
	
	public Bet getEmpyBet(double count) {
		return new Bet(null, count);
	}
	
}
