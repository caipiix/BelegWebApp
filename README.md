adVizStyle ist ein Projekt von:

    Kevin Lisse
    Matrikel-Nr. 573586

Project description:
    
    adVizStyle ist durch eine Belegabgabe entstanden.

    Aufgabe war es, eine WebApplication mit Node.js, mongo.db und express in JavaScript zu entwickeln. Welche einer Art digitales Telefonbuch entspricht.
    Dies Umfasst das Speichern von Name, Adresse, Telefonnummer und Geburtsdatum.
    Für die Umsetzung sollte von zwei User Stories ausgegangen werden, einer Admin:a Story und einer non Admin:a (normal) Story.
    
    Ein:e Admin:a kann nur Kontakte für sich anlegen, alle bearbeiten - keine Ownership ändern und alle Kontakte ansehen.
    Ein:e non Admin:a kann nur Kontakte für sich anlegen, eigene Kontakte bearbeiten - keine Ownership ändern und Publike Kontakte ansehen.
    
    Das Node.JS Backend stellt zwei Endpoints zu verfügung:
    /users & /contacts.
    
    /users aktzeptiert nur einen Post Request mit der username/password comb in der Payload, für einen Login.
    
    /contacts aktzeptiert alle 4 HTTP Requests für die CRUDs von Kontakten.

All dependendies are stored in package.json
    
    run:
    npm install

import start advizDB and store data 

    Make sure Node.JS & mongoDB are installed on your device !important
    run:
    node /path/to/BelegWebApp/yourScriptfile.js


starting server:
    
    Make sure Node.JS is installed on your device
    run:
    node /path/to/BelegWebApp/bin/www

Url to the login-Page:

    http://localhost:3000/
