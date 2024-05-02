package com.fran.PruebaRest2.controllers.dto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PensamientoNegativoDTO {

    private Long id;
    private String pensamiento;
    private String analisis;
    private String reestructuracion;
    private LocalDate fecha;
}
