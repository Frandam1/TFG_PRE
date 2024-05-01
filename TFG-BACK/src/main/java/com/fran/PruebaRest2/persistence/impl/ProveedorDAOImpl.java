package com.fran.PruebaRest2.persistence.impl;

import com.fran.PruebaRest2.entities.Proveedor;
import com.fran.PruebaRest2.persistence.IProveedorDAO;
import com.fran.PruebaRest2.repository.ProveedorRespositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class ProveedorDAOImpl implements IProveedorDAO {

    @Autowired
    private ProveedorRespositorio proveedorRespositorio;

    @Override
    public List<Proveedor> findAll() {
        return (List<Proveedor>) proveedorRespositorio.findAll();
    }

    @Override
    public Optional<Proveedor> findById(Long id) {
        return proveedorRespositorio.findById(id);
    }

    @Override
    public void save(Proveedor proveedor) {
        proveedorRespositorio.save(proveedor);
    }

    @Override
    public void delete(Long id) {
        proveedorRespositorio.deleteById(id);
    }
}
