package com.pgp.services;

import java.io.IOException;
import java.nio.file.Path;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pgp.clients.IdentifiersRestClient;
import com.pgp.dao.BovineDao;
import com.pgp.dao.IdentifierDao;
import com.pgp.models.Bovine;
import com.pgp.models.Document;
import com.pgp.models.Identifier;

//import antlr.collections.List;

@Service
public class IdentifierServiceImpl implements IIdentifierService{
	//IdentifierDao
	@Autowired
	private BovineDao bovineDao; 
	
	@Autowired
	private IdentifierDao identifierDao; 
	
	@Autowired
	private IdentifiersRestClient identifierRestClient;
	
	@Transactional
	@Override
	public void register(String diio,String date_placement,Long bovine) {
		List <Identifier> identifiersList = new ArrayList<Identifier>();
		String pattern = "yyyy-MM-dd'T'HH:mm:ss";
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
		LocalDateTime dateTime = LocalDateTime.parse(date_placement, formatter);
		Bovine bov=bovineDao.findById(bovine).orElse(null);
		identifierDao.desactivateDiios(bov.getId());
		Identifier identifier=new Identifier();
		identifier.setDate_placement(dateTime);
		identifier.setDiio(diio);
		identifier.setState("activo");
		//identifierDao.save(identifier)
		identifier.setBovine(bov);
		identifierDao.save(identifier);
		identifiersList.add(identifier);
		//bov.setIdentifiers(identifiersList);
		
	}


	@Override
	public List<Identifier> diiosBovine(Long Bovine) {
		return identifierRestClient.diioBovine(Bovine);
	}
}
