package org.bag.AutoUsedAuc.Object.Car;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToOne;

import org.bag.AutoUsedAuc.Object.Trade.Trade;

@Entity
public class Car {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	
	@ElementCollection(targetClass = TypeBodyCar.class)
	@Enumerated(EnumType.STRING)
	@JoinTable(name = "car_typebody")
	Set<TypeBodyCar> typeBodyCar;
	
	@ElementCollection(targetClass = TypeDriveUnitCar.class)
	@Enumerated(EnumType.STRING)
	@JoinTable(name = "car_typedriveunit")
	Set<TypeDriveUnitCar> typeDriveUnitCar;
	
	@ElementCollection(targetClass = TypeMotorCar.class)
	@Enumerated(EnumType.STRING)
	@JoinTable(name = "car_typemotor")
	Set<TypeMotorCar> typeMotorCar;
	
	boolean transmisionType; // transmision type: true - auto, false - mehanical
	
	String brand;
	
	String model;
	
	String gen;
	
	String description;
	
	int year;
	
	double volume;
	
	@OneToOne
	@JoinColumn(name = "id_trade")
	Trade trade;
	
	long milage; //
	
	StateCar state;
	
	@ElementCollection(targetClass = TypeHeadLightCar.class)
	@Enumerated(EnumType.STRING)
	@JoinTable(name = "car_typeheadlight")
	Set<TypeHeadLightCar> typeHeadLightCar;
	
	@ElementCollection(targetClass = TypeMediaCar.class)
	@Enumerated(EnumType.STRING)
	@JoinTable(name = "car_typeMedia")
	Set<TypeMediaCar> typeMediaCar;
	
	boolean isAutoRunMotor;
	
	@ElementCollection
	List<String> imagesPath;
	
	public Car() {
		typeBodyCar = new HashSet<TypeBodyCar>();
		typeDriveUnitCar = new HashSet<TypeDriveUnitCar>();
		typeMotorCar = new HashSet<TypeMotorCar>();
		typeHeadLightCar = new HashSet<TypeHeadLightCar>();
		typeMediaCar = new HashSet<TypeMediaCar>();
		imagesPath = new ArrayList<String>();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Set<TypeBodyCar> getTypeBodyCar() {
		return typeBodyCar;
	}

	public void setTypeBodyCar(Set<TypeBodyCar> typeBodyCar) {
		this.typeBodyCar = typeBodyCar;
	}

	public Set<TypeDriveUnitCar> getTypeDriveUnitCar() {
		return typeDriveUnitCar;
	}

	public void setTypeDriveUnitCar(Set<TypeDriveUnitCar> typeDriveUnitCar) {
		this.typeDriveUnitCar = typeDriveUnitCar;
	}

	public Set<TypeMotorCar> getTypeMotorCar() {
		return typeMotorCar;
	}

	public void setTypeMotorCar(Set<TypeMotorCar> typeMotorCar) {
		this.typeMotorCar = typeMotorCar;
	}

	public boolean isTransmisionType() {
		return transmisionType;
	}

	public void setTransmisionType(boolean transmisionType) {
		this.transmisionType = transmisionType;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public String getGen() {
		return gen;
	}

	public void setGen(String gen) {
		this.gen = gen;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public double getVolume() {
		return volume;
	}

	public void setVolume(double volume) {
		this.volume = volume;
	}

	public Trade getTrade() {
		return trade;
	}

	public void setTrade(Trade trade) {
		this.trade = trade;
	}

	public long getMilage() {
		return milage;
	}

	public void setMilage(long milage) {
		this.milage = milage;
	}

	public StateCar getState() {
		return state;
	}

	public void setState(StateCar state) {
		this.state = state;
	}

	public Set<TypeHeadLightCar> getTypeHeadLightCar() {
		return typeHeadLightCar;
	}

	public void setTypeHeadLightCar(Set<TypeHeadLightCar> typeHeadLightCar) {
		this.typeHeadLightCar = typeHeadLightCar;
	}

	public Set<TypeMediaCar> getTypeMediaCar() {
		return typeMediaCar;
	}

	public void setTypeMediaCar(Set<TypeMediaCar> typeMediaCar) {
		this.typeMediaCar = typeMediaCar;
	}

	public boolean isAutoRunMotor() {
		return isAutoRunMotor;
	}

	public void setAutoRunMotor(boolean isAutoRunMotor) {
		this.isAutoRunMotor = isAutoRunMotor;
	}

	public List<String> getImagesPath() {
		return imagesPath;
	}

	public void setImagesPath(List<String> imagesPath) {
		this.imagesPath = imagesPath;
	}
	
}
