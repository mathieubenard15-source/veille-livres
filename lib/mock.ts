import type { Digest } from "./digest";

export const MOCK_DIGEST: Digest = {
  semaine: "du 3 au 9 mars 2026",
  generatedAt: "2026-03-05T15:00:00.000Z",
  selection: [
    {
      rang: 1,
      titre: "La guerre civile n'aura pas lieu",
      auteur: "Nicolas Prissette, Emmanuel Rivière",
      editeur: "Seuil",
      presentation:
        "L'essai La guerre civile n'aura pas lieu de Nicolas Prissette et Emmanuel Rivière bat en brèche l'idée selon laquelle la France serait au bord de l'implosion et « archipelisée » sous la pression de l'immigration, du wokisme, de l'insécurité, etc. Pour les auteurs, le débat public actuel ne reflète pas fidèlement l'état de l'opinion publique : les Français se retrouvent bien autour de valeurs positives (solidarité, cohésion, citoyenneté…), mais leurs attentes politiques et économiques restent insatisfaites.",
    },
    {
      rang: 2,
      titre: "La démocratie n'est pas l'élection",
      auteur: "Edwy Plenel",
      editeur: "La Découverte",
      presentation:
        "Dans La démocratie n'est pas l'élection, Edwy Plenel évoque le caractère dual du vote en démocratie. Il permet la représentativité certes, mais il est aussi utilisé comme un argument de légitimité incontestable justifiant des attaques contre l'État de droit dans des régimes autoritaires. Pour l'auteur, la France devrait se défaire de son obsession pour le vote et se tourner davantage vers de nouvelles sources de vitalité démocratique : les vies associative, culturelle, citoyenne et médiatique.",
    },
    {
      rang: 3,
      titre: "La sinistre comédie",
      auteur: "Collectif d'avocats",
      editeur: "Fayard",
      presentation:
        "Dans La sinistre comédie, les avocats de la défense de D. B., première femme condamnée à la perpétuité incompressible pour le meurtre de Lola, racontent l'intérieur de l'affaire et la récupération politique cynique qui l'a accompagnée. Ils constatent un affaiblissement de l'État de droit face aux appels à une justice expéditive et à un rétablissement de la peine de mort formulés par une élite politique et médiatique s'acharnant sur l'affaire et contre les avocats « du mal ».",
    },
  ],
  livresMajeurs: [
    {
      titre: "Le monde d'après n'existe pas",
      auteur: "Thomas Piketty",
      editeur: "Seuil",
      parution: "5 mars 2026",
      theme: "Économie",
      resume: "Une analyse des promesses non tenues de transformation post-pandémique et des inégalités structurelles qui persistent.",
      interet: "Nouvelle grille de lecture des politiques économiques européennes depuis 2020.",
      publicCible: "Économistes, politistes, citoyens engagés",
    },
    {
      titre: "Géopolitique de l'intelligence artificielle",
      auteur: "Cédric Villani, Asma Mhalla",
      editeur: "Flammarion",
      parution: "6 mars 2026",
      theme: "Géopolitique",
      resume: "Cartographie des rapports de force mondiaux autour de l'IA, entre souveraineté numérique et dépendance technologique.",
      interet: "Premier ouvrage croisant mathématiques et sciences politiques sur ce sujet en France.",
      publicCible: "Décideurs publics, chercheurs, professionnels du numérique",
    },
    {
      titre: "La République des juges",
      auteur: "Jean-Éric Schoettl",
      editeur: "Gallimard",
      parution: "4 mars 2026",
      theme: "Institutions",
      resume: "L'ancien secrétaire général du Conseil constitutionnel interroge l'équilibre des pouvoirs face à la montée du gouvernement des juges.",
      interet: "Regard de l'intérieur sur les tensions entre pouvoir judiciaire et souveraineté parlementaire.",
      publicCible: "Juristes, hauts fonctionnaires, étudiants en droit public",
    },
  ],
  livresInteressants: [
    {
      titre: "Marseille, capitale de la rupture",
      auteur: "Philippe Pujol",
      editeur: "La Découverte",
      parution: "5 mars 2026",
      theme: "Société",
      resume: "Enquête au long cours sur la fracture sociale marseillaise et ce qu'elle révèle de la France périphérique.",
      interet: "Prix Albert-Londres, terrain de 3 ans dans les quartiers Nord.",
      publicCible: "Grand public, journalistes, sociologues",
    },
    {
      titre: "L'Europe face à ses fantômes",
      auteur: "Luuk van Middelaar",
      editeur: "Gallimard",
      parution: "7 mars 2026",
      theme: "Relations internationales",
      resume: "Le politologue néerlandais analyse comment l'Union européenne gère (ou pas) son rapport à l'histoire et à la puissance.",
      interet: "Perspective extérieure rare sur l'identité politique européenne.",
      publicCible: "Européanistes, diplomates, étudiants en relations internationales",
    },
  ],
  livresSpecialises: [
    {
      titre: "Droit administratif et transition écologique",
      auteur: "Marta Torre-Schaub",
      editeur: "CNRS Éditions",
      parution: "3 mars 2026",
      theme: "Droit public",
      resume: "Analyse juridique des outils du droit administratif mobilisables dans la lutte contre le changement climatique.",
      interet: "Première synthèse académique droit admin/climat en langue française.",
      publicCible: "Juristes, chercheurs en droit de l'environnement",
    },
  ],
  tendances: [
    "Retour en force des essais sur la démocratie et ses limites institutionnelles, portés par le contexte politique tendu en France et en Europe.",
    "L'intelligence artificielle s'impose comme sujet transversal, traité désormais sous l'angle géopolitique et non plus seulement technique.",
    "Les éditeurs privilégient les formats courts (200-250 pages) et les co-écritures croisant disciplines académiques et expérience terrain.",
  ],
  priorites: [
    "La guerre civile n'aura pas lieu — Nicolas Prissette & Emmanuel Rivière (Seuil) : diagnostic essentiel sur l'état réel de l'opinion française.",
    "Géopolitique de l'intelligence artificielle — Villani & Mhalla (Flammarion) : grille de lecture indispensable pour comprendre les enjeux de souveraineté numérique.",
    "La République des juges — Jean-Éric Schoettl (Gallimard) : éclairage de premier plan sur l'équilibre des pouvoirs en France.",
  ],
};
