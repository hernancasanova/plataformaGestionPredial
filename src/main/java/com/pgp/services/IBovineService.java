package com.pgp.services;

import java.util.Collection;
import java.util.List;

import com.pgp.dto.BovineDto;
import com.pgp.models.Bovine;
import com.pgp.models.Identifier;

public interface IBovineService {
	//public List<Collection> getAll();
	public Bovine findById(Long id);
	public List<BovineDto> getAll();
	public BovineDto get(Long id);
	public List<String> getChildren(Long id);
	Long register(Bovine bovine);
}
