package com.fran.PruebaRest2.repository;

import com.fran.PruebaRest2.entities.Proveedor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProveedorRespositorio extends CrudRepository<Proveedor, Long> {
}
