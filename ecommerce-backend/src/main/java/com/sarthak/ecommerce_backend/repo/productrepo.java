package com.sarthak.ecommerce_backend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sarthak.ecommerce_backend.model.product;


@Repository
public interface productrepo extends JpaRepository<product, Integer> {
    @Query("SELECT p FROM product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(p.brand) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(p.category) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<product> findByNameContainingIgnoreCase(@Param("keyword") String keyword);
}
