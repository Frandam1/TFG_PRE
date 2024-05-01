package com.fran.PruebaRest2.controllers;

import com.fran.PruebaRest2.controllers.dto.TornilloDTO;
import com.fran.PruebaRest2.entities.Tornillo;
import com.fran.PruebaRest2.service.ITornilloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Optional;

@RestController
@RequestMapping("/api/tornillo")
@CrossOrigin(origins = "http://localhost:3000") // Permite solicitudes CORS del cliente React
public class TornilloController {

    @Autowired
    private ITornilloService tornilloService;

    @GetMapping("/find/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id){
        Optional<Tornillo> tornilloOptional = tornilloService.findById(id);

        if(tornilloOptional.isPresent()){
            Tornillo tornillo = tornilloOptional.get();

            TornilloDTO tornilloDTO = TornilloDTO.builder()
                    .id(tornillo.getId())
                    .nombre(tornillo.getNombre())
                    .price(tornillo.getPrice())
                    .proveedor(tornillo.getProveedor())
                    .build();

            return ResponseEntity.ok(tornilloDTO);
        }

        return ResponseEntity.notFound().build();
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody TornilloDTO tornilloDTO) throws URISyntaxException{

        if(tornilloDTO.getNombre().isBlank() || tornilloDTO.getPrice() == null || tornilloDTO.getProveedor() == null){
            return ResponseEntity.badRequest().build();
        }
        // Patron builder para construir el DTO
        Tornillo tornillo = Tornillo.builder()
                .nombre(tornilloDTO.getNombre())
                .price(tornilloDTO.getPrice())
                .proveedor(tornilloDTO.getProveedor())
                .build();

        tornilloService.save(tornillo);

        return ResponseEntity.created(new URI("api/tornillo/save")).build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody TornilloDTO tornilloDTO){
        Optional<Tornillo> tornilloOptional = tornilloService.findById(id);

        if(tornilloOptional.isPresent()){
            Tornillo tornillo = tornilloOptional.get();
            tornillo.setNombre(tornilloDTO.getNombre());
            tornillo.setPrice(tornilloDTO.getPrice());
            tornillo.setProveedor(tornilloDTO.getProveedor());
            tornilloService.save(tornillo);
            return ResponseEntity.ok("Actualizado");
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id){

        if(id != null){
            tornilloService.deleteById(id);
            return ResponseEntity.ok("Lo has borrado?");
        }

        return ResponseEntity.badRequest().build();
    }



}
