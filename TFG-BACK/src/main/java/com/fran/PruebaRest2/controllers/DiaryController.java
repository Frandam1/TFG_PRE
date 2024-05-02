package com.fran.PruebaRest2.controllers;

import com.fran.PruebaRest2.controllers.dto.DiaryDTO;
import com.fran.PruebaRest2.entities.Diary;
import com.fran.PruebaRest2.service.IDiaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/diario")
@CrossOrigin(origins = "http://localhost:3000")
public class DiaryController {

    private IDiaryService diaryService;

    public DiaryController(IDiaryService diaryService){
        this.diaryService = diaryService;
    }
//    @Autowired
//    private IDiaryService diaryService;

    @GetMapping("/find/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id){
        Optional<Diary> diaryOptional = diaryService.findById(id);

        if(diaryOptional.isPresent()){
            Diary diary = diaryOptional.get();

            DiaryDTO diaryDTO = DiaryDTO.builder()
                    .id(diary.getId())
                    .titulo(diary.getTitulo())
                    .agradecimiento(diary.getAgradecimiento())
                    .desafios(diary.getDesafios())
                    .fecha(diary.getFecha())
                    .build();

            return ResponseEntity.ok(diaryDTO);
        }

        return ResponseEntity.notFound().build();
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody DiaryDTO diaryDTO) throws URISyntaxException {

        if(diaryDTO.getTitulo().isBlank() || diaryDTO.getAgradecimiento().isBlank() || diaryDTO.getDesafios().isBlank() || diaryDTO.getFecha() == null){
            return ResponseEntity.badRequest().build();
        }
        // Patron builder para construir el DTO
        Diary diary = Diary.builder()
                .titulo(diaryDTO.getTitulo())
                .desafios(diaryDTO.getDesafios())
                .agradecimiento(diaryDTO.getAgradecimiento())
                .fecha(diaryDTO.getFecha())
                .build();

        diaryService.save(diary);

        return ResponseEntity.created(new URI("api/diario/save")).build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateDiary(@PathVariable Long id, @RequestBody DiaryDTO diaryDTO){
        Optional<Diary> diaryOptional = diaryService.findById(id);

        if(diaryOptional.isPresent()){
            Diary diary = diaryOptional.get();
            diary.setTitulo(diaryDTO.getTitulo());
            diary.setAgradecimiento(diaryDTO.getAgradecimiento());
            diary.setDesafios(diaryDTO.getDesafios());
            diary.setFecha(diaryDTO.getFecha());
            diaryService.save(diary);
            return ResponseEntity.ok("Actualizado");
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id){

        if(id != null){
            diaryService.deleteById(id);
            return ResponseEntity.ok("Lo has borrado?");
        }

        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/findAll")
    public ResponseEntity<?> findAll(){

        List<Diary> diaries = diaryService.findAll();


        List<DiaryDTO> diaryDTOList = diaries.stream()
                .map(diary -> DiaryDTO.builder()
                        .id(diary.getId())
                        .titulo(diary.getTitulo())
                        .agradecimiento(diary.getAgradecimiento())
                        .desafios(diary.getDesafios())
                        .fecha(diary.getFecha())
                        .build())
                .collect(Collectors.toList());

        // Devolver la lista de DTOs en la respuesta
        return ResponseEntity.ok(diaryDTOList);

    }


}
