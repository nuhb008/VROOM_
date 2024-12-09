package com.codewithprojects.entity;


import com.codewithprojects.dto.BookACarDto;
import com.codewithprojects.enums.BookCarStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Entity
@Data
@Table(name="bookacar")
public class BookACar {

    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date fromDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date toDate;

    private Long days;

    private Long price;

    private BookCarStatus bookCarStatus;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name =  "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name =  "car_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Car car;

    public BookACarDto getBookACarDto(){
        BookACarDto bookACarDto=new BookACarDto();
        bookACarDto.setId(this.id);
        bookACarDto.setDays(this.days);
        bookACarDto.setBookCarStatus(this.bookCarStatus);
        bookACarDto.setPrice(this.price);
        bookACarDto.setToDate(this.toDate);
        bookACarDto.setFromDate(this.fromDate);
        bookACarDto.setEmail(this.user.getEmail());
        bookACarDto.setUsername(this.user.getName());
        bookACarDto.setUserId(this.user.getId());
        bookACarDto.setCarId(this.car.getId());
        return bookACarDto;
    }




}
