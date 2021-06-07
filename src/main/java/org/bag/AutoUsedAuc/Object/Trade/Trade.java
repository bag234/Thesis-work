package org.bag.AutoUsedAuc.Object.Trade;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.bag.AutoUsedAuc.Object.Bet.Bet;
import org.bag.AutoUsedAuc.Object.User.User;

import com.fasterxml.jackson.annotation.JsonIgnore;
/**
 * Trade Object 
 * 
 * @author bag234
 * 
 */
@Entity
public class Trade {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	long id;
	
	@ManyToOne
	@JsonIgnore
	@JoinColumn(name = "id_seller")
	User seller; 
	
	double price;
	
	double step = 0; // set step of public sell
	
	@ManyToOne
	@JsonIgnore
	@JoinColumn(name = "id_winBet")
	Bet winBet;
	
	@Temporal(TemporalType.DATE)
	Date dateEnd;
	
	@Temporal(TemporalType.DATE)
	Date dateRegiste;
	
	@Enumerated(EnumType.STRING)
	TradeState state;
	
	@Enumerated(EnumType.STRING)
	TradeType type;
	
	public Trade() {
		state = TradeState.CURRENT;
		dateRegiste = new Date(); //set now time on sever
	}

	public Bet getWinBet() {
		return winBet;
	}

	public void setWinBet(Bet winBet) {
		this.winBet = winBet;
	}

	public Date getDateEnd() {
		return dateEnd;
	}

	public void setDateEnd(Date dateEnd) {
		this.dateEnd = dateEnd;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public User getSeller() {
		return seller;
	}

	public void setSeller(User seller) {
		this.seller = seller;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public double getStep() {
		return step;
	}

	public void setStep(double step) {
		this.step = step;
	}

	public Date getDateRegiste() {
		return dateRegiste;
	}

	public void setDateRegiste(Date dateRegiste) {
		this.dateRegiste = dateRegiste;
	}

	public TradeState getState() {
		return state;
	}

	public void setState(TradeState state) {
		this.state = state;
	}

	public TradeType getType() {
		return type;
	}

	public void setType(TradeType type) {
		this.type = type;
	}
	
	
}
