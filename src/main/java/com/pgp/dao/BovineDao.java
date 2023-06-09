package com.pgp.dao;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pgp.dto.BovineDto;
import com.pgp.models.Bovine;
import com.pgp.models.Identifier;


public interface BovineDao extends JpaRepository<Bovine,Long>{
	//TypedQuery<Collection> query 
    //= entityManager.createQuery(
      //  "SELECT e.phones FROM Employee e", Collection.class);
  //List<Collection> resultList = query.getResultList();
	@Query(value="SELECT b.NAME AS Name, i.DIIO AS Diio, i.DATE_PLACEMENT AS datePlacement, b.DATE_BIRTH AS dateBirth, bo.NAME AS Mother , b.TYPE AS Type FROM HERNAN.BOVINES b LEFT JOIN HERNAN.IDENTIFIERS i on b.ID = i.BOVINE_ID JOIN HERNAN.BOVINES bo on b.MOTHER = bo.ID WHERE b.DATE_SALE IS NULL AND i.STATE='activo' AND b.STATE = 'Vivo' ", nativeQuery=true)
	List<BovineDto> bovinesAndIdentifiers ();
}
