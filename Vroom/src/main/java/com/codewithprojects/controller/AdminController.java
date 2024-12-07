package com.codewithprojects.controller;

import com.codewithprojects.dto.CarDto;
import com.codewithprojects.services.admin.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
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
}
