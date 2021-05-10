package org.bag.AutoUsedAuc.Repository;

import java.util.Optional;

import org.bag.AutoUsedAuc.Object.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRep extends JpaRepository<User, Long> {

	Optional<User> findByLogin(String login);
	
}
