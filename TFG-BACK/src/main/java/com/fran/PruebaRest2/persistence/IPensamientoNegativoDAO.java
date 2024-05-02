package com.fran.PruebaRest2.persistence;

import com.fran.PruebaRest2.entities.PensamientoNegativo;

import java.util.List;
import java.util.Optional;

public interface IPensamientoNegativoDAO {

    List<PensamientoNegativo> findAll();

    Optional<PensamientoNegativo> findById(Long id);

    void save(PensamientoNegativo pensamientoNegativo);

    void deleteById(Long id);
}
