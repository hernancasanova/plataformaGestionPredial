package com.pgp.services;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.pgp.models.Identifier;

@Service
public interface IIdentifierService {
	public void register(String diio,String date_placement, Long bovine);
	public List<Identifier> diiosBovine(Long Bovine);
}
