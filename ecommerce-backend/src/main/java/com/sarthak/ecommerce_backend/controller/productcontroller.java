package com.sarthak.ecommerce_backend.controller;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sarthak.ecommerce_backend.model.product;
import com.sarthak.ecommerce_backend.service.productservice;
@CrossOrigin(origins = {"http://localhost:5173",
    "https://ecommerce-ui-qzbn.onrender.com/"}
)
@RestController
@RequestMapping("/api")
public class productcontroller {
    
    @Autowired
    private  productservice servie;

    @RequestMapping("/")
    public String getProducts() {
        return "List of products";
    }

    @GetMapping("/products")
    public List<product> getAllProducts() {
        return servie.getAllProducts();
        
    }
    
    @GetMapping("/products/{id}")
    public product getProductById(@PathVariable int id) {
        return servie.getProductById(id);
    }
   @PostMapping("/products/add")
public ResponseEntity<?> addProduct(
        @RequestParam("name") String name,
        @RequestParam("description") String description,
        @RequestParam("brand") String brand,
        @RequestParam("price") BigDecimal price,
        @RequestParam("category") String category,
        @RequestParam("releaseDate") String releaseDate,
        @RequestParam("availability") boolean availability,
        @RequestParam("stockQuantity") int stockQuantity,
        @RequestParam("image") MultipartFile image) {

    try {

        product p = new product();

        p.setName(name);
        p.setDescription(description);
        p.setBrand(brand);
        p.setPrice(price);
        p.setCategory(category);

        p.setReleaseDate(
            new SimpleDateFormat("yyyy-MM-dd")
                .parse(releaseDate)
        );

        p.setAvailability(availability);
        p.setStockQuantity(stockQuantity);

        p.setImagename(image.getOriginalFilename());
        p.setImagetype(image.getContentType());
        p.setImagedata(image.getBytes());

        return new ResponseEntity<>(
                servie.addProduct(p, image),
                HttpStatus.OK);

    } catch (Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>(
                e.getMessage(),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
@GetMapping("/products/{id}/image")
public ResponseEntity<byte[]> getImage(@PathVariable int id) {

    product p = servie.getProductById(id);

    return ResponseEntity.ok()
            .contentType(MediaType.valueOf(p.getImagetype()))
            .body(p.getImagedata());
}
@PutMapping("/products/{id}/update")
public ResponseEntity<String> updateProduct(
        @PathVariable int id,
        @RequestParam("name") String name,
        @RequestParam("description") String description,
        @RequestParam("brand") String brand,
        @RequestParam("price") BigDecimal price,
        @RequestParam("category") String category,
        @RequestParam("releaseDate") String releaseDate,
        @RequestParam("availability") boolean availability,
        @RequestParam("stockQuantity") int stockQuantity,
        @RequestPart(value = "image", required = false) MultipartFile image) {

    try {
        product p = new product();

        p.setName(name);
        p.setDescription(description);
        p.setBrand(brand);
        p.setPrice(price);
        p.setCategory(category);

        p.setReleaseDate(
            new SimpleDateFormat("yyyy-MM-dd")
                .parse(releaseDate)
        );

        p.setAvailability(availability);
        p.setStockQuantity(stockQuantity);

        if (image != null && !image.isEmpty()) {
            p.setImagename(image.getOriginalFilename());
            p.setImagetype(image.getContentType());
            p.setImagedata(image.getBytes());
        }

        servie.updateProduct(id, p);

        return new ResponseEntity<>("Product updated successfully", HttpStatus.OK);

    } catch (Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
  @DeleteMapping("/products/{id}/delete")
    public ResponseEntity<String> deleteProduct(@PathVariable int id) {
        try {
            servie.deleteProduct(id);
            return new ResponseEntity<>("Product deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/products/search")
    public ResponseEntity<List<product>> searchProducts(
        @RequestParam String keyword) {

        List<product> products = servie.searchProducts(keyword);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
}