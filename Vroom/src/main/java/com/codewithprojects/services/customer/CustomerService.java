package com.codewithprojects.services.customer;

import com.codewithprojects.dto.BookACarDto;
import com.codewithprojects.dto.CarDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Stream;

public interface CustomerService {

    List<CarDto> getAllCars();

    boolean bookACar(BookACarDto bookACarDto);

    CarDto getCarById(Long carId);

    List<BookACarDto> getBookingsByUserId(Long userId);


}
