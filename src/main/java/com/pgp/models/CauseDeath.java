package com.pgp.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity(name="DEATH_CAUSES")
@Table(name="DEATH_CAUSES", schema="HERNAN")
public class CauseDeath {
	
	@Id
	@Column(name="ID")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQUENCE_ANIMALS")
	@SequenceGenerator(schema = "HERNAN", name = "SEQUENCE_ANIMALS",
    sequenceName = "SEQUENCE_ANIMALS" , allocationSize=1) 
	@Getter
	@Setter
	Long id;
	
	@Getter
	@Setter
	String name;
	
	
	@Getter
	@Setter
	String Description;

}
