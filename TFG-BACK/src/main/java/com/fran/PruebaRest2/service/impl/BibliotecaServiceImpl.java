package com.fran.PruebaRest2.service.impl;

import com.fran.PruebaRest2.entities.Biblioteca;
import com.fran.PruebaRest2.persistence.IBibliotecaDAO;
import com.fran.PruebaRest2.service.IBibliotecaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BibliotecaServiceImpl implements IBibliotecaService {

    @Autowired
    private IBibliotecaDAO bibliotecaDAO;

    @Override
    public List<Biblioteca> findAll() {
        return bibliotecaDAO.findAll();
    }

    @Override
    public Optional<Biblioteca> findById(Long id) {
        return bibliotecaDAO.findById(id);
    }

    @Override
    public void save(Biblioteca biblioteca) {
        bibliotecaDAO.save(biblioteca);
    }

    @Override
    public void deleteById(Long id) {
        bibliotecaDAO.deleteById(id);
    }
}
