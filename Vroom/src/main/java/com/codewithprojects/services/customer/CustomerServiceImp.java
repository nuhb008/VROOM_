package com.codewithprojects.services.customer;

import com.codewithprojects.dto.BookACarDto;
import com.codewithprojects.dto.CarDto;
import com.codewithprojects.entity.BookACar;
import com.codewithprojects.entity.Car;
import com.codewithprojects.entity.User;
import com.codewithprojects.enums.BookCarStatus;
import com.codewithprojects.repository.BookACarRepository;
import com.codewithprojects.repository.CarRepository;
import com.codewithprojects.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;
import java.util.stream.Stream;
//@Transactional
@Service
@RequiredArgsConstructor
public class CustomerServiceImp implements CustomerService{

    private final CarRepository carRepository;

    private final UserRepository userRepository;

    private final BookACarRepository bookACarRepository;

    @Override
    public List<CarDto> getAllCars() {
        return carRepository.findAll().stream().map(Car::getCarDto).collect(Collectors.toList());
    }

    @Transactional
    @Override
    public boolean bookACar(BookACarDto bookACarDto) {
        try {
            // Fetch car and user from the database
            Optional<Car> optionalCar = carRepository.findById(bookACarDto.getCarId());
            Optional<User> optionalUser = userRepository.findById(bookACarDto.getUserId());

            if (optionalCar.isEmpty() || optionalUser.isEmpty()) {
                System.err.println("Car or User not found for IDs: CarId=" + bookACarDto.getCarId() +
                        ", UserId=" + bookACarDto.getUserId());
                return false;
            }

            Car existingCar = optionalCar.get();
            User existingUser = optionalUser.get();

            // Initialize and populate the booking entity
            BookACar bookACar = new BookACar();
            bookACar.setUser(existingUser);
            bookACar.setCar(existingCar);
            bookACar.setBookCarStatus(BookCarStatus.PENDING);

            // Calculate the number of days and total price
            long diffInMilliSeconds = bookACarDto.getToDate().getTime() - bookACarDto.getFromDate().getTime();
            long days = TimeUnit.MILLISECONDS.toDays(diffInMilliSeconds) + 1; // Include start day
            if (days <= 0) {
                System.err.println("Invalid date range: fromDate=" + bookACarDto.getFromDate() +
                        ", toDate=" + bookACarDto.getToDate());
                return false;
            }

            bookACar.setDays(days);
            bookACar.setPrice(days * existingCar.getPrice());
            bookACar.setFromDate(bookACarDto.getFromDate());
            bookACar.setToDate(bookACarDto.getToDate());

            // Save the booking entity
            bookACarRepository.save(bookACar);

            System.out.println("Booking saved successfully: " + bookACar);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error while booking a car", e);
        }
    }


    @Override
    public CarDto getCarById(Long carId) {
        Optional<Car>optionalCar=carRepository.findById(carId);
        return optionalCar.map(Car::getCarDto).orElse(null);
    }

    @Override
    public List<BookACarDto> getBookingsByUserId(Long userId) {
        return bookACarRepository.findAllByUserId(userId).stream().map(BookACar::getBookACarDto).collect(Collectors.toList());
    }


}
