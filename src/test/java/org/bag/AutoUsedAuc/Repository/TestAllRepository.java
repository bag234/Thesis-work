package org.bag.AutoUsedAuc.Repository;

import static org.assertj.core.api.Assertions.assertThat;

import org.bag.AutoUsedAuc.Object.Bet.Bet;
import org.bag.AutoUsedAuc.Object.User.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class TestAllRepository {

	@Autowired
	ICarRep carRep;
	
	@Autowired
	ITradeRep tradeRep;
	
	@Autowired
	IBetRep betRep;
	
	@Autowired
	IUserRep userRep;
	
	@Test
	void corectLoadingRep() {
		assertThat(carRep).isNotNull();
		assertThat(tradeRep).isNotNull();
		assertThat(betRep).isNotNull();
		assertThat(userRep).isNotNull();
	}
	
	@Test
	void carRepCorrect() {
		
	}
	
	@Test
	void userRepCorrect() {
		
	}
	
	@Test
	void tradeRepCorrect() {
		
	}
	
	@Test
	void betRepCorrect() {
		
	}
	
}
