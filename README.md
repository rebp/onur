# Bomb Clicker

Game basics met DOM elementen en de Game Loop.

## OPDRACHT

- Compileer en run de game
- Maak een gameloop met requestAnimationFrame
- Laat de auto naar rechts bewegen met de gameloop
- Laat het bommetje naar beneden bewegen met de gameloop

Voorbeeldcode : positie aanpassen
```
this.div.style.transform=`translate(10px, 30px)`
```

## OPDRACHT

- Als de auto rechts uit beeld gaat, verschijnt deze weer links
- Als de bom onder uit beeld gaat, verschijnt deze weer boven
- Maak de start x positie van de bom random!
- Maak de start x positie van de auto ook random, zodat het even duurt voordat hij weer in beeld verschijnt.

**Code voorbeeld**
```
let w = window.innerWidth   
let h = window.innerHeight 
```

## OPDRACHT

- Start de game met 4 (of meer) bommetjes. plaats deze in een array in game.ts
- Geef de bommetjes een random start x positie en een random snelheid
- Maak de bommetjes aanklikbaar. De code hiervoor zet je in bomb.ts
- Als je op een bommetje klikt dan zet je de y positie op -500 (of een random negatieve waarde), hoe kleiner het getal, hoe langer het duurt voor de bom weer in beeld verschijnt.

## OPDRACHT

- In game.ts wordt een score bijgehouden en het aantal kapotte gebouwen
- Bedenk hoe je vanuit bomb de functies in game kan aanroepen
- Als een bom wordt aangeklikt, tel dan 1 op bij de score. Update het scoreveld.

## OPDRACHT

- Als een bom onder uit beeld valt, tel dan 1 op bij het aantal kapotte gebouwen
- Als er vier kapotte gebouwen zijn, stop dan de gameloop
- Als je de auto aanklikt resetten je kapotte gebouwen weer. De auto moet niet te vaak in beeld zijn.

**Code voorbeeld**

Door de achtergrondafbeelding van de scorebalk naar links te verschuiven, kan je laten zien hoeveel gebouwen er kapot zijn
```
this.bar.style.backgroundPositionX = "-72px"      // één kapot gebouw
```

## OPDRACHT

- Plaats de docs map van de game online, bv. op github pages
- Voeg "touchstart" event listeners toe voor touchscreens
- Test de game op je telefoon

## OPDRACHT

- Pas inheritance toe op de car en de bomb