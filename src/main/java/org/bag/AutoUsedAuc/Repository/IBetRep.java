package org.bag.AutoUsedAuc.Repository;

import java.util.Optional;

import org.bag.AutoUsedAuc.Object.Bet.Bet;
import org.bag.AutoUsedAuc.Object.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IBetRep extends JpaRepository<Bet, Long>{

	Optional<Bet> findByBetter(User better);
	
}
