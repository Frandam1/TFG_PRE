package com.fran.PruebaRest2.controllers.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BibliotecaDTO {

    private Long id;
    private String tecnica;
    private String ejemploPersonal;
    private String aplicacionPersonal;
    private LocalDate fecha;
}
