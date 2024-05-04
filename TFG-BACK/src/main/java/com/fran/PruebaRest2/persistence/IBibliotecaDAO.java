package com.fran.PruebaRest2.persistence;

import com.fran.PruebaRest2.entities.Biblioteca;
import java.util.List;
import java.util.Optional;

public interface IBibliotecaDAO {

    List<Biblioteca> findAll();

    Optional<Biblioteca> findById(Long id);

    void save(Biblioteca biblioteca);

    void deleteById(Long id);
}
