package com.pgp.models;

import java.io.Serializable;
import java.util.Date;

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
	private static final long serialVersionUID = -528837005481840818L;


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
	public Date date_placement;
	
	
	@Column(name="STATE")
	public String state;
	
	
	private String getDiio() {
		return diio;
	}
	
	
	private void setDiio(String diio) {
		this.diio = diio;
	}
	
	
	private Date getDate_placement() {
		return date_placement;
	}
	
	
	private void setDate_placement(Date date_placement) {
		this.date_placement = date_placement;
	}
	
	
	private String getState() {
		return state;
	}
	
	
	private void setState(String state) {
		this.state = state;
	}
}
