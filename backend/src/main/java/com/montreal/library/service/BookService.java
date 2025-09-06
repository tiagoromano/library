package com.montreal.library.service;

import com.montreal.library.entity.Author;
import com.montreal.library.entity.Book;
import com.montreal.library.entity.Genre;
import com.montreal.library.repository.AuthorRepository;
import com.montreal.library.repository.BookRepository;
import com.montreal.library.repository.GenreRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    private final BookRepository repo;
    private final AuthorRepository authorRepo;
    private final GenreRepository genreRepo;

    public BookService(BookRepository repo, AuthorRepository authorRepo, GenreRepository genreRepo) {
        this.repo = repo;
        this.authorRepo = authorRepo;
        this.genreRepo = genreRepo;
    }

    public List<Book> findAll() {
        return repo.findAll();
    }

    public Optional<Book> findById(Long id) {
        return repo.findById(id);
    }

    public Book create(Book book, Long authorId, Long genreId) {
        Author a = authorRepo.findById(authorId).orElseThrow(() -> new IllegalArgumentException("Author not found"));
        Genre g = genreRepo.findById(genreId).orElseThrow(() -> new IllegalArgumentException("Genre not found"));
        book.setAuthor(a);
        book.setGenre(g);
        return repo.save(book);
    }

    public Book update(Long id, Book dto, Long authorId, Long genreId) {
        Book b = repo.findById(id).orElseThrow(() -> new EntityNotFoundException("Book not found"));
        b.setTitle(dto.getTitle());
        b.setSummary(dto.getSummary());
        if (authorId != null)
            b.setAuthor(authorRepo.findById(authorId).orElseThrow(() -> new IllegalArgumentException("Author not found")));
        if (genreId != null)
            b.setGenre(genreRepo.findById(genreId).orElseThrow(() -> new IllegalArgumentException("Genre not found")));
        return repo.save(b);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
