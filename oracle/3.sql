--ALTER DATABASE CHARACTER SET AL32UTF8;
--CREATE DATABASE PGP;
--CREATE SCHEMA HERNAN;
CREATE USER "HERNAN" IDENTIFIED BY "Hernamstein3" DEFAULT TABLESPACE "USERS" QUOTA UNLIMITED ON "USERS" ; 
ALTER SESSION SET CURRENT_SCHEMA="HERNAN";

CREATE SEQUENCE sequence_documents
MINVALUE 1
START WITH 1
INCREMENT BY 1 NOCACHE NOCYCLE;

CREATE SEQUENCE sequence_users
MINVALUE 1
START WITH 1
INCREMENT BY 1 NOCACHE NOCYCLE;

--DESHACER ESTE CAMBIO
CREATE SEQUENCE sequence_animals
MINVALUE 1
START WITH 1
INCREMENT BY 1 NOCACHE NOCYCLE;

ALTER SYSTEM ENABLE RESTRICTED SESSION;

--ALTER DATABASE CHARACTER SET INTERNAL_USE AR8MSWIN1256;
ALTER DATABASE CHARACTER SET INTERNAL_USE AL32UTF8;
--ALTER DATABASE CHARACTER SET INTERNAL_USE we8ebcdic284;

--ALTER DATABASE SET NLS_LANG=SPANISH_SPAIN.AL32UTF8;

--ALTER SYSTEM SET NLS_LANG=SPANISH_SPAIN.AL32UTF8;

--SET NLS_LANG=SPANISH_SPAIN.AL32UTF8;
--SET NLS_LANG=AMERICAN_AMERICA.WE8MSWIN1252;
--SET NLS_LANG=SPANISH_SPAIN.WE8ISO8859P1;


ALTER SYSTEM DISABLE RESTRICTED SESSION;


CREATE TABLE "TYPES_DOCUMENTS" (
	ID INTEGER,
	NAME NVARCHAR2(100),
	DESCRIPTION NVARCHAR2(100),
	CONSTRAINT TYPES_DOCUMENTS_PK PRIMARY KEY (ID) 
);

CREATE TABLE "TYPES_BOVINES" (
	ID INTEGER,
	NAME NVARCHAR2(100),
	DESCRIPTION NVARCHAR2(100),
	CONSTRAINT TYPES_BOVINES_PK PRIMARY KEY (ID) 
);

CREATE TABLE "DOCUMENTS" (
	ID INTEGER,
	NAME NVARCHAR2(100),
	DESCRIPTION NVARCHAR2(100),
	TYPE INTEGER,
	CONSTRAINT DOCUMENTS_PK PRIMARY KEY (ID), 
	FOREIGN KEY(TYPE) REFERENCES TYPES_DOCUMENTS(ID)
);

CREATE TABLE "WORKERS" (
	ID INTEGER,
	NAME NVARCHAR2(100),
	CONSTRAINT WORKERS_PK PRIMARY KEY (ID) 
);


CREATE TABLE "WORKS" (
	ID INTEGER,
	NAME NVARCHAR2(100),
	DESCRIPTION NVARCHAR2(100),
	INITIAL_DATE DATE,
	FINISH_DATE DATE,
	ESTIMATED_COST INTEGER,
	WORKER INTEGER,
	--TYPE INTEGER,--?
	CONSTRAINT WORKS_PK PRIMARY KEY (ID), 
	FOREIGN KEY(WORKER) REFERENCES WORKERS(ID)
);


INSERT INTO "TYPES_BOVINES" (ID,NAME,DESCRIPTION) VALUES (1,'Ternero',NULL);
INSERT INTO "TYPES_BOVINES" (ID,NAME,DESCRIPTION) VALUES (2,'Ternera',NULL);
INSERT INTO "TYPES_BOVINES" (ID,NAME,DESCRIPTION) VALUES (3,'Toro',NULL);
INSERT INTO "TYPES_BOVINES" (ID,NAME,DESCRIPTION) VALUES (4,'Vaquilla',NULL);
INSERT INTO "TYPES_BOVINES" (ID,NAME,DESCRIPTION) VALUES (5,'Vaca',NULL);
INSERT INTO "TYPES_BOVINES" (ID,NAME,DESCRIPTION) VALUES (6,'Buey',NULL);
INSERT INTO "TYPES_BOVINES" (ID,NAME,DESCRIPTION) VALUES (7,'Novillo',NULL);


CREATE TABLE "BOVINES" (
	ID INTEGER,
	NAME NVARCHAR2(100),
	DATE_BIRTH DATE,
	SEX NVARCHAR2(100),
	TYPE INTEGER,
	MOTHER INTEGER,
	COLOR NVARCHAR2(100),
	STATE NVARCHAR2(100),
	DATE_SALE DATE,
	VERIFIED_SAG CHAR(1) DEFAULT 'N' NOT NULL,
	CONSTRAINT BOVINES_PK PRIMARY KEY (ID),
	FOREIGN KEY(TYPE) REFERENCES TYPES_BOVINES(ID) 
);

--ALTER SESSION SET NLS_DATE_LANGUAGE='ENGLISH'
--alter session set nls_date_format = 'DD/MM/YYYY';

--INICIO INSERTS DE PRUEBA. QUITAR AL COMITEAR--

--FIN INSERTS PROPIOS--

ALTER TABLE "BOVINES"
ADD FOREIGN KEY (MOTHER) REFERENCES BOVINES(ID);


CREATE TABLE "IDENTIFIERS" (
	DIIO NVARCHAR2(10),
	BOVINE_ID INTEGER,
	DATE_PLACEMENT DATE,
	STATE NVARCHAR2(100),
	CONSTRAINT DIIO_PK PRIMARY KEY (DIIO)
	--CONSTRAINT BOVINE_ID_FK FOREIGN KEY (BOVINE_ID) REFERENCES BOVINES (ID)
);

ALTER TABLE "IDENTIFIERS"
ADD FOREIGN KEY (BOVINE_ID) REFERENCES BOVINES(ID);

--INSERT ARETES. Quitar al comitear

--FIN INSERT ARETES

CREATE TABLE "USERS" (
	ID INTEGER,
	NAME NVARCHAR2(100),
	PASSWORD NVARCHAR2(100),
	CONSTRAINT USERS_PK PRIMARY KEY (ID) 
);

INSERT INTO "USERS" (ID,NAME,PASSWORD) values (1,'hernan@correo.com','12345');
INSERT INTO "TYPES_DOCUMENTS" (ID,NAME,DESCRIPTION) values (1,'Formulario','Documento para el ingreso de información');
INSERT INTO "TYPES_DOCUMENTS" (ID,NAME,DESCRIPTION) values (2,'Respaldo','Documento que valida algún proceso');
INSERT INTO "TYPES_DOCUMENTS" (ID,NAME,DESCRIPTION) values (3,'Factura','Documento emitido en alguna venta');
INSERT INTO "DOCUMENTS" (ID,NAME,DESCRIPTION,TYPE) values (1,'FMA','Formulario emitido por el SAG para el traslado de animales',1);
INSERT INTO "WORKERS" (ID,NAME) values (1,'Segundo pereira');
INSERT INTO "WORKS" (ID,NAME,DESCRIPTION,INITIAL_DATE,FINISH_DATE,ESTIMATED_COST,WORKER) values (1,'Cerco deslinde estero','Arreglo cerco destruido por vacas',to_date('17/08/23','DD/MM/RR'),to_date('19/08/23','DD/MM/RR'),'35000',1);

--INSERT INTO "DOCUMENTS" (ID,NAME,DESCRIPTION,TYPE) values (sequence_documents.nextval,'FMA','Formulario emitido por el SAG para el traslado de animales',2);
--INSERT INTO "DOCUMENTS" (ID,NAME,DESCRIPTION,TYPE) values (sequence_documents.nextval,'FMA','Formulario emitido por el SAG para el traslado de animales',3);
--INSERT INTO "BOVINES" (ID,NAME,DATE_BIRTH,SEX,TYPE,MOTHER,COLOR,STATE,DATE_SALE) values (1,'Vaca amarilla','2023-12-05','hembra','vaca',1,'Amarillo','Vivo','2023-12-05');

CREATE VIEW LISTBOVINES AS SELECT b.ID, b.NAME AS Name, nvl(i.DIIO,'Sin arete') AS Diio, i.DATE_PLACEMENT AS datePlacement, b.DATE_BIRTH AS dateBirth, bo.NAME AS Mother , tb.NAME AS Type FROM HERNAN.BOVINES b LEFT JOIN HERNAN.IDENTIFIERS i on b.ID = i.BOVINE_ID JOIN HERNAN.BOVINES bo on b.MOTHER = bo.ID  JOIN HERNAN.TYPES_BOVINES tb on tb.ID=b.TYPE WHERE b.DATE_SALE IS NULL AND (i.STATE='activo' or i.DIIO is NULL ) AND b.STATE = 'Vivo' AND  b.ID <> 0;

-- CREATE FUNCTION getAge (bovine_id NUMBER)
-- RETURN VARCHAR2
-- AS 
-- age varchar2(40) := "";
-- BEGIN 
-- 	SELECT (to_char(a.years) || ' años, ' || to_char(a.months) || ' meses y ' || to_char(a.days) || ' días ') INTO age FROM (SELECT sysdate,
--   b.DATE_BIRTH ,
--   trunc(months_between(sysdate,b.DATE_BIRTH) / 12) as years,
--   trunc(months_between(sysdate,b.DATE_BIRTH) -
--     (trunc(months_between(sysdate,b.DATE_BIRTH) / 12) * 12)) as months,
--   trunc(sysdate)
--     - add_months(b.DATE_BIRTH , trunc(months_between(sysdate,b.DATE_BIRTH))) as days
-- from BOVINES b WHERE b.id = bovine_id) a;	
-- RETURN age;
-- END;

CREATE OR REPLACE FUNCTION HERNAN.getAge (bovine_id NUMBER)
RETURN VARCHAR2
 IS 
 age varchar2(40) := "";
 BEGIN 
 	SELECT (to_char(a.years) || ' años, ' || to_char(a.months) || ' meses y ' || to_char(a.days) || ' días ') INTO age FROM (SELECT sysdate,
   b.DATE_BIRTH ,
   trunc(months_between(sysdate,b.DATE_BIRTH) / 12) as years,
   trunc(months_between(sysdate,b.DATE_BIRTH) -
     (trunc(months_between(sysdate,b.DATE_BIRTH) / 12) * 12)) as months,
   trunc(sysdate)
     - add_months(b.DATE_BIRTH , trunc(months_between(sysdate,b.DATE_BIRTH))) as days
 from BOVINES b WHERE b.id = bovine_id) a;	
 RETURN age;
 END;