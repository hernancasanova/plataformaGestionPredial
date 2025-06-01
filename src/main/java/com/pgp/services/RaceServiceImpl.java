package com.pgp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pgp.dao.RaceDao;
import com.pgp.models.Race;

@Service
public class RaceServiceImpl implements IRaceService {
	
	@Autowired
	private RaceDao raceDao;

	@Override
	public List<Race> findAll() {
		return raceDao.findAll();
	}

}
