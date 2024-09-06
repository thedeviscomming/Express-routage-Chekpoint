const express = require('express');
const app = express();
const path = require('path');

// Middleware pour vérifier les heures d'ouverture
const checkBusinessHours = (req, res, next) => {
    const now = new Date();
    const day = now.getDay(); // 0 = Dimanche, 1 = Lundi, ..., 6 = Samedi
    const hour = now.getHours(); // Heure en 24h

    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next(); // Dans les heures d'ouverture
    } else {
        res.status(403).send('Notre site est ouvert uniquement du lundi au vendredi de 9h à 17h.');
    }
};

app.use(checkBusinessHours);

// Configurer le moteur de modèle EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Accueil' });
});

app.get('/services', (req, res) => {
    res.render('services', { title: 'Nos services' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contactez-nous' });
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
