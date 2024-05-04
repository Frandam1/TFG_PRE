INSERT INTO Proveedor(id, nombre, ciudad) VALUES(1, 'Asus','Valencia');
INSERT INTO Proveedor(id, nombre, ciudad) VALUES(2, 'Lenovo','Valencia');
INSERT INTO Proveedor(id, nombre, ciudad) VALUES(3, 'Hewlett-Packard','Valencia');
INSERT INTO Proveedor(id, nombre, ciudad) VALUES(4, 'Samsung','Valencia');
INSERT INTO Proveedor(id, nombre, ciudad) VALUES(5, 'Seagate','Valencia');
INSERT INTO Proveedor(id, nombre, ciudad) VALUES(6, 'Crucial','Valencia');
INSERT INTO Proveedor(id, nombre, ciudad) VALUES(7, 'Gigabyte','Valencia');
INSERT INTO Proveedor(id, nombre, ciudad) VALUES(8, 'Huawei','Valencia');
INSERT INTO Proveedor(id, nombre, ciudad) VALUES(9, 'Xiaomi','Valencia');

INSERT INTO Diario(id, titulo, gracias, desafios, fecha) VALUES(1, 'titulo','grcias', 'desafio', NOW());
INSERT INTO Diario(id, titulo, gracias, desafios, fecha) VALUES(2, 'titulo2','grcias3', 'desafio3', NOW());
INSERT INTO Diario(id, titulo, gracias, desafios, fecha) VALUES(3, 'titulo4','grcias2', 'desafio4', NOW());

INSERT INTO Animo(id, fecha, animo, motivo) VALUES(1, NOW(),'Feliz', 'reasons varias');
INSERT INTO Animo(id, fecha, animo, motivo) VALUES(2, NOW(),'Feliz', 'reasons varias');
INSERT INTO Animo(id, fecha, animo, motivo) VALUES(3, NOW(),'Feliz', 'reasons varias');

INSERT INTO Pensamientos_Negativos(id, pensamiento_negativo, analisis_del_pensamiento, reestructuracion_del_pensamiento, fecha) VALUES(1, 'quiza','pensamietos', 'negativos', NOW());

INSERT INTO biblioteca_tc(id, tecnica, ejemplo_personal, aplicacion, fecha) VALUES(1, 'biblioteca_tctecnica','biblioteca_tcejemplo_personal', 'biblioteca_tcaplicacion', NOW());
INSERT INTO biblioteca_tc(id, tecnica, ejemplo_personal, aplicacion, fecha) VALUES(2, 'biblioteca_tctecnica2','biblioteca_tcejemplo_personal2', 'biblioteca_tcaplicacion2', NOW());



INSERT INTO Tornillo(id, nombre, precio, id_proveedor) VALUES(1, 'Disco duro SATA3 1TB', 86.99, 5);
INSERT INTO Tornillo(id, nombre, precio, id_proveedor) VALUES(2, 'Memoria RAM DDR4 8GB', 120, 6);
INSERT INTO Tornillo(id, nombre, precio, id_proveedor) VALUES(3, 'Disco SSD 1 TB', 150.99, 4);
INSERT INTO Tornillo(id, nombre, precio, id_proveedor) VALUES(4, 'GeForce GTX 1050Ti', 185, 7);
INSERT INTO Tornillo(id, nombre, precio, id_proveedor) VALUES(5, 'GeForce GTX 1080 Xtreme', 755, 6);
INSERT INTO Tornillo(id, nombre, precio, id_proveedor) VALUES(6, 'Monitor 24 LED Full HD', 202, 1);
INSERT INTO Tornillo(id, nombre, precio, id_proveedor) VALUES(7, 'Monitor 27 LED Full HD', 245.99, 1);
INSERT INTO Tornillo(id, nombre, precio, id_proveedor) VALUES(8, 'Portátil Yoga 520', 559, 2);
INSERT INTO Tornillo(id, nombre, precio, id_proveedor) VALUES(9, 'Portátil Ideapd 320', 444, 2);
INSERT INTO Tornillo(id, nombre, precio, id_proveedor) VALUES(10, 'Impresora HP Deskjet 3720', 59.99, 3);
INSERT INTO Tornillo(id, nombre, precio, id_proveedor) VALUES(11, 'Impresora HP Laserjet Pro M26nw', 180, 3);