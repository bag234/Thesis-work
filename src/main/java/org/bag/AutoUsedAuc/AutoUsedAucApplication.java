package org.bag.AutoUsedAuc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class AutoUsedAucApplication {

	public static void main(String[] args) {
		SpringApplication.run(AutoUsedAucApplication.class, args);
	}

}
