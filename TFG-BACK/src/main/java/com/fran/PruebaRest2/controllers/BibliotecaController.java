package com.fran.PruebaRest2.controllers;

import com.fran.PruebaRest2.controllers.dto.BibliotecaDTO;
import com.fran.PruebaRest2.entities.Biblioteca;
import com.fran.PruebaRest2.service.IBibliotecaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/biblioteca")
@CrossOrigin(origins = "http://localhost:3000")
public class BibliotecaController {

    @Autowired
    private IBibliotecaService bibliotecaService;

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody BibliotecaDTO bibliotecaDTO) throws URISyntaxException{
        if(bibliotecaDTO.getTecnica().isBlank() || bibliotecaDTO.getEjemploPersonal().isBlank() || bibliotecaDTO.getAplicacionPersonal().isBlank() || bibliotecaDTO.getFecha() == null){
            return ResponseEntity.badRequest().build();
        }

        Biblioteca biblioteca = Biblioteca.builder()
                .tecnica(bibliotecaDTO.getTecnica())
                .aplicacionPersonal(bibliotecaDTO.getAplicacionPersonal())
                .ejemploPersonal(bibliotecaDTO.getEjemploPersonal())
                .fecha(bibliotecaDTO.getFecha())
                .build();

        bibliotecaService.save(biblioteca);

        return ResponseEntity.created(new URI("api/biblioteca/save")).build();
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id){
        Optional<Biblioteca> bibliotecaOptional = bibliotecaService.findById(id);

        if(bibliotecaOptional.isPresent()){
            Biblioteca biblioteca = bibliotecaOptional.get();

            BibliotecaDTO bibliotecaDTO = BibliotecaDTO.builder()
                    .id(biblioteca.getId())
                    .tecnica(biblioteca.getTecnica())
                    .ejemploPersonal(biblioteca.getEjemploPersonal())
                    .tecnica(biblioteca.getTecnica())
                    .fecha(biblioteca.getFecha())
                    .build();

            return ResponseEntity.ok(bibliotecaDTO);
        }
        return ResponseEntity.notFound().build();
    }



    @PutMapping("update/{id}")
    public ResponseEntity<?> updateBiblioteca(@PathVariable Long id, @RequestBody BibliotecaDTO bibliotecaDTO){

        Optional<Biblioteca> bibliotecaOptional = bibliotecaService.findById(id);

        if(bibliotecaOptional.isPresent()){
            Biblioteca biblioteca = bibliotecaOptional.get();
            biblioteca.setTecnica(bibliotecaDTO.getTecnica());
            biblioteca.setEjemploPersonal(bibliotecaDTO.getEjemploPersonal());
            biblioteca.setAplicacionPersonal(bibliotecaDTO.getAplicacionPersonal());
            biblioteca.setFecha(bibliotecaDTO.getFecha());
            bibliotecaService.save(biblioteca);
            return ResponseEntity.ok("Ejemplo Actualizado");
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id){
        if(id != null){
            bibliotecaService.deleteById(id);
            return ResponseEntity.ok("Borrado el ejemplo");
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/findAll")
    public ResponseEntity<?> findAll(){
        List<Biblioteca> bibliotecaDTOList = bibliotecaService.findAll();

        List<BibliotecaDTO> bibliotecaDTOS = bibliotecaDTOList.stream()
                .map(biblioteca -> BibliotecaDTO.builder()
                        .id(biblioteca.getId())
                        .tecnica(biblioteca.getTecnica())
                        .aplicacionPersonal(biblioteca.getAplicacionPersonal())
                        .ejemploPersonal(biblioteca.getEjemploPersonal())
                        .fecha(biblioteca.getFecha())
                        .build()).collect(Collectors.toList());

        return ResponseEntity.ok(bibliotecaDTOS);
    }

}











