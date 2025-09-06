package com.montreal.library.repository;

import com.montreal.library.entity.Author;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("test")
class AuthorRepositoryTest {

    @Autowired
    private AuthorRepository authorRepository;

    @Test
    void testSaveAndFind() {
        Author author = new Author();
        author.setName("John Doe");
        author = authorRepository.save(author);

        assertNotNull(author.getId());
        var found = authorRepository.findById(author.getId());
        assertTrue(found.isPresent());
        assertEquals("John Doe", found.get().getName());
    }
}
