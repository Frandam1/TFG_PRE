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
@Table(name = "biblioteca_tc")
public class Biblioteca {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "tecnica")
    private String tecnica;

    @Column(name = "ejemplo_personal")
    private String ejemploPersonal;

    @Column(name = "aplicacion")
    private String aplicacionPersonal;

    @Column(name = "fecha")
    private LocalDate fecha;
}
