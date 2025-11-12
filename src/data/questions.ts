import { Question } from "@/types/quiz";

export const FALLBACK_QUESTIONS: Question[] = [
  { 
    id: "k001", 
    type: "multiple", 
    isKids: true, 
    difficulty: "junior", 
    question: "Quem construiu uma arca para salvar os animais do dilúvio?", 
    options: ["Noé", "Moisés", "Abraão", "Davi"], 
    answer: 0, 
    reference: "Gênesis 6:13-14", 
    explanation: "Noé construiu a arca por ordem de Deus.", 
    category: "genesis" 
  },
  { 
    id: "k002", 
    type: "multiple", 
    isKids: true, 
    difficulty: "junior", 
    question: "Qual era o nome do primeiro homem criado por Deus?", 
    options: ["Abel", "Adão", "Caim", "Sete"], 
    answer: 1, 
    reference: "Gênesis 2:7", 
    explanation: "Adão foi formado do pó da terra.", 
    category: "genesis" 
  },
  { 
    id: "a101", 
    type: "multiple", 
    isKids: false, 
    difficulty: "easy", 
    question: "Qual (segundo as Escrituras) o nome do monte onde Moisés recebeu os Dez Mandamentos?", 
    options: ["Monte Hermom", "Monte Sinai", "Montanha de Deus", "Monte Olivete"], 
    answer: 1, 
    reference: "Êxodo 19", 
    explanation: "Moisés recebeu as tábuas no Monte Sinai.", 
    category: "exodo" 
  },
  {
    id: "a102",
    type: "multiple",
    isKids: false,
    difficulty: "medium",
    question: "Quantos dias e noites Jesus jejuou no deserto?",
    options: ["30 dias", "40 dias", "50 dias", "7 dias"],
    answer: 1,
    reference: "Mateus 4:2",
    explanation: "Jesus jejuou por 40 dias e 40 noites no deserto.",
    category: "novo_testamento"
  },
  {
    id: "a103",
    type: "multiple",
    isKids: false,
    difficulty: "easy",
    question: "Quem foi o pai de Salomão?",
    options: ["Saul", "Samuel", "Davi", "Abraão"],
    answer: 2,
    reference: "2 Samuel 12:24",
    explanation: "Davi foi o pai do rei Salomão.",
    category: "reis"
  },
  {
    id: "a104",
    type: "multiple",
    isKids: false,
    difficulty: "hard",
    question: "Quantos livros tem o Antigo Testamento?",
    options: ["27", "39", "46", "66"],
    answer: 1,
    reference: "—",
    explanation: "O Antigo Testamento possui 39 livros.",
    category: "biblia"
  },
  {
    id: "a105",
    type: "multiple",
    isKids: false,
    difficulty: "medium",
    question: "Qual foi o primeiro milagre de Jesus?",
    options: ["Curar um cego", "Transformar água em vinho", "Multiplicar pães", "Ressuscitar Lázaro"],
    answer: 1,
    reference: "João 2:1-11",
    explanation: "Jesus transformou água em vinho nas bodas de Caná.",
    category: "milagres"
  },
  {
    id: "a106",
    type: "multiple",
    isKids: false,
    difficulty: "easy",
    question: "Quantos apóstolos Jesus escolheu?",
    options: ["10", "11", "12", "13"],
    answer: 2,
    reference: "Mateus 10:1-4",
    explanation: "Jesus escolheu 12 apóstolos.",
    category: "apostolos"
  },
  {
    id: "a107",
    type: "multiple",
    isKids: false,
    difficulty: "medium",
    question: "Quem traiu Jesus por 30 moedas de prata?",
    options: ["Pedro", "João", "Judas Iscariotes", "Tomé"],
    answer: 2,
    reference: "Mateus 26:14-16",
    explanation: "Judas Iscariotes traiu Jesus.",
    category: "paixao"
  },
  {
    id: "a108",
    type: "multiple",
    isKids: false,
    difficulty: "hard",
    question: "Qual o menor versículo da Bíblia?",
    options: ["'Jesus chorou'", "'Deus é amor'", "'Seja feito'", "'Eu sou'"],
    answer: 0,
    reference: "João 11:35",
    explanation: "'Jesus chorou' é o menor versículo da Bíblia.",
    category: "curiosidades"
  },
  {
    id: "a109",
    type: "multiple",
    isKids: false,
    difficulty: "medium",
    question: "Quantos anos Matusalém viveu?",
    options: ["777 anos", "888 anos", "969 anos", "1000 anos"],
    answer: 2,
    reference: "Gênesis 5:27",
    explanation: "Matusalém viveu 969 anos, sendo o homem mais longevo da Bíblia.",
    category: "genesis"
  },
  {
    id: "a110",
    type: "multiple",
    isKids: false,
    difficulty: "easy",
    question: "Quem foi engolido por um grande peixe?",
    options: ["Jonas", "Elias", "Isaías", "Jeremias"],
    answer: 0,
    reference: "Jonas 1:17",
    explanation: "Jonas foi engolido por um grande peixe.",
    category: "profetas"
  },
];

export const AVATARS_SOLO = ['📖', '🕊️', '✝️', '⭐', '🙏', '💫', '🌟', '🔥'];
export const AVATARS_MULTI = ['😇', '👼', '🙌', '💪', '🎯', '🏆', '⚡', '🌈'];

export const GAME_CONSTANTS = {
  TIME_PER_QUESTION: 15,
  LIVES_PER_SESSION: 3,
  HINTS_PER_SESSION: 1,
  TIME_BONUS_MAX: 50,
  COMBO_MULTIPLIER: 0.1,
  POINTS: {
    junior: 100,
    easy: 100,
    medium: 150,
    hard: 200,
  },
};
