package com.montreal.library.controller;

import com.montreal.library.dto.GenreDTO;
import com.montreal.library.entity.Genre;
import com.montreal.library.mapper.Mappers;
import com.montreal.library.service.GenreService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/genres")
public class GenreController {
    private final GenreService service;
    public GenreController(GenreService service){this.service=service;}

    @GetMapping
    public ResponseEntity<?> all(){
        List<GenreDTO> list = service.findAll().stream().map(Mappers::toDto).collect(Collectors.toList());
        return ResponseEntity.ok().body(list);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Long id){
        return service.findById(id).map(g -> ResponseEntity.ok(Mappers.toDto(g))).orElseGet(() -> ResponseEntity.notFound().build());
    }
    @PostMapping
    public ResponseEntity<?> create(@RequestBody GenreDTO dto){
        Genre saved = service.save(Mappers.toEntity(dto));
        return ResponseEntity.created(URI.create("/api/v1/genres/"+saved.getId())).body(Mappers.toDto(saved));
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody GenreDTO dto){
        Genre g = Mappers.toEntity(dto);
        Genre updated = service.update(id, g);
        return ResponseEntity.ok(Mappers.toDto(updated));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
