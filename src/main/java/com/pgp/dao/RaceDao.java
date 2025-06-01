package com.pgp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pgp.models.Bovine;
import com.pgp.models.Race;

public interface RaceDao extends JpaRepository<Race,Long> {

}
