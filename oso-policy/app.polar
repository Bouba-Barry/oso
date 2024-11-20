## let's define our simple rules to check if a user can made action like read, write or archive a DM
actor User { }

resource Organization {
    roles = ["directeur_hopital", "chef_unite", "chef_service","medecin"];
}

resource DM {
    permissions = ["lire_dm", "ecrire_dm" , "archiver_dm","supprimer_dm"];
    relations = {
        organization: Organization,
    };
    "lire_dm" if "medecin" on "organization";
    "ecrire_dm" if "medecin" on "organization";
    "archiver_dm" if "chef_service" on "organization";
    "supprimer_dm" if "chef_unite" on "organization";
}

has_permission(_: User, "lire_dm", dm: DM) if
  is_public(dm, true);

has_permission(_:User,"supprimer_dm", dm:DM) if
  is_locked(dm,false);