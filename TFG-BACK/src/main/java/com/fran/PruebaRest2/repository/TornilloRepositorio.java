package com.fran.PruebaRest2.repository;

import com.fran.PruebaRest2.entities.Tornillo;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface TornilloRepositorio extends CrudRepository<Tornillo, Long> {

    //Query para buscar entre rango de precios
    List<Tornillo> findProductByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);

    @Query("SELECT p FROM Tornillo p WHERE p.price BETWEEN ?1 AND ?2")
    List<Tornillo> findProductByPriceInRange(BigDecimal minPrice, BigDecimal maxPrice);
}
