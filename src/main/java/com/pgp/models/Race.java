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

@Entity
@Table(name="RACES", schema="HERNAN")
public class Race {
	
	@Id
	@Column(name="ID")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQUENCE_RACES")
	@SequenceGenerator(schema = "HERNAN", name = "SEQUENCE_RACES",
    sequenceName = "SEQUENCE_RACES" , allocationSize=1) 
	@Getter
	@Setter
	Long id;
	
	@Getter
	@Setter
	String name;
	
	
	@Getter
	@Setter
	String description;

}
