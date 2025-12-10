'use client';

import React, { useState } from 'react';

type Position = 'keeper' | 'midtstopper' | 'back' | 'sentral-midtbane' | 'kant' | 'spiss';

interface PositionData {
  name: string;
  description: string;
  tasks: {
    phase: string;
    items: string[];
  }[];
}

const positionData: Record<Position, PositionData> = {
  keeper: {
    name: 'Keeper',
    description: 'Lagets siste skanse og første angrepsspiller',
    tasks: [
      {
        phase: 'A1 - Oppspill',
        items: [
          'Ta dybde i banen for å skape bedre oversikt',
          'Utnytte pressfri sone til å finne beste løsning',
          'Når ball kommer fra høyre - se etter rom til venstre',
          'Spille bak første pressledd når mulig',
          'Kontrollerte pasninger med begge føtter',
        ],
      },
      {
        phase: 'F3 - Hindre mål',
        items: [
          'Styre mur ved frispark',
          'Organisere soneforsvar ved corner',
          'Plassere folk på stengene',
          'Kommunisere tydelig når forsvar er klart',
          'Box-spill - avgjøre når gå ut på innlegg',
          'Stå i beredskap - alltid klar for skudd',
        ],
      },
    ],
  },
  midtstopper: {
    name: 'Midtstopper',
    description: 'Leder av bakre ledd og duellspiller i egen boks',
    tasks: [
      {
        phase: 'F1 - Vinne ball høyt',
        items: [
          'Presse motstanders back når ball vris til din side',
          'Ta motstanders kant ved høyt press',
          'Sideforskyve raskt ved vendinger',
        ],
      },
      {
        phase: 'F2 - Forsinke/lede motangrep',
        items: [
          'Holde ca 10 meter til nærmeste medspiller',
          'Konsentrere når ball er sentralt',
          'Sikre medspiller som går i press',
          'Kommunisere "fall" eller "hold"',
        ],
      },
      {
        phase: 'F3 - Hindre mål',
        items: [
          'Vinne dueller i egen boks (hodet/kropp)',
          'Blokkere skudd - kaste seg i banen',
          'Dekke rom foran mål ved innlegg',
          'Styre bakre ledd som en enhet',
          'Håndtere to spisser uten å kalle ned midtbane',
        ],
      },
      {
        phase: 'A1 - Oppspill',
        items: [
          'Tilby støtte til keeper ved 5-meter',
          'Slå diagonaler til motsatt kant',
          'Dribbe forbi første press når rom finnes',
        ],
      },
    ],
  },
  back: {
    name: 'Back',
    description: 'Forsvarsspiller med stor rolle i angrepsspillet - mest borti ballen av alle',
    tasks: [
      {
        phase: 'F1 - Høyt press',
        items: [
          'Flytte seg langt og fort ved høyt press',
          'Presse motstanders back på din side',
          'Stenge ballerobringsarealet',
          'Følge med på keeper som velger "langt"',
        ],
      },
      {
        phase: 'F2 - Forsinke/organisere',
        items: [
          'IKKE ta rollen som 1. forsvarer når ball er foran bakre ledd - skaper 2:1',
          'Ligge smalt - hindre pasning mellom back og stopper',
          'Styre kant: "Jeg går" eller "Du presser, jeg blir"',
          'Snappe upresise pasninger - "hunting high and low"',
          'Ved cross fra motsatt side: bryte ballbanen eller gå i press',
        ],
      },
      {
        phase: 'F3 - 1:1 situasjoner',
        items: [
          'Driblekant: Sidestill deg, vent på utfall, se på ball ikke finter',
          'Rask kant: Inn i kropp FØR gass, brems med kroppen',
          'Høyrebeint kant: Steng yttersida. Venstrebeint: Steng innersia',
          'Ved 16-meter: Led ALLTID utover',
          'Innoverkant: Led utover. Utoverkant: Led innover',
          'Ved vegg-spill: Følg kanten, IKKE ball - indreløper tar veggen',
        ],
      },
      {
        phase: 'Innlegg/avslutning',
        items: [
          'Hindre innlegg - akselerere og retardere kjapt',
          'ALDRI vende "ræva til" ved innlegg',
          'Motsatt back: Ansvar for blindsideløp bak',
          'Blokkere skudd - mot og oppofrende',
          'Blokkere cutback/45-graders pasning',
        ],
      },
      {
        phase: 'Bakre ledd som enhet',
        items: [
          'Bakover når ballfører har rom og lader go\'foten',
          'Framover ved klarering og gjennombruddspasninger',
          'Sidelengs når motstander vrir spillet',
          'Konsentrere når ball er sentralt',
          'Kommunisere i feltet - ha oversikt',
        ],
      },
      {
        phase: 'A1-A3 - Angrep',
        items: [
          'Nøkkelspiller ved frispilling - halvlang pasning spiller av pressledd',
          'Overlap på yttersida OG innersia',
          'Ta pådrag fra utgangsposisjon til siste 1/3',
          'Skape overtall - komme bakfra er alltid fordel',
          'Nøkkelrolle ved ballerobring - starte kontringer',
        ],
      },
    ],
  },
  'sentral-midtbane': {
    name: 'Sentral midtbane',
    description: 'Bindeledd mellom forsvar og angrep',
    tasks: [
      {
        phase: 'F1 - Press',
        items: [
          'Stenge pasningslinjer sentralt',
          'Presse ballførers støttespiller',
          'Lede press fra midten',
        ],
      },
      {
        phase: 'F2 - Forsinke/sikre',
        items: [
          'Komme fra "feil side til rett side" ved vendinger',
          'Oppholde ballfører når back har spiller på yttersia',
          'Sikre back som går i press',
          'Dekke rom mellom linjene',
        ],
      },
      {
        phase: 'F3 - Foran egen boks',
        items: [
          'Ta veggen ved vegg-spill mot back',
          'Bli i sonen - ikke følge spillere ut på kant',
          'Blokkere skuddforsøk fra distanse',
        ],
      },
      {
        phase: 'A1-A2 - Oppbygging',
        items: [
          'Tilby støtte til bakre ledd',
          'Vende spillet fra side til side',
          'Finne pasning mellom linjene',
          'Dribbe forbi press når mulighet',
        ],
      },
    ],
  },
  kant: {
    name: 'Kantspiller',
    description: 'Kampavgjørende spiller med ansvar for bredde og gjennombrudd',
    tasks: [
      {
        phase: 'Bakromsløp (A2-A3)',
        items: [
          'Stå bredt i utgangsposisjon - trekk med deg back',
          'Les rom mellom motstanders back og stopper',
          'Ved stort rom: Skjær inn diagonalt i bakrom',
          'Ved lite rom: Hold bredden, gjør deg spillbar ytterst',
          'Time løpet - start FØR pasningen kommer',
          'Les medspillers kroppsspråk og blikk',
          'Ta med ball fremover med første touch',
        ],
      },
      {
        phase: 'Som ballfører - siste 1/3',
        items: [
          'True forsvareren i BEGGE retninger',
          'Finte troverdig motsatt vei før retningsbytte',
          'Se på forsvarerens tyngdepunkt - ikke ballen',
          'Tempoveksling - når akselerere?',
          'Innoverkutt: Åpner for skudd/kombinasjon/tidlig innlegg',
          'Utoverløp: Drible forbi eller slå innlegg',
          'Ha høyt tempo i gjennomføring av finte',
        ],
      },
      {
        phase: 'Avslutning på motsatt side',
        items: [
          'Angrip boks når ball er på motsatt side',
          'Time ankomst - kom inn på riktig tidspunkt',
          'Start løpet FØR innlegget kommer',
          'Kom inn med innsiden av foten klar',
          'Avslutt raskt - før forsvar reorganiserer',
          'Sikt på hjørnene - presisjon over kraft',
        ],
      },
      {
        phase: 'Defensivt',
        items: [
          'Første press på motstanders back',
          'Press på feilvendt spiller når back styrer',
          'Lage sandwich med back ved ballsiden',
          'Falle tilbake på linje med midtbane',
        ],
      },
    ],
  },
  spiss: {
    name: 'Spiss',
    description: 'Målscorer og pressleder',
    tasks: [
      {
        phase: 'F1 - Lede press',
        items: [
          'Starte presset - trigger for laget',
          'Stenge pasningslinje til midtstopper',
          'Lede motstander til ønsket side',
          'Presse keeper ved tilbakespill',
        ],
      },
      {
        phase: 'A2 - Bevegelse',
        items: [
          'Timing på bakromsløp',
          'Droppe ned for å tilby støtte',
          'Trekke med seg stopper - skape rom for andre',
          'Peile seg inn på blindsone til stopper',
        ],
      },
      {
        phase: 'A3 - Avslutning',
        items: [
          'Være først på innlegg - angrip ballen',
          'Posisjonere seg i scoringssoner',
          'Avslutte raskt - før keeper setter seg',
          'Følge opp returer',
          'Heading i boks - timing og mot',
        ],
      },
      {
        phase: 'Holde ball',
        items: [
          'Beskytte ball med kroppen når feilvendt',
          'Legge av til støttespiller',
          'Vende når mulighet - angrip bakrom',
        ],
      },
    ],
  },
};

const positionOrder: Position[] = ['keeper', 'midtstopper', 'back', 'sentral-midtbane', 'kant', 'spiss'];

export default function PositionRoles() {
  const [activePosition, setActivePosition] = useState<Position>('back');

  const position = positionData[activePosition];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Roller og arbeidsoppgaver</h2>
      <p className="text-sm text-gray-600 mb-4">
        Konkrete arbeidsoppgaver per posisjon basert på NFFs spillmodell og tiim.no
      </p>

      {/* Position tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b pb-4">
        {positionOrder.map((pos) => (
          <button
            key={pos}
            onClick={() => setActivePosition(pos)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activePosition === pos
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {positionData[pos].name}
          </button>
        ))}
      </div>

      {/* Position content */}
      <div>
        <div className="mb-4">
          <h3 className="text-xl font-bold text-green-700">{position.name}</h3>
          <p className="text-gray-600 italic">{position.description}</p>
        </div>

        <div className="space-y-6">
          {position.tasks.map((taskGroup, index) => (
            <div key={index} className="border-l-4 border-green-500 pl-4">
              <h4 className="font-bold text-gray-800 mb-2">{taskGroup.phase}</h4>
              <ul className="space-y-1">
                {taskGroup.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2 text-gray-700">
                    <span className="text-green-600 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Source attribution */}
      <div className="mt-8 pt-4 border-t border-gray-200 text-sm text-gray-500">
        <p>
          Kilde:{' '}
          <a
            href="https://tiim.no"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:underline"
          >
            tiim.no
          </a>{' '}
          (NFF) - &quot;Skråblikk: Backen&quot;, &quot;Kantspilleren som angrepsspiller&quot;, &quot;Den gode rolleøkta&quot;, Landslagsskolens spillmodell
        </p>
      </div>
    </div>
  );
}
