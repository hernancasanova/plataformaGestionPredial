package com.pgp.dto;

import java.util.Date;


public interface BovineDto{
	/**
	 * 
	 */
	//private static final long serialVersionUID = 8399661511077616106L;
	//@Query(value="SELECT b.NAME, i.DIIO, i.DATE_PLACEMENT, b.DATE_BIRTH, bo.NAME AS MOTHER, b.TYPE FROM HERNAN.BOVINES b LEFT JOIN HERNAN.IDENTIFIERS i on b.ID = i.BOVINE_ID JOIN HERNAN.BOVINES bo on b.MOTHER = bo.ID ", nativeQuery=true)
	/*public String name;
	public String diio;
	public Date date_placement;
	public Date date_birth;
	public String mother;
	public int type;*/
	int  getId();
	String getName();
	String getDiio();
	Date getDatePlacement();
	Date getDateBirth();
	String getMother();
	int getIdMother();
	String getFather();
	int getIdFather();
	String getType();
	String getAge();
	String getVerifiedSag();
	String getInternalVerification();
	String getState();
	String getDateSale();
	int getMainImage();
	String getSex();
	//int getIdType();
	//String getColor();
	
}
