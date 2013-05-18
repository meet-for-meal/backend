backend
=======

Full-ajax backend

## Comportements

### Utilisateurs

Il doit être possible d'afficher la liste des utilisateurs, afficher un utilisateur (pour pouvoir l'éditer), de le mettre à jour et de le supprimer. La création est nécessaire mais n'a pas à figurer sur le backend.

Les commandes ci-dessous ne doivent pas forcément respecter "l'orthographe" des URL mais doit pouvoir renvoyer *au moins* les données suivantes.

#### GET /users

    {
      "id": 1,
      "firstname": "Rémy",
      "lastname": "Funky",
      "username": "rhannequin",
      "created_at": "2013-06-11T10:00:00.000Z"
    },
    {
      "id": 2,
      "firstname": "Hervé",
      "lastname": "Jagbomb",
      "username": "jagbomb",
      "created_at": "2013-06-11T12:30:00.000Z"
    }

#### GET /users/1

    {
      "id": 1,
      "firstname": "Rémy",
      "lastname": "Funky",
      "username": "rhannequin",
      "created_at": "2013-06-11T10:00:00.000Z"
    }

#### PUT /users/1

    200 OK

    {
      "status": "ok"
    }

#### DELETE /users/1

    200 OK

    {
      "status": "ok"
    }

### Restaurants partanaires

Il doit être possible d'afficher la liste des restaurants partenaires, afficher un restaurant (pour pouvoir l'éditer), de le mettre à jour et de le supprimer. La création est nécessaire mais n'a pas à figurer sur le backend.
