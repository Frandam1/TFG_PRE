package com.fran.PruebaRest2.service;

import com.fran.PruebaRest2.entities.Biblioteca;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface IBibliotecaService {

    List<Biblioteca> findAll();

    Optional<Biblioteca> findById(Long id);

    void save(Biblioteca biblioteca);

    void deleteById(Long id);
}
