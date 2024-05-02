package com.fran.PruebaRest2.repository;

import com.fran.PruebaRest2.entities.Mood;
import org.springframework.data.repository.CrudRepository;

public interface MoodRepository extends CrudRepository<Mood, Long> {
}
