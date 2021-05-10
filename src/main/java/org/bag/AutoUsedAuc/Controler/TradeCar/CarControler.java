package org.bag.AutoUsedAuc.Controler.TradeCar;

import org.bag.AutoUsedAuc.Service.TradeCarServise;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/car")
public class CarControler {

	TradeCarServise tradeCarServise;
	
	@Autowired
	public void setTradeCarServise(TradeCarServise tradeCarServise) {
		this.tradeCarServise = tradeCarServise;
	}
	@GetMapping(path = "")
	public String getCarMain() {
		return "index";
	}
	
	@GetMapping(path = "/{id}")
	public String getCarMain(@PathVariable(name = "id") long id) {
		if(tradeCarServise.getCarById(id).isEmpty())
			return "riderct:/";
		return "index";
	}
	
}
