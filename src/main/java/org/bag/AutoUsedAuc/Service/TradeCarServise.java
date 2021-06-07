package org.bag.AutoUsedAuc.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.bag.AutoUsedAuc.Controler.Api.CarTrade.GetBetEnum;
import org.bag.AutoUsedAuc.Object.Bet.Bet;
import org.bag.AutoUsedAuc.Object.Car.Car;
import org.bag.AutoUsedAuc.Object.Trade.Trade;
import org.bag.AutoUsedAuc.Object.Trade.TradeState;
import org.bag.AutoUsedAuc.Object.Trade.TradeType;
import org.bag.AutoUsedAuc.Object.User.User;
import org.bag.AutoUsedAuc.Repository.IBetRep;
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
	
	IBetRep betRep;
	
	@Autowired
	public void setBetRep(IBetRep betRep) {
		this.betRep = betRep;
	}
	
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
	 *  Update trade use id: type /api/TradeCar/{id}/ - POST
	 * @param trade
	 * @param id
	 */
	
	public boolean updateTradeCar(Car car, long id) {
		if(!tradeRep.findById(id).isPresent())
			return false;
		car.setId(id);
		if(car.getTrade().getType() == TradeType.OPEN) {
			car.setTrade(carRep.findById(id).get().getTrade());
		}
		else {
			Trade t = (carRep.findById(id).get().getTrade());
			t.setPrice(car.getTrade().getPrice());
			car.setTrade(t);
			tradeRep.save(t);
		}
		carRep.save(car);
		return true;
	}
	/**
	 * Check car is user an car not empy 
	 * @param id
	 * @param login
	 * @return
	 */
	public boolean isMyCar(long id, String login) {
		try {
			return tradeRep.findById(id).orElseThrow().getSeller().getName().equals(login);
		}
		catch (Exception e) {
			return false;
		}
	}
	
	public boolean cancelCar(long id, String Login) {
		Car car = carRep.findById(id).orElseThrow();
		if (car.getTrade().getSeller().getName() != Login)		
			return false;
		car.getTrade().setState(TradeState.CANCEL);
		tradeRep.save(car.getTrade());
		return true;
	}
	
	public GetBetEnum getBetType(long id, String login) {
		
		if(carRep.findById(id).isEmpty())
			return GetBetEnum.ERR;
		Trade trade = carRep.findById(id).orElseThrow().getTrade();
		if (trade.getType() != TradeType.OPEN)
			return GetBetEnum.ERR;
		if(login != null)
			if (trade.getSeller().getLogin() == login)
				return GetBetEnum.MYCAR;
		if (trade.getWinBet() == null)
			return GetBetEnum.FIRST;
		if(trade.getWinBet().getBetter().getLogin() == login)
			return GetBetEnum.MYBET;
		return GetBetEnum.NOTMY;
	}
	
	/**
	 * 	trade id = car id 
	 * 	In trade repository search of user => result convert to List<Car>  
	 *  @param login - login user 
	 */
	public List<Car> getMyCar(String login){
		List<Car> cars = new ArrayList<Car>();
		List<Trade> trades = tradeRep.findAllBySeller(userRep.findByLogin(login).orElseThrow());
		trades.forEach(t -> {
			cars.add(carRep.findByTrade(t).orElseThrow());
		});
		return cars;
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
		if(car.getTrade().getWinBet() != null)
			if(car.getTrade().getWinBet().getCount_Bet() + car.getTrade().getStep() > bet.getCount_Bet())
				return false;
		if(car.getTrade().getDateEnd().before(new Date()))
			return false;
		car.getTrade().setWinBet(bet);
		betRep.save(bet);
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
		return carRep.findAllNotCancelCar();
//		return carRep.findAll();
	}
	
	public Optional<Car> getCarById(long id){
		return carRep.findById(id);
	}
	
	/**
	 *  info of car add
	 */
}
