package com.codewithprojects.dto;

import com.codewithprojects.enums.BookCarStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
public class BookACarDto {

    private Long id;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date fromDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date toDate;

    private Long days;

    private Long price;

    private BookCarStatus bookCarStatus;

    private Long carId;

    private Long userId;

    private String username;

    private String email;


}
