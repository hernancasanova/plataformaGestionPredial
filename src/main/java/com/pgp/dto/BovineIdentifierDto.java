package com.pgp.dto;

import java.util.Date;

import javax.persistence.Entity;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Getter
//@Entity
public class BovineIdentifierDto {
	
	//public BovineIdentifierDto(int id, String name, String diio, Date datePlacement, Date dateBirth, String mother,
			//int idMother, String father, int idFather, String type, String age, String verifiedSag,
			//String internalVerification, String state, String dateSale) {
	/*public BovineIdentifierDto() {
		super();
		this.id = id;
		this.name = name;
		this.diio = diio;
		this.datePlacement = datePlacement;
		this.dateBirth = dateBirth;
		this.mother = mother;
		this.idMother = idMother;
		this.father = father;
		this.idFather = idFather;
		this.type = type;
		this.age = age;
		this.verifiedSag = verifiedSag;
		this.internalVerification = internalVerification;
		this.state = state;
		this.dateSale = dateSale;
	}*/
	
	
	
	public BovineIdentifierDto() {
		super();
	}


	private int id;
	private String name;
	private String diio;
	private Date datePlacement;
	private Date dateBirth;
	private String mother;
	private int idMother;
	private String father;
	private int idFather;
	private String type;
	private String age;
	private String verifiedSag;
	private String internalVerification;
	private String state;
	private String dateSale;

}
