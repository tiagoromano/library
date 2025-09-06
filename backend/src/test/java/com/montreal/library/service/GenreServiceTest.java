package com.montreal.library.service;
import com.montreal.library.entity.Genre;
import com.montreal.library.repository.GenreRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class GenreServiceTest {

    @Mock
    private GenreRepository genreRepository;

    @InjectMocks
    private GenreService genreService;

    public GenreServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetGenreById() {
        Genre genre = new Genre();
        genre.setId(1L);
        genre.setName("Fiction");

        when(genreRepository.findById(1L)).thenReturn(Optional.of(genre));

        Genre result = genreService.findById(1L).orElse(null);
        assertNotNull(result);
        assertEquals("Fiction", result.getName());
    }
}