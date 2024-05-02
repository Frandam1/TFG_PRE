package com.fran.PruebaRest2.persistence;

import com.fran.PruebaRest2.entities.Diary;
import com.fran.PruebaRest2.entities.Mood;

import java.util.List;
import java.util.Optional;

public interface IMoodDAO {

    List<Mood> findAll();

    Optional<Mood> findById(Long id);

    void save(Mood mood);

    void deleteById(Long id);
}
