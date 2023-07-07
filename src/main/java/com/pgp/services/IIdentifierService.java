package com.pgp.services;

import java.time.LocalDateTime;
import java.util.Date;

import com.pgp.models.Identifier;

public interface IIdentifierService {
	public void register(String diio,String date_placement, Long bovine);
}
