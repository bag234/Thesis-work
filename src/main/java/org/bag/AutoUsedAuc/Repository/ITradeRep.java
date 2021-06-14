package org.bag.AutoUsedAuc.Repository;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.bag.AutoUsedAuc.Object.Trade.Trade;
import org.bag.AutoUsedAuc.Object.User.User;
import org.hibernate.annotations.Parameter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface ITradeRep extends JpaRepository<Trade, Long>{

//	public List<Trade> fi
	
	public List<Trade> findAllBySeller(User seller);
	
	@Query("SELECT t FROM Trade t ORDER BY t.dateRegiste DESC")
	public List<Trade> getLastNewTrade();
	// sql work -> SELECT t FROM Trade t ORDER BY t.dateRegiste
	//SELECT * from (SELECT * FROM TRADE ORDER BY id DESC) LIMIT 4
	
	@Query("SELECT t FROM Trade t WHERE t.dateEnd = ?1 AND t.state = 'CURRENT' AND t.type = 'OPEN'")
	public List<Trade> getOutDateBet( Date date);
	
	@Modifying
	@Query("UPDATE Trade t Set t.state = 'OUTDATE' WHERE t.dateEnd = ?1 AND t.state = 'CURRENT' AND t.type = 'OPEN'")
	public void makeOutDate(Date date);
}
