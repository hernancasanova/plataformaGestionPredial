package com.pgp.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pgp.dao.BovineDao;
import com.pgp.dto.BovineDto;
import com.pgp.dto.BovineIdentifierDto;
import com.pgp.dto.ChildrenDto;
import com.pgp.models.Bovine;

@Service
public class BovineServiceImpl implements IBovineService {

	@Autowired
	private BovineDao bovineDao;

	@Override
	public List<BovineDto> getAll() {
		return (List<BovineDto>) bovineDao.bovinesAndIdentifiers();
		// return (List<BovineDto>)bovineDao.findAll();
	}

	@Override
	public BovineIdentifierDto get(Long id) {
		Object[] data = bovineDao.bovineAndIdentifier(id);
		Object[] result = (Object[]) data[0];
		return new BovineIdentifierDto(
		        result[0] != null ? ((Number) result[0]).longValue() : null, // ID
		        (Date) result[1],  // DATE_SALE
		        (String) result[2],  // NAME
		        (String) result[3],  // DIIO
		        (String) result[4],  // SEX
		        result[5] != null ? ((Number) result[5]).longValue() : null, // ID_TYPE
		        (String) result[6],  // COLOR
		        (Date) result[7],  // DATE_PLACEMENT
		        (Date) result[8],  // DATE_BIRTH
		        (String) result[9],  // MOTHER_NAME
		        result[10] != null ? ((Number) result[10]).longValue() : null, // MOTHER_ID
		        result[11] != null ? ((Number) result[11]).longValue() : null, // FATHER_ID
		        (String) result[12],  // FATHER_NAME
		        result[13] != null ? result[13].toString() : null, // AGE (String)
		        (String) result[14],  // INTERNAL_VERIFICATION
		        (String) result[15],  // VERIFIED_SAG
		        (String) result[16],  // STATE
		        result[17] != null ? ((Number) result[17]).longValue() : null  // MAIN_IMAGE
		    );
	}

	@Override
	public Bovine findById(Long id) {
		return bovineDao.findById(id).orElse(null);
	}

	@Override
	public List<ChildrenDto> getChildren(Long id) {
		return (List<ChildrenDto>) bovineDao.childrenBovine(id);
	}

	@Override
	public Long register(Bovine bovine) {
		try {
			Bovine bov = bovineDao.save(bovine);
			bovineDao.flush();
			return bov.getId();
		} catch (Error e) {
			System.out.println("No se pudo guardar por: " + e);
			return null;
		}
	}

	@Override
	public boolean dropBovine() {
		return false;
	}

}
