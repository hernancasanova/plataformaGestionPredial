--CREATE USER "HERNAN" IDENTIFIED BY "Hernamstein3" DEFAULT TABLESPACE "USERS" QUOTA UNLIMITED ON "USERS" ; 
 /* CREATE TABLE "HERNAN"."DOCUMENTS" 
   (	"ID" NUMBER(38) GENERATED BY DEFAULT AS IDENTITY, 
	"NAME" VARCHAR2(100), 
	"DESCRIPTION" VARCHAR2(100), 
	"TYPE" NUMBER(38),
    PRIMARY KEY("ID")
   );*/

CREATE USER "HERNAN" IDENTIFIED BY "Hernamstein3" DEFAULT TABLESPACE "USERS" QUOTA UNLIMITED ON "USERS" ; 
ALTER SESSION SET CURRENT_SCHEMA="HERNAN";

CREATE SEQUENCE sequence_documents
MINVALUE 0
START WITH 0
INCREMENT BY 1 NOCACHE NOCYCLE;

CREATE SEQUENCE sequence_animals
MINVALUE 0
START WITH 0
INCREMENT BY 1 NOCACHE NOCYCLE;

CREATE TABLE "TYPES_DOCUMENTS" (
	ID INTEGER,
	NAME VARCHAR2(100),
	DESCRIPTION VARCHAR2(100),
	CONSTRAINT TYPES_DOCUMENTS_PK PRIMARY KEY (ID) 
);

CREATE TABLE "TYPES_BOVINES" (
	ID INTEGER,
	NAME VARCHAR2(100),
	DESCRIPTION VARCHAR2(100),
	CONSTRAINT TYPES_BOVINES_PK PRIMARY KEY (ID) 
);

CREATE TABLE "DOCUMENTS" (
	ID INTEGER,
	NAME VARCHAR2(100),
	DESCRIPTION VARCHAR2(100),
	TYPE INTEGER,
	CONSTRAINT DOCUMENTS_PK PRIMARY KEY (ID), 
	FOREIGN KEY(TYPE) REFERENCES TYPES_DOCUMENTS(ID)
);

CREATE TABLE "BOVINES" (
	ID INTEGER,
	NAME VARCHAR2(100),
	DATE_BIRTH DATE,
	SEX VARCHAR2(100),
	TYPE INTEGER,
	MOTHER INTEGER,
	COLOR VARCHAR2(100),
	STATE VARCHAR2(100),
	DATE_SALE DATE,
	CONSTRAINT BOVINES_PK PRIMARY KEY (ID) 
);


CREATE TABLE "USERS" (
	ID INTEGER,
	NAME VARCHAR2(100),
	PASSWORD VARCHAR2(100),
	CONSTRAINT USERS_PK PRIMARY KEY (ID) 
);

INSERT INTO "USERS" (ID,NAME,PASSWORD) values (1,'hernan','12345');
INSERT INTO "TYPES_DOCUMENTS" (ID,NAME,DESCRIPTION) values (1,'Formulario','Documento para el ingreso de información');
INSERT INTO "DOCUMENTS" (ID,NAME,DESCRIPTION,TYPE) values (sequence_documents.nextval,'FMA','Formulario emitido por el SAG para el traslado de animales',1);

-- CREATE TRIGGER DOCUMENT_TRIGGER_3
-- BEFORE INSERT ON "DOCUMENTS"
-- FOR EACH ROW
-- BEGIN
--   SELECT sequence_document.nextval
--   INTO :new.ID
--   FROM dual;
-- END;
