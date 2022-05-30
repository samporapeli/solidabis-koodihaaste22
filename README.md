# Solidabis koodihaaste 2022

## Project description
I wrote the frontend in React and didn't modify the backend. The frontend is
open source, licensed under GNU AGPLv3. I wanted to try a CSS framework that
has the look of an old computer UI. 98.css proved to be a good framework as it
relies on semantic HTML and didn't make me write class names on every
component.

Coding the project was fun, and even though I was already somewhat familiar
with React, I learned new things. Unit testing React application felt a bit
difficult, and I'm afraid many of my tests are too much focused on
implementation details like precise wordings. However, tests are located in the
same directory as the components, so keeping them up-to-date shouldn't be too
tedious. I also found bugs in my components while writing tests, so totally
worth it!

I'm proud of my voting mechanism's smoothness and some little details, like
closing restaurant list windows from the title bar and automatically loading
city list based on either localStorage saved values or results list. I also
think the dockerized production setup is cool. There is still room for
improvement, for example the behavior of the city selection input (modifying
text anywhere else than at the end of it doesn't work well), testing, error
handling and handling situations of having the app open on many browser tabs.
It'd also be cool if the windows could be moved around by dragging the title
bars, but that doesn't seem necessary. To make this application more usable, it
should have the possibility to create lunch groups, and have more restaurants
than it currently does.

## Technologies

### Frontend
* React (frontend framework)
* Axios (requests to backend)
* [98.css](https://github.com/jdan/98.css/) (CSS design system)
* SASS (styling)

### Development and support tools
* Node LTS 16 (transpiling React)
* Mozilla Firefox 91.8.0esr (web browser)
* ESLint (code linting)
* Jest, React Testing Library (unit tests)
* Docker, Docker Compose (production containers and orchestration)
    * Alpine Linux (container operating system)
    * Nginx (web server)
* Debian GNU/Linux bookworm/sid (development machine operating system)
* Neovim (text editor)
* [Lily58](https://sampo.website/blog/en/2021/lily58/) (keyboard :smile:)

## Development setup
In project root, run both backend and frontend:

Backend:
```bash
docker run -p 8080:8080 solidabis/koodihaaste22:latest
```

Frontend:
```bash
cd frontend
npm install
npm start
```

Code linting and testing:
```bash
# in frontend directory
npm run lint
CI=true npm test
```

## Production setup
To build frontend, start backend and serve files run
```
docker-compose up
```
After changes, rebuild the container using `--build` argument.

Docker exposes port [3072](http://localhost:3072) by default, it can be changed in `docker-compose.yml`.

<hr />

## Alkuperäinen tehtävänanto

Tehtävänäsi on toteuttaa lounaspaikkaäänestyssovelluksen frontend valmista APIa vasten (työkalut saat valita itse).
Arvosteluperusteet tärkeysjärjestyksessä:

 1. Ratkaisun oikeellisuus
    1. ravintoloiden haku paikkakuntakohtaisesti
    2. äänen antaminen, muuttaminen ja poistaminen
    3. äänestystulosten esittäminen reaaliajassa
 2. Testit
 3. Ratkaisun selkeys ja yksinkertaisuus
 4. Käyttöliittymäratkaisut

Tässä repositoryssä on valmis Spring Bootilla toteutettu backend, joka toteuttaa lounaspaikkojen
haku- ja äänestyslogiikan käyttäen Lounaat.info -palvelua.

Backendin ajamiseen tarvitset JDK:n (versio>=11) ja/tai Dockerin asennettuna työasemallesi.

Backendin käynnistys:

    ./gradlew bootRun

tai Dockerilla:

    docker run -p 8080:8080 solidabis/koodihaaste22:latest

Tutustu API-dokumentaatioon http://localhost:8080/swagger-ui.html

Päivä/selainkohtainen äänioikeus on toteutettu HTTP-only -cookiella.

# Palautus

_Forkkaa tästä repositorystä oma julkinen ratkaisureposi_ ja lähetä linkki 31.5.2022 mennessä sähköpostilla osoitteeseen
koodihaaste@solidabis.com. Muokkaa README.md -tiedostoa siten, että siitä ilmenee vastauksen
tarkastelua helpottavat tiedot, kuten käyttämäsi teknologiat ja muutaman lauseen kuvaus tekemistäsi
ratkaisuista. Voit myös julkaista ratkaisusi esim. Herokuun, muista liittää linkki ja mahdolliset salasanat sähköpostiin!

Backendin muuttaminen esim. autentikoinnin toteuttamiseksi on sallittua.

Kerro samalla haluatko osallistua vain kilpailuun ja arvontaan, vai haluatko Solidabiksen
ottavan yhteyttä myös työtarjouksiin liittyen. Se ei tarkoita, että sinulle lähetettäisiin roskapostia, vaan nimensä
mukaisesti esimerkiksi kutsu työhaastatteluun. Voit halutessasi
osallistua koodihasteeseen myös ilman, että haluat ottaa palkintoa
vastaan tai osallistua arvontaan.
