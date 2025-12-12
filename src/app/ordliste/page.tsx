"use client";

import Link from "next/link";
import { useState } from "react";

interface Term {
  term: string;
  definition: string;
  example?: string;
}

interface Category {
  name: string;
  terms: Term[];
}

const glossaryData: Category[] = [
  {
    name: "Spilleprinsippmodellen",
    terms: [
      {
        term: "Score mål (hovedmål angrep)",
        definition: "Det overordnede målet i angrep. Alt angrepsspill bygger opp mot dette: gjennombrudd, bevegelse, dybde, bredde - for å skape og utnytte rom.",
        example: "Alt vi gjør i angrep handler til syvende og sist om å score mål."
      },
      {
        term: "Hindre mål (hovedmål forsvar)",
        definition: "Det overordnede målet i forsvar. Vi jobber med balanse, dybde og konsentrering for å vinne ballen og hindre rom.",
        example: "Forsvarsspillet handler om å hindre mål - alt annet er sekundært."
      },
      {
        term: "Gjennombrudd",
        definition: "Å passere én eller flere motspillere for å komme nærmere mål. Krever at laget skaper og/eller utnytter rom. Nødvendig for å score mål.",
        example: "Vi trenger gjennombrudd for å komme til avslutning - enten via dribling, pasning eller løp."
      },
      {
        term: "Skape rom",
        definition: "Bevegelser som frigjør områder på banen ved å trekke med seg forsvarere. Motsatte og samtidige bevegelser er nøkkelen.",
        example: "Spissen trekker stopperen ut og skaper rom for indreløperen som kommer på løp."
      },
      {
        term: "Utnytte rom",
        definition: "Å bruke rommet som er skapt - enten ved å løpe inn i det, føre ball inn i det, eller spille pasning dit.",
        example: "Rommet er skapt sentralt - nå må vi utnytte det med en gjennombruddspasning!"
      },
      {
        term: "Hindre rom",
        definition: "Forsvarets hovedoppgave - stenge av rom slik at motstanderen ikke kan skape gjennombrudd.",
        example: "Vi hindrer rom sentralt ved å konsentrere og tvinge spillet ut på kantene."
      },
      {
        term: "Krympe tid og rom",
        definition: "Forsvarsprinsipp: Redusere motstanderens tid på ballen og rom å spille i gjennom press, forflytning og kompakthet.",
        example: "Vi krymper tid og rom ved å presse umiddelbart etter balltap."
      }
    ]
  },
  {
    name: "Grunnbegreper (NFF)",
    terms: [
      {
        term: "Dybde (angrep)",
        definition: "Avstanden mellom spillerne på langs av banen. Handler om forholdet mellom ballfører (1A) og medspillerne. God dybde gir ballfører mange pasningsalternativer i banens lengderetning.",
        example: "Spissene ligger på ulike dybder - én møter, én truer bakrom."
      },
      {
        term: "Bredde (angrep)",
        definition: "Avstanden mellom spillerne på tvers av banen. Strekker motstanderens forsvar og skaper rom mellom deres spillere.",
        example: "Kantene holder bredden for å strekke forsvaret og skape rom sentralt."
      },
      {
        term: "Førsteangriper (1A)",
        definition: "Spilleren som har ballen. Alle andre bevegelser og posisjoner defineres i forhold til denne spilleren.",
        example: "1A må orientere seg og velge: føre, drible, pasning eller skudd."
      },
      {
        term: "Andreangriper (2A)",
        definition: "Spilleren som er nærmest ballfører. Tilbyr støtte, vegg eller bevegelse for å skape rom.",
        example: "2A gjør en førstebevegelse for å skape pasningsalternativ eller trekke med seg en forsvarer."
      },
      {
        term: "Tredjeangriper (3A)",
        definition: "Alle de andre spillerne på angrepslaget. De gjør andrebevegelser for å utnytte rom skapt av 2A.",
        example: "3A starter løp i rommet som 2A frigjorde da han trakk forsvareren ut."
      },
      {
        term: "Førstebevegelse",
        definition: "Første angrepsbevegelse nær ballfører (1A), utført av 2A for å skape pasningsalternativ eller rom for andre.",
        example: "2A går i motløp (førstebevegelse) og trekker med seg stopperen, noe som frigjør rom for 3A."
      },
      {
        term: "Andrebevegelse",
        definition: "Bevegelser av tredjeangripere (3A) for å skape pasningsalternativ, ofte i rom skapt av 2A sin førstebevegelse.",
        example: "Vingen gjør andrebevegelse i bakrom når midtbanespilleren trekker stopperen ut."
      },
      {
        term: "Tredjemannsløp",
        definition: "Løp fra en tredjeangriper (3A) mens ballen er på vei mellom to andre spillere. Spilleren som mottar blir ny 1A med mulighet til å spille gjennombrudd til løperen.",
        example: "Mens ballen går fra anker til spiss, gjør vingen tredjemannsløp i bakrommet."
      },
      {
        term: "Førsteforsvarer (1F)",
        definition: "Spilleren nærmest ballfører (1A). Oppgaver: vinn ball, opphold/led ballfører, hindre gjennombruddspasning eller hindre avslutning. Spillsituasjonen avgjør prioritering.",
        example: "1F presser ballfører og prøver å lede ham ut mot sidelinja."
      },
      {
        term: "Andreforsvarer (2F)",
        definition: "Spilleren nærmest førsteforsvarer (1F). Oppgave: sikre 1F på rett side eller dekke rom. Hvis på 'feil forsvarsside' - kom på rett side fortest mulig eller hjelp 1F.",
        example: "2F sikrer på innsiden slik at 1F trygt kan lede ballfører utover."
      },
      {
        term: "Tredjeforsvarer (3F)",
        definition: "Alle de andre spillerne på forsvarslaget. Forsvarsoppgave: dekke rom og/eller 'ta ut' definerte angrepsspillere. Spillsituasjonen avgjør prioritering.",
        example: "3F dekker pasningslinjen til spissen mens 1F og 2F håndterer ballsiden."
      },
      {
        term: "Balanse (forsvar)",
        definition: "Beskriver hvorvidt laget i forsvar har kontroll over situasjonen. God balanse = alle forsvarsoppgaver ivaretatt: press på ballfører, sikring og rom dekkes. Da har laget posisjonell balanse.",
        example: "Vi har god balanse - 1F presser, 2F sikrer, og 3F dekker rom og pasningslinjer."
      },
      {
        term: "Numerisk balanse",
        definition: "Det forsvarende lag har like mange eller flere spillere som angripende lag på 'riktig' side (mellom eget mål og ball).",
        example: "Vi har numerisk balanse med 4 mot 3 på ballsiden."
      },
      {
        term: "Dybde (forsvar)",
        definition: "Forsvarende lags avstand mellom de ulike ledd i banens lengderetning. Inkluderer avstand og posisjon mellom 1F og 2F.",
        example: "Vi trenger bedre dybde - 2F må ligge litt lenger bak for å sikre skikkelig."
      },
      {
        term: "Konsentrering",
        definition: "Forsvarende lags kollektive evne til å gjøre området rundt ballfører trangt. Spillerne forflytter seg i banens lengderetning. Brukes spesielt når ballfører er sentralt i banen.",
        example: "Konsentrer sentralt - gjør det trangt så de må spille ut på kantene."
      },
      {
        term: "Forflytning",
        definition: "Hurtig felles forflytning i forhold til ballen, motstanderens 1A og vår 1F. Kritisk for å opprettholde struktur.",
        example: "Hele laget forflytter seg i maks tempo når ballen vender."
      },
      {
        term: "Ledd i laget",
        definition: "Horisontale linjer i lagets formasjon: Bakre ledd (forsvar), Midtre ledd (midtbane), Fremre ledd (angrep). Brukes for å beskrive avstander og samspill mellom lagdeler.",
        example: "Avstanden mellom bakre og midtre ledd er for stor - vi mister kompakthet."
      },
      {
        term: "Spillpunkter",
        definition: "Posisjonene/spillerne som ballfører kan spille til. Antall spillpunkter avhenger av medspillernes bevegelse og vinkler.",
        example: "1A har fire spillpunkter: støtte bak, to i bredden og én i dybden."
      },
      {
        term: "Spillbar",
        definition: "Å være i en posisjon hvor ballfører kan se deg og har en pasningslinje til deg. Krever god vinkel, avstand og at du er fri fra press.",
        example: "Jeg må flytte meg for å bli spillbar - ballfører ser meg ikke her."
      },
      {
        term: "Sidekorridorer",
        definition: "Områdene langs sidelinjene. Brukes ofte til å beskrive hvor vi vil lede motstanderen (ut i sidekorridor) eller hvor vi vil angripe fra.",
        example: "Led ballfører ut i sidekorridoren - der har han færrest alternativer."
      },
      {
        term: "Sentral korridor",
        definition: "Området midt på banen. Det farligste rommet å slippe motstanderen gjennom. Prioriter alltid å dekke sentralt.",
        example: "Steng sentral korridor - det er bedre at de spiller på kantene."
      }
    ]
  },
  {
    name: "NFF Soneforsvar",
    terms: [
      {
        term: "Etasjer (banedeling)",
        definition:
          "NFFs dynamiske soneinndeling av banen i lengderetning. Fire etasjer brukes for å beskrive presshøyde og hvor vi ønsker å vinne ball: 1. etasje = foran eget mål (lav blokk), 2. etasje = egen halvdel bak midtlinjen, 3. etasje = motstanderens halvdel foran midtlinjen, 4. etasje = foran motstanderens mål (høypress). Grensene flytter seg med spillets dynamikk.",
        example: "Vi presser i 3. etasje på deres oppspill, men faller til 2. etasje når de spiller seg ut."
      },

      {
        term: "Førsteforsvarer (Signalspiller)",
        definition: "Spilleren nærmest ballfører - den viktigste i soneforsvaret. Din handling definerer hva de andre ti spillerne gjør. Oppgaver: Vinn ball, opphold/led ballfører, hindre gjennombrudd, tving spill bakover.",
        example: "Når du er førsteforsvarer, rop: 'Jeg støter!' eller 'Jeg har!' for å signalisere at du går i press. Kommandoer som 'Gå!' skal komme fra spillerne bak som ser hele situasjonen."
      },
      {
        term: "Andreforsvarer (Sikring)",
        definition: "Nærmeste spiller til førsteforsvarer. Sikrer på rett side eller dekker rom. Hvem sikrer hvem: Midtbane sikrer kant/midtbane, stopper sikrer stopper/back.",
        example: "Når backen støter (førsteforsvarer), må stopperen falle av som andreforsvarer og rope 'Jeg sikrer!'"
      },
      {
        term: "Rett side",
        definition: "Å stå mellom ball/motstander og eget mål. Prioritet i soneforsvar: først på rett side av ballen, deretter på rett side av både ball og motstander i farlige soner.",
        example: "Kantspilleren var på feil side etter balltap – returløp tilbake på rett side stengte gjennombruddet."
      },
      {
        term: "Feil side",
        definition: "Når du er på utsiden av motstanderen og ikke mellom denne og eget mål. Spillere på feil side må returløpe eller få hjelp av lagkamerater til pressfeller.",
        example: "Stopperen ble passert og endte på feil side – midtbanen måtte presse bakfra mens stopperen løp seg inn igjen."
      },
      {
        term: "Tredjeforsvarer (Romkontroll)",
        definition: "Alle andre spillere på forsvarslaget. Dekker rom og/eller tar ut definerte angrepsspillere. Kommuniserer pasningslinjer.",
        example: "Vingen på motsatt side trekker inn som tredjeforsvarer. Rop 'Dekk venstre' for å stenge pasningslinje."
      },
      {
        term: "Leding",
        definition: "Å styre ballfører i ønsket retning. Hovedregel: Led ut mot sidelinje - der er det trangest. Bruk bueløp for å stenge rom du vil beskytte.",
        example: "Førsteforsvarer leder innover når han har sikring på innsiden, utover når han er alene."
      },
      {
        term: "Bueløp",
        definition: "Kurvet løp mot ballfører for å stenge et bestemt rom, i stedet for å løpe rett på.",
        example: "Bruk bueløp for å stenge pasningslinjen til kanten - ikke løp rett på ballfører."
      },
      {
        term: "Pumping (Push-out)",
        definition: "Dynamisk justering av leddenes posisjon opp og ned. Når førsteforsvarer presser, pumper laget etter.",
        example: "Når spissen presser høyt, må hele laget pumpe opp - hold kompaktheten!"
      },
      {
        term: "Sideforskyvning",
        definition: "Kollektiv forflytning mot ballsiden. Hele midtbane- og forsvarsledd flytter seg som én enhet. Brukes primært når ball og ballfører er i sidekorridorene.",
        example: "Ball på venstre kant = hele laget forskyver mot venstre, stenger sentralt."
      },
      {
        term: "Presshøyde",
        definition: "Hvor på banen laget starter aktivt press mot ballførende lag. Høyt press (3.-4. etasje) = kort vei til mål ved gjenvinning, men krever god kondisjon og koordinering. Lavt press (1.-2. etasje) = bedre struktur og kontringspotensial.",
        example: "Vi presser høyt når keeper har ballen for å tvinge frem feil i deres oppspill."
      },
      {
        term: "Signalspiller på tokt",
        definition: "Når en spiller sendes frem alene for å forstyrre pasningsrytme eller få laget til å pumpe etter - planlagt uten sikring.",
        example: "Sentral midtbane går på 'tokt' for å ødelegge motstanderens oppbygging."
      },
      {
        term: "Romforhold (Bakrom/Mellomrom)",
        definition: "Vanlig begrepsbruk for å beskrive rom rundt motstanders ledd: Bakrom (rommet bak siste forsvarslinje) og Mellomrom (rommet mellom motstanderens ledd).",
        example: "Først tru bakrom for å strekke, så finn mellomrom rettvendt."
      },
      {
        term: "Begge veier-spiller",
        definition: "Spiller som behersker både angreps- og forsvarsferdigheter på høyt nivå. Moderne fotball krever dette.",
        example: "Spissen gjør en fenomenal jobb i det fremste forsvarsleddet - en ekte begge veier-spiller."
      }
    ]
  },
  {
    name: "Angrepsspill",
    terms: [
      {
        term: "Tredjemann",
        definition: "Spilleren som mottar pasningen etter at to medspillere allerede har kombinert. Kritisk for å bryte linjer og opprettholde tempo (A02).",
        example: "Tredjemann starter løpet idet pasning #2 slås og kommer rettvendt i mellomrommet."
      },
      {
        term: "3+2-sikring",
        definition: "Balanseprinsipp: minst tre spillere bak ball + to sentrale sikringer før laget sender mange i angrep. Hindrer kontring på kontring.",
        example: "Indreløper må bli igjen til vi har 3+2, ellers blir vi sårbare ved balltap."
      },
      {
        term: "Frys–se–slå",
        definition: "Mentalt cue: Etter ballvinning – frys ballen, løft blikket og slå først når rommet er definert (tempo-kontroll).",
        example: "Ballvinner frys-se-slår: tar et øyeblikk for å lese bakrom før pasningen går."
      },
      {
        term: "Ballbesittelse (possession)",
        definition: "Kontrollert ballinnehav for å flytte motstanderen, trekke ut markeringer og skape rom før gjennombrudd. Ikke et mål i seg selv, men et middel for å kontrollere tempo og skape sjanser. Krever gode støttevinkler og bevegelse uten ball.",
        example: "Vi spiller ballbesittelse for å dra presset til én side før vi bryter motsatt."
      },
      {
        term: "Kontraangrep",
        definition: "Ekstremt hurtig angrep rett etter gjenvinning mens motstanderen fortsatt er i ubalanse.",
        example: "Keeper kaster ballen raskt ut til vingen som løper i kontra."
      },
      {
        term: "Oppbyggingsspill",
        definition: "Planlagt fase der keeper, stoppere og sentral midtbane rullerer ball for å lokke press og finne progresjon gjennom ledd.",
        example: "Keeper starter via stopperne, sentral midtbane tilbyr seg i mellomrom og vi vender spill."
      },
      {
        term: "Gjennombrudd",
        definition: "Handling eller pasning som bryter siste forsvarslinje, enten med ballføring eller løp i bakrom.",
        example: "Spissen gjorde et gjennombrudd bak backrekken."
      },
      {
        term: "Veggspill",
        definition: "Kort pasningsutveksling der avleverer får ballen tilbake umiddelbart fra samme medspiller (1-2).",
        example: "Midtbanespiller og spiss bruker veggspill for å komme forbi stopperen."
      },
      {
        term: "Overlap",
        definition: "Når en spiller uten ball løper forbi ballfører på utsiden for å skape overtall og bredde.",
        example: "Backen gjør overlap på vingen langs sidelinjen."
      },
      {
        term: "Underlap",
        definition: "Når en spiller uten ball løper på innsiden av ballfører for å true mellomrom eller løpe inn i boks.",
        example: "Indreløperen gjør underlap på vingen og løper inn i boksen."
      },
      {
        term: "Dybdeløp",
        definition: "Koordinert løp bak forsvarslinjen for å true bakrom og gi pasningslinje i lengderetning.",
        example: "Vingen gjør dybdeløp når midtbanespilleren får ballen."
      },
      {
        term: "Blindsideløp",
        definition: "Løp på forsvarerens blinde side med tempo slik at de ikke rekker å reagere.",
        example: "Indreløperen gjør blindsideløp bak backen."
      },
      {
        term: "Knekkeløp",
        definition: "Løp hvor angriperen endrer retning eller tempo brått for å skape markeringstap før gjennombrudd.",
        example: "Spissen gjør knekkeløp - først ut, så inn bak stopperens rygg."
      },
      {
        term: "Motløp",
        definition: "Løp mot ballfører for å møte, sikre ball og eventuelt spille videre på en medspiller i fart.",
        example: "Spissen gjør motløp for å skape rom for vingen."
      },
      {
        term: "Overtall",
        definition: "Numerisk fordel (flere spillere enn motstander) i et område. Bruk korte pasninger, støtte og bevegelse for å finne fri spiller før motstander rekker å balansere.",
        example: "Vi skapte 3v2-overtall sentralt – indreløper slo tredjemann igjennom før forsvareren rakk å sikte."
      },
      {
        term: "Overbelastning",
        definition: "Taktisk prinsipp der laget plasserer flere spillere på én side av banen enn motstanderen kan dekke. Skaper overtall lokalt. Kombineres ofte med raske vendinger til den svake siden.",
        example: "Vi overbelastet venstre med kant, back og indreløper – da de forskjøv, slo vi diagonalt til høyre."
      },
      {
        term: "Støttespiller",
        definition: "Medspiller som tilbyr seg i en posisjon der ballfører kan spille en enkel pasning for å beholde ball, avlaste press eller endre angrepsvinkelen.",
        example: "Ankeret tilbyr seg alltid som støttespiller for stopperne – en trygg utgang under press."
      },
      {
        term: "Frirom",
        definition: "Område på banen uten motspillere der en medspiller kan motta ball med tid og rom. Skapes gjennom bevegelse som trekker med seg markeringer.",
        example: "Spissen trakk stopperen ut og skapte frirom for indreløperen som kom på løp."
      },
      {
        term: "Pasningslinje",
        definition: "Den tenkte linjen mellom ballfører og en potensiell mottaker. I forsvar: Steng pasningslinjer. I angrep: Åpne pasningslinjer med bevegelse.",
        example: "Tredjeforsvarer plasserer seg i pasningslinjen mellom ballfører og motstanderens playmaker."
      },
      {
        term: "Vendepunkt",
        definition: "Spiller (ofte anker eller spiss) som mottar ball med ryggen mot mål og vender spillet til motsatt side eller fremover. Kritisk for å endre angrepsvinkelen.",
        example: "Ankeret fungerte som vendepunkt – mottok fra venstre stopper og vendte spillet til høyre back i rom."
      },
      {
        term: "Blindsone",
        definition: "Området bak en forsvarer som denne ikke kan se uten å snu hodet. Angripere utnytter blindsoner ved å starte løp i det øyeblikket forsvareren fokuserer på ballen.",
        example: "Indreløperen startet løpet i backen sin blindsone og kom fri i boksen."
      }
    ]
  },
  {
    name: "Forsvarsspill & Overganger",
    terms: [
      {
        term: "Gjenvinning (5-sek)",
        definition: "Å jage ballen umiddelbart etter tap. Vi prøver å vinne den tilbake på 5 sekunder før vi faller av.",
        example: "Mistet ball? Ikke heng med hodet – jakt gjenvinning med en gang!"
      },
      {
        term: "Returløp",
        definition: "Sprint hjemover når laget mister ballen for å komme på rett side og gjenopprette balanse.",
        example: "Vingen tok et maks returløp og hindret kontringen før den ble farlig."
      },
      {
        term: "Kompakthet",
        definition: "Kort avstand mellom lagdelene (lengde) og mellom spillerne (bredde). Jo mer kompakt, desto mindre rom har motstanderen å spille i. Ideelt: Maks 35-40m fra første til siste forsvarsledd.",
        example: "Laget må være kompakt – pump opp backrekka når førsteforsvarer presser!"
      },
      {
        term: "Offsidefelle",
        definition: "Backrekken løper fremover i riktig øyeblikk for å sette motspillere i offside. Krever at hele linja er synkronisert og at en spiller (ofte sentral stopper) kommanderer bevegelsen.",
        example: "Idet pasningen slås, stepper hele backrekka frem – spissen blir stående i offside."
      },
      {
        term: "Pressfelle",
        definition: "Planlagt situasjon der laget lokker motstanderen til å spille i et område for så å stenge alle utveier med koordinert press. Sidelinje og hjørner er naturlige pressfeller.",
        example: "Vi la pressfelle langs sidelinja – ledet ballen dit, så stengte back og kant samtidig."
      },
      {
        term: "Balanse (defensiv)",
        definition: "Lagets evne til å ha riktig antall spillere bak ball og i sentrale posisjoner for å møte et eventuelt balltap. God balanse = kort vei til å etablere forsvar.",
        example: "Vi hadde dårlig balanse – alle var fremme og ingen sikret sentralt da vi mistet ballen."
      }
    ]
  },
  {
    name: "Roller i 4-3-3",
    terms: [
      {
        term: "Anker (6)",
        definition: "Den dype midtbanespilleren. Beskytter forsvaret og er vendingspunkt i angrep.",
        example: "Ankeret må alltid være spillbar for stopperne."
      },
      {
        term: "Indreløper (8/10)",
        definition: "Midtbanespillere som løper 'boks-til-boks'. Skaper trekanter, støtter kantene og går på løp inn i feltet.",
        example: "Indreløperne må true mellomrommet."
      },
      {
        term: "Kantspiller (7/11)",
        definition: "Angrepsspillere på sidene. Skal utfordre 1v1, true bakrom og slå innlegg.",
        example: "Kanten må holde bredden for å strekke forsvaret."
      },
      {
        term: "Spiss (9)",
        definition: "Den fremste angriperen. Binder opp stoppere og truer bakrom.",
        example: "Spissen må være tålmodig og ligge på linje med stopperne."
      }
    ]
  },
  {
    name: "Formasjoner (ungdomsfotball)",
    terms: [
      {
        term: "Formasjon 1-1-2-1 (femmer)",
        definition: "Vanlig formasjon i femmerfotball. Keeper, én bakspiller, to på midten, én spiss. Gir god bredde og dybde med få spillere.",
        example: "I 1-1-2-1 kan de to midtbanespillerne rotere for å skape vinkler for keeper."
      },
      {
        term: "Formasjon 1-2-2 (femmer)",
        definition: "Alternativ formasjon i femmerfotball. Keeper, to bakspillere, to fremme. Fokus på sikkerhet bak og kontringer.",
        example: "Med 1-2-2 har vi alltid numerisk balanse bak når de angriper."
      },
      {
        term: "Formasjon 1-3-2-1 (syver)",
        definition: "Balansert formasjon i syverfotball. Gir tre ledd og mulighet for både bredde og dybde.",
        example: "I 1-3-2-1 roterer midtbanespillerne for å skape overtall."
      },
      {
        term: "Formasjon 1-2-3-1 (syver)",
        definition: "Offensiv formasjon i syverfotball. Tre på midten gir mange spillpunkter, men krever god balanse.",
        example: "Med 1-2-3-1 dominerer vi midtbanen, men må passe på kontringsbalanse."
      }
    ]
  },
  {
    name: "Kombinasjonsspill",
    terms: [
      {
        term: "Opp-tilbake-igjennom",
        definition: "Klassisk kombinasjon: Pasning opp til en spiller, tilbake til en tredjemann, og så igjennom til en spiller i bevegelse.",
        example: "Stopper til anker (opp), anker til indreløper (tilbake), indreløper til spiss i bakrom (igjennom)."
      },
      {
        term: "Trekantspill",
        definition: "Tre spillere som danner en trekant og sirkulerer ballen for å skape usikkerhet og åpninger i forsvaret.",
        example: "Kant, back og indreløper spiller trekant for å åpne opp sidekorridor."
      },
      {
        term: "Rotasjon",
        definition: "Spillere som bytter posisjoner for å skape markeringsforvirring og nye vinkler.",
        example: "Spiss og indreløper roterer - spissen trekker ut, indreløperen løper i dybden."
      },
      {
        term: "Kryssløp",
        definition: "To spillere som krysser hverandres løpebaner for å trekke med seg forsvarere og skape rom.",
        example: "De to spissene gjør kryssløp - en ut, en inn - forsvarerne må velge hvem de følger."
      },
      {
        term: "Dobbel bevegelse",
        definition: "Spiller som gjør en fintebevegelse i én retning før han går i motsatt retning for å riste av markering.",
        example: "Vingen gjør dobbel bevegelse - først inn som for å møte, så brått ut i bakrommet."
      }
    ]
  },
  {
    name: "Spillefaser",
    terms: [
      {
        term: "Motstander i balanse",
        definition: "Motstanderen har de fleste spillerne på rett side av ball og eget mål, det er press på vår ballfører, og de er posisjonert slik at de stenger av de farligste rommene.",
        example: "De har god balanse - vi må bearbeide mer for å skape åpninger."
      },
      {
        term: "Motstander i ubalanse",
        definition: "Motstanderen har flere spillere på 'gal' side av ball og eget mål, og/eller de stenger ikke av farlige rom. Ofte i kombinasjon med manglende press på ballfører.",
        example: "De er i ubalanse etter balltap - angrip raskt før de rekker å komme på plass!"
      },
      {
        term: "Bearbeidingsfasen",
        definition: "Fase mot lag i balanse. Skaper posisjonell ubalanse hos motstander gjennom hurtig og uforutsigbart pasningsspill. Mål: Komme til neste fase.",
        example: "Vi spiller tålmodig i bearbeidingsfasen og venter på at de mister struktur."
      },
      {
        term: "Inn på siste tredjedel",
        definition: "Fase etter bearbeidingsfasen eller direkte etter angrepsstarter hvor motstander er i ubalanse. Mål: Passere flere motspillere/ledd og flytte opp laget for å etablere trykk.",
        example: "Vi kom oss inn på siste tredjedel og etablerte trykk i deres boks."
      },
      {
        term: "Komme til avslutning",
        definition: "Siste angrepsfase. Mål: avslutninger primært innenfor sekstenmeteren og score mål.",
        example: "Vi kom til avslutning etter godt kombinasjonsspill i boksen."
      },
      {
        term: "Bryte ned motstanders bearbeiding",
        definition: "Forsvarsfase når eget lag er i balanse. Prøver å nekte motstander i å spille oss i ubalanse.",
        example: "Vi bryter ned deres bearbeiding med kompakt forsvar og presser pasningsfeil."
      },
      {
        term: "Hindre tilgang på vår tredjedel",
        definition: "Forsvarsfase etter balltap i ubalanse eller når motstander har skapt delvis ubalanse gjennom god bearbeiding.",
        example: "Returløp og rask reorganisering for å hindre dem i å trenge inn på vår tredjedel."
      },
      {
        term: "Hindre avslutninger",
        definition: "Forsvarsfase som oftest er aktuell etter at motstander har invadert vårt bakrom eller mellomrom. Siste forsvarslinje.",
        example: "Blokkér alle skudd og vær beredt på andreballer."
      }
    ]
  },
  {
    name: "Spillbarhet (2A/3A)",
    terms: [
      {
        term: "Konstante posisjonsjusteringer",
        definition: "Kontinuerlig bevegelse for å gjøre seg spillbar - justering av avstander i forhold til ballfører og medspillere.",
        example: "Midtbanespilleren justerer konstant posisjonen for å alltid være et alternativ for ballfører."
      },
      {
        term: "Vinkler til ball",
        definition: "Posisjoner foran, bak og i samme ledd som ballfører som gir linje til ball. Gir ballfører flere pasningsalternativer.",
        example: "Ankeret tilbyr vinkel bak ballfører, spissen foran, og indreløperen i samme ledd."
      },
      {
        term: "Motsatte bevegelser",
        definition: "Når to spillere gjør bevegelser i motsatt retning samtidig for å skape usikkerhet hos forsvarerne.",
        example: "Én spiss møter i mellomrommet mens den andre stikker i bakrommet - motsatte bevegelser."
      },
      {
        term: "Samtidige bevegelser",
        definition: "Koordinerte bevegelser som starter samtidig for å overbelaste forsvarets beslutningskapasitet.",
        example: "Kant, back og indreløper starter løp samtidig - forsvaret må velge hvem de skal følge."
      },
      {
        term: "Orientering før ballmottak",
        definition: "Se seg rundt før man får ball og mens ballen er på vei. Posisjon og kroppsstilling som gjør at man ser både ballen og motstanders mål.",
        example: "Midtbanespilleren sjekket skulderen før han fikk ballen og visste allerede hvor han skulle spille."
      },
      {
        term: "Utnytte tid og rom med førsteberøring",
        definition: "Bruke førsteberøringen til å legge til rette for rask andreberøring, ta av press, skjerme ballen, eller spille på ett touch.",
        example: "Med førsteberøringen tok han ballen ut av presset og la opp til skudd med andre."
      },
      {
        term: "Ny bevegelse etter pasning",
        definition: "Umiddelbar bevegelse etter å ha spilt pasning - for å gjøre seg spillbar igjen og/eller skape nye rom.",
        example: "Etter pasningen løp han direkte i bakrom og ble spilt fri av tredjemann."
      }
    ]
  },
  {
    name: "Forsvarsprinsipper (1F)",
    terms: [
      {
        term: "Bryte foran / snappe ball",
        definition: "Førsteprioritet for 1F når laget er i balanse: Bryt pasningen før den kommer frem eller snapp ballen fra ballfører.",
        example: "1F leste pasningen og brøt foran - umiddelbart kontring!"
      },
      {
        term: "Takle / vinne ball",
        definition: "Andreprioritet for 1F: Gå inn i duell og vinn ballen fysisk.",
        example: "1F vant duellen med en ren takling og satte fart i kontringen."
      },
      {
        term: "Stresse 1A",
        definition: "Tredjeprioritet for 1F: Sett så mye press på ballfører at han tvinges til en upresis avlevering.",
        example: "1F stresset ballfører så mye at pasningen ble enkel å bryte for 2F."
      },
      {
        term: "Nekte fremoverpasning",
        definition: "Fjerdeprioritet for 1F: Steng av muligheten for å spille fremover eller bli passert.",
        example: "1F stengte alle fremoverlinjer - ballfører måtte spille tilbake."
      },
      {
        term: "Lede vekk fra farlige områder",
        definition: "Prioritet når laget er i ubalanse: Led ballfører vekk fra farlige sentralt områder og hindre fremoverpasninger.",
        example: "Vi var i ubalanse, så 1F ledet ballfører ut mot hjørneflagget for å kjøpe tid."
      },
      {
        term: "Forflytning i maks tempo",
        definition: "Rask forflytning i forkant av 1F-jobben. Posisjon og kroppsstilling som gjør at man ser både ballen og potensiell ny 1A.",
        example: "1F forflyttet seg i maks tempo og var allerede i presseposisjon da pasningen kom."
      }
    ]
  },
  {
    name: "Kommunikasjon (Rop)",
    terms: [
      {
        term: "Tid!",
        definition: "Ballfører har ingen press på seg. Kan orientere seg og se opp.",
        example: "'Tid!' betyr: Ro ned, du har kontroll."
      },
      {
        term: "Mann!", // Evt "Rygg!"
        definition: "Advarsel om at en motspiller kommer i press bakfra/nært.",
        example: "'Mann!' betyr: Beskytt ballen eller spill enkelt tilbake."
      },
      {
        term: "Snu!",
        definition: "Du har rom til å vende opp med ballen mot mål.",
        example: "'Snu!' betyr: Ikke spill støtte, du kan angripe!"
      },
      {
        term: "Hold!",
        definition: "Ikke støt frem, men hold posisjonen og forsink angrepet.",
        example: "Andreforsvarer roper 'Hold!' for å samle forsvaret før vi presser."
      },
      {
        term: "Gå!",
        definition: "Signal fra spillere bak til førsteforsvarer om at det er trygt å presse. Betyr at sikring er på plass.",
        example: "'Gå!' ropes av andreforsvareren når han er klar til å sikre."
      },
      {
        term: "Ut!",
        definition: "Kommando for å løfte forsvarslinja fremover, ofte brukt i offsidefelle-situasjoner.",
        example: "Sentral stopper roper 'Ut!' og hele backrekka stepper opp."
      },
      {
        term: "Sjekk skulder!",
        definition: "Påminnelse til medspiller om å se seg rundt for å få oversikt over motspillere i blindsonen.",
        example: "Midtbanespiller roper 'Sjekk skulder!' til ankeret før han mottar."
      },
      {
        term: "Alene!",
        definition: "Signaliserer at mottaker er helt fri og kan snu eller handle uten press.",
        example: "'Alene!' - du kan ta imot og løfte blikket i ro."
      },
      {
        term: "Ja! / Mitt navn",
        definition: "Roper navnet ditt eller 'Ja!' for å signalisere at du er spillbar og klar for pasning.",
        example: "Ankeret roper 'Ja!' for å vise at han er åpen for pasning."
      },
      {
        term: "Press!",
        definition: "Signal til laget om å starte kollektivt press på ballfører.",
        example: "Spissen roper 'Press!' når keeper tar lang tid på avklaringen."
      },
      {
        term: "Bytt!",
        definition: "Kommando for å bytte markering eller posisjon med en medspiller.",
        example: "'Bytt!' når motstander roterer - du tar min, jeg tar din."
      }
    ]
  },
  {
    name: "Dødball",
    terms: [
      {
        term: "Kort variant",
        definition: "Frispark eller hjørnespark som spilles kort til en medspiller i stedet for å slå direkte inn i feltet.",
        example: "Vi tar kort hjørnespark for å endre vinkelen før innlegget."
      },
      {
        term: "Lang variant",
        definition: "Frispark eller hjørnespark som slås direkte inn i farlig område.",
        example: "Lang variant på hjørnesparket - tre løp: første stolpe, andre stolpe, retur."
      },
      {
        term: "Første stolpe",
        definition: "Området nærmest der ballen slås fra. Løp dit trekker med seg forsvarere og åpner andre stolpe.",
        example: "Jeg tar første stolpe for å dra med meg stopperen."
      },
      {
        term: "Andre stolpe",
        definition: "Det borterste området fra der ballen slås. Ofte der det er mest rom.",
        example: "Vær klar på andre stolpe - der kommer ballen hvis første stolpe er stengt."
      },
      {
        term: "Retur",
        definition: "Området utenfor sekstenmeteren for andreballsmuligheter eller avslutning fra distanse.",
        example: "Indreløperen dekker retur for andreballer."
      },
      {
        term: "Blokkering (dødball)",
        definition: "Å stille seg i veien for en forsvarer slik at en medspiller kan løpe fri.",
        example: "Stopper blokkerer deres stopper så vår spiss kan løpe fri på første stolpe."
      },
      {
        term: "Soneforsvar (dødball)",
        definition: "Forsvarere dekker soner/områder i stedet for å følge spillere.",
        example: "Vi forsvarer hjørnespark med soneforsvar - du eier din boks."
      },
      {
        term: "Mannmarkering (dødball)",
        definition: "Forsvarere følger hver sin utpekte motspiller i stedet for å dekke soner.",
        example: "Mannmarkering på frispark - du følger nr. 9 overalt."
      },
      {
        term: "Innkast",
        definition: "Restart etter at ballen har gått over sidelinja. Kan brukes til å holde ball eller angripe raskt.",
        example: "Langt innkast som en ekstra variant - vi øver på å utnytte det offensivt."
      }
    ]
  },
  {
    name: "1v1 og teknikk",
    terms: [
      {
        term: "Finte",
        definition: "Bevegelse med kropp eller ball som lurer motstanderen til å reagere feil, slik at du kan gå forbi.",
        example: "Finte innover, gå utover - klassisk kant-finte."
      },
      {
        term: "Stepover",
        definition: "Finte der foten sirkler over ballen uten å berøre den, for å lure forsvareren.",
        example: "Stepover med høyre, dytt ballen forbi med venstre."
      },
      {
        term: "Cruyff-vending",
        definition: "Klassisk vending der du later som du skal slå en pasning, men i stedet drar ballen bak støttefoten.",
        example: "Cruyff-vending når forsvareren er for tett på - snur spillet helt."
      },
      {
        term: "La-gå",
        definition: "Å la ballen rulle gjennom beina eller forbi for en medspiller bak deg.",
        example: "Spissen gjør la-gå og indreløperen kommer i fart bak."
      },
      {
        term: "Skjerming",
        definition: "Å bruke kroppen til å holde motstanderen unna ballen mens du venter på støtte.",
        example: "Skjerm ballen til du får støtte - kroppen mellom ball og motstander."
      },
      {
        term: "Første touch",
        definition: "Det første berøringen av ballen. Avgjørende for hva du kan gjøre videre - ta av press, sette opp skudd, etc.",
        example: "God første touch ut av presset - nå har han rom å jobbe med."
      },
      {
        term: "Orientert mottak",
        definition: "Å ta imot ballen med kroppen allerede vendt i den retningen du skal spille.",
        example: "Orientert mottak mot mål - han er allerede klar til å angripe."
      },
      {
        term: "Vridd skudd",
        definition: "Skudd der foten treffer ballen på siden for å gi den sving/kurve.",
        example: "Vridd skudd i bortre hjørne - keeper hadde ingen sjanse."
      },
      {
        term: "Plassering vs. kraft",
        definition: "Valget mellom et hardt skudd eller et presist plassert skudd. Avhenger av situasjonen.",
        example: "Nært mål: plassering. Lang avstand: kraft. Les situasjonen!"
      }
    ]
  },
  {
    name: "Keeperbegreper",
    terms: [
      {
        term: "Utrulling",
        definition: "Keeper ruller ballen langs bakken til en medspiller for å starte oppbyggingsspill.",
        example: "Utrulling til back som har tid og rom."
      },
      {
        term: "Utsparkfordeling",
        definition: "Keeper sparker ballen ut i spill - kan være kort til forsvar eller langt opp i banen.",
        example: "De presser høyt, så keeper slår langt utsparkfordeling."
      },
      {
        term: "Overarmskast",
        definition: "Keeper kaster ballen med overarmen for rask og presis distribusjon.",
        example: "Overarmskast til kanten som er alene - rask kontring!"
      },
      {
        term: "Snevring",
        definition: "Keeper kommer ut for å gjøre vinkelen for skytter mindre og målet vanskeligere å treffe.",
        example: "Keeper snevret godt - skuddet gikk rett i kroppen hans."
      },
      {
        term: "Nedfelling",
        definition: "Teknikk for å gå ned og ta lave skudd - sikrer at kroppen er bak ballen.",
        example: "God nedfelling - han fikk kroppen bak og tok returen."
      },
      {
        term: "Sweeping",
        definition: "Keeper som rydder opp bak forsvarslinja ved å løpe ut og ta gjennombruddsballer.",
        example: "Keeper som sweeper - han leser spillet og er raskt ute på baller i bakrom."
      }
    ]
  },
  {
    name: "Orientering og lesing",
    terms: [
      {
        term: "Skanning",
        definition: "Å kontinuerlig sjekke omgivelsene ved å se over skulderen før og mens ballen er på vei.",
        example: "Skann før du får ballen - da vet du allerede hva du skal gjøre."
      },
      {
        term: "Åpen kroppsstilling",
        definition: "Kroppsstilling som gir deg utsyn til både ball, medspillere og motstandere.",
        example: "Stå med åpen kroppsstilling så du ser hele banen, ikke bare ballen."
      },
      {
        term: "Lukket kroppsstilling",
        definition: "Kroppsstilling der du kun ser ballen/ballsiden - begrenser dine alternativer.",
        example: "Han var lukket og så ikke løpet bak seg - mistet muligheten."
      },
      {
        term: "Lese spillet",
        definition: "Å forutse hva som kommer til å skje basert på spillernes posisjoner og bevegelser.",
        example: "Hun leste spillet og var der ballen kom - fantastisk antisipasjonsevne."
      },
      {
        term: "Antisipasjonsevne",
        definition: "Evnen til å forutse motstanderens handling og være i posisjon før det skjer.",
        example: "God antisipasjonsevne - han visste hvor pasningen ville gå før den ble slått."
      },
      {
        term: "Spillforståelse",
        definition: "Helhetlig forståelse av spillets dynamikk - når skal man presse, holde, støtte, etc.",
        example: "Fantastisk spillforståelse - hun tar alltid de riktige valgene."
      }
    ]
  },
  {
    name: "Læringsmomenter (Angrep)",
    terms: [
      {
        term: "Etablere gode avstander",
        definition: "Raskt etablere gode avstander i laget - i lengde- og bredderetningen - i bearbeidingsfasen.",
        example: "Etter gjenvinning spretter vi ut i bredden og dybden for å gi ballfører alternativer."
      },
      {
        term: "Utfordre 1F med overtall",
        definition: "Bruke overtall til å utfordre førsteforsvarer. Gode vinkler foran, bak og i samme ledd som 1A.",
        example: "Vi har 2v1 mot deres 1F - utfordre med veggspill!"
      },
      {
        term: "Ballbehandlingstid",
        definition: "Rask ballbehandlingstid og riktig tempo i pasningsspill. Ballen skal 'brenne' - ikke holdes for lenge.",
        example: "Ett touch når mulig, to touch når nødvendig - hold tempoet oppe."
      },
      {
        term: "Vending av spill",
        definition: "Vende spillet for å utnytte rom motsatt. Trekker forsvaret til én side før vi bryter motsatt.",
        example: "Vi overbelaster venstre, de forskyver, så vender vi raskt til høyre i rom."
      },
      {
        term: "Hoppe over ledd",
        definition: "Pasningsspill i dybde - hoppe over spillere i bakre ledd for å spille direkte opp på midtbaneledd.",
        example: "Keeper slår direkte til ankeret i stedet for via stopperne - vi hopper over leddet."
      },
      {
        term: "Slå over første pressledd",
        definition: "Ved mangel på rom og spillpunkter i bakre ledd, slå over motstanders første pressledd.",
        example: "De presser hardt, men vi slår over presset til en fri midtbanespiller."
      },
      {
        term: "Rettvendt 1A",
        definition: "Når ballfører er rettvendt med god oversikt: spill fremover i ledig rom, eller ta med ballen inn i ledig rom for å skape overtall.",
        example: "Indreløperen er rettvendt og ser rommet - han fører ball inn og skaper 3v2."
      },
      {
        term: "Feilvendt/presset 1A",
        definition: "Når ballfører er feilvendt eller presset, og motstander er i ubalanse: pasning bakover, deretter fremover.",
        example: "Spissen er presset men de er i ubalanse - tilbake til anker som slår direkte i bakrom."
      },
      {
        term: "Trusler mot bakrom",
        definition: "Alltid ha trusler mot bakrom. Spill i bakrom hvis mulighetene er gode.",
        example: "Selv i bearbeidingsfasen må noen alltid true bakrommet for å holde forsvarerne dype."
      },
      {
        term: "2.- og 3.-bevegelse",
        definition: "Spill på andrebevegelse fra 3A og tredjemann-kombinasjoner.",
        example: "Førstebevegelsen trekker med seg stopper, andrebevegelsen utnytter rommet som frigjøres."
      },
      {
        term: "Ettertrykk og balanse",
        definition: "Forflytning, ettertrykk og balanse i bakre og midtre ledd når laget angriper.",
        example: "Midtbanen følger etter angrepet med god balanse for å vinne andreballer."
      },
      {
        term: "Innlegg og bevegelser i boksen",
        definition: "Innlegg fra kantene med koordinerte bevegelser og posisjonering i sekstenmeteren.",
        example: "Tre løp i boksen: første stolpe, andre stolpe, returen - ingen blir stående."
      },
      {
        term: "Distinkte avslutninger",
        definition: "Raske avslutninger med kvalitet - få touch, rask ballbehandlingstid, finne scoringsrom.",
        example: "Én touch for å legge til rette, ett skudd - ikke nøl når muligheten er der."
      }
    ]
  },
  {
    name: "Læringsmomenter (Forsvar)",
    terms: [
      {
        term: "Gjenvinning rett etter balltap",
        definition: "Rett etter balltap og i god balanse: Umiddelbar gjenvinning i 5 sekunder.",
        example: "Vi mistet ballen men presser umiddelbart - vinn den tilbake mens de er uorganiserte!"
      },
      {
        term: "Stenge/lede målspark",
        definition: "Steng av eller led motstanderens målspark i ønsket retning.",
        example: "Vi leder målsparket ut mot deres svakeste side."
      },
      {
        term: "Presse høyt-signaler",
        definition: "Vær på jakt etter signaler for å presse høyt: bakoverpasninger, feilvendt 1A hos motstander.",
        example: "Han spilte tilbake til keeper - det er signalet! Press høyt nå!"
      },
      {
        term: "Tvinge ut i sidekorridor",
        definition: "Tvinge motstander til å spille ut i sidekorridor på egen banehalvdel.",
        example: "Steng sentralt og led dem ut mot hjørnet - der er det minst farlig."
      },
      {
        term: "Stenge vendingsmuligheter",
        definition: "Steng vendingsmuligheter med spisser og/eller offensiv midtbane.",
        example: "Spissen stenger pasningen tilbake til keeper og tvinger spill ut på backen."
      },
      {
        term: "Aggressivitet i 1F-front",
        definition: "Ekstrem aggressivitet i 1F-jobbingen i front. Forflytning når ball ruller.",
        example: "1F starter løpet idet pasningen slås - vær der når ballen kommer!"
      },
      {
        term: "Hurtig på rett side",
        definition: "Rett etter balltap: Få spillerne hurtig på rett side mellom ball og eget mål.",
        example: "Alle mann i returløp! Kom på rett side før de rekker å angripe!"
      },
      {
        term: "Felles forflytning",
        definition: "Hele laget forflytter seg i høyt tempo, med små avstander mellom ledd og i ledd.",
        example: "Vi forflytter oss som en enhet - holder kompaktheten."
      },
      {
        term: "Justere til klimaet",
        definition: "Konsentrering og dybde må justeres til enhver tid utfra 'klimaet' rundt 1A (presset/ikke presset).",
        example: "1A har tid - vi må tette mer! 1A er presset - vi kan ligge litt dypere."
      },
      {
        term: "Ned i ledd etter press",
        definition: "Dybde og konsentrering i midtbaneledd for å stenge pasningskorridorer. Ned i ledd etter pressejobb!",
        example: "Etter mislykket press - fall tilbake ned i ledd og gjenopprett struktur."
      },
      {
        term: "Prioritere sentralt",
        definition: "Prioriter å dekke rom sentralt i banen, fremfor sidekorridor.",
        example: "Bedre at de spiller ute på kanten enn at de kommer gjennom sentralt."
      },
      {
        term: "Stopper setter offsidelinja",
        definition: "Stopper på ballsiden setter offsidelinja. Resten følger.",
        example: "Høyre stopper styrer linja - backrekka følger hans signal."
      },
      {
        term: "Markeringsstolthet",
        definition: "Kontroll på ball og motspiller. Ta personlig ansvar for din mann.",
        example: "Du har ansvar for din direkte motspiller - vis markeringsstolthet!"
      },
      {
        term: "Andreballer",
        definition: "Vær i beredskap for å vinne andreballer etter dueller og innlegg.",
        example: "Heads up etter innlegget - vær klar for andreballen!"
      },
      {
        term: "Blokke avslutninger",
        definition: "Tett press - lede eller blokke alle avslutninger.",
        example: "Kroppen i banen - blokkér alt som går mot mål!"
      }
    ]
  }
];

export default function OrdlistePage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtreringslogikk
  const filteredGlossary = glossaryData.map((category) => {
    const filteredTerms = category.terms.filter((item) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        item.term.toLowerCase().includes(searchLower) ||
        item.definition.toLowerCase().includes(searchLower) ||
        (item.example && item.example.toLowerCase().includes(searchLower))
      );
    });

    return { ...category, terms: filteredTerms };
  }).filter(category => category.terms.length > 0);

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* App Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 text-sm font-semibold text-zinc-600">
              TP
            </span>
            <h1 className="text-lg font-bold text-zinc-900">Treningsplanlegger</h1>
          </div>
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">J16</span>
        </div>
        {/* Navigation */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav className="flex gap-1 -mb-px">
            <Link
              href="/"
              className="rounded-t-lg border-b-2 border-transparent px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-700 hover:border-zinc-300 transition"
            >
              Trening
            </Link>
            <Link
              href="/kamp"
              className="rounded-t-lg border-b-2 border-transparent px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-700 hover:border-zinc-300 transition"
            >
              Kamp
            </Link>
            <Link
              href="/opplaering"
              className="rounded-t-lg border-b-2 border-transparent px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-700 hover:border-zinc-300 transition"
            >
              Opplæring
            </Link>
            <Link
              href="/ordliste"
              className="rounded-t-lg border-b-2 border-black px-4 py-2 text-sm font-medium text-zinc-900"
            >
              Ordliste
            </Link>
            <Link
              href="/mindset"
              className="rounded-t-lg border-b-2 border-transparent px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-700 hover:border-zinc-300 transition"
            >
              Mindset
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900">Fotballordliste</h1>
        </div>

        {/* Search Bar */}
        <div className="mb-8 sticky top-4 z-20">
          <div className="relative">
            <input
              type="text"
              placeholder="Søk etter ord (f.eks. 'sikring', 'anker', 'press')..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white text-zinc-900 border border-zinc-200 rounded-2xl py-4 px-6 pl-12 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder-zinc-400"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs uppercase tracking-wide text-zinc-400">
              Søk
            </span>
          </div>
        </div>

        {/* Quick Links (kun hvis ikke søk er aktivt) */}
        {!searchTerm && (
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 mb-8 shadow-sm overflow-x-auto">
            <h2 className="text-sm font-medium text-zinc-500 mb-3">Kategorier:</h2>
            <div className="flex flex-nowrap gap-2">
              {glossaryData.map((category) => (
                <a
                  key={category.name}
                  href={`#${category.name.toLowerCase().replace(/[^a-zæøå0-9]/g, '-')}`}
                  className="whitespace-nowrap px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-lg text-sm transition-colors"
                >
                  {category.name}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="space-y-8">
          {filteredGlossary.length > 0 ? (
            filteredGlossary.map((category) => (
              <section 
                key={category.name}
                id={category.name.toLowerCase().replace(/[^a-zæøå0-9]/g, '-')}
                className="scroll-mt-28"
              >
                <h2 className="text-xl font-bold text-zinc-900 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  {category.name}
                </h2>
                <div className="grid gap-3">
                  {category.terms.map((item) => (
                    <div
                      key={item.term}
                      className="bg-white rounded-2xl p-5 border border-zinc-200 hover:border-blue-200 transition-all shadow-sm"
                    >
                      <h3 className="text-lg font-bold text-blue-600 mb-2">
                        {item.term}
                      </h3>
                      <p className="text-zinc-700 mb-3 leading-relaxed">
                        {item.definition}
                      </p>
                      {item.example && (
                        <div className="bg-blue-50 rounded-xl p-3 border-l-4 border-blue-200">
                          <p className="text-blue-900/80 text-sm italic">
                            <span className="not-italic mr-2">Sitat:</span>
                            {item.example}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))
          ) : (
            <div className="text-center py-12 text-zinc-500">
              <p className="text-xl">Ingen treff på &quot;{searchTerm}&quot;</p>
              <p className="text-sm mt-2">Prøv et annet ord eller sjekk stavingen.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-zinc-200 text-center">
          <p className="text-zinc-500 text-sm">
            Mangler du et ord? Spør treneren på neste økt!
          </p>
        </div>
      </div>
    </div>
  );
}
