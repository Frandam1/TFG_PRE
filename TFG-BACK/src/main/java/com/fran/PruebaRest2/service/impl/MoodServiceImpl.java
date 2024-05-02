package com.fran.PruebaRest2.service.impl;

import com.fran.PruebaRest2.entities.Mood;
import com.fran.PruebaRest2.persistence.IMoodDAO;
import com.fran.PruebaRest2.service.IMoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MoodServiceImpl implements IMoodService {

    @Autowired
    IMoodDAO moodDAO;

    public List<Mood> findAll(){
        return moodDAO.findAll();
    }

    public Optional<Mood> findById(Long id){
        return moodDAO.findById(id);
    }

    public void save(Mood mood){
        moodDAO.save(mood);
    }

    public void deleteById(Long id){
        moodDAO.deleteById(id);
    }
}
