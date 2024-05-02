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
public class MoodDTO {

    private Long id;
    private String mood;
    private String reason;
    private LocalDate date;
}
