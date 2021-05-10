package org.bag.AutoUsedAuc.Controler.TradeCar;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(path = "/addCar")
public class AddTradeCarContoler {
	
	@GetMapping
	public String getAddTradeCarActivity() {
		return "index";
	}
	
}
