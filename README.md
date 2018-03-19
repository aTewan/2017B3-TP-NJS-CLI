# 2017B3-TP-NJS-CLI

## Commandes :

* meteo d : permet de récupérer la météo du jour dans cette ville.  
* meteo w : permet de récupérer la météo sur les 5 prochains jours dans cette ville.  
* meteo f : permet de voir les villes ajoutées en favoris et ainsi de récupérer leurs météos.

## API utilisée :

* OpenWeatherMap : http://openweathermap.org/

## Modules utilisés :

* Commander : afin de convertir notre application en commande shell.
* Inquirer : afin de pouvoir utiliser des prompts ce qui rend l'expérience utilisateur plus agréable.
* Request : afin de faire des appels HTTP sur l'API.
* Chalk : afin de colorer du texte.
* Cli-Table2 : afin de dessiner des tableaux.
* Moment : afin de formater les dates.
* Sqlite3 : afin de pouvoir stocker en favori des villes.

## Quelques détails :

* La plupart des erreurs sont gérés comme : pas d'accès internet, une ville saisie par l'utilisateur qui n'existe pas, lorsque l'utilisateur veut ajouter une ville qui existe déjà dans ses favoris ou quand il veut afficher ses favoris alors qu'il n'a ajouté aucune ville dans ses favoris.