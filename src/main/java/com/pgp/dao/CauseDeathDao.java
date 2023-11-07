package com.pgp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pgp.models.CauseDeath;

public interface CauseDeathDao extends JpaRepository<CauseDeath, Long> {

}
