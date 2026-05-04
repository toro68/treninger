"use client";

import { useState } from "react";

import {
  defensiveCornerCards,
  establishedAttackCards,
  establishedDefenseCards,
  lowPressReminder,
  offensiveCornerCards,
  pressHeightCards,
  type TeamOrganizationCard,
  type TeamOrganizationTone,
} from "@/data/kamp/teamOrganization";
import { NFF_ZONAL_DEFENSE_LEADING, NFF_ZONAL_DEFENSE_ROLES } from "@/data/nff-zonal-defense";

type CardTone = TeamOrganizationTone | "emerald" | "blue" | "purple" | "amber";

const cardToneClasses: Record<CardTone, { box: string; title: string; text: string }> = {
  amber: {
    box: "border-amber-200 bg-amber-50",
    title: "text-amber-900",
    text: "text-amber-800",
  },
  blue: {
    box: "border-blue-200 bg-blue-50",
    title: "text-blue-900",
    text: "text-blue-800",
  },
  emerald: {
    box: "border-emerald-200 bg-emerald-50",
    title: "text-emerald-900",
    text: "text-emerald-800",
  },
  purple: {
    box: "border-purple-200 bg-purple-50",
    title: "text-purple-900",
    text: "text-purple-800",
  },
  red: {
    box: "border-red-200 bg-red-50",
    title: "text-red-900",
    text: "text-red-800",
  },
  sky: {
    box: "border-sky-200 bg-sky-50",
    title: "text-sky-900",
    text: "text-sky-800",
  },
  zinc: {
    box: "border-zinc-100 bg-zinc-50",
    title: "text-zinc-800",
    text: "text-zinc-700",
  },
};

const PrincipleCard = ({ card, tone = "zinc" }: { card: TeamOrganizationCard; tone?: CardTone }) => {
  const classes = cardToneClasses[tone];

  return (
    <div className={`rounded-lg border p-3 ${classes.box}`}>
      <h4 className={`text-xs font-semibold mb-1 ${classes.title}`}>{card.title}</h4>
      <p className={`text-xs ${classes.text}`}>{card.description}</p>
    </div>
  );
};

const PrincipleCardList = ({ cards }: { cards: TeamOrganizationCard[] }) => (
  <div className="space-y-2">
    {cards.map((card) => (
      <PrincipleCard key={card.title} card={card} tone={card.tone} />
    ))}
  </div>
);

export const TeamOrganization = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
          isOpen
            ? "border-slate-200/70 bg-gradient-to-r from-slate-50 to-zinc-50"
            : "border-zinc-200 bg-white"
        }`}
      >
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">Organisering</h2>
          <p className="text-xs text-zinc-500">Gameplan for hele laget</p>
        </div>
        <span className="flex items-center gap-1 text-sm text-zinc-700">
          {isOpen ? "Skjul" : "Vis"}
          <span className="text-lg leading-none">{isOpen ? "−" : "+"}</span>
        </span>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 mb-3 flex items-center gap-2">
              Soneforsvar: Roller (NFF)
            </h3>

            <div className="space-y-2">
              <PrincipleCard
                card={NFF_ZONAL_DEFENSE_ROLES["1f"]}
                tone="emerald"
              />
              <PrincipleCard card={NFF_ZONAL_DEFENSE_ROLES["2f"]} tone="blue" />
              <PrincipleCard card={NFF_ZONAL_DEFENSE_ROLES["3f"]} tone="purple" />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-900 mb-3 flex items-center gap-2">
              Leding av ballfører (NFF)
            </h3>

            <div className="space-y-2">
              <PrincipleCard card={NFF_ZONAL_DEFENSE_LEADING.sideline} tone="amber" />

              <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-3">
                <h4 className="text-xs font-semibold text-zinc-800 mb-1">
                  {NFF_ZONAL_DEFENSE_LEADING.curveRun.title}
                </h4>
                <p className="text-xs text-zinc-700">
                  {NFF_ZONAL_DEFENSE_LEADING.curveRun.description}
                </p>
                <p className="mt-2 text-xs text-zinc-500 italic">
                  {NFF_ZONAL_DEFENSE_LEADING.curveRun.example}
                </p>
              </div>

              <PrincipleCard
                card={{
                  title: NFF_ZONAL_DEFENSE_LEADING.leadIn.title,
                  description: `${NFF_ZONAL_DEFENSE_LEADING.leadIn.bullets.join(". ")}.`,
                }}
              />
              <PrincipleCard
                card={{
                  title: NFF_ZONAL_DEFENSE_LEADING.leadOut.title,
                  description: `${NFF_ZONAL_DEFENSE_LEADING.leadOut.bullets.join(". ")}.`,
                }}
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-900 mb-3 flex items-center gap-2">
              Presshøyde (NFF)
            </h3>

            <div className="grid grid-cols-2 gap-2">
              {pressHeightCards.map((card) => (
                <PrincipleCard key={card.title} card={card} tone={card.tone} />
              ))}
            </div>

            <div className="mt-2">
              <PrincipleCard card={lowPressReminder} />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-900 mb-3">
              Etablert Spill: Forsvar (når motstanderen har ballen)
            </h3>
            <PrincipleCardList cards={establishedDefenseCards} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-900 mb-3">
              Etablert Spill: Angrep (når laget har ballen)
            </h3>
            <PrincipleCardList cards={establishedAttackCards} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-900 mb-3">
              Dødballer: Defensiv Corner
            </h3>
            <PrincipleCardList cards={defensiveCornerCards} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-900 mb-3">
              Dødballer: Offensiv Corner
            </h3>
            <PrincipleCardList cards={offensiveCornerCards} />
          </div>
        </div>
      )}
    </section>
  );
};
