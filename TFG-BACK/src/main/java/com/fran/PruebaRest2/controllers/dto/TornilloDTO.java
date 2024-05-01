package com.fran.PruebaRest2.controllers.dto;

import com.fran.PruebaRest2.entities.Proveedor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TornilloDTO {

    private Long id;
    private String nombre;
    private BigDecimal price;
    private Proveedor proveedor;
}
