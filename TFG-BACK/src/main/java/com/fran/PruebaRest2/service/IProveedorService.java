package com.fran.PruebaRest2.service;

import com.fran.PruebaRest2.entities.Proveedor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface IProveedorService {

    List<Proveedor> findAll();

    Optional<Proveedor> findById(Long id);

    void save(Proveedor proveedor);

    void deleteById(Long id);
}
