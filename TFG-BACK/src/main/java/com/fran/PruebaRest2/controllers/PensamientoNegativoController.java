package com.fran.PruebaRest2.controllers;

import com.fran.PruebaRest2.controllers.dto.PensamientoNegativoDTO;
import com.fran.PruebaRest2.entities.PensamientoNegativo;
import com.fran.PruebaRest2.service.IPensamientoNegativoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/pensamiento-negativo")
@CrossOrigin(origins = "http://localhost:3000")
public class PensamientoNegativoController {

    @Autowired
    private IPensamientoNegativoService pensamientoNegativoService;

    @GetMapping("/find/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id){
        Optional<PensamientoNegativo> pensamientoNegativoOptional = pensamientoNegativoService.findById(id);

        if(pensamientoNegativoOptional.isPresent()){
            PensamientoNegativo pensamientoNegativo = pensamientoNegativoOptional.get();

            PensamientoNegativoDTO pensamientoNegativoDTO = PensamientoNegativoDTO.builder()
                    .id(pensamientoNegativo.getId())
                    .pensamiento(pensamientoNegativo.getPensamiento())
                    .analisis(pensamientoNegativo.getAnalisis())
                    .reestructuracion(pensamientoNegativo.getReestructuracion())
                    .fecha(pensamientoNegativo.getFecha())
                    .build();

            return ResponseEntity.ok(pensamientoNegativoDTO);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody PensamientoNegativoDTO pensamientoNegativoDTO) throws URISyntaxException{
        if(pensamientoNegativoDTO.getAnalisis().isBlank() || pensamientoNegativoDTO.getPensamiento().isBlank() || pensamientoNegativoDTO.getReestructuracion().isBlank() || pensamientoNegativoDTO.getFecha() == null){
            return ResponseEntity.badRequest().build();
        }

        PensamientoNegativo pensamientoNegativo = PensamientoNegativo.builder()
                .analisis(pensamientoNegativoDTO.getAnalisis())
                .pensamiento(pensamientoNegativoDTO.getPensamiento())
                .reestructuracion(pensamientoNegativoDTO.getReestructuracion())
                .fecha(pensamientoNegativoDTO.getFecha())
                .build();

        pensamientoNegativoService.save(pensamientoNegativo);

        return ResponseEntity.created(new URI("api/pensamiento-negativo/save")).build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updatePensamientoNegativo(@PathVariable Long id, @RequestBody PensamientoNegativoDTO pensamientoNegativoDTO){

        Optional<PensamientoNegativo> pensamientoNegativoOptional = pensamientoNegativoService.findById(id);

        if(pensamientoNegativoOptional.isPresent()){
            PensamientoNegativo pensamientoNegativo = pensamientoNegativoOptional.get();
            pensamientoNegativo.setPensamiento(pensamientoNegativoDTO.getPensamiento());
            pensamientoNegativo.setAnalisis(pensamientoNegativo.getAnalisis());
            pensamientoNegativo.setReestructuracion(pensamientoNegativo.getReestructuracion());
            pensamientoNegativo.setFecha(pensamientoNegativo.getFecha());
            pensamientoNegativoService.save(pensamientoNegativo);
            return ResponseEntity.ok("Pensamiento actualziado");
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id){

        if(id != null){
            pensamientoNegativoService.deleteById(id);
            return ResponseEntity.ok("Borrado pensamiento");
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/findAll")
    public ResponseEntity<?> findAll(){
        List<PensamientoNegativo> pensamientoNegativos = pensamientoNegativoService.findAll();

        List<PensamientoNegativoDTO> pensamientoNegativoDTOList = pensamientoNegativos.stream()
                .map(pensamientoNegativo -> PensamientoNegativoDTO.builder()
                        .id(pensamientoNegativo.getId())
                        .pensamiento(pensamientoNegativo.getPensamiento())
                        .reestructuracion(pensamientoNegativo.getReestructuracion())
                        .analisis(pensamientoNegativo.getAnalisis())
                        .fecha(pensamientoNegativo.getFecha())
                        .build()).collect(Collectors.toList());
        return ResponseEntity.ok(pensamientoNegativoDTOList);
    }
}
