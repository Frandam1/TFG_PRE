package com.fran.PruebaRest2.persistence.impl;

import com.fran.PruebaRest2.entities.Tornillo;
import com.fran.PruebaRest2.persistence.ITornilloDAO;
import com.fran.PruebaRest2.repository.TornilloRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Component
public class TornilloDAOImpl implements ITornilloDAO {

    @Autowired
    private TornilloRepositorio tornilloRepositorio;

    @Override
    public List<Tornillo> findAll() {
        return (List<Tornillo>) tornilloRepositorio.findAll();
    }

    @Override
    public Optional<Tornillo> findByID(Long id) {
        return tornilloRepositorio.findById(id);
    }

    @Override
    public List<Tornillo> findByPriceInRange(BigDecimal minPrice, BigDecimal maxPrice) {
        return tornilloRepositorio.findProductByPriceBetween(minPrice,maxPrice);
    }

    @Override
    public void save(Tornillo tornillo) {
        tornilloRepositorio.save(tornillo);
    }

    @Override
    public void deleteById(Long id) {
        tornilloRepositorio.deleteById(id);
    }
}
