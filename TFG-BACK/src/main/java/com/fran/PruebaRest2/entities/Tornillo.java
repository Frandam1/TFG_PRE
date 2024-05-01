package com.fran.PruebaRest2.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "Tornillo")
public class Tornillo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Nombre")
    private String nombre;

    @Column(name="Precio")
    private BigDecimal price;


    @ManyToOne
    @JoinColumn(name = "id_proveedor", nullable = false)
    @JsonIgnore
    private Proveedor proveedor;
}
