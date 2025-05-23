package com.pgp.services;

import java.util.List;

import com.pgp.dto.BovineDto;
import com.pgp.dto.BovineIdentifierDto;
import com.pgp.dto.ChildrenDto;
import com.pgp.models.Bovine;

public interface IBovineService {
	//public List<Collection> getAll();
	public Bovine findById(Long id);
	public List<BovineDto> getAll();
	public BovineIdentifierDto get(Long id);
	public List<ChildrenDto> getChildren(Long id);
	Long register(Bovine bovine);
	public void deleteBovine(Long id);
}
