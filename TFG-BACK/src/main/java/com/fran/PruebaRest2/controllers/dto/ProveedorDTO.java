package com.fran.PruebaRest2.controllers.dto;

import com.fran.PruebaRest2.entities.Tornillo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProveedorDTO {

    private Long id;
    private String nombre;
    private String ciudad;
    private List<Tornillo> tornilloList = new ArrayList<>();
}
