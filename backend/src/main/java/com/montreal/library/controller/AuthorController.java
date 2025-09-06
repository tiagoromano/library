package com.montreal.library.controller;

import com.montreal.library.dto.AuthorDTO;
import com.montreal.library.entity.Author;
import com.montreal.library.mapper.Mappers;
import com.montreal.library.service.AuthorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/authors")
public class AuthorController {
    private final AuthorService service;
    public AuthorController(AuthorService service){this.service=service;}

    @GetMapping
    public ResponseEntity<?> all(){
        List<AuthorDTO> list = service.findAll().stream().map(Mappers::toDto).collect(Collectors.toList());
        return ResponseEntity.ok().body(list);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Long id){
        return service.findById(id).map(a -> ResponseEntity.ok(Mappers.toDto(a))).orElseGet(() -> ResponseEntity.notFound().build());
    }
    @PostMapping
    public ResponseEntity<?> create(@RequestBody AuthorDTO dto){
        Author saved = service.save(Mappers.toEntity(dto));
        return ResponseEntity.created(URI.create("/api/v1/authors/"+saved.getId())).body(Mappers.toDto(saved));
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody AuthorDTO dto){
        Author a = Mappers.toEntity(dto);
        Author updated = service.update(id, a);
        return ResponseEntity.ok(Mappers.toDto(updated));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
