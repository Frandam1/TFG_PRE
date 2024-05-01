package com.fran.PruebaRest2.service;

import com.fran.PruebaRest2.entities.Diary;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface IDiaryService {

    List<Diary> findAll();

    Optional<Diary> findById(Long id);

    void save(Diary diary);

    void deleteById(Long id);
}
