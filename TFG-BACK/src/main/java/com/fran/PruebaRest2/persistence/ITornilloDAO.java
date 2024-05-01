package com.fran.PruebaRest2.persistence;

import com.fran.PruebaRest2.entities.Tornillo;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface ITornilloDAO {

    List<Tornillo> findAll();

    Optional<Tornillo> findByID(Long id);

    List<Tornillo> findByPriceInRange(BigDecimal minPrice, BigDecimal maxPrice);

    void save(Tornillo tornillo);

    void deleteById(Long id);
}
