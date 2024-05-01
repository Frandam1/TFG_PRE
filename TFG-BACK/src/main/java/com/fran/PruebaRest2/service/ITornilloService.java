package com.fran.PruebaRest2.service;

import com.fran.PruebaRest2.entities.Tornillo;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public interface ITornilloService {

    List<Tornillo> findAll();

    Optional<Tornillo> findById(Long id);

    List<Tornillo> findByPriceInRange(BigDecimal minPrice, BigDecimal maxPrice);

    void save(Tornillo tornillo);

    void deleteById(Long id);
}
