package org.bag.AutoUsedAuc.Service.Mail;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.bag.AutoUsedAuc.Object.Car.Car;
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
	
	@Async
	public void mailChangeNameSend(String email, String name) {
		MimeMessage miMes = mailSender.createMimeMessage();
		MimeMessageHelper mimeMes;
		try {
			mimeMes = new MimeMessageHelper(miMes,true, "UTF-8");
			String htmlMail ="Добрый день. <br/> Ваше имя было изменно. На " + name;
			miMes.setContent(htmlMail, "text/html; charset=UTF-8");
			mimeMes.setTo(email);
			mimeMes.setSubject("Новое имя");
			mailSender.send(miMes);
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@Async
	public void mailWinBetPasswordSend(String email, Car car){
		MimeMessage miMes = mailSender.createMimeMessage();
		MimeMessageHelper mimeMes;
		try {
			mimeMes = new MimeMessageHelper(miMes,true, "UTF-8");
			String htmlMail ="Добрый день. <br/> Вы выйгарали в аукционне: "+ linkApp+"car/" + car.getId() +"<br/> Контакт для связи с продовцом: " + car.getTrade().getSeller().geteMail();
			miMes.setContent(htmlMail, "text/html; charset=UTF-8");
			mimeMes.setTo(email);
			mimeMes.setSubject("Вы выйграли аукцион");
			mailSender.send(miMes);
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@Async
	public void mailEndBetPasswordSend(String email, Car car){
		MimeMessage miMes = mailSender.createMimeMessage();
		MimeMessageHelper mimeMes;
		try {
			mimeMes = new MimeMessageHelper(miMes,true, "UTF-8");
			String htmlMail;
			if (car.getTrade().getWinBet() != null) 
				htmlMail ="Добрый день. <br/> Ваш торг закончелся: " + linkApp+"car/" + car.getId() + 
						"<br/> Финальная цена: " + car.getTrade().getWinBet().getCount_Bet() + "<br/> Контакт для связи с покупателем:" + 
			car.getTrade().getWinBet().getBetter().geteMail();
			else
				htmlMail ="Добрый день. <br/> Ваш торг закончелся: " + linkApp+"car/" + car.getId() + "<br/> На ваш торг не был не кому интересен";
			miMes.setContent(htmlMail, "text/html; charset=UTF-8");
			mimeMes.setTo(email);
			mimeMes.setSubject("Ващ аукцион закончился");
			mailSender.send(miMes);
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@Async
	public void mailChangePasswordSend(String email){
		MimeMessage miMes = mailSender.createMimeMessage();
		MimeMessageHelper mimeMes;
		try {
			mimeMes = new MimeMessageHelper(miMes,true, "UTF-8");
			String htmlMail ="Добрый день. <br/> Ваш пароль был изменн.";
			miMes.setContent(htmlMail, "text/html; charset=UTF-8");
			mimeMes.setTo(email);
			mimeMes.setSubject("Обновили пароль");
			mailSender.send(miMes);
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	@Async
	public void mailChangeeMailSend(String email, String neweMail){
		MimeMessage miMes = mailSender.createMimeMessage();
		MimeMessageHelper mimeMes;
		try {
			mimeMes = new MimeMessageHelper(miMes,true, "UTF-8");
			String htmlMail ="Добрый день. <br/> Ваше почта было изменно. На " + neweMail;
			miMes.setContent(htmlMail, "text/html; charset=UTF-8");
			mimeMes.setTo(email);
			mimeMes.setSubject("Новая почта");
			mailSender.send(miMes);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
		
	}
}
