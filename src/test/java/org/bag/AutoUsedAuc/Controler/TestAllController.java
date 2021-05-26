package org.bag.AutoUsedAuc.Controler;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
public class TestAllController {

	@Autowired
	MockMvc mvc;
	
	void testLoginControler() throws Exception {
		mvc.perform(get("/login")).andExpect(status().isOk());
	}
	
	void testRegControler() throws Exception {
		mvc.perform(get("/registartion")).andExpect(status().isOk());
	}

	void testCarsControler() throws Exception {
		mvc.perform(get("/car")).andExpect(status().isOk());
	}
	
}
