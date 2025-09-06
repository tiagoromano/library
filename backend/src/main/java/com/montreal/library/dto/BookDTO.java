package com.montreal.library.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookDTO {
    private Long id;
    private String title;
    private String summary;
    private String authorName;
    private String genreName;
    private Long authorId;
    private Long genreId;
}
