--ALTER DATABASE CHARACTER SET AL32UTF8;
--CREATE DATABASE PGP;
--CREATE SCHEMA HERNAN;
CREATE USER "HERNAN" IDENTIFIED BY "Hernan" DEFAULT TABLESPACE "USERS" QUOTA UNLIMITED ON "USERS" ; 
ALTER SESSION SET CURRENT_SCHEMA="HERNAN";

CREATE SEQUENCE sequence_documents
MINVALUE 2
START WITH 2
INCREMENT BY 1 NOCACHE NOCYCLE;

CREATE SEQUENCE sequence_causes_death
MINVALUE 1
START WITH 1
INCREMENT BY 1 NOCACHE NOCYCLE;

CREATE SEQUENCE sequence_users
MINVALUE 1
START WITH 1
INCREMENT BY 1 NOCACHE NOCYCLE;

CREATE SEQUENCE sequence_bovines
MINVALUE 1
START WITH 1
INCREMENT BY 1 NOCACHE NOCYCLE;

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

CREATE TABLE "DEATH_CAUSES" (
	ID INTEGER,
	NAME NVARCHAR2(100),
	DESCRIPTION NVARCHAR2(200),
	CONSTRAINT DEATH_CAUSES_PK PRIMARY KEY (ID) 
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


CREATE TABLE "VETERINARY" (
	ID INTEGER,
	DATE_WORK DATE,
    BOVINE INTEGER,
    TYPE INTEGER,
    OBSERVATION NVARCHAR2(100),
	CONSTRAINT VETERINARY_PK PRIMARY KEY (ID), 
	FOREIGN KEY(BOVINE) REFERENCES BOVINES(ID)
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

INSERT INTO "DEATH_CAUSES" (ID,NAME,DESCRIPTION) VALUES (1,'Mancha','Es una infección transmitida por el suelo, en bovinos es adquirida a partir de la ingestión de alimentos contaminados o por dientes en erupción');
INSERT INTO "DEATH_CAUSES" (ID,NAME,DESCRIPTION) VALUES (2,'Diarrea','');
INSERT INTO "DEATH_CAUSES" (ID,NAME,DESCRIPTION) VALUES (3,'Fascioliasis','Enfermedad parasitaria comunmente llamada pirihuín');
INSERT INTO "DEATH_CAUSES" (ID,NAME,DESCRIPTION) VALUES (4,'Muerte natural','');
INSERT INTO "DEATH_CAUSES" (ID,NAME,DESCRIPTION) VALUES (5,'Carneo','');

CREATE TABLE "BOVINES" (
	ID INTEGER,
	NAME NVARCHAR2(100),
	DATE_BIRTH DATE,
	SEX NVARCHAR2(100),
	TYPE INTEGER,
	MOTHER INTEGER,
	FATHER INTEGER,
	COLOR NVARCHAR2(100),
	STATE NVARCHAR2(100),
	DATE_SALE DATE,
	DATE_DEATH DATE,
	DEATH_CAUSE INTEGER,
	INTERNAL_VERIFICATION CHAR(1) DEFAULT 'N' NOT NULL,
	VERIFIED_SAG CHAR(1) DEFAULT 'N' NOT NULL,
	CONSTRAINT BOVINES_PK PRIMARY KEY (ID),
	FOREIGN KEY(TYPE) REFERENCES TYPES_BOVINES(ID),
	FOREIGN KEY(DEATH_CAUSE) REFERENCES DEATH_CAUSES(ID),
	MAIN_IMAGE INTEGER  
);

--INICIO INSERTS DE PRUEBA. QUITAR AL COMITEAR--

--FIN INSERTS PROPIOS--

ALTER TABLE "BOVINES"
ADD FOREIGN KEY (MOTHER) REFERENCES BOVINES(ID);

ALTER TABLE "BOVINES"
ADD FOREIGN KEY (FATHER) REFERENCES BOVINES(ID);


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

GRANT SELECT ON BOVINES TO HERNAN;

CREATE OR REPLACE FUNCTION HERNAN.getAge (bovine_id NUMBER)
RETURN VARCHAR2
AS
    age VARCHAR2(120);
BEGIN
    -- Calcular la edad con la lógica adicional
    SELECT (
        CASE
            WHEN a.years > 1 THEN TO_CHAR(a.years) || ' años, '
            WHEN a.years = 1 THEN ' 1 año, '
            ELSE ''
        END ||
        CASE
            WHEN a.months = 1 THEN '1 mes, '
            WHEN a.months = 0 THEN ' '
            ELSE TO_CHAR(a.months) || ' meses, '
        END ||
        CASE
            WHEN a.days = 1 THEN '1 día'
            ELSE TO_CHAR(a.days) || ' días'
        END
    )
    INTO age
    FROM (
        SELECT
            TRUNC(MONTHS_BETWEEN(SYSDATE, b.DATE_BIRTH) / 12) AS years,
            TRUNC(MONTHS_BETWEEN(SYSDATE, b.DATE_BIRTH) - 
                  TRUNC(MONTHS_BETWEEN(SYSDATE, b.DATE_BIRTH) / 12) * 12) AS months,
            TRUNC(SYSDATE) - ADD_MONTHS(b.DATE_BIRTH, 
                  TRUNC(MONTHS_BETWEEN(SYSDATE, b.DATE_BIRTH))) AS days
        FROM BOVINES b
        WHERE b.id = bovine_id
    ) a;

    RETURN age;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN 'Bovino no encontrado';
    WHEN OTHERS THEN
        RETURN 'Error al calcular la edad';
END;

/

CREATE OR REPLACE PROCEDURE HERNAN.UPDATETOHEIFER AS
  years INTEGER; 
  r HERNAN.BOVINES%ROWTYPE;
BEGIN
  FOR r IN ( SELECT * FROM HERNAN.BOVINES ) LOOP
    IF r.type=2 THEN
        SELECT trunc(months_between(sysdate,r.DATE_BIRTH) / 12) INTO years FROM HERNAN.BOVINES WHERE id=r.id;
        IF years >= 1 THEN
            UPDATE HERNAN.BOVINES SET TYPE=4 WHERE id=r.id;
        END IF; 
    END IF;
  END LOOP;
END;


/

GRANT CREATE JOB TO HERNAN;
GRANT MANAGE SCHEDULER TO HERNAN;

BEGIN
   LOOP
      -- Verifica si el procedimiento existe
      BEGIN
         EXECUTE IMMEDIATE 'BEGIN HERNAN.UPDATETOHEIFER; END;';
         EXIT; -- Si no hay error, sale del loop
      EXCEPTION
         WHEN OTHERS THEN
            NULL; -- Si no existe, sigue verificando
      END;
      DBMS_LOCK.SLEEP(1); -- Espera un segundo antes de volver a intentar
   END LOOP;

   -- Crea el trabajo
   DBMS_SCHEDULER.CREATE_JOB(
      job_name        => 'UPDATETOHEIFERJOB',
      job_type        => 'STORED_PROCEDURE',
      job_action      => 'HERNAN.UPDATETOHEIFER',
      start_date      => TO_TIMESTAMP_TZ('2025-01-16 12:15:45.0 America/Santiago', 'yyyy-mm-dd hh24:mi:ss.ff tzr'),
      repeat_interval => 'FREQ=DAILY',
      enabled         => TRUE
   );
END;


/