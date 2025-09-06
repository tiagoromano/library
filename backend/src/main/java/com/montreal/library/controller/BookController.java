package com.montreal.library.controller;

import com.montreal.library.dto.BookDTO;
import com.montreal.library.entity.Book;
import com.montreal.library.mapper.Mappers;
import com.montreal.library.service.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/books")
public class BookController {
    private final BookService service;
    public BookController(BookService service){this.service=service;}

    @GetMapping
    public ResponseEntity<?> all(){
        List<BookDTO> list = service.findAll().stream().map(Mappers::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Long id){
        return service.findById(id).map(b -> ResponseEntity.ok(Mappers.toDto(b))).orElseGet(() -> ResponseEntity.notFound().build());
    }
    @PostMapping
    public ResponseEntity<?> create(@RequestBody BookDTO dto){
        Book toSave = Mappers.toEntity(dto);
        Book saved = service.create(toSave, dto.getAuthorId(), dto.getGenreId());
        return ResponseEntity.created(URI.create("/api/v1/books/"+saved.getId())).body(Mappers.toDto(saved));
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody BookDTO dto){
        Book toUpdate = Mappers.toEntity(dto);
        Book updated = service.update(id, toUpdate, dto.getAuthorId(), dto.getGenreId());
        return ResponseEntity.ok(Mappers.toDto(updated));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
