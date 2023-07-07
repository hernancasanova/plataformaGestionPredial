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
	//siguiente contiene getAge
	@Query(value="SELECT b.ID, b.NAME AS Name, nvl(i.DIIO,'Sin arete') AS Diio, i.DATE_PLACEMENT AS datePlacement, b.DATE_BIRTH AS dateBirth, bo.NAME AS Mother , tb.NAME AS Type, HERNAN.getAge(b.ID) AS age FROM HERNAN.BOVINES b LEFT JOIN HERNAN.IDENTIFIERS i on b.ID = i.BOVINE_ID JOIN HERNAN.BOVINES bo on b.MOTHER = bo.ID  JOIN HERNAN.TYPES_BOVINES tb on tb.ID=b.TYPE WHERE b.DATE_SALE IS NULL AND (i.STATE='activo' or i.DIIO is NULL ) AND b.STATE = 'Vivo' AND  b.ID <> 0", nativeQuery=true)
	//@Query(value="SELECT b.ID, b.NAME AS Name, nvl(i.DIIO,'Sin arete') AS Diio, i.DATE_PLACEMENT AS datePlacement, b.DATE_BIRTH AS dateBirth, bo.NAME AS Mother , tb.NAME AS Type FROM HERNAN.BOVINES b LEFT JOIN HERNAN.IDENTIFIERS i on b.ID = i.BOVINE_ID JOIN HERNAN.BOVINES bo on b.MOTHER = bo.ID  JOIN HERNAN.TYPES_BOVINES tb on tb.ID=b.TYPE WHERE b.DATE_SALE IS NULL AND (i.STATE='activo' or i.DIIO is NULL ) AND b.STATE = 'Vivo' AND  b.ID <> 0", nativeQuery=true)
	//@Query(value="SELECT * FROM HERNAN.LISTBOVINES ", nativeQuery=true)
	List<BovineDto> bovinesAndIdentifiers ();
	
	@Query(value="SELECT b.ID, b.NAME AS Name, nvl(i.DIIO,'Sin arete') AS Diio, i.DATE_PLACEMENT AS datePlacement, b.DATE_BIRTH AS dateBirth, bo.NAME AS Mother , tb.NAME AS Type FROM HERNAN.BOVINES b LEFT JOIN HERNAN.IDENTIFIERS i on b.ID = i.BOVINE_ID JOIN HERNAN.BOVINES bo on b.MOTHER = bo.ID  JOIN HERNAN.TYPES_BOVINES tb on tb.ID=b.TYPE WHERE b.ID = ? AND b.DATE_SALE IS NULL AND (i.STATE='activo' or i.DIIO is NULL ) AND b.STATE = 'Vivo' AND  b.ID <> 0", nativeQuery=true)
	BovineDto bovineAndIdentifier(Long id);
}
