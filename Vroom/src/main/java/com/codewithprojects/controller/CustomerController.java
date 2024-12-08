package com.codewithprojects.controller;


import com.codewithprojects.dto.BookACarDto;
import com.codewithprojects.dto.CarDto;
import com.codewithprojects.services.customer.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService customerService;

    @GetMapping("/cars")
    public ResponseEntity<List<CarDto>>getAllCars(){
        List<CarDto>carDtoList=customerService.getAllCars();
        return ResponseEntity.ok(carDtoList);
    }

    @PostMapping("/car/book")
    public ResponseEntity<Void>bookACar(@RequestBody BookACarDto bookACarDto){
        boolean success= customerService.bookACar(bookACarDto);
        if(success) return ResponseEntity.status(HttpStatus.CREATED).build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("/car/{carId}")
    public ResponseEntity<CarDto> getCarById(@PathVariable Long carId) {
        CarDto carDto = customerService.getcarById(carId);

        if (carDto != null) {
            return ResponseEntity.ok(carDto);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }


}
