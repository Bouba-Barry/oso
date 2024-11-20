-- Création des tables
CREATE TABLE Users (
    id VARCHAR(50) PRIMARY KEY,
    role VARCHAR(50),
    affectation JSON,
    specialites JSON
);

CREATE TABLE DM (
    id VARCHAR(50) PRIMARY KEY,
    description TEXT,
    is_locked BOOLEAN,
    is_public BOOLEAN,
    medecin VARCHAR(50),
    service VARCHAR(50),
    specialite VARCHAR(50)
);

CREATE TABLE Org (
    id VARCHAR(50) PRIMARY KEY,
    services JSON
);

-- Insertion des données dans la table Users
INSERT INTO Users (id, role, affectation, specialites) VALUES
('drdup', 'directeur_hopital', '["Aile_Est", "Aile_Ouest"]', NULL),
('drfav', 'chef_service', '["Aile_Est"]', '["CARDIOLOGIE", "CHIRURGIE"]'),
('drber', 'chef_unite', '["Aile_Ouest"]', '["OBSTETRIQUE", "CHIRURGIE"]'),
('drmar', 'medecin', '["Aile_Est"]', '"CHIRURGIE"'),
('drdub', 'medecin', '["Aile_Ouest"]', '"OBSTETRIQUE"'),
('drlam', 'medecin', '["Aile_Est"]', '"CARDIOLOGIE"'),
('drgui', 'medecin', '["Aile_Ouest"]', '"OBSTETRIQUE"');

-- Insertion des données dans la table DM
INSERT INTO DM (id, description, is_locked, is_public, medecin, service, specialite) VALUES
('dm0001', 'Consultation cardiologie', TRUE, TRUE, 'drlam', 'Cardiologie', 'CARDIOLOGIE'),
('dm0002', 'Opération appendicite', TRUE, TRUE, 'drmar', 'Chirurgie', 'CHIRURGIE'),
('dm0003', 'Suivi grossesse', TRUE, FALSE, 'drdub', 'Maternité', 'OBSTETRIQUE');

-- Insertion des données dans la table Org
INSERT INTO Org (id, services) VALUES
('Aile_Est', '["Cardiologie", "Chirurgie"]'),
('Aile_Ouest', '["Maternité"]');
