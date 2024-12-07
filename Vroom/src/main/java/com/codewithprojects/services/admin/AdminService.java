package com.codewithprojects.services.admin;

import com.codewithprojects.dto.CarDto;

import java.io.IOException;

public interface AdminService {

    boolean postCar(CarDto carDto) throws IOException;
}
