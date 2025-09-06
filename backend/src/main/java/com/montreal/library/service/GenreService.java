package com.montreal.library.service;

import com.montreal.library.entity.Genre;
import com.montreal.library.repository.GenreRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GenreService {
    private final GenreRepository repo;

    public GenreService(GenreRepository repo) {
        this.repo = repo;
    }

    public List<Genre> findAll() {
        return repo.findAll();
    }

    public Optional<Genre> findById(Long id) {
        return repo.findById(id);
    }

    public Genre update(Long id, Genre dto) {
        var g = repo.findById(id).orElseThrow(() -> new EntityNotFoundException("Genre not found"));
        g.setName(dto.getName());
        return repo.save(g);
    }

    public Genre save(Genre g) {
        return repo.save(g);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
