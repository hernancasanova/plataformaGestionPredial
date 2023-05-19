package com.pgp;

import java.io.Serializable;

import org.springframework.web.multipart.MultipartFile;

public class Documento implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -4095679937300869755L;
	public String name;
	public String description;
	public int type;
    //public MultipartFile file;
	private String getName() {
		return name;
	}
	private void setName(String name) {
		this.name = name;
	}
	private String getDescription() {
		return description;
	}
	private void setDescription(String description) {
		this.description = description;
	}
	private int getType() {
		return type;
	}
	private void setType(int type) {
		this.type = type;
	}
	
	/*private MultipartFile getFile() {
		return file;
	}
	private void setFile(MultipartFile file) {
		this.file = file;
	}*/
}
