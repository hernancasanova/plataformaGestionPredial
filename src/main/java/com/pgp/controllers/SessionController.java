package com.pgp.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pgp.services.ILoginService;

@RestController
public class SessionController {
	
	@Autowired
	private ILoginService loginService ;
	
	@PostMapping("/login")
	public boolean login(@RequestParam("username") String username,@RequestParam("password") String password) {
		return loginService.login(username, password);
	}
}
