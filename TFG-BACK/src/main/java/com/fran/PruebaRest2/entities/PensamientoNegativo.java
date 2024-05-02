package com.fran.PruebaRest2.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "Pensamientos_Negativos")
public class PensamientoNegativo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "pensamiento_negativo")
    private String pensamiento;

    @Column(name = "analisis_del_pensamiento")
    private String analisis;

    @Column(name = "reestructuracion_del_pensamiento")
    private String reestructuracion;

    @Column(name = "fecha")
    private LocalDate fecha;


}
