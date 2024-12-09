package com.codewithprojects.controller;

import com.codewithprojects.dto.BookACarDto;
import com.codewithprojects.dto.CarDto;
import com.codewithprojects.entity.Car;
import com.codewithprojects.services.admin.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
//@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/car")
    public ResponseEntity<?> postCar(@ModelAttribute CarDto carDto) {
        try {
            boolean success = adminService.postCar(carDto);
            if (success) {
                return ResponseEntity.status(HttpStatus.CREATED).build();
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
        } catch (Exception e) {
            // Log the error
            System.out.println("Error while saving car: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/cars")
    public ResponseEntity<?> getAllCars() {
        try {
            List<CarDto> carDtos = adminService.getAllCars();
            if (carDtos.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();  // If no data found
            } else {
                return ResponseEntity.ok(carDtos);  // Return the fetched data
            }
        } catch (Exception e) {
            // Log the error
            System.out.println("Error fetching cars: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/car/{id}")
    public ResponseEntity<Void>deleteCar(@PathVariable Long id){
        adminService.deleteCar(id);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/car/{id}")
    public ResponseEntity<CarDto>getCarById(@PathVariable Long id){
        CarDto carDto=adminService.getCarbyId(id);
        return ResponseEntity.ok(carDto);
    }

    @PutMapping("/car/{carId}")
    public ResponseEntity<Void> updateCar(@PathVariable Long carId, @ModelAttribute CarDto carDto) throws IOException {
        try {
            boolean isSuccessful = adminService.updateCar(carId, carDto);

            if (isSuccessful) {
                return ResponseEntity.status(HttpStatus.OK).build();
            }

            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/car/bookings")
    public  ResponseEntity<List<BookACarDto>>getBookings(){
        return ResponseEntity.ok(adminService.getBookings());
    }

    @GetMapping("/car/booking/{bookingId}/{status}")
    private ResponseEntity<Void> changeBookingStatus(@PathVariable Long bookingId, @PathVariable String status) {
        boolean isSuccessful = adminService.changebookingStatus(bookingId, status);

        if (isSuccessful) {
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();
    }




}
