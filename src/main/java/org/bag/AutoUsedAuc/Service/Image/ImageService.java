package org.bag.AutoUsedAuc.Service.Image;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Random;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImageService {
	
	@Value("${org.bag.AutoUsedAuc.image.path}")
	String imagePath;
	
	@Value("${org.bag.AutoUsedAuc.image.errImg}")
	String errorPath;
	
	@Value("${org.bag.AutoUsedAuc.image.token}")
    String targetStringLength;
    
	int leftLimit = 48;
    int rightLimit = 122; 
    
	Random random = new Random();
	
	String getNewStringPath() {
		String str;
		while (true) {
			str = random.ints(leftLimit, rightLimit + 1)
		      .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
		      .limit(Integer.parseInt(targetStringLength))
		      .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
		      .toString();
			System.out.println("[ImageService.Token] " + str);
			return str;
		}
		
	}
	
	public String save(MultipartFile mfile) throws IOException {
		String token = getNewStringPath();
		File file = new File(imagePath + token);
		file.createNewFile();
		OutputStream out = new FileOutputStream(file);
		out.write(mfile.getBytes());
		out.close();
		return token;
	}
	
	public File getFile(String token) {
		File f = new File(imagePath+token);
		if (!f.isFile()) {
			f = new File(errorPath);
		}
		return f;
	}
}
