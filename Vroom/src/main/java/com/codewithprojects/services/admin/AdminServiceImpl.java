package com.codewithprojects.services.admin;

import com.codewithprojects.dto.CarDto;
import com.codewithprojects.entity.Car;
import com.codewithprojects.repository.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final CarRepository carRepository;


    @Override
    public boolean postCar(CarDto carDto) throws IOException {
        try{
            Car car =new Car();
            car.setBrand(carDto.getBrand());
            car.setName(carDto.getName());
            car.setColor(carDto.getColor());
            car.setPrice(carDto.getPrice());
            car.setYear (carDto.getYear());
            car.setType(carDto.getType());
            car.setDescription (carDto.getDescription());
            car.setTransmission(carDto.getTransmission());
            car.setImage(carDto.getImage().getBytes());
            carRepository.save(car);
            return true;
        }catch (Exception e){
            return false;
        }

    }
}
