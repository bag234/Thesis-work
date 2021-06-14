package org.bag.AutoUsedAuc.Repository;

import java.util.List;
import java.util.Optional;

import org.bag.AutoUsedAuc.Object.Car.Car;
import org.bag.AutoUsedAuc.Object.Trade.Trade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository

public interface ICarRep extends JpaRepository<Car, Long>{
	
	Optional<Car> findByTrade(Trade trade);
	
	@Query(value = "SELECT c FROM Car c Where c.trade.state = 'CURRENT'")
	List<Car> findAllNotCancelCar();
	@Query(value = "SELECT c FROM Car c ORDER BY c.trade.dateRegiste DESC")
	List<Car> getAllNewCar();
	@Query(value = "SELECT c FROM Car c WHERE c.trade.type='OPEN' ORDER BY c.trade.dateEnd DESC ")
	List<Car> getAllEndDateCar();

}
