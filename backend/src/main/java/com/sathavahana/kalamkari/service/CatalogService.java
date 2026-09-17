package com.sathavahana.kalamkari.service;
import com.sathavahana.kalamkari.dto.*; import com.sathavahana.kalamkari.repository.*; import org.springframework.stereotype.Service; import org.springframework.transaction.annotation.Transactional; import java.util.*;
@Service public class CatalogService {
 private final ProductRepository products; private final CategoryRepository categories;
 public CatalogService(ProductRepository p,CategoryRepository c){products=p;categories=c;}
 @Transactional(readOnly = true)
 public List<ProductDto> products(){return products.findAllByActiveTrue().stream().map(ProductDto::of).toList();}
 @Transactional(readOnly = true)
 public ProductDto product(String slug){return products.findBySlugAndActiveTrue(slug).map(ProductDto::of).orElseThrow(()->new NotFoundException("Product not found"));}
 @Transactional(readOnly = true)
 public List<CategoryDto> categories(){return categories.findAll().stream().map(CategoryDto::of).toList();}
 @Transactional(readOnly = true)
 public CategoryDto category(String slug){return categories.findBySlug(slug).map(CategoryDto::of).orElseThrow(()->new NotFoundException("Category not found"));}
}
