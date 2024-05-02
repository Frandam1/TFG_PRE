package com.fran.PruebaRest2.controllers;

import com.fran.PruebaRest2.controllers.dto.MoodDTO;
import com.fran.PruebaRest2.entities.Mood;
import com.fran.PruebaRest2.service.IMoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/mood")
@CrossOrigin(origins = "http://localhost:3000")
public class MoodController {

    @Autowired
    private IMoodService moodService;

    @GetMapping("/find/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id){
        Optional<Mood> moodOptional = moodService.findById(id);

        if(moodOptional.isPresent()){
            Mood mood = moodOptional.get();

            MoodDTO moodDTO = MoodDTO.builder()
                    .id(mood.getId())
                    .mood(mood.getMood())
                    .reason(mood.getReason())
                    .date(mood.getDate())
                    .build();

            return ResponseEntity.ok(moodDTO);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody MoodDTO moodDTO) throws URISyntaxException {

        if(moodDTO.getReason().isBlank() || moodDTO.getMood().isBlank() || moodDTO.getDate() == null){
            return ResponseEntity.badRequest().build();
        }

        Mood mood = Mood.builder()
                .mood(moodDTO.getMood())
                .reason(moodDTO.getReason())
                .date(moodDTO.getDate())
                .build();

        moodService.save(mood);

        return ResponseEntity.created(new URI("api/mood/save")).build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateMood(@PathVariable Long id, @RequestBody MoodDTO moodDTO){
        Optional<Mood> moodOptional = moodService.findById(id);

        if(moodOptional.isPresent()){
            Mood mood = moodOptional.get();
            mood.setMood(moodDTO.getMood());
            mood.setReason(moodDTO.getReason());
            mood.setDate(moodDTO.getDate());
            moodService.save(mood);
            return ResponseEntity.ok("Mood actualizado");
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id){
        if(id != null){
            moodService.deleteById(id);
            return ResponseEntity.ok("Borrado MOOD");
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/findAll")
    public ResponseEntity<?> findAll(){
        List<Mood> moods = moodService.findAll();

        List<MoodDTO> moodDTOList = moods.stream()
                .map(mood -> MoodDTO.builder()
                        .id(mood.getId())
                        .mood(mood.getMood())
                        .reason(mood.getReason())
                        .date(mood.getDate())
                        .build()).collect(Collectors.toList());
        return ResponseEntity.ok(moodDTOList);
    }
}
