package com.fran.PruebaRest2.service.impl;

import com.fran.PruebaRest2.entities.Diary;
import com.fran.PruebaRest2.entities.Tornillo;
import com.fran.PruebaRest2.persistence.IDiaryDAO;
import com.fran.PruebaRest2.service.IDiaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DiaryServiceImpl implements IDiaryService {

    @Autowired
    IDiaryDAO diaryDAO;

    public List<Diary> findAll(){return diaryDAO.findAll();}

    public Optional<Diary> findById(Long id){return diaryDAO.findByID(id);}

    public void save(Diary diary){diaryDAO.save(diary);}

    public void deleteById(Long id){diaryDAO.deleteById(id);}


}
