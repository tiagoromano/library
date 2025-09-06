package com.montreal.library.repository;

import com.montreal.library.entity.Book;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("test")
class BookRepositoryTest {

    @Autowired
    private BookRepository bookRepository;

    @Test
    void testSaveAndFind() {
        Book book = new Book();
        book.setTitle("Sample Book");
        book = bookRepository.save(book);

        assertNotNull(book.getId());
        var found = bookRepository.findById(book.getId());
        assertTrue(found.isPresent());
        assertEquals("Sample Book", found.get().getTitle());
    }
}