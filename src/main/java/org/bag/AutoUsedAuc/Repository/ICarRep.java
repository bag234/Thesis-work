package org.bag.AutoUsedAuc.Repository;

import org.bag.AutoUsedAuc.Object.Car.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICarRep extends JpaRepository<Car, Long>{

}
