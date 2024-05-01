package com.fran.PruebaRest2.entities;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "Diario")
public class Diary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Titulo")
    private String titulo;

    @Column(name="Gracias")
    private String agradecimiento;

    @Column(name="Desafios")
    private String desafios;

    @Column(name = "fecha")
    private Date fecha;


}
