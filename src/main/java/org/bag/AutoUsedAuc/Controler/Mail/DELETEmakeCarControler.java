package org.bag.AutoUsedAuc.Controler.Mail;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.bag.AutoUsedAuc.Object.Car.Car;
import org.bag.AutoUsedAuc.Object.Car.StateCar;
import org.bag.AutoUsedAuc.Object.Car.TypeBodyCar;
import org.bag.AutoUsedAuc.Object.Trade.Trade;
import org.bag.AutoUsedAuc.Object.Trade.TradeState;
import org.bag.AutoUsedAuc.Object.Trade.TradeType;
import org.bag.AutoUsedAuc.Object.User.User;
import org.bag.AutoUsedAuc.Repository.ICarRep;
import org.bag.AutoUsedAuc.Repository.ITradeRep;
import org.bag.AutoUsedAuc.Repository.IUserRep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class DELETEmakeCarControler {

	@Autowired
	IUserRep userRep;
	
	@Autowired
	ITradeRep tradeRep;
	
	@Autowired
	ICarRep carRep;
	
	@GetMapping(path = "/test/l")
	public void setCar() {
		User user = userRep.findById((long) 1).get();
		Trade trade = new Trade();
		Car car = new Car();
		trade.setSeller(user);
		trade.setPrice(100);
		trade.setState(TradeState.CURRENT);
		trade.setType(TradeType.TYPICAL);
		car.setAutoRunMotor(true);
		car.setBrand("mirse1");
		car.setGen("MEGA GEN");
		List<String> strs = new ArrayList<String>();
		strs.add("photo1.png");
		strs.add("photo2.png");
		car.setImagesPath(strs);
		car.setMilage(10220156);
		car.setModel("model vw2");
		car.setState(StateCar.NORMAL);
		car.setTrade(trade);
		car.setTransmisionType(true);
		Set<TypeBodyCar> typesbodycars = new HashSet<TypeBodyCar>();
		typesbodycars.add(TypeBodyCar.TYPE1);
		typesbodycars.add(TypeBodyCar.TYPE2);
		car.setTypeBodyCar(typesbodycars);
		
		car.setVolume(60);
		car.setYear(2002);
		tradeRep.save(trade);
		carRep.save(car);
		System.out.println("DELETEmakeCarControler.setCar()");
	}
	
	@GetMapping(path = "/testImage", produces = {"image/png", "image/jpg"})
	public @ResponseBody byte[] getTestImage() throws IOException {
		System.out.println("DELETEmakeCarControler.getTestImage()");
		InputStream in = new FileInputStream("picUser/Wojak.png");
		System.out.println(in);
		return in.readAllBytes();
	}
}
