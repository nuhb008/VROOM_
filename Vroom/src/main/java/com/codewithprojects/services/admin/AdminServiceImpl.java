package com.codewithprojects.services.admin;

import com.codewithprojects.dto.BookACarDto;
import com.codewithprojects.dto.CarDto;
import com.codewithprojects.entity.BookACar;
import com.codewithprojects.entity.Car;
import com.codewithprojects.enums.BookCarStatus;
import com.codewithprojects.repository.BookACarRepository;
import com.codewithprojects.repository.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final CarRepository carRepository;

    private final BookACarRepository bookACarRepository ;


    @Override
    public boolean postCar(CarDto carDto) throws IOException {
        try {
            Car car = new Car();
            car.setBrand(carDto.getBrand());
            car.setName(carDto.getName());
            // log the DTO properties
            System.out.println("Posting car with brand: " + carDto.getBrand() + ", name: " + carDto.getName());
            car.setColor(carDto.getColor());
            car.setPrice(carDto.getPrice());
            car.setYear(carDto.getYear());
            car.setType(carDto.getType());
            car.setDescription(carDto.getDescription());
            car.setTransmission(carDto.getTransmission());
            car.setImage(carDto.getImage().getBytes());
            carRepository.save(car);
            return true;
        } catch (Exception e) {
            System.out.println("Error posting car: " + e.getMessage());
            return false;
        }
    }

    @Override
    public List<CarDto> getAllCars() {
        List<CarDto> carDtos = carRepository.findAll().stream()
                .map(Car::getCarDto)
                .collect(Collectors.toList());
        // log the result
        System.out.println("Fetched cars: " + carDtos.size());
        return carDtos;
    }

    @Override
    public void deleteCar(Long id) {
        carRepository.deleteById(id);
    }

    @Override
    public CarDto getCarbyId(Long id) {
        Optional<Car>optionalCar=carRepository.findById(id);
        return optionalCar.map(Car::getCarDto).orElse(null);
    }

    @Override
    public boolean updateCar(Long carId, CarDto carDto) throws IOException {
        Optional<Car>optionalCar=carRepository.findById(carId);
        if(optionalCar.isPresent()){
            Car existingCar=optionalCar.get();
            if(carDto.getImage()!=null)
                existingCar.setImage(carDto.getImage().getBytes());
            existingCar.setPrice(carDto.getPrice());
            existingCar.setYear(carDto.getYear());
            existingCar.setType(carDto.getType());
            existingCar.setDescription(carDto.getDescription());
            existingCar.setTransmission(carDto.getTransmission());
            existingCar.setColor(carDto.getColor());
            existingCar.setName(carDto.getName());
            existingCar.setBrand(carDto.getBrand());

            carRepository.save(existingCar);

            return true;
        }
        return false;
    }

    @Override
    public List<BookACarDto> getBookings() {
        return bookACarRepository.findAll().stream().map(BookACar::getBookACarDto).collect(Collectors.toList());
    }

    @Override
    public boolean changebookingStatus(Long bookingId, String status) {
        Optional<BookACar>optionalBookACar=bookACarRepository.findById(bookingId);
        if(optionalBookACar.isPresent())
        {
            BookACar existingbookACar=optionalBookACar.get();
            if(Objects.equals(status, "Approve"))
                existingbookACar.setBookCarStatus(BookCarStatus.APPROVED);
            else
                existingbookACar.setBookCarStatus(BookCarStatus.REJECTED);
            bookACarRepository.save(existingbookACar);
            return true;
        }
        return false;
    }


}
