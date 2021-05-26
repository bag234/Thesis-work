package org.bag.AutoUsedAuc.Service;

import static org.assertj.core.api.Assertions.assertThat;

import org.bag.AutoUsedAuc.Service.Image.ImageService;
import org.bag.AutoUsedAuc.Service.Mail.MailServise;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ServiceAllTest {

	@Autowired
	MailServise mail;
	
	@Autowired
	ImageService image; // save and load file;
	
	@Autowired 
	BetService bet; // make bet
	
	@Autowired
	TradeCarServise trade;
	
	@Autowired
	UserControlService user;
	
	@Test
	void corectAllLoding() {
		assertThat(mail).isNotNull();
		assertThat(image).isNotNull();
		assertThat(bet).isNotNull();
		assertThat(trade).isNotNull();
		assertThat(user).isNotNull();
	}
	
	@Test
	void testUserService() {
		assertThat(user.getLoginState("IvanLog")).isEqualTo(LoginStateAnswer.BUSY);
		assertThat(user.getLoginState("NotImpLementLogin@d%")).isEqualTo(LoginStateAnswer.FREE);
		assertThat(user.getLoginState("g")).isEqualTo(LoginStateAnswer.SHORT);
	}
	
	@Test
	void testTradeService() {
		assertThat(trade.isMyCar(666, "Not")).isFalse();
	}
	
	@Test
	void testBetService() {
		assertThat(bet.creatBet("IvanLog", 666).get()).isNotNull();
	}
	
	@Test
	void testImageService() {
		assertThat(image.getFile("error")).isFile().canRead();
	}
	
}
