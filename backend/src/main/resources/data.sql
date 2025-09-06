INSERT IGNORE INTO genre (id, name) VALUES (1, 'Tecnologia'), (2, 'Linguas'), (3, 'Fantasia');
INSERT IGNORE INTO author (id, name, bio) VALUES (1, 'Tiago Romano', 'Profissional com vasto conhecimento em TI'), (2, 'Michelle Romano', 'Doutoranda em Letras');
INSERT IGNORE INTO book (id, title, summary, author_id, genre_id) VALUES (1, 'O Guia do Desenvolvimento de Software', 'Um guia para programar com qualidade', 1, 1), (2, 'Gramática Essencial', 'Exploração da Fonética à Sintaxe', 2, 2);
