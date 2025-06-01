package com.pgp.models;

import java.io.Serializable;
import java.sql.Date;
//import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name="BOVINES", schema="HERNAN")
public class Bovine implements Serializable{
	
	@Id
	@Column(name="ID")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQUENCE_BOVINES")
	@SequenceGenerator(schema = "HERNAN", name = "SEQUENCE_BOVINES",
    sequenceName = "SEQUENCE_BOVINES" , allocationSize=1)  
	public Long id;
	
	
	@OneToMany(mappedBy="bovine")
    private Set<Identifier> identifiers;
	
	
	@Column(name="NAME")
	public String name;
	
	
	/* public List<Identifier> getIdentifiers() {
	 	return identifiers;
	 }

	 public void setIdentifiers(List<Identifier> identifiers) {
	 	this.identifiers = identifiers;
	}*/

	//@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd/yyyy")
	@JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss")
	@Column(name="DATE_BIRTH")
	public Date date_birth;
	

	@Column(name="SEX")
	public String sex;
	
	
	@Column(name="TYPE")
	public int type;
	
	
	@Column(name="MOTHER")
	public int mother;
	
	
	@Column(name="FATHER")
	public int father;
	
	
	@Column(name="COLOR")
	public String color;
	
	
	@Column(name="RACE")
	public int race;
	
	
	@Column(name="STATE")
	public String state;
	
	
	//@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd/yyyy")
	@JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss")
	@Column(name="DATE_SALE")
	public Date date_sale;
	
	
	@JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss")
	@Column(name="DATE_DEATH")
	public Date date_death;
	
	
	@Column(name="INTERNAL_VERIFICATION", columnDefinition="char(1)")
	public String internal_verification;
	
	public String getInternal_verification() {
		return internal_verification;
	}

	public void setInternal_verification(String internal_verification) {
		this.internal_verification = internal_verification;
	}

	@Column(name="VERIFIED_SAG", columnDefinition="char(1)")
	public String verified_sag;
	
	
	@Column(name="MAIN_IMAGE")
	public int main_image;
	

	public String getVerified_sag() {
		return verified_sag;
	}

	public void setVerified_sag(String verified_sag) {
		this.verified_sag = verified_sag;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getMain_image() {
		return main_image;
	}

	public void setMain_image(int main_image) {
		this.main_image = main_image;
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = -3820871765353092485L;
}
