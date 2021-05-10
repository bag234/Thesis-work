package org.bag.AutoUsedAuc.Service;

import java.util.List;
import java.util.Optional;

import org.bag.AutoUsedAuc.Object.Bet.Bet;
import org.bag.AutoUsedAuc.Object.Car.Car;
import org.bag.AutoUsedAuc.Object.Trade.Trade;
import org.bag.AutoUsedAuc.Object.Trade.TradeType;
import org.bag.AutoUsedAuc.Object.User.User;
import org.bag.AutoUsedAuc.Repository.ICarRep;
import org.bag.AutoUsedAuc.Repository.ITradeRep;
import org.bag.AutoUsedAuc.Repository.IUserRep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TradeCarServise {

	IUserRep userRep;
	
	ITradeRep tradeRep;
	
	ICarRep carRep;
	
	@Autowired
	public void setUserRep(IUserRep userRep) {
		this.userRep = userRep;
	}

	@Autowired
	public void setTradeRep(ITradeRep tradeRep) {
		this.tradeRep = tradeRep;
	}

	@Autowired
	public void setCarRep(ICarRep carRep) {
		this.carRep = carRep;
	}
	/**
	 * Add securuti is not update
	 * @param car - car & trade
	 * @param login - login user
	 */
	public boolean addCar(Car car, String login) {
		Optional<User> optUser = userRep.findByLogin(login);
		if(optUser.isEmpty())
			return false;
		User user = optUser.get();
		car.setId(0L);
		Trade trade = car.getTrade();
		trade.setId(0L);
		trade.setSeller(user);
		tradeRep.save(trade);
		carRep.save(car);
		return true;
	}
	
	/**
	 *  Update trade use id: type /api/trade/{id}/ - POST
	 * @param trade
	 * @param id
	 */
	
	public boolean updateTrade(Trade trade, long id) {
		if(!tradeRep.findById(id).isPresent())
			return false;
		trade.setId(id);
		tradeRep.save(trade);
		return true;
	}
	
	public boolean updateCar(Car car, long id) {
		Optional<Car> optCar = carRep.findById(id);
		if(!optCar.isPresent())
			return false;
		car.setId(id);
		car.setTrade(optCar.get().getTrade());
		carRep.save(car);
		return true;
	}
	/**
	 *  add time auto close trade
	 * @param id
	 * @param bet
	 * @return
	 */
	public boolean betCar(long id, Bet bet) {
		Optional<Car> optCar = carRep.findById(id);
		if(!optCar.isPresent())
			return false;
		Car car = optCar.get();
		if(car.getTrade().getType() != TradeType.OPEN)
			return false;
		if(car.getTrade().getWinBet().getCount_Bet() + car.getTrade().getStep() > bet.getCount_Bet())
			return false;
		car.getTrade().setWinBet(bet);
		carRep.save(car);
		return true; 
	}
	
	/**
	 * method sort and filter make in package org.[].Util.CarTrade;
	 * NOTE: MAKE FILTER, Model <- high prior
	 * 
	 * @return return all car
	 */
	public List<Car> getAllCar(){
		return carRep.findAll();
	}
	
	public Optional<Car> getCarById(long id){
		return carRep.findById(id);
	}
	
	/**
	 *  info of car add
	 */
}
