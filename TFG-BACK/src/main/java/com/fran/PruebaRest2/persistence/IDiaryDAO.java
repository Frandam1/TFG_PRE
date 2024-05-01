package com.fran.PruebaRest2.persistence;

import com.fran.PruebaRest2.entities.Diary;
import java.util.List;
import java.util.Optional;

public interface IDiaryDAO {

    List<Diary> findAll();

    Optional<Diary> findByID(Long id);

    void save(Diary diary);

    void deleteById(Long id);
}
