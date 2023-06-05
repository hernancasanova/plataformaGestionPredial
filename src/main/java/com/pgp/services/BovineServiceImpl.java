package com.pgp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pgp.dao.BovineDao;
import com.pgp.models.Bovine;


@Service
public class BovineServiceImpl implements IBovineService{

	
	@Autowired
	private BovineDao bovineDao;
	@Override
	public List<Bovine> getAll() {
		return (List<Bovine>)bovineDao.findAll();
	}

}
