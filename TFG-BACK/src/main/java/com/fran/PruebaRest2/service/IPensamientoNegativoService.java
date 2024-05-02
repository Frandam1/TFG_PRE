package com.fran.PruebaRest2.service;

import com.fran.PruebaRest2.entities.PensamientoNegativo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface IPensamientoNegativoService {

    List<PensamientoNegativo> findAll();

    Optional<PensamientoNegativo> findById(Long id);

    void save(PensamientoNegativo pensamientoNegativo);

    void deleteById(Long id);
}
