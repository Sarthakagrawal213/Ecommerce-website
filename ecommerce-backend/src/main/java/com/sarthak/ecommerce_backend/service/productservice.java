package com.sarthak.ecommerce_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.sarthak.ecommerce_backend.model.product;
import com.sarthak.ecommerce_backend.repo.productrepo;

@Service
public class productservice {
    @Autowired 
    private productrepo repo;
    public List<product> getAllProducts() {
       return repo.findAll();
    }
    public product getProductById(int id) {
        return repo.findById(id).orElse(null);
    }
    public product addProduct(product product, MultipartFile image) {
        try {
            // product.setImagename(image.getOriginalFilename());
            // product.setImagetype(image.getContentType());
            // product.setImagedata(image.getBytes());
            return repo.save(product);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save product: " + e.getMessage());
        }
    }
    public void updateProduct(int id, product p) {
        product existingProduct = repo.findById(id).orElse(null);
        if (existingProduct != null) {
            existingProduct.setName(p.getName());
            existingProduct.setDescription(p.getDescription());
            existingProduct.setBrand(p.getBrand());
            existingProduct.setPrice(p.getPrice());
            existingProduct.setCategory(p.getCategory());
            existingProduct.setReleaseDate(p.getReleaseDate());
            existingProduct.setAvailability(p.isAvailability());
            existingProduct.setStockQuantity(p.getStockQuantity());
            if (p.getImagedata() != null && p.getImagedata().length > 0) {
        existingProduct.setImagename(p.getImagename());
        existingProduct.setImagetype(p.getImagetype());
        existingProduct.setImagedata(p.getImagedata());
               }
            repo.save(existingProduct);
        }
    }
    public void deleteProduct(int id) {
        repo.deleteById(id);
    }
    public List<product> searchProducts(String keyword) {
        return repo.findByNameContainingIgnoreCase(keyword);
    }
    
}
