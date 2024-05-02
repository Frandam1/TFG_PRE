package com.fran.PruebaRest2.persistence.impl;

import com.fran.PruebaRest2.entities.PensamientoNegativo;
import com.fran.PruebaRest2.persistence.IPensamientoNegativoDAO;
import com.fran.PruebaRest2.repository.PensamientoNegativoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class PensamientoNegativoDAOImpl implements IPensamientoNegativoDAO {

    @Autowired
    private PensamientoNegativoRepositorio pensamientoNegativoRepositorio;

    @Override
    public List<PensamientoNegativo> findAll() {
        return (List<PensamientoNegativo>) pensamientoNegativoRepositorio.findAll();
    }

    @Override
    public Optional<PensamientoNegativo> findById(Long id) {
        return pensamientoNegativoRepositorio.findById(id);
    }

    @Override
    public void save(PensamientoNegativo pensamientoNegativo) {
        pensamientoNegativoRepositorio.save(pensamientoNegativo);
    }

    @Override
    public void deleteById(Long id) {
        pensamientoNegativoRepositorio.deleteById(id);
    }
}
