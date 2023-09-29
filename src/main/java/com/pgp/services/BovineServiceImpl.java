package com.pgp.services;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pgp.dao.BovineDao;
import com.pgp.dto.BovineDto;
import com.pgp.dto.ChildrenDto;
import com.pgp.models.Bovine;
import com.pgp.models.Identifier;


@Service
public class BovineServiceImpl implements IBovineService{

	
	@Autowired
	private BovineDao bovineDao;
	@Override
	public List<BovineDto> getAll() {
		return (List<BovineDto>)bovineDao.bovinesAndIdentifiers();
		//return (List<BovineDto>)bovineDao.findAll();
	}
	@Override
	public BovineDto get(Long id) {
		 return bovineDao.bovineAndIdentifier(id);
	}
	@Override
	public Bovine findById(Long id) {
		return bovineDao.findById(id).orElse(null);
	}
	
	@Override
	public List<ChildrenDto> getChildren(Long id) {
		return (List<ChildrenDto>)bovineDao.childrenBovine(id);
	}
	
	@Override
	public Long register(Bovine bovine) {
		try {
			Bovine bov = bovineDao.save(bovine);
			bovineDao.flush();
			return bov.getId();
		}catch(Error e) {
			System.out.println("No se pudo guardar por: "+e);
			return null;
		}
	}

}
