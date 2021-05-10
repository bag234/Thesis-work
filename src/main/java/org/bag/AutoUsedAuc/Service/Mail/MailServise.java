package org.bag.AutoUsedAuc.Service.Mail;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class MailServise {

	JavaMailSender mailSender;
	
	@Value("${org.bag.AutoUsedAuc.link}")
	String linkApp;
	
	@Autowired
	public void setMailSender(JavaMailSender mailSender) {
		this.mailSender = mailSender;
	}
	
	@Async
	public void mailCodeSend(String email, String code) throws MessagingException {
		MimeMessage miMes = mailSender.createMimeMessage();
		MimeMessageHelper mimeMes = new MimeMessageHelper(miMes,true, "UTF-8");
		String htmlMail ="<a href=\""+linkApp+"mail/"+code+"\">Mail Check link</a><hr><p> CODE: "+code+"</p>";
		miMes.setContent(htmlMail, "text/html");
		mimeMes.setTo(email);
		mimeMes.setSubject("Activate link");
		mailSender.send(miMes);
	}
	
}
