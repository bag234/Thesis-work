package org.bag.AutoUsedAuc.Repository;

import java.util.List;

import org.bag.AutoUsedAuc.Object.Trade.Trade;
import org.bag.AutoUsedAuc.Object.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ITradeRep extends JpaRepository<Trade, Long>{

//	public List<Trade> fi
	
	public List<Trade> findAllBySeller(User seller);
	
	@Query("SELECT t FROM Trade t ORDER BY t.dateRegiste DESC")
	public List<Trade> getLastNewTrade();
	// sql work -> SELECT t FROM Trade t ORDER BY t.dateRegiste
	//SELECT * from (SELECT * FROM TRADE ORDER BY id DESC) LIMIT 4
}
