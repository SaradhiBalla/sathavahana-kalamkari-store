package com.sathavahana.kalamkari.controller;
import com.sathavahana.kalamkari.dto.*; import com.sathavahana.kalamkari.service.CatalogService; import org.springframework.web.bind.annotation.*; import java.util.*;
@RestController @RequestMapping("/api/v1/categories") public class CategoryController {private final CatalogService catalog; public CategoryController(CatalogService c){catalog=c;} @GetMapping public List<CategoryDto> list(){return catalog.categories();} @GetMapping("/{slug}") public CategoryDto get(@PathVariable String slug){return catalog.category(slug);}}
