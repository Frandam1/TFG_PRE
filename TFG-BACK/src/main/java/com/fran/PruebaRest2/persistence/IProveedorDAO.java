package com.fran.PruebaRest2.persistence;

import com.fran.PruebaRest2.entities.Proveedor;

import java.util.List;
import java.util.Optional;

public interface IProveedorDAO {

    List<Proveedor> findAll();

    Optional<Proveedor> findById(Long id);

    void save(Proveedor proveedor);

    void delete(Long id);
}
