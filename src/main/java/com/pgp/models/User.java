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
@Table(name="USERS", schema="HERNAN")
public class User implements Serializable{
	
	@Id
	@Column(name="ID")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQUENCE_USERS")
	@SequenceGenerator(schema = "HERNAN", name = "SEQUENCE_USERS",
    sequenceName = "SEQUENCE_USERS" , allocationSize=1)  
	public Long id;
	
	@Column(name="NAME")
	public String email;
	
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}



	@Column(name="PASSWORD")
	public String password;
	
	
	//public String password;
	
	
	public Long getId() {
		return id;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setId(Long id) {
		this.id = id;
	}

	

	/**
	 * 
	 */
	private static final long serialVersionUID = -3820871765353092485L;

}
