CREATE SCHEMA `viajes` ;

USE viajes;
CREATE TABLE `viajes`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(200) NOT NULL,
  `pass` VARCHAR(200) NOT NULL,
  `administrador` INT NOT NULL,
  PRIMARY KEY (`id`));
  
INSERT INTO usuarios (email, pass, administrador) VALUES ('admin@admin.com', 'adminadmin', 1);

CREATE TABLE `viajes`.`permisos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(60) NOT NULL,
  `pagina` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`id`));

INSERT INTO permisos (nombre, pagina) VALUES ('admin', 'administracion.html');
INSERT INTO permisos (nombre, pagina) VALUES ('usuario', 'home.html');

CREATE TABLE `viajes`.`permisosxusuario` (
  `usuario_id` INT NOT NULL,
  `permiso_id` INT NOT NULL,
  PRIMARY KEY (`usuario_id`, `permiso_id`),
  INDEX `fk_permiso_idx` (`permiso_id` ASC) VISIBLE,
  CONSTRAINT `fk_usuario`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `viajes`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_permiso`
    FOREIGN KEY (`permiso_id`)
    REFERENCES `viajes`.`permisos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
INSERT INTO permisosxusuario (usuario_id, permiso_id) VALUES (1, 1);

CREATE TABLE `viajes`.`ofertas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `origen` VARCHAR(60) NOT NULL,
  `destino` VARCHAR(60) NOT NULL,
  `salida` VARCHAR(60) NOT NULL,
  `llegada` VARCHAR(60) NOT NULL,
  `precio` DECIMAL(6,2) NOT NULL,
  `cupos` INT NOT NULL,
  PRIMARY KEY (`id`));
  
INSERT INTO ofertas (origen, destino, salida, llegada, precio, cupos) VALUES ('BUENOS AIRES', 'MADRID', '30/06/2023 07:25', '01/07/2023 11:00', '650.99', 250);
INSERT INTO ofertas (origen, destino, salida, llegada, precio, cupos) VALUES ('BOGOTA', 'LOS ANGELES', '12/07/2023 09:50', '12/07/2023 19:00', '430.00', 200);
INSERT INTO ofertas (origen, destino, salida, llegada, precio, cupos) VALUES ('RIO DE JANEIRO', 'PARIS', '18/08/2023 06:55', '18/08/2023 08:20', '580.99', 250);
