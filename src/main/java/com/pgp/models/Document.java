package com.pgp.models;

import java.io.Serializable;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;



@Entity
@Table(name="DOCUMENTS", schema="HERNAN")
public class Document implements Serializable{

	@Column(name="NAME")
	public String name;
	
	@Id
	@Column(name="ID")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQUENCE_DOCUMENT")
	@SequenceGenerator(schema = "HERNAN", name = "SEQUENCE_DOCUMENT",
    sequenceName = "SEQUENCE_DOCUMENT" , allocationSize=1)  
	public Long id;
	
	
	@Column(name="DESCRIPTION")
	public String description;
	
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	@Column(name="TYPE")
	public int type;
	
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
