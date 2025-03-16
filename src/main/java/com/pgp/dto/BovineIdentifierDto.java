package com.pgp.dto;

import java.util.Date;

import javax.persistence.Entity;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
//No funcionan las siguientes anotaciones
//@Data
//@Setter
//@Entity
public class BovineIdentifierDto {
	
	
	
	
	
	public BovineIdentifierDto() {
		super();
	}


	public Long id;
	public Date dateSale;
	public String name;
	public String diio;
	public String sex;
	public Long type;
	public String color;
	public Date datePlacement;
	public Date dateBirth;
	public String mother;
	public Long idMother;
	public Long idFather;
	public String father;
	public String age;
	public String internalVerification;
	public String verifiedSag;
	public String state;
	public Long mainImage;
	
	
	public BovineIdentifierDto(Long id, Date dateSale, String name, String diio, String sex, Long idType, String color,
			Date datePlacement, Date dateBirth, String mother, Long idMother, Long idFather, String father, String age,
			String internalVerification, String verifiedSag, String state, Long mainImage) {
		super();
		this.id = id;
		this.dateSale = dateSale;
		this.name = name;
		this.diio = diio;
		this.sex = sex;
		this.type = idType;
		this.color = color;
		this.datePlacement = datePlacement;
		this.dateBirth = dateBirth;
		this.mother = mother;
		this.idMother = idMother;
		this.idFather = idFather;
		this.father = father;
		this.age = age;
		this.internalVerification = internalVerification;
		this.verifiedSag = verifiedSag;
		this.state = state;
		this.mainImage = mainImage;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public Date getDateSale() {
		return dateSale;
	}


	public void setDateSale(Date dateSale) {
		this.dateSale = dateSale;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getDiio() {
		return diio;
	}


	public void setDiio(String diio) {
		this.diio = diio;
	}


	public String getSex() {
		return sex;
	}


	public void setSex(String sex) {
		this.sex = sex;
	}


	public Long getIdType() {
		return type;
	}


	public void setIdType(Long idType) {
		this.type = idType;
	}


	public String getColor() {
		return color;
	}


	public void setColor(String color) {
		this.color = color;
	}


	public Date getDatePlacement() {
		return datePlacement;
	}


	public void setDatePlacement(Date datePlacement) {
		this.datePlacement = datePlacement;
	}


	public Date getDateBirth() {
		return dateBirth;
	}


	public void setDateBirth(Date dateBirth) {
		this.dateBirth = dateBirth;
	}


	public String getMother() {
		return mother;
	}


	public void setMother(String mother) {
		this.mother = mother;
	}


	public Long getIdMother() {
		return idMother;
	}


	public void setIdMother(Long idMother) {
		this.idMother = idMother;
	}


	public Long getIdFather() {
		return idFather;
	}


	public void setIdFather(Long idFather) {
		this.idFather = idFather;
	}


	public String getFather() {
		return father;
	}


	public void setFather(String father) {
		this.father = father;
	}


	public String getAge() {
		return age;
	}


	public void setAge(String age) {
		this.age = age;
	}


	public String getInternalVerification() {
		return internalVerification;
	}


	public void setInternalVerification(String internalVerification) {
		this.internalVerification = internalVerification;
	}


	public String getVerifiedSag() {
		return verifiedSag;
	}


	public void setVerifiedSag(String verifiedSag) {
		this.verifiedSag = verifiedSag;
	}


	public String getState() {
		return state;
	}


	public void setState(String state) {
		this.state = state;
	}


	public Long getMainImage() {
		return mainImage;
	}


	public void setMainImage(Long mainImage) {
		this.mainImage = mainImage;
	}
	
	
	
	
	
	
	
	
}
