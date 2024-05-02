package com.fran.PruebaRest2.persistence.impl;

import com.fran.PruebaRest2.entities.Mood;
import com.fran.PruebaRest2.persistence.IMoodDAO;
import com.fran.PruebaRest2.repository.MoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class MoodDAOImpl implements IMoodDAO {

    @Autowired
    private MoodRepository moodRepository;

    @Override
    public List<Mood> findAll() {
        return (List<Mood>) moodRepository.findAll();
    }

    @Override
    public Optional<Mood> findById(Long id) {
        return moodRepository.findById(id);
    }

    @Override
    public void save(Mood mood) {
        moodRepository.save(mood);
    }

    @Override
    public void deleteById(Long id) {
        moodRepository.deleteById(id);
    }
}
