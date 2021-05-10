package org.bag.AutoUsedAuc.Controler.Api.CarTrade;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.bag.AutoUsedAuc.Object.Car.Car;
import org.bag.AutoUsedAuc.Object.Trade.Trade;
import org.bag.AutoUsedAuc.Service.BetService;
import org.bag.AutoUsedAuc.Service.TradeCarServise;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/TradeCar")
//@Secured("ROLE_IDENT")
public class CarTradeApiControler {

	TradeCarServise tradeCarServise;
	
	BetService betService;
	
	@Autowired
	public void setBetService(BetService betService) {
		this.betService = betService;
	}
	
	@Autowired
	public void setTradeCarServise(TradeCarServise tradeCarServise) {
		this.tradeCarServise = tradeCarServise;
	}
	
	@GetMapping(produces = {"application/hal+json"})
	public List<Car> getAllCar(){
		return tradeCarServise.getAllCar();
	}
	
	@GetMapping(path = "/{id}",produces = {"application/hal+json"})
	public Car getCarN(@PathVariable(name = "id") long id){
		Optional<Car> optCar = tradeCarServise.getCarById(id);
		return optCar.get();
	}
	
	@PostMapping(path = "/{id}/bet")
	public boolean makeCarNBet(@PathVariable(name = "id") long id,@RequestParam(name = "newBet") double count, Principal principal){
		return tradeCarServise.betCar(id, betService.creatBet(principal.getName(), count).orElseThrow());
	}
	
	@GetMapping(path = "/{id}/trade")
	public Trade getCarNTrade(@PathVariable(name = "id") long id){
		Optional<Car> optCar = tradeCarServise.getCarById(id);
		return optCar.orElseThrow().getTrade();
	}
	
	@GetMapping(path = "/{id}/contact")
	public String getCarNContact(@PathVariable(name = "id") long id){
		Optional<Car> optCar = tradeCarServise.getCarById(id);
		return optCar.orElseThrow().getTrade().getSeller().geteMail();
	}
	
	@PostMapping
	public Car addCar(Principal principal, @RequestBody Car car) {
		System.out.println(principal);
		if (tradeCarServise.addCar(car, principal.getName()))
			return car;
		throw new UsernameNotFoundException("User not login or DB error");
	}

}
