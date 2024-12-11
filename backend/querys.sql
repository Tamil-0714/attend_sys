-- faculty table
create database resource_mangement;

use resource_mangement;

create table facultyCred(
    id varchar(16) primary key, 
    pass varchar(255) not null 
);

-- example values 
insert into facultyCred(id,pass) values("15FCS01","$2a$12$VUSD44Y.asCx7B6fZd0au.AGyHeWueLaLyiCMjgweVV1M4oDh0NRK"); -- fac_0011
insert into facultyCred(id,pass) values("15FCS02","$2a$12$XmbhYXwVbMluDx6KPY5uKuyk2/fTAFv4iBB76If31SmeqjTwhAXY6"); -- chocho_79

select * from facultyCred where id = ?;


-------------------------------------------------------------------------------------------------------------------------------------

-- admin table

create table adminCred(
    id varchar(16) primary key,
    pass varchar(255) not null 
);
insert into adminCred(id,pass) values("admin","$2a$12$GItZp0K210risZyDfRuYVO1DOxYRIhpRN6QM7RY29RA8qsd2xNyXu"); -- admin

-------------------------------------------------------------------------------------------------------------------------------------

-- student table

create table studentCred(
    id varchar(16) primary key,
    pass varchar(255) not null 
);
insert into studentCred(id,pass) values("22ucs622","$2a$12$CABFTzxYI2l6IPu2Y2r9De89bs5kXrZQ085vG2A45Ktb45egaAvQq"); -- iamstd@123

