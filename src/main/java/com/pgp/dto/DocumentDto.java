package com.pgp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public interface DocumentDto {
	@JsonProperty(value = "Name")
	String getName();
	@JsonProperty(value = "Description")
	String getDescription();
	@JsonProperty(value = "Type")
	String getType();
}
