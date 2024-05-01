package com.fran.PruebaRest2.repository;

import com.fran.PruebaRest2.entities.Diary;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiaryRepositorio extends CrudRepository<Diary, Long> {
}
