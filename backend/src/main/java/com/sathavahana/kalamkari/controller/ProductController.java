package com.sathavahana.kalamkari.controller;
import com.sathavahana.kalamkari.dto.*; import com.sathavahana.kalamkari.service.CatalogService; import org.springframework.web.bind.annotation.*; import java.util.*;
@RestController @RequestMapping("/api/v1/products") public class ProductController { private final CatalogService catalog; public ProductController(CatalogService c){catalog=c;} @GetMapping public List<ProductDto> list(){return catalog.products();} @GetMapping("/{slug}") public ProductDto get(@PathVariable String slug){return catalog.product(slug);} }
