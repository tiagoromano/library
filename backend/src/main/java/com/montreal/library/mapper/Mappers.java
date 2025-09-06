package com.montreal.library.mapper;

import com.montreal.library.dto.AuthorDTO;
import com.montreal.library.dto.BookDTO;
import com.montreal.library.dto.GenreDTO;
import com.montreal.library.entity.Author;
import com.montreal.library.entity.Book;
import com.montreal.library.entity.Genre;

public class Mappers {
    public static GenreDTO toDto(Genre g) {
        if (g == null) return null;
        return GenreDTO.builder().id(g.getId()).name(g.getName()).build();
    }

    public static Genre toEntity(GenreDTO d) {
        if (d == null) return null;
        return Genre.builder().id(d.getId()).name(d.getName()).build();
    }

    public static AuthorDTO toDto(Author a) {
        if (a == null) return null;
        return AuthorDTO.builder().id(a.getId()).name(a.getName()).bio(a.getBio()).build();
    }

    public static Author toEntity(AuthorDTO d) {
        if (d == null) return null;
        return Author.builder().id(d.getId()).name(d.getName()).bio(d.getBio()).build();
    }

    public static BookDTO toDto(Book b) {
        if (b == null) return null;
        Long authorId = b.getAuthor() != null ? b.getAuthor().getId() : null;
        Long genreId = b.getGenre() != null ? b.getGenre().getId() : null;
        return BookDTO.builder()
                .id(b.getId())
                .title(b.getTitle())
                .summary(b.getSummary())
                .authorId(authorId)
                .genreId(genreId)
                .authorName(b.getAuthor().getName())
                .genreName(b.getGenre().getName())
                .build();
    }

    public static Book toEntity(BookDTO d) {
        if (d == null) return null;
        return Book.builder().id(d.getId()).title(d.getTitle()).summary(d.getSummary()).build();
    }
}
