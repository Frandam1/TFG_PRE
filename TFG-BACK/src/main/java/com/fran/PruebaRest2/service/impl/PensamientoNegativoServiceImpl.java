package com.fran.PruebaRest2.service.impl;

import com.fran.PruebaRest2.entities.PensamientoNegativo;
import com.fran.PruebaRest2.persistence.IPensamientoNegativoDAO;
import com.fran.PruebaRest2.service.IPensamientoNegativoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PensamientoNegativoServiceImpl implements IPensamientoNegativoService {

    @Autowired
    IPensamientoNegativoDAO pensamientoNegativoDAO;

    @Override
    public List<PensamientoNegativo> findAll() {
        return pensamientoNegativoDAO.findAll();
    }

    @Override
    public Optional<PensamientoNegativo> findById(Long id) {
        return pensamientoNegativoDAO.findById(id);
    }

    @Override
    public void save(PensamientoNegativo pensamientoNegativo) {
        pensamientoNegativoDAO.save(pensamientoNegativo);
    }

    @Override
    public void deleteById(Long id) {
        pensamientoNegativoDAO.deleteById(id);
    }
}
