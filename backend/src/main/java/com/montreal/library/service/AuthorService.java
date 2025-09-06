package com.montreal.library.service;

import com.montreal.library.dto.AuthorDTO;
import com.montreal.library.entity.Author;
import com.montreal.library.repository.AuthorRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthorService {
    private final AuthorRepository repo;

    public AuthorService(AuthorRepository repo) {
        this.repo = repo;
    }

    public List<Author> findAll() {
        return repo.findAll();
    }

    public Optional<Author> findById(Long id) {
        return repo.findById(id);
    }

    public Author save(Author a) {
        return repo.save(a);
    }

    public Author update(Long id, Author dto) {
        var a = repo.findById(id).orElseThrow(() -> new EntityNotFoundException("Author not found"));
        a.setBio(dto.getBio());
        a.setName(dto.getName());
        return repo.save(a);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
