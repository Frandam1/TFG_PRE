package com.fran.PruebaRest2.controllers.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DiaryDTO {

    private Long id;
    private String titulo;
    private String agradecimiento;
    private String desafios;
    private Date fecha;
}
