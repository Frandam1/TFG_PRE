package com.fran.PruebaRest2.service.impl;

import com.fran.PruebaRest2.entities.Proveedor;
import com.fran.PruebaRest2.persistence.IProveedorDAO;
import com.fran.PruebaRest2.service.IProveedorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class ProveedorServiceImpl implements IProveedorService {

    @Autowired
    private IProveedorDAO proveedorDAO;

    @Override
    public List<Proveedor> findAll(){return proveedorDAO.findAll();}

    @Override
    public Optional<Proveedor> findById(Long id){return proveedorDAO.findById(id);}

    @Override
    public void save(Proveedor proveedor){proveedorDAO.save(proveedor);}

    @Override
    public void deleteById(Long id){

    }

    public void delete(Long id){proveedorDAO.delete(id);}
}
