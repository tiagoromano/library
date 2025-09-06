package com.montreal.library.repository;

import com.montreal.library.entity.Genre;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("test")
class GenreRepositoryTest {

    @Autowired
    private GenreRepository genreRepository;

    @Test
    void testSaveAndFind() {
        Genre genre = new Genre();
        genre.setName("Fiction");
        genre = genreRepository.save(genre);

        assertNotNull(genre.getId());
        var found = genreRepository.findById(genre.getId());
        assertTrue(found.isPresent());
        assertEquals("Fiction", found.get().getName());
    }
}