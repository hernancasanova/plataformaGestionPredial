package com.pgp.models;

import java.io.Serializable;
//import java.util.Date;
import java.sql.Date;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;


@Entity
@Table(name="IDENTIFIERS", schema="HERNAN")
public class Identifier implements Serializable{
	
	


	/**
	 * 
	 */
	private static final long serialVersionUID = 2034674840461817925L;


	@Id
	/*@Column(name="ID")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQUENCE_DOCUMENT")
	@SequenceGenerator(schema = "HERNAN", name = "SEQUENCE_DOCUMENT",
    sequenceName = "SEQUENCE_DOCUMENT" , allocationSize=1)*/  
	@Column(name="DIIO")
	public String diio;
	
	
	//@Column(name="BOVINE_ID")
	@ManyToOne
    @JoinColumn(name="BOVINE_ID", nullable=false)
	public Bovine bovine;
	
	
	@Column(name="DATE_PLACEMENT")
	public LocalDateTime date_placement;
	
	
	public Bovine getBovine() {
		return bovine;
	}


	public void setBovine(Bovine bovine) {
		this.bovine = bovine;
	}


	@Column(name="STATE")
	public String state;
	
	
	public String getDiio() {
		return diio;
	}
	
	
	public void setDiio(String diio) {
		this.diio = diio;
	}
	
	
	public LocalDateTime getDate_placement() {
		return date_placement;
	}
	
	
	public void setDate_placement(LocalDateTime date_placement) {
		this.date_placement = date_placement;
	}
	
	
	public String getState() {
		return state;
	}
	
	
	public void setState(String state) {
		this.state = state;
	}
}
