package org.bag.AutoUsedAuc.Controler.TradeCar;

import java.security.Principal;

import org.bag.AutoUsedAuc.Service.TradeCarServise;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AddTradeCarContoler {
	
	TradeCarServise tradeCarServise;
	
	@Autowired
	public void setTradeCarServise(TradeCarServise tradeCarServise) {
		this.tradeCarServise = tradeCarServise;
	}
	
	@GetMapping(path = "/addCar")
	public String getAddTradeCarActivity() {
		return "index";
	}
	
	@GetMapping(path = "/change/{id}")
	public String getChangeMain(@PathVariable(name = "id") long id) {
		if(tradeCarServise.getCarById(id).isEmpty())
			return "riderct:/";
		return "index";
	}
	
	@GetMapping(path = "/change")
	public String getMyCar(Principal principal) {
		// ,- ls
		return "index";
	}
	
}
