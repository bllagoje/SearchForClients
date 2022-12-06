// objekat filter: 
let filter = { 
    "ime" : "", 
    "godinaOd": "", 
    "godinaDo": "",
    "brend" : "", 
    "bezDuga" : false, 
    "iznosVeci": false,
    "iznos" : "", 
    "karticaVazi" : false, 
    "meseci" : ""
}; 

// kopija klijenata: 
let kopijaKlijenata = klijenti;

// pozivanje funkcija na pocetku: 
sakrijDodatneFiltere(); 
checkboxovi();
generisiDropdown(kopijaKlijenata);
pretragaListe(); 
odabirBrendaKartice();
modalniProzor();
zatvoriPredefinisaniKontejner();
zatvoriRecSearch();

// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------
// skrivanje dodatnih filtera:
function sakrijDodatneFiltere() { 
    let dodatniFilteri = document.getElementById("DodatniFilteri"); 
    let kontejner2 = document.getElementById("Kontejner2"); 
    dodatniFilteri.addEventListener("click", () => {
        sakrijGresku1();
        sakrijGresku2();
        sakrijSnackbar();
        kontejner2.classList.toggle("Skriveno");
        dodatniFilteri.classList.toggle("Otvoreno"); 
        if(kontejner2.classList.contains("Skriveno")) {
            document.getElementById("FilterTekst").innerText = "Prikaži dodatne filtere"; 
        } else {
            document.getElementById("FilterTekst").innerText = "Sakrij dodatne filtere";
        }
    })
};

// checkboxovi:
function checkboxovi() {
    let cbKlijentiBezDuga = document.getElementById("CBKlijentiBezDuga"); 
    let cbKlijentiIznos = document.getElementById("CBKlijentiIznos"); 
    let cbKarticaVazi = document.getElementById("CBKarticaVazi"); 

    cbKlijentiBezDuga.addEventListener("click", () => {
        cbKlijentiBezDuga.classList.toggle("Oznaceno"); 
    })

    cbKlijentiIznos.addEventListener("click", () => {
        cbKlijentiIznos.classList.toggle("Oznaceno"); 
    })

    cbKarticaVazi.addEventListener("click", () => {
        cbKarticaVazi.classList.toggle("Oznaceno"); 
    })
}; 

// funkcija generisiDropdown(): 
function generisiDropdown() {
    let kopijaKlijenata = klijenti; 
    let kartice = []; 
    
    for(const klijent of kopijaKlijenata) {
        for(let i = 0; i < klijent.karticeKlijenta.length; i++) {
            let karticaBrendVrsta = klijent.karticeKlijenta[i].BrendKartice + " / " + klijent.karticeKlijenta[i].VrstaKartice; 
            if(kartice.indexOf(karticaBrendVrsta) === -1) {
                kartice.push(karticaBrendVrsta);
                
            }
        }
    }
    for(const kartica of kartice) {
        let cbBox = document.getElementById("CBBrendKartice"); 
        let novaKartica = document.createElement("li"); 
            novaKartica.innerHTML = `${kartica}`;
            cbBox.appendChild(novaKartica);
        }
        // console.log(kartice);
};

// funkcija pretragaListe():
function pretragaListe() {
    let brendKarticeUnos = document.getElementById("BrendKarticeUnos");
    let kartice = document.querySelectorAll("#CBBrendKartice li");
    // pretraga po input-
    brendKarticeUnos.addEventListener("input", azurirajListu); 

    function azurirajListu() {
        for(const kartica of kartice) {
            let unos = brendKarticeUnos.value.toLowerCase();
            let nazivBrenda = kartica.innerText.toLowerCase();

            if(nazivBrenda.includes(unos)) {
                kartica.style.display = ""; 
            } else {
                kartica.style.display = "none";
            }
        }
    };
};

// funkcija odabirBrendaKartice(): 
function odabirBrendaKartice() {
    let brendKarticeUnos = document.getElementById("BrendKarticeUnos");
    let cbBox = document.getElementById("CBBrendKartice"); 

    cbBox.addEventListener("click", (e) => {
        brendKarticeUnos.value = e.target.innerText;
        brendKarticeUnos.disabled = false;

        cbBox.innerHTML = "";
        generisiDropdown();
        // console.log(e.target.innerText);
    });
};

// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------
// klik na dugme PRETRAZI:
let dugmePretrazi = document.getElementById("Pretrazi"); 
dugmePretrazi.addEventListener("click", pretrazi);

// funkcija pretrazi(): 
function pretrazi() {
    let imePrezimeUnos = document.getElementById("ImePrezimeUnos").value; 
    let godRodjOdUnos = document.getElementById("GodRodjOd").value; 
    let godRodjDoUnos = document.getElementById("GodRodjDo").value;
    let brendKarticeUnos = document.getElementById("BrendKarticeUnos").value; 
    let dodatniFilteri = document.getElementById("DodatniFilteri");
    let cbKlijentiBezDuga = document.getElementById("CBKlijentiBezDuga"); 
    let cbKlijentiIznos = document.getElementById("CBKlijentiIznos"); 
    let unosIznosVeciOd = document.getElementById("UnosIznosVeciOd").value; 
    let cbKarticaVazi = document.getElementById("CBKarticaVazi"); 
    let unosKarticaVazi = document.getElementById("UnosKarticaVazi").value; 
    sakrijGresku1(); 
    sakrijGresku2();
    sakrijSnackbar();

    let finalniNiz = klijenti; 

    filter.ime = ""; 
    filter.godinaOd = ""; 
    filter.godinaDo = ""; 
    filter.brend = ""; 
    filter.bezDuga = "false"; 
    filter.iznosVeci = "false"; 
    filter.iznos = ""; 
    filter.karticaVazi = "false"; 
    filter.meseci = "";


    // pretraga imena i prezimena: 
    if(imePrezimeUnos != "") {
        finalniNiz = pretraziImePrezime(); 
        filter.ime = imePrezimeUnos; 
    }; 

    // pretraga godina rodjenja: 
    // godina od:
    if(godRodjOdUnos == "") {
    } else {
        filter.godinaOd = godRodjOdUnos; 
        finalniNiz = finalniNiz.filter(finalniNiz => {
            let godina = finalniNiz.DatRodjKlijenta; 
            let godina2 = godina.split("-"); 
            return godina2[0] >= godRodjOdUnos; 
        })
    }; 
    
    // godina do:
    if (godRodjDoUnos == "") { 
    } else {
        filter.godinaDo = godRodjDoUnos; 
        finalniNiz = finalniNiz.filter(finalniNiz => {
            let godina = finalniNiz.DatRodjKlijenta; 
            let godina2 = godina.split("-"); 
            return godina2[0] <= godRodjDoUnos; 
        })
    }; 

    // provera da li je GODINA DO manja od GODINE OD:
    if(godRodjDoUnos < godRodjOdUnos) {
        prikaziSnackbar(); 
        return 0; 
    } else if(godRodjOdUnos != "" && godRodjDoUnos != "") {
        sakrijSnackbar(); 
        filter.godinaOd = godRodjOdUnos; 
        filter.godinaDo = godRodjDoUnos; 
        finalniNiz = finalniNiz.filter(finalniNiz => {
            let godina = finalniNiz.DatRodjKlijenta; 
            let godina2 = godina.split("-"); 
            if(godina2[0] >= godRodjOdUnos && godina2[0] <= godRodjDoUnos) {
                return finalniNiz; 
            }
        })
    }; 

    // pretraga brend kartice: 
    if(brendKarticeUnos != "") {
        filter.brend = brendKarticeUnos; 
        let brendVrstaNiz = brendKarticeUnos.split(' / ');
        finalniNiz = finalniNiz.filter(finalniNiz => {
            for(const kartice of finalniNiz.karticeKlijenta) {
                if(kartice.BrendKartice == brendVrstaNiz[0] && kartice.VrstaKartice == brendVrstaNiz[1]) {
                    return finalniNiz; 
                }
            }
        })
    }; 

    // ako su prikazani dodatni filteri: 
    if(dodatniFilteri.classList.contains("Otvoreno")) {
        
        // pretraga klijenata bez duga:
        if(cbKlijentiBezDuga.classList.contains("Oznaceno")) {
            filter.bezDuga = "true"; 
            finalniNiz = finalniNiz.filter(finalniNiz => {
                let ukupnoStanje = 0; 
                for(const racuni of finalniNiz.racuniKlijenta) {
                    ukupnoStanje = (ukupnoStanje) + (racuni.Stanje);
                }
                if(ukupnoStanje >= 0) {
                    return finalniNiz;
                } 
            })
        }; 

        // pretraga klijenata koji duguju iznos veci od: 
        if(cbKlijentiIznos.classList.contains("Oznaceno")) {
            filter.iznosVeci = "true"; 
            if(unosIznosVeciOd != "") {
                filter.iznos = unosIznosVeciOd; 
                sakrijSnackbar();
                sakrijGresku1();
                finalniNiz = finalniNiz.filter(finalniNiz => {
                    let ukupnoStanje = 0; 
                    for(let i = 0; i < finalniNiz.racuniKlijenta.length; i++) {
                        ukupnoStanje = ukupnoStanje + finalniNiz.racuniKlijenta[i].Stanje; 
                    }
                    // negativno stanje:
                    if(ukupnoStanje < 0) {
                        if((ukupnoStanje * (-1)) > unosIznosVeciOd) {
                            return finalniNiz;
                        }
                    } 
                })
            } else {
                prikaziSnackbar();
                prikaziGresku1(); 
                return 0; 
            }
        }; 

        // pretraga kartica koje vaze jos najmanje meseci: 
        if(cbKarticaVazi.classList.contains("Oznaceno")) {
            filter.karticaVazi = "true"; 
            if(unosKarticaVazi != "") {
                filter.meseci = unosKarticaVazi;
                sakrijSnackbar();
                sakrijGresku2();

                let datum = new Date();
                let mesecSada = datum.getMonth() + 1; // meseci krecu od 0!
                let godinaSada = datum.getFullYear();

                finalniNiz = finalniNiz.filter(finalniNiz => {
                    for(const kartice of finalniNiz.karticeKlijenta) {
                        let vaziDoMesec = kartice.VaziDo.split('/')[0]; 
                        let vaziDoGodina = "20" + kartice.VaziDo.split('/')[1];
                        let vaziJosMeseci = vaziDoMesec - mesecSada + (12 * (vaziDoGodina - godinaSada));
                        if(vaziJosMeseci >= parseInt(unosKarticaVazi)) {
                            return finalniNiz; 
                        }       
                    }
                })
            } else {
                prikaziSnackbar();
                prikaziGresku2();
                return 0; 
            }
        }
    }; 

    // cuvanje podataka u sessionStorage: 
    let datum = new Date(); 
    let datumKonacan = datum.getFullYear() + "-" + (datum.getMonth() + 1) + "-" + datum.getDate() + "/" + datum.getHours() + ":" + datum.getMinutes() + ":" + datum.getSeconds();   
    sessionStorage.setItem(datumKonacan, JSON.stringify(filter)); 

    generisiHTML2(finalniNiz); 
    prikaziDugmeFilteri();
}; 

// funkcija pretraziImePrezime(): 
function pretraziImePrezime() {
    let kopijaKlijenata = klijenti;  
    let filtriraniNiz = []; 

    // vrednost iz polja za unos i SPLIT: 
    let imePrezimeUnos = document.getElementById("ImePrezimeUnos").value;
    let imePrezimeNiz = imePrezimeUnos.split(", ");

    for(let i = 0; i < imePrezimeNiz.length; i++) {
        filtriraniNiz = kopijaKlijenata.filter(kopijaKlijenata => kopijaKlijenata.ImeKlijenta.toLowerCase().includes(imePrezimeNiz[i].toLowerCase())); 
        for(const kp of kopijaKlijenata) {
            if(kp.PrezimeKlijenta.toLowerCase().includes(imePrezimeNiz[i].toLowerCase())) {
                if(filtriraniNiz.indexOf(kp) === -1) {
                    filtriraniNiz.push(kp); 
                }
            }
        }
    }

    return filtriraniNiz; 
};

// funkcija generisiHTML2(): 
function generisiHTML2(niz = []) {
    let kp = niz; 
    let kontejner4 = document.getElementById("Kontejner4"); 
    kontejner4.innerHTML = ""; 

    for(const p of kp) {
        let datum1 = p.DatRodjKlijenta; 
        let datum2 = datum1.split("-");
        let datum3 = datum2[2] + "-" + datum2[1] + "-" + datum2[0]; 
        let ukStanje = 0; 
        let brojRacuna = p.racuniKlijenta.length; 
        let brojKartica = p.karticeKlijenta.length;

        let podaciOZaposlenju = ""; 
        let podaciORacunu = ""; 
        let podaciOKartici = ""; 

        // ako ima racune: 
        if(p.racuniKlijenta != "") {
            let blokiranRacun = true;
            let negativanZbir = false; 
            let pozitivanZbir = false; 

            if(p.Zaposlen == true) {
                podaciOZaposlenju += `Poslodavac: ${p.Poslodavac} </br>
                Sedište poslodavca: ${p.SedistePoslodavca} </br>
                --- </br>`; 
            } else {
                podaciOZaposlenju = `Nezaposlen/a`; 
            }

            for(let i = 0; i < p.karticeKlijenta.length; i++) {
                // podaci o karticama: 
                podaciOKartici += `Broj kartice: ${p.karticeKlijenta[i].BrojKartice} </br>
                Brend kartice: ${p.karticeKlijenta[i].BrendKartice} </br>
                Važi do: ${p.karticeKlijenta[i].VaziDo} </br>
                Datum izrade: ${p.karticeKlijenta[i].DatumIzrade} </br>
                Datum uručenja: ${p.karticeKlijenta[i].DatumUrucenja} </br>
                Vrsta kartice: ${p.karticeKlijenta[i].VrstaKartice} </br>
                Limit: ${p.karticeKlijenta[i].Limit} </br>
                ---- </br>`; 
            }

            for(let i = 0; i < p.racuniKlijenta.length; i++) {
                // podaci o racunima:
                podaciORacunu += `Broj računa: ${p.racuniKlijenta[i].BrojRacuna} </br>
                Kontrolni broj: ${p.racuniKlijenta[i].KontrolniBroj} </br>
                Pun broj računa: ${p.racuniKlijenta[i].BrojRacunaPun} </br>
                Datum otvaranja: ${p.racuniKlijenta[i].DatumOtv} </br>
                Datum poslednje promene: ${p.racuniKlijenta[i].DatPoslPromene} </br> 
                Stanje: ${p.racuniKlijenta[i].Stanje} </br>
                Blokada: ${p.racuniKlijenta[i].Blokada} </br>
                ID vrste računa: ${p.racuniKlijenta[i].idVrsteRacuna} </br> 
                Šifra valute: ${p.racuniKlijenta[i].SifraValute} </br> 
                ---- </br>`;
                // racuna se ukupno stanje racuna: 
                ukStanje += p.racuniKlijenta[i].Stanje;  
                // ako je barem jedan racun blokiran: 
                if(p.racuniKlijenta[i].Blokada === false) {
                    blokiranRacun = false; 
                } else {
                    blokiranRacun = true; 
                    break; 
                }
            }

            // ako je zbir pozitivan: 
            if(ukStanje >= 0) {
                pozitivanZbir = true; 
            }
            // ako je zbir negativan: 
            if(ukStanje < 0) {
                negativanZbir = true; 
            }
            // generisanje:
            // ako je blokiran bar jedan racun: 
            if(blokiranRacun === true) {
                let novaKartica = document.createElement("DIV"); 
                    novaKartica.className = "Kartica"; 
                    { 
                    novaKartica.innerHTML = `<div class="RedniBr">
                    <span>${p.idKlijenta}.</span>
                    </div>    
                    <div class="KarticaPodaci JedanBlokiranRacun">
                        <div class="GornjiRed">
                            <div class="ImePrezime">
                                <span>${p.ImeKlijenta} ${p.PrezimeKlijenta}</span>
                            </div>
                            <div class="StanjeNaRacunima">
                                <span>Stanje na računima: ${ukStanje.toFixed(2)}</span>
                            </div>
                        </div>
                        <div class="DonjiRed">
                            <div class="DatumRodjenja">
                                <span>Datum rođenja: ${datum3}</span>
                            </div>
                        </div>
                    </div>`;
                    kontejner4.appendChild(novaKartica);
                    } 
                    // modalni prozor: 
                    let noviModalni = document.createElement("DIV"); 
                    noviModalni.className = "ModalniKontejner"; 
                    noviModalni.innerHTML = 
                    `<!-- sadrzaj modalnog prozora: -->
                    <div class="ModalniSadrzaj">
                        <span class="ZatvoriModalni">&times;</span>
                        <div class="PodaciModalni">
                            <span>ID: ${p.idKlijenta}</span>
                            <span>${p.ImeKlijenta} ${p.PrezimeKlijenta}</span>
                        </div>
                        <div class="PodaciKontejner">
                            <div class="PodaciModalniLevo">
                                <span>ID mesta i adresa:</span> 
                                <span>Datum rođenja:</span>
                                <span>ID državljanstva:</span> 
                            </div>
                            <div class="ModalniPodaciDesno">
                                <span>${p.idMesta}, ${p.AdresaKlijenta}</span>
                                <span>${datum3}</span>
                                <span>${p.idDrzavljanin}</span>
                            </div>
                        </div>
                        <!-- tabovi kontejner: -->
                        <div class="TaboviKontejner">
                            <div class="Tabovi">
                                <div class="Tab">Zaposlenje</div>
                                <div class="Tab">Računi (${brojRacuna})</div>
                                <div class="Tab">Kartice (${brojKartica})</div>
                            </div>
                        </div>
                        <!-- sadrzaj tabova kontejner: -->
                        <div class="SadrzajTabKontejner">
                            <div class="Sadrzaj "> ${podaciOZaposlenju} </br> </div>
                            <div class="Sadrzaj Skriveno">${podaciORacunu}</div>
                            <div class="Sadrzaj Skriveno">${podaciOKartici}</div>
                        </div>
                    </div>
                    <!-- kraj modalni -->`;
                kontejner4.appendChild(noviModalni);
            }
            // ako je negativan zbir racuna:
            else if(negativanZbir === true) {
                let novaKartica = document.createElement("DIV"); 
                novaKartica.className = "Kartica"; 
                novaKartica.innerHTML = `
                <div class="RedniBr">
                    <span>${p.idKlijenta}.</span>
                </div>    
                <div class="KarticaPodaci NegativanZbirStanja">
                    <div class="GornjiRed">
                        <div class="ImePrezime">
                            <span>${p.ImeKlijenta} ${p.PrezimeKlijenta}</span>
                        </div>
                        <div class="StanjeNaRacunima">
                            <span>Stanje na računima: ${ukStanje.toFixed(2)}</span>
                        </div>
                    </div>
                    <div class="DonjiRed">
                        <div class="DatumRodjenja">
                            <span>Datum rođenja: ${datum3}</span>
                        </div>
                    </div>
                </div>`;
                kontejner4.appendChild(novaKartica);

                // modalni prozor: 
                let noviModalni = document.createElement("DIV"); 
                noviModalni.className = "ModalniKontejner"; 
                noviModalni.innerHTML = `<!-- sadrzaj modalnog prozora: -->
                <div class="ModalniSadrzaj">
                    <span class="ZatvoriModalni">&times;</span>
                    <div class="PodaciModalni">
                        <span>ID: ${p.idKlijenta}</span>
                        <span>${p.ImeKlijenta} ${p.PrezimeKlijenta}</span>
                    </div>
                    <div class="PodaciKontejner">
                        <div class="PodaciModalniLevo">
                            <span>ID mesta i adresa:</span> 
                            <span>Datum rođenja:</span>
                            <span>ID državljanstva:</span> 
                        </div>
                        <div class="ModalniPodaciDesno">
                            <span>${p.idMesta}, ${p.AdresaKlijenta}</span>
                            <span>${datum3}</span>
                            <span>${p.idDrzavljanin}</span>
                        </div>
                    </div>
                    <!-- tabovi kontejner: -->
                        <div class="TaboviKontejner">
                            <div class="Tabovi">
                                <div class="Tab">Zaposlenje</div>
                                <div class="Tab">Računi (${brojRacuna})</div>
                                <div class="Tab">Kartice (${brojKartica})</div>
                            </div>
                        </div>
                        <!-- sadrzaj tabova kontejner: -->
                        <div class="SadrzajTabKontejner">
                            <div class="Sadrzaj "> ${podaciOZaposlenju} </br> </div>
                            <div class="Sadrzaj Skriveno">${podaciORacunu}</div>
                            <div class="Sadrzaj Skriveno">${podaciOKartici}</div>
                        </div>
                    </div>
                    <!-- kraj modalni -->`;
                kontejner4.appendChild(noviModalni);
            }
            // ako je pozitivan zbir racuna:
            else {
                let novaKartica = document.createElement("DIV"); 
                novaKartica.className = "Kartica"; 
                novaKartica.innerHTML = 
                `<div class="RedniBr">
                    <span>${p.idKlijenta}.</span>
                </div>    
                <div class="KarticaPodaci PozitivanZbirStanja">
                    <div class="GornjiRed">
                        <div class="ImePrezime">
                            <span>${p.ImeKlijenta} ${p.PrezimeKlijenta}</span>
                        </div>
                        <div class="StanjeNaRacunima">
                            <span>Stanje na računima: ${ukStanje.toFixed(2)}</span>
                        </div>
                    </div>
                    <div class="DonjiRed">
                        <div class="DatumRodjenja">
                            <span>Datum rođenja: ${datum3}</span>
                        </div>
                    </div>
                </div>`;
                kontejner4.appendChild(novaKartica);

                // modalni prozor: 
                let noviModalni = document.createElement("DIV"); 
                noviModalni.className = "ModalniKontejner"; 
                noviModalni.innerHTML = `<!-- sadrzaj modalnog prozora: -->
                <div class="ModalniSadrzaj">
                    <span class="ZatvoriModalni">&times;</span>
                    <div class="PodaciModalni">
                        <span>ID: ${p.idKlijenta}</span>
                        <span>${p.ImeKlijenta} ${p.PrezimeKlijenta}</span>
                    </div>
                    <div class="PodaciKontejner">
                        <div class="PodaciModalniLevo">
                            <span>ID mesta i adresa:</span> 
                            <span>Datum rođenja:</span>
                            <span>ID državljanstva:</span> 
                        </div>
                        <div class="ModalniPodaciDesno">
                            <span>${p.idMesta}, ${p.AdresaKlijenta}</span>
                            <span>${datum3}</span>
                            <span>${p.idDrzavljanin}</span>
                        </div>
                    </div>
                    <!-- tabovi kontejner: -->
                    <div class="TaboviKontejner">
                        <div class="Tabovi">
                            <div class="Tab">Zaposlenje</div>
                            <div class="Tab">Računi (${brojRacuna})</div>
                            <div class="Tab">Kartice (${brojKartica})</div>
                        </div>
                    </div>
                    <!-- sadrzaj tabova kontejner: -->
                    <div class="SadrzajTabKontejner">
                        <div class="Sadrzaj "> ${podaciOZaposlenju} </br> </div>
                        <div class="Sadrzaj Skriveno">${podaciORacunu}</div>
                        <div class="Sadrzaj Skriveno">${podaciOKartici}</div>
                    </div>
                </div>
                <!-- kraj modalni -->`;
            kontejner4.appendChild(noviModalni);
            }  
        } 

        // generisanje:
        // ako nema racune: 
        else {
            let podaciOZaposlenju = "";
            if(p.Zaposlen == true) {
                podaciOZaposlenju += `Poslodavac: ${p.Poslodavac} </br>
                Sedište poslodavca: ${p.SedistePoslodavca} </br>
                --- </br>`; 
            } else {
                podaciOZaposlenju = `Nezaposlen/a`; 
            }

            let podaciOKartici = ""; 
            for(let i = 0; i < p.karticeKlijenta.length; i++) {
                // podaci o karticama: 
                podaciOKartici += `Broj kartice: ${p.karticeKlijenta[i].BrojKartice} </br>
                Brend kartice: ${p.karticeKlijenta[i].BrendKartice} </br>
                Važi do: ${p.karticeKlijenta[i].VaziDo} </br>
                Datum izrade: ${p.karticeKlijenta[i].DatumIzrade} </br>
                Datum uručenja: ${p.karticeKlijenta[i].DatumUrucenja} </br>
                Vrsta kartice: ${p.karticeKlijenta[i].VrstaKartice} </br>
                Limit: ${p.karticeKlijenta[i].Limit} </br>
                ---- </br>`; 
            }

            let novaKartica = document.createElement("DIV"); 
            novaKartica.className = "Kartica"; 
            novaKartica.innerHTML = 
            `<div class="RedniBr">
                <span>${p.idKlijenta}.</span>
            </div>    
            <div class="KarticaPodaci">
                <div class="GornjiRed">
                    <div class="ImePrezime">
                        <span>${p.ImeKlijenta} ${p.PrezimeKlijenta}</span>
                    </div>
                    <div class="StanjeNaRacunima">
                        <span>BEZ RAČUNA</span>
                    </div>
                </div>
                <div class="DonjiRed">
                    <div class="DatumRodjenja">
                        <span>Datum rođenja: ${datum3}</span>
                    </div>
                </div>
            </div>`;
            kontejner4.appendChild(novaKartica);

            // modalni prozor: 
            let noviModalni = document.createElement("DIV"); 
            noviModalni.className = "ModalniKontejner"; 
            noviModalni.innerHTML = `<!-- sadrzaj modalnog prozora: -->
                <div class="ModalniSadrzaj">
                    <span class="ZatvoriModalni">&times;</span>
                    <div class="PodaciModalni">
                        <span>ID: ${p.idKlijenta}</span>
                        <span>${p.ImeKlijenta} ${p.PrezimeKlijenta}</span>
                    </div>
                    <div class="PodaciKontejner">
                        <div class="PodaciModalniLevo">
                            <span>ID mesta i adresa:</span> 
                            <span>Datum rođenja:</span>
                            <span>ID državljanstva:</span> 
                        </div>
                        <div class="ModalniPodaciDesno">
                            <span>${p.idMesta}, ${p.AdresaKlijenta}</span>
                            <span>${datum3}</span>
                            <span>${p.idDrzavljanin}</span>
                        </div>
                    </div>
                    <!-- tabovi kontejner: -->
                    <div class="TaboviKontejner">
                        <div class="Tabovi">
                            <div class="Tab">Zaposlenje</div>
                            <div class="Tab">Računi (NEMA)</div>
                            <div class="Tab">Kartice (${brojKartica})</div>
                        </div>
                    </div>
                    <!-- sadrzaj tabova kontejner: -->
                    <div class="SadrzajTabKontejner">
                        <div class="Sadrzaj ">${podaciOZaposlenju} </br> </div>
                        <div class="Sadrzaj Skriveno">Nema račun</div>
                        <div class="Sadrzaj Skriveno">${podaciOKartici}</div>
                    </div>
                </div>
                <!-- kraj modalni -->`;
            kontejner4.appendChild(noviModalni);
        }
    }
    modalniProzor();  
};


// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------
// na prvo ucitavanje stranice: 
window.onload = function() {
    let queryString = window.location.search; 
    let urlParams = new URLSearchParams(queryString); 
      
    let qsIme = urlParams.get("ime");
    let qsGodinaOd = urlParams.get("godinaOd");
    let qsGodinaDo = urlParams.get("godinaDo");
    let qsBrend = urlParams.get("brend");
    let qsBezDuga = urlParams.get("bezDuga");
    let qsIznosVeci = urlParams.get("iznosVeci");
    let qsIznos = urlParams.get("iznos");
    let qsKarticaVazi = urlParams.get("karticaVazi");
    let qsMeseci = urlParams.get("meseci");

    document.getElementById("ImePrezimeUnos").value = qsIme; 
    document.getElementById("GodRodjOd").value = qsGodinaOd; 
    document.getElementById("GodRodjDo").value = qsGodinaDo; 
    document.getElementById("BrendKarticeUnos").value = qsBrend;

    if(qsBezDuga || qsIznosVeci || qsIznos || qsKarticaVazi || qsMeseci) {
        document.getElementById("DodatniFilteri").classList.add("Otvoreno");
        document.getElementById("Kontejner2").classList.remove("Skriveno");
    }
    
    if(qsBezDuga == "true") {
        document.getElementById("CBKlijentiBezDuga").classList.add("Oznaceno"); 
    } 

    if(qsIznosVeci == "true") {
        document.getElementById("CBKlijentiIznos").classList.add("Oznaceno");
    }

    if(qsKarticaVazi == "true") {
        document.getElementById("CBKarticaVazi").classList.add("Oznaceno");
    }

    document.getElementById("UnosIznosVeciOd").value = qsIznos;
    document.getElementById("UnosKarticaVazi").value = qsMeseci;

    // ako ima neki query string:
    if(urlParams != "") {
        document.getElementById("Pretrazi").click();
    }
};

// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------
// MODALNI PROZORI: 
// funkcija modalniProzor(): 
function modalniProzor() {
    let kartice = document.querySelectorAll(".Kartica"); 

    for(const k of kartice) {
        k.addEventListener("click", () => {
            let modalniKontejner = k.nextElementSibling; 
            modalniKontejner.style.display = "block";
            prikaziTabove();
            // zatvaranje klikom van prozora:
            window.addEventListener("click", (e) => {
                if(e.target == modalniKontejner) {
                    modalniKontejner.style.display = "none"; 
                }
            }); 

            // zatvaranje klikom na X: 
            let zatvori = modalniKontejner.firstElementChild.firstElementChild;  
            zatvori.addEventListener("click", () => {
                modalniKontejner.style.display = "none";
            })
        })
    }
};

// funkcija prikaziTabove():
function prikaziTabove() {
    let tabovi = document.querySelectorAll(".Tab"); 
    let sadrzaj; 
    for (const tab of tabovi) {
        tab.addEventListener("click", (e)=> {
            let tabovi = e.target.parentElement.querySelectorAll(".Tab"); 
            let selektovaniTab = e.target; 
            sadrzaj = e.target.parentElement.parentElement.nextElementSibling.children; 
            // console.log(e.target.parentElement.parentElement.nextElementSibling.children); 
            let index = 0; 
            for(const tab of tabovi) {
                if(tab === selektovaniTab) {
                    prikaziSadrzaj(index); 
                    break; 
                }
                index++; 
            }
        })
    };
    // let sadrzaj = document.querySelectorAll(".SadrzajTabKontejner > .Sadrzaj"); 
    // console.log(sadrzaj);
    function prikaziSadrzaj(index) {
        for(const element of sadrzaj) {
            element.classList.add("Skriveno"); 
            sadrzaj[index].classList.remove("Skriveno"); 
        }
    }
};

// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------
//  klik na dugme BRISI FILTERE:
let brisiFiltereDugme = document.getElementById("BrisiFiltere"); 
brisiFiltereDugme.addEventListener("click", brisiFiltere); 

function brisiFiltere() {
    sakrijDugmeFilteri();
    sakrijGresku1();
    sakrijGresku2();
    sakrijSnackbar();

    filter.ime = ""; 
    filter.godinaOd = ""; 
    filter.godinaDo = ""; 
    filter.brend = ""; 
    filter.bezDuga = "false"; 
    filter.iznosVeci = "false"; 
    filter.iznos = ""; 
    filter.karticaVazi = "false"; 
    filter.meseci = ""; 

    document.getElementById("ImePrezimeUnos").value = "";
    document.getElementById("GodRodjOd").value = ""; 
    document.getElementById("GodRodjDo").value = ""; 
    
    let brendKarticeUnos = document.getElementById("BrendKarticeUnos"); 
    brendKarticeUnos.value = "";
    brendKarticeUnos.disabled = false;

    let cbKlijentiBezDuga = document.getElementById("CBKlijentiBezDuga"); 
    cbKlijentiBezDuga.classList.remove("Oznaceno"); 
    let cbKlijentiIznos = document.getElementById("CBKlijentiIznos"); 
    cbKlijentiIznos.classList.remove("Oznaceno"); 
    let cbKarticaVazi = document.getElementById("CBKarticaVazi"); 
    cbKarticaVazi.classList.remove("Oznaceno");
    
    document.getElementById("UnosIznosVeciOd").value = ""; 
    document.getElementById("UnosKarticaVazi").value = ""; 

    let dodatniFilteri = document.getElementById("DodatniFilteri"); 
    dodatniFilteri.classList.remove("Otvoreno"); 
    let kontejner2 = document.getElementById("Kontejner2"); 
    kontejner2.classList.add("Skriveno"); 

    let kontejner4 = document.getElementById("Kontejner4"); 
    kontejner4.innerHTML = ""
};

// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------
// snackbar:
{ 
function prikaziSnackbar() {
    let snackbarKontejner = document.getElementById("SnackbarKontejner");
    snackbarKontejner.classList.remove("Skriveno"); 
};

function sakrijSnackbar() {
    let snackbarKontejner = document.getElementById("SnackbarKontejner");
    snackbarKontejner.classList.add("Skriveno"); 
}; 

let snackbarKontejner = document.getElementById("SnackbarKontejner");
let snackZatvori = document.getElementById("SnackZatvori"); 
snackZatvori.addEventListener("click", () => {
    snackbarKontejner.classList.add("Skriveno")
});
} 

// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------
// greske: 
{ 
function prikaziGresku1() {
    let klijentiIznos = document.getElementById("KlijentiIznos");
    klijentiIznos.classList.add("GreskaUnos");
};

function sakrijGresku1() {
    let klijentiIznos = document.getElementById("KlijentiIznos");
    klijentiIznos.classList.remove("GreskaUnos");
}; 

function prikaziGresku2() {
    let karticaVazi = document.getElementById("KarticaVazi");
    karticaVazi.classList.add("GreskaUnos");
};

function sakrijGresku2() {
    let karticaVazi = document.getElementById("KarticaVazi");
    karticaVazi.classList.remove("GreskaUnos");
}; 
} 

// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------
// SNIMI SET FILTERA dugme: 
{ 
function prikaziDugmeFilteri() {
    let snimiSetFiltera = document.getElementById("SnimiSetFiltera");
    snimiSetFiltera.classList.remove("Skriveno");
};

function sakrijDugmeFilteri() {
    let snimiSetFiltera = document.getElementById("SnimiSetFiltera");
    snimiSetFiltera.classList.add("Skriveno");
};
} 

// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------
// klik na dugme SNIMI SET FILTERA: 
let snimiFIltereKontejner = document.getElementById("SnimiFIltereKontejner"); 
// zatvaranje snimi set filtera / modalni kontejner: 
window.addEventListener("click", (e) => {
    if(e.target == snimiFIltereKontejner) {
        snimiFIltereKontejner.style.display = "none"; 
    }
}); 

// zatvoriModalniFilter(); 
function zatvoriModalniFilter() { 
    let zatvoriModalni = document.getElementById("ZatvoriModalni"); 
    zatvoriModalni.addEventListener("click", () => {
        snimiFIltereKontejner.style.display = "none"; 
    })
}; 
 
// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------
// dugme SNIMI SET FILTERA u modalnom prozoru:
let snimiSetFiltera = document.getElementById("SnimiSetFiltera");
snimiSetFiltera.addEventListener("click", () => {
    let snimiFIltereKontejner = document.getElementById("SnimiFIltereKontejner");
    snimiFIltereKontejner.style.display = "block"; 
    snimiFIltereKontejner.innerHTML = ""; 

    let noviProzor = document.createElement("DIV");
    noviProzor.className = "ModalniSadrzaj"; 
    noviProzor.innerHTML = `
    <span id="ZatvoriModalni">&times;</span>
    <div class="PodaciModalni">
        <span>Snimanje seta filtera</span>
    </div>
    <div class="PodaciKontejner">
        <div class="PodaciModalniLevo">
            <span>Kriterijumi:</span>
            <span>Ime, prezime:</span> 
            <span>Godina rođenja:</span>
            <span>Kartice:</span>
            <span>Bez duga:</span>
            <span>Da li duguje više od:</span>
            <span>Iznos duga:</span>
            <span>Kartica važi još:</span> 
            <span>Broj meseci:</span>
        </div>
        <div class="ModalniPodaciDesno">
            <span>/</span>
            <span>${filter.ime}</span>  
            <span>Od: ${filter.godinaOd}, Do: ${filter.godinaDo}</span>
            <span>${filter.brend}</span>
            <span>${filter.bezDuga}</span>
            <span>${filter.iznosVeci}</span>
            <span>${filter.iznos}</span>
            <span>${filter.karticaVazi}</span> 
            <span>${filter.meseci}</span>
        </div>
    </div>
    <!-- sadrzaj tabova kontejner: -->
    <input type="text" id="UnosSnimi" placeholder="Ime seta kriterijuma">
    <!-- dugme snimi set filtera: -->
    <div id="SnimiSetFilteraModalni">
        <div id="SnimiSetFilteraSlikaMod"></div>
        <p>Snimi set filtera</p>
    </div>`;
    snimiFIltereKontejner.appendChild(noviProzor);
    
    zatvoriModalniFilter();
    snimanjeSetaFiltera();
});

// funkacija snimanjeSetaFiltera(): 
function snimanjeSetaFiltera() {
    let snimiSetFilteraModalni = document.getElementById("SnimiSetFilteraModalni"); 
    let unosSnimi = document.getElementById("UnosSnimi");

    snimiSetFilteraModalni.addEventListener("click", () => {
        if(unosSnimi.value == "") {
            prikaziSnackbar(); 
        } else {
            sakrijSnackbar(); 
            localStorage.setItem(unosSnimi.value, JSON.stringify(filter)); 
            unosSnimi.value = "";
            document.getElementById("SnimiFIltereKontejner").style.display = "none";
        }
    })
};
 
// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------
// klik na dugme PREDEFINISANI SETOVI FILTERA:
let predefinisaniKontejner = document.getElementById("PredefinisaniKontejner");
// zatvaranje predefinisani setovi filtera / modalni kontejner: 
window.addEventListener("click", (e) => {
    if(e.target == predefinisaniKontejner) {
        predefinisaniKontejner.style.display = "none"; 
    }
}); 

// funkcija zatvoriPredefinisaniKontejner(): 
function zatvoriPredefinisaniKontejner() {
    let zatvoriModalni2 = document.getElementById("ZatvoriModalni2"); 
    zatvoriModalni2.addEventListener("click", () => {
        predefinisaniKontejner.style.display = "none"; 
    })
};

// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------
// primena i brisanje predefinisanih setova filtera u modalnom prozoru: 
let predefinisaniSetoviFiltera = document.getElementById("PredefinisaniSetoviFiltera"); 
predefinisaniSetoviFiltera.addEventListener("click", () => {
    let podaciKontejner2 = document.getElementById("PodaciKontejner2");
    predefinisaniKontejner.style.display = "block"; 
    podaciKontejner2.innerHTML = ""; 
    
    for(let i = 0; i < localStorage.length; i++) {
        let noviProzor = document.createElement("DIV"); 
        noviProzor.innerHTML = `
        <div class="PodaciModalniLevo3">
            <span>${localStorage.key(i)}</span>
            <span class="Primeni">Primeni</span> 
            <span class="Brisanje">Briši</span>
        </div>`; 
        podaciKontejner2.appendChild(noviProzor);
    }
    primeniFiltere();
    obrisiFiltere(); 
    brisiSveFiltere(); 
});

// funkcija primeniFiltere(): 
function primeniFiltere() {
    let primeni = document.querySelectorAll(".Primeni"); 
    for(const pr of primeni) {
        pr.addEventListener("click", (e) => {
            let filterZaPrimenu = e.target.parentElement.firstElementChild.innerText;
            let objekatZaPretragu = JSON.parse(localStorage.getItem(filterZaPrimenu)); 
            
            let queryStringFilter = ""; 
            queryStringFilter = Object.keys(objekatZaPretragu).map(kljuc => kljuc + "=" + objekatZaPretragu[kljuc]).join("&"); 
            let trenutniUrl = window.location.href.split("?")[0];
            let pretragaPoFilterima = trenutniUrl + "?" + queryStringFilter; 
            window.open(pretragaPoFilterima, "_self");           
        });
    }
}; 

// funkcija obrisiFiltere(): 
function obrisiFiltere() {
    let obrisi = document.querySelectorAll(".Brisanje"); 
    for(const obr of obrisi) {
        obr.addEventListener("click", (e) => {
            let filterZaBrisanje = e.target.parentElement.firstElementChild.innerText;
            localStorage.removeItem(filterZaBrisanje); 
            document.getElementById("PredefinisaniKontejner").style.display = "none";
        });
    }
}; 

// funkcija brisiSveFiltere(): 
function brisiSveFiltere() {
    document.getElementById("BrisiSveFiltere").addEventListener("click", () => {
        localStorage.clear(); 
        document.getElementById("PredefinisaniKontejner").style.display = "none";
    })
};

// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------
// zatvaranje RECENTLY SEARCH / modalni kontejner: 
let recSearchKontejner = document.getElementById("RecSearchKontejner");
window.addEventListener("click", (e) => {
    if(e.target == recSearchKontejner) {
        recSearchKontejner.style.display = "none"; 
    }
}); 

// funkcija zatvoriRecSearch(): 
function zatvoriRecSearch() {
    let zatvoriRecSearch = document.getElementById("ZatvoriRecSearch"); 
    zatvoriRecSearch.addEventListener("click", () => {
        recSearchKontejner.style.display = "none"; 
    })
};

// recent searches:
let recSearchDugme = document.getElementById("RecSearch"); 
recSearchDugme.addEventListener("click", () => {
    let podaciRecSearch = document.getElementById("PodaciRecSearch"); 
    RecSearchKontejner.style.display = "block"; 
    podaciRecSearch.innerHTML = ""; 

    for(let i = 0; i < sessionStorage.length; i++) {
        let noviProzor = document.createElement("DIV"); 
        noviProzor.innerHTML = `
        <div class="PodaciModalniLevo3">
            <span>${sessionStorage.key(i)}</span>
            <span class="Primeni">Primeni</span> 
            <span class="Brisanje">Briši</span>
        </div>`; 
        podaciRecSearch.appendChild(noviProzor);
    }
    primeniFiltereRecSearch();
    obrisiFiltereRecSearch(); 
    brisiSveFiltereRecSearch(); 
});

// funkcija primeniFiltereRecSearch(): 
function primeniFiltereRecSearch() {
    let primeni = document.querySelectorAll(".Primeni"); 
    for(const pr of primeni) {
        pr.addEventListener("click", (e) => {
            let filterZaPrimenu = e.target.parentElement.firstElementChild.innerText;
            let objekatZaPretragu = JSON.parse(sessionStorage.getItem(filterZaPrimenu)); 
            
            let queryStringFilter = ""; 
            queryStringFilter = Object.keys(objekatZaPretragu).map(kljuc => kljuc + "=" + objekatZaPretragu[kljuc]).join("&"); 
            let trenutniUrl = window.location.href.split("?")[0];
            let pretragaPoFilterima = trenutniUrl + "?" + queryStringFilter; 
            window.open(pretragaPoFilterima, "_self");           
        });
    }
}; 

// funkcija obrisiFiltereRecSearch(): 
function obrisiFiltereRecSearch() {
    let obrisi = document.querySelectorAll(".Brisanje"); 
    for(const obr of obrisi) {
        obr.addEventListener("click", (e) => {
            let filterZaBrisanje = e.target.parentElement.firstElementChild.innerText;
            sessionStorage.removeItem(filterZaBrisanje); 
            document.getElementById("RecSearchKontejner").style.display = "none";
        });
    }
}; 

// funkcija brisiSveFiltereRecSearch(): 
function brisiSveFiltereRecSearch() {
    document.getElementById("BrisiSveFiltereRecSearch").addEventListener("click", () => {
        sessionStorage.clear(); 
        document.getElementById("RecSearchKontejner").style.display = "none";
    })
};