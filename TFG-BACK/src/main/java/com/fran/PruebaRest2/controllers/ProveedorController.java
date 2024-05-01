package com.fran.PruebaRest2.controllers;

import com.fran.PruebaRest2.controllers.dto.ProveedorDTO;
import com.fran.PruebaRest2.entities.Proveedor;
import com.fran.PruebaRest2.service.IProveedorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/proveedor")
public class ProveedorController {

    @Autowired
    IProveedorService proveedorService;

    @GetMapping("/find/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id){
        Optional<Proveedor> proveedorOptional = proveedorService.findById(id);

        if(proveedorOptional.isPresent()){
            Proveedor proveedor = proveedorOptional.get();

            //Construimos

            ProveedorDTO proveedorDTO = ProveedorDTO.builder()
                    .id(proveedor.getId())
                    .nombre(proveedor.getNombre())
                    .ciudad(proveedor.getCiudad())
                    .tornilloList(proveedor.getTornilloList())
                    .build();

            return ResponseEntity.ok(proveedorDTO);
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/findAll")
    public ResponseEntity<?> findAll(){
        List<ProveedorDTO> proveedorDTOList = proveedorService.findAll()
                .stream()
                .map(proveedor -> ProveedorDTO.builder()
                        .id(proveedor.getId())
                        .nombre(proveedor.getNombre())
                        .tornilloList(proveedor.getTornilloList())
                        .ciudad(proveedor.getCiudad())
                        .build())
                .toList();
        return ResponseEntity.ok(proveedorDTOList);

    }

    @PostMapping("/update/{id}")
    public ResponseEntity<?> updateProveedor(@PathVariable Long id, @RequestBody ProveedorDTO proveedorDTO){

        Optional<Proveedor> proveedorOptional = proveedorService.findById(id);

        if(proveedorOptional.isPresent()){
            Proveedor proveedor = proveedorOptional.get();
            proveedor.setNombre(proveedorDTO.getNombre());
            proveedor.setCiudad(proveedorDTO.getCiudad());
            proveedorService.save(proveedor);
            return ResponseEntity.ok("Proveedor Actualizado correctamernte");
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id){

        if(id != null){
            proveedorService.deleteById(id);
            return ResponseEntity.ok("Proveedor eliminado con exito");
        }
        return ResponseEntity.badRequest().build();
    }

}
