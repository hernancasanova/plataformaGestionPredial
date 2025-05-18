package com.pgp.dao;

import java.util.Date;
import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.pgp.dto.BovineDto;
import com.pgp.dto.ChildrenDto;
import com.pgp.models.Bovine;


public interface BovineDao extends JpaRepository<Bovine,Long>{
	//TypedQuery<Collection> query 
    //= entityManager.createQuery(
    //  "SELECT e.phones FROM Employee e", Collection.class);
	//List<Collection> resultList = query.getResultList();
	//siguiente contiene getAge
	@Query(value="SELECT b.ID, b.DATE_SALE as dateSale, b.NAME AS Name, nvl(i.DIIO,'Sin arete') AS Diio, "
			+"i.DATE_PLACEMENT AS datePlacement, b.DATE_BIRTH AS dateBirth, bo.NAME AS Mother, bo.ID AS idMother, "
			+"bov.ID AS idFather, bov.NAME AS Father, "
			+"tb.NAME AS Type, HERNAN.getAge(b.ID) AS age, "
			+"CASE b.INTERNAL_VERIFICATION WHEN 'S' THEN 'SÍ' ELSE 'NO' END as internalVerification, "
			+"CASE b.VERIFIED_SAG WHEN 'S' THEN 'SÍ' ELSE 'NO' END as verifiedSag, b.state, b.MAIN_IMAGE as mainImage FROM HERNAN.BOVINES b "
			+"LEFT JOIN HERNAN.IDENTIFIERS i on b.ID = i.BOVINE_ID JOIN HERNAN.BOVINES bo on b.MOTHER = bo.ID  "
			+"JOIN HERNAN.BOVINES bov on b.father=bov.ID "
			+"JOIN HERNAN.TYPES_BOVINES tb on tb.ID=b.TYPE WHERE (i.STATE='activo' or i.DIIO is NULL )  AND  b.ID <> 0 "
			+"ORDER BY b.ID ASC", nativeQuery=true)
	//@Query(value="SELECT b.ID, b.NAME AS Name, nvl(i.DIIO,'Sin arete') AS Diio, i.DATE_PLACEMENT AS datePlacement, b.DATE_BIRTH AS dateBirth, bo.NAME AS Mother , tb.NAME AS Type FROM HERNAN.BOVINES b LEFT JOIN HERNAN.IDENTIFIERS i on b.ID = i.BOVINE_ID JOIN HERNAN.BOVINES bo on b.MOTHER = bo.ID  JOIN HERNAN.TYPES_BOVINES tb on tb.ID=b.TYPE WHERE b.DATE_SALE IS NULL AND (i.STATE='activo' or i.DIIO is NULL ) AND b.STATE = 'Vivo' AND  b.ID <> 0", nativeQuery=true)
	//@Query(value="SELECT * FROM HERNAN.LISTBOVINES ", nativeQuery=true)
	List<BovineDto> bovinesAndIdentifiers ();
	
//	@Query(value="SELECT b.ID, b.NAME AS Name, nvl(i.DIIO,'Sin arete') AS Diio, i.DATE_PLACEMENT AS datePlacement, b.DATE_BIRTH AS dateBirth, bo.NAME AS Mother , tb.NAME AS Type FROM HERNAN.BOVINES b LEFT JOIN HERNAN.IDENTIFIERS i on b.ID = i.BOVINE_ID JOIN HERNAN.BOVINES bo on b.MOTHER = bo.ID  JOIN HERNAN.TYPES_BOVINES tb on tb.ID=b.TYPE WHERE b.ID = ? AND b.DATE_SALE IS NULL AND (i.STATE='activo' or i.DIIO is NULL ) AND b.STATE = 'Vivo' AND  b.ID <> 0", nativeQuery=true)
//	BovineDto bovineAndIdentifier(Long id);
	
	//@Query(value="SELECT ch.hijos from (SELECT b2.name , LISTAGG(b.name,',') WITHIN GROUP (ORDER BY b.MOTHER) AS hijos FROM HERNAN.BOVINES b JOIN HERNAN.BOVINES b2 ON b.mother=b2.id WHERE b2.id=? GROUP BY b2.name) ch", nativeQuery=true)
	@Query(value="SELECT id, name, main_image as mainImage FROM HERNAN.BOVINES WHERE mother=?", nativeQuery=true)
	List<ChildrenDto> childrenBovine(Long bovine);
	
	@Query(value = "SELECT b.ID, b.DATE_SALE, b.NAME, "
		    + "NVL(i.DIIO, 'Sin arete'), b.SEX, b.TYPE, b.COLOR, "
		    + "i.DATE_PLACEMENT, b.DATE_BIRTH, bo.NAME AS MOTHER, bo.ID AS idMother, "
		    + "bov.ID AS idFather, bov.NAME AS FATHER, "
		    + "TO_CHAR(HERNAN.getAge(b.ID)) AS AGE, "
		    + "CASE b.INTERNAL_VERIFICATION WHEN 'S' THEN 'SÍ' ELSE 'NO' END, "
		    + "CASE b.VERIFIED_SAG WHEN 'S' THEN 'SÍ' ELSE 'NO' END, b.state, b.MAIN_IMAGE "
		    + "FROM HERNAN.BOVINES b "
		    + "LEFT JOIN HERNAN.IDENTIFIERS i ON b.ID = i.BOVINE_ID "
		    + "LEFT JOIN HERNAN.BOVINES bo ON b.MOTHER = bo.ID "
		    + "LEFT JOIN HERNAN.BOVINES bov ON b.FATHER = bov.ID "
		    + "WHERE b.ID = :id AND (i.STATE='activo' or i.DIIO is NULL )", nativeQuery = true)
		Object[] bovineAndIdentifier(@Param("id") Long id);
	
	@Modifying
    @Transactional
    @Query("UPDATE Bovine b SET b.date_death = :date_death, b.state = 'Muerto' WHERE b.id = :id")
    void deleteBovine(Long id, Date date_death);
	
	
}
