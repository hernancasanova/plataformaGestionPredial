package com.pgp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pgp.dao.CauseDeathDao;
import com.pgp.models.CauseDeath;


@Service
public class CauseDeathServiceImpl implements ICauseDeathService {
	
	@Autowired
	private CauseDeathDao cause_death;
	@Override
	public List<CauseDeath> findAll() {
		return cause_death.findAll();
	}

}
