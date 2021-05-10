package org.bag.AutoUsedAuc.Controler.Api.CarTrade;

import org.bag.AutoUsedAuc.Object.Car.TypeBodyCar;
import org.bag.AutoUsedAuc.Object.Car.TypeDriveUnitCar;
import org.bag.AutoUsedAuc.Object.Car.TypeHeadLightCar;
import org.bag.AutoUsedAuc.Object.Car.TypeMediaCar;
import org.bag.AutoUsedAuc.Object.Car.TypeMotorCar;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/get")
public class GerCarEnum {

	@GetMapping(path = "/TypeBody",produces = "application/hal+json")
	public TypeBodyCar[] getTypeBody(){
		return TypeBodyCar.values();
	}
	
	@GetMapping(path = "/TypeDriveUnit",produces = "application/hal+json")
	public TypeDriveUnitCar[] getTypeDriveUnit(){
		return TypeDriveUnitCar.values();
	}
			
	@GetMapping(path = "/TypeHeadLight",produces = "application/hal+json")
	public TypeHeadLightCar[] getTypeHeadLight(){
		return TypeHeadLightCar.values();
	}
	
	@GetMapping(path = "/TypeMedia",produces = "application/hal+json")
	public TypeMediaCar[] getTypeMedia(){
		return TypeMediaCar.values();
	}
	
	@GetMapping(path = "/TypeMotor",produces = "application/hal+json")
	public TypeMotorCar[] getTypeMotor(){
		return TypeMotorCar.values();
	}
}
