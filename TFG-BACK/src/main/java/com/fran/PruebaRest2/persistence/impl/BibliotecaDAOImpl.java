package com.fran.PruebaRest2.persistence.impl;

import com.fran.PruebaRest2.entities.Biblioteca;
import com.fran.PruebaRest2.persistence.IBibliotecaDAO;
import com.fran.PruebaRest2.repository.BibliotecaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class BibliotecaDAOImpl implements IBibliotecaDAO {

    @Autowired
    private BibliotecaRepositorio bibliotecaRepositorio;

    @Override
    public List<Biblioteca> findAll() {
        return (List<Biblioteca>) bibliotecaRepositorio.findAll();
    }

    @Override
    public Optional<Biblioteca> findById(Long id) {
        return bibliotecaRepositorio.findById(id);
    }

    @Override
    public void save(Biblioteca biblioteca) {
        bibliotecaRepositorio.save(biblioteca);
    }

    @Override
    public void deleteById(Long id) {
        bibliotecaRepositorio.deleteById(id);
    }
}
