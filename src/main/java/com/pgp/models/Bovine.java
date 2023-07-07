package com.pgp.models;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;
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

@Entity(name="BOVINES")
@Table(name="BOVINES", schema="HERNAN")
public class Bovine implements Serializable{
	
	@Id
	@Column(name="ID")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQUENCE_ANIMALS")
	@SequenceGenerator(schema = "HERNAN", name = "SEQUENCE_ANIMALS",
    sequenceName = "SEQUENCE_ANIMALS" , allocationSize=1)  
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
	
	
	@Column(name="COLOR")
	public String color;
	
	
	@Column(name="STATE")
	public String state;
	
	
	//@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd/yyyy")
	@JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss")
	@Column(name="DATE_SALE")
	public Date date_sale;
	
	
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

	/**
	 * 
	 */
	private static final long serialVersionUID = -3820871765353092485L;
}
