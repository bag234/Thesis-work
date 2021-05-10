package org.bag.AutoUsedAuc.Object.Bet;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.bag.AutoUsedAuc.Object.User.User;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Bet {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	long id;
	
	@ManyToOne
	@JsonIgnore
	@JoinColumn(name = "id_better")
	User better;
	
	double count_Bet;
	
	public Bet() {
	}
	
	public Bet(User better, double count) {
		this.better = better;
		this.count_Bet = count;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public User getBetter() {
		return better;
	}

	public void setBetter(User better) {
		this.better = better;
	}

	public double getCount_Bet() {
		return count_Bet;
	}

	public void setCount_Bet(double count_Bet) {
		this.count_Bet = count_Bet;
	}
	
	
}
