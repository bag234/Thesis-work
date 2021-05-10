package org.bag.AutoUsedAuc.Repository;

import org.bag.AutoUsedAuc.Object.Trade.Trade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITradeRep extends JpaRepository<Trade, Long>{

}
