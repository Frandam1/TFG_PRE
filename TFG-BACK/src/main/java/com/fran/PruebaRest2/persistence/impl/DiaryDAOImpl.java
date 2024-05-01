package com.fran.PruebaRest2.persistence.impl;

import com.fran.PruebaRest2.entities.Diary;
import com.fran.PruebaRest2.persistence.IDiaryDAO;
import com.fran.PruebaRest2.repository.DiaryRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class DiaryDAOImpl implements IDiaryDAO {

    @Autowired
    private DiaryRepositorio diaryRepositorio;

    @Override
    public List<Diary> findAll() {
        return (List<Diary>) diaryRepositorio.findAll();
    }

    @Override
    public Optional<Diary> findByID(Long id) {
        return diaryRepositorio.findById(id);
    }

    @Override
    public void save(Diary diary) {
        diaryRepositorio.save(diary);
    }

    @Override
    public void deleteById(Long id) {
        diaryRepositorio.deleteById(id);
    }
}
