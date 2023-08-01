package com.pgp.clients;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.pgp.models.Identifier;

//import com.identifiers.models.Identifier;

@FeignClient(name="pgp-identifiers", url="8007")
public interface IdentifiersRestClient {
	@GetMapping(value="/identifiers/bovine/{bovine}")
	public List<Identifier> diioBovine(@PathVariable Long bovine);
}
