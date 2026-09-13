package com.sathavahana.kalamkari.service;
import com.sathavahana.kalamkari.dto.*; import com.sathavahana.kalamkari.repository.*; import org.springframework.stereotype.Service; import java.util.*;
@Service public class CatalogService {
 private final ProductRepository products; private final CategoryRepository categories;
 public CatalogService(ProductRepository p,CategoryRepository c){products=p;categories=c;}
 public List<ProductDto> products(){return products.findAllByActiveTrue().stream().map(ProductDto::of).toList();}
 public ProductDto product(String slug){return products.findBySlugAndActiveTrue(slug).map(ProductDto::of).orElseThrow(()->new NotFoundException("Product not found"));}
 public List<CategoryDto> categories(){return categories.findAll().stream().map(CategoryDto::of).toList();}
 public CategoryDto category(String slug){return categories.findBySlug(slug).map(CategoryDto::of).orElseThrow(()->new NotFoundException("Category not found"));}
}
