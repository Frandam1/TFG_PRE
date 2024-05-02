package com.fran.PruebaRest2.service;

import com.fran.PruebaRest2.entities.Mood;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface IMoodService {

    List<Mood> findAll();

    Optional<Mood> findById(Long id);

    void save(Mood mood);

    void deleteById(Long id);
}
