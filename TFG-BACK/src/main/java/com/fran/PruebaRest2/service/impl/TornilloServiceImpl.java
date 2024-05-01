package com.fran.PruebaRest2.service.impl;

import com.fran.PruebaRest2.entities.Tornillo;
import com.fran.PruebaRest2.persistence.ITornilloDAO;
import com.fran.PruebaRest2.service.ITornilloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class TornilloServiceImpl implements ITornilloService {

    @Autowired
    ITornilloDAO tornilloDAO;

    public List<Tornillo> findAll(){return tornilloDAO.findAll();}

    public Optional<Tornillo> findById(Long id){return tornilloDAO.findByID(id);}

    public List<Tornillo> findByPriceInRange(BigDecimal minPrice, BigDecimal maxPrice){
        return tornilloDAO.findByPriceInRange(minPrice, maxPrice);
    }

    public void save(Tornillo tornillo){tornilloDAO.save(tornillo);}

    public void deleteById(Long id){tornilloDAO.deleteById(id);}
}
