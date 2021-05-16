package org.bag.AutoUsedAuc.Controler.Api.Image;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

import org.bag.AutoUsedAuc.Service.Image.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(path = "/api/Image")
public class ImageApiControler {

	ImageService imageServ;
	
	@Autowired
	public void setImageServ(ImageService imageServ) {
		this.imageServ = imageServ;
	}
	
	@GetMapping(path = "/{token}", produces = {"image/png", "image/jpg"})
	public @ResponseBody byte[] getImage(@PathVariable(name="token") String token) throws IOException {
		InputStream in = new FileInputStream(imageServ.getFile(token));
		return in.readAllBytes();
	}
	@PostMapping()
	public String loadImage(@RequestParam(name = "file") MultipartFile mFile) throws IOException {
		return imageServ.save(mFile);
	}
	
}
