/* ============================================================
   GRAMMAR DETECTIVE — script.js
   Author  : Grammar Detective App
   Desc    : Full game logic — data, state, audio, UI, score
   ============================================================ */

/* ──────────────────────────────────────────────────────────
   SECTION 1 — QUESTION BANK  (35 questions)
   Structure:
     id          : unique number
     type        : grammar category name
     level       : "easy" | "medium" | "hard"
     sentence    : full sentence string
     errorPhrase : the erroneous phrase shown underlined
     options     : [{ letter, text, isCorrect }] — always 4
     explanation : why the chosen answer is correct
     correction  : the corrected full sentence
────────────────────────────────────────────────────────── */
const QUESTIONS = [

  /* ─────────────── EASY (12 questions) ─────────────── */
  {
    id: 1,
    type: "Subject-Verb Agreement",
    level: "easy",
    sentence: "She <ERR>don't</ERR> like to eat vegetables in the morning.",
    errorPhrase: "don't",
    options: [
      { letter: "A", text: "Change \"don't\" → \"doesn't\"", isCorrect: true  },
      { letter: "B", text: "Change \"like\" → \"likes\"",    isCorrect: false },
      { letter: "C", text: "Change \"eat\" → \"eating\"",    isCorrect: false },
      { letter: "D", text: "Remove \"to\" before \"eat\"",   isCorrect: false },
    ],
    explanation: "The subject 'She' is third-person singular. The auxiliary 'do not' must be contracted as 'doesn't' (does not), not 'don't' (do not), which belongs to plural/I forms.",
    correction: "She doesn't like to eat vegetables in the morning.",
  },

  {
    id: 2,
    type: "Article",
    level: "easy",
    sentence: "He is <ERR>an university</ERR> student who studies engineering.",
    errorPhrase: "an university",
    options: [
      { letter: "A", text: "Change \"an\" → \"a\"",           isCorrect: true  },
      { letter: "B", text: "Change \"student\" → \"students\"", isCorrect: false },
      { letter: "C", text: "Remove the article entirely",       isCorrect: false },
      { letter: "D", text: "Change \"an\" → \"the\"",          isCorrect: false },
    ],
    explanation: "'University' begins with a /j/ (consonant) sound, not a true vowel sound. We use 'a' before consonant sounds and 'an' before vowel sounds.",
    correction: "He is a university student who studies engineering.",
  },

  {
    id: 3,
    type: "Tenses",
    level: "easy",
    sentence: "Yesterday, she <ERR>goes</ERR> to the market and buys some fruits.",
    errorPhrase: "goes",
    options: [
      { letter: "A", text: "Change \"goes\" → \"went\"",       isCorrect: true  },
      { letter: "B", text: "Change \"goes\" → \"is going\"",   isCorrect: false },
      { letter: "C", text: "Change \"buys\" → \"bought\"",     isCorrect: false },
      { letter: "D", text: "Remove \"Yesterday\"",             isCorrect: false },
    ],
    explanation: "'Yesterday' signals past tense. Simple present 'goes' is incorrect; the past form 'went' must be used to match the time adverb.",
    correction: "Yesterday, she went to the market and bought some fruits.",
  },

  {
    id: 4,
    type: "Pronoun",
    level: "easy",
    sentence: "My brother and <ERR>me</ERR> went to the cinema last Friday.",
    errorPhrase: "me",
    options: [
      { letter: "A", text: "Change \"me\" → \"I\"",            isCorrect: true  },
      { letter: "B", text: "Change \"me\" → \"myself\"",       isCorrect: false },
      { letter: "C", text: "Change \"went\" → \"go\"",         isCorrect: false },
      { letter: "D", text: "Remove \"and me\"",                isCorrect: false },
    ],
    explanation: "'Me' is an object pronoun. When a pronoun acts as the subject of a verb, use the subject pronoun 'I'. Tip: remove 'My brother and' — you would never say 'me went'.",
    correction: "My brother and I went to the cinema last Friday.",
  },

  {
    id: 5,
    type: "Preposition",
    level: "easy",
    sentence: "She has been living in this city <ERR>since five years</ERR>.",
    errorPhrase: "since five years",
    options: [
      { letter: "A", text: "Change \"since\" → \"for\"",       isCorrect: true  },
      { letter: "B", text: "Change \"since\" → \"in\"",        isCorrect: false },
      { letter: "C", text: "Change \"since\" → \"during\"",    isCorrect: false },
      { letter: "D", text: "Remove \"five\" before \"years\"", isCorrect: false },
    ],
    explanation: "'Since' is used with a specific point in time (since 2019, since Monday). 'For' is used with a duration (for five years). Here 'five years' is a duration.",
    correction: "She has been living in this city for five years.",
  },

  {
    id: 6,
    type: "Subject-Verb Agreement",
    level: "easy",
    sentence: "The students in the classroom <ERR>was</ERR> very noisy during recess.",
    errorPhrase: "was",
    options: [
      { letter: "A", text: "Change \"was\" → \"were\"",        isCorrect: true  },
      { letter: "B", text: "Change \"was\" → \"is\"",          isCorrect: false },
      { letter: "C", text: "Change \"noisy\" → \"noisily\"",   isCorrect: false },
      { letter: "D", text: "Remove \"very\"",                  isCorrect: false },
    ],
    explanation: "The true subject is 'students' (plural). The prepositional phrase 'in the classroom' does not change the subject. Plural subjects require 'were', not 'was'.",
    correction: "The students in the classroom were very noisy during recess.",
  },

  {
    id: 7,
    type: "Article",
    level: "easy",
    sentence: "I saw <ERR>a interesting</ERR> movie at the theater last night.",
    errorPhrase: "a interesting",
    options: [
      { letter: "A", text: "Change \"a\" → \"an\"",            isCorrect: true  },
      { letter: "B", text: "Change \"a\" → \"the\"",           isCorrect: false },
      { letter: "C", text: "Remove the article entirely",       isCorrect: false },
      { letter: "D", text: "Change \"interesting\" → \"interest\"", isCorrect: false },
    ],
    explanation: "'Interesting' starts with a vowel sound /ɪ/. The indefinite article before a vowel sound must be 'an', not 'a'.",
    correction: "I saw an interesting movie at the theater last night.",
  },

  {
    id: 8,
    type: "Adjective vs Adverb",
    level: "easy",
    sentence: "She sings <ERR>beautiful</ERR> and everyone in the room listened attentively.",
    errorPhrase: "beautiful",
    options: [
      { letter: "A", text: "Change \"beautiful\" → \"beautifully\"", isCorrect: true  },
      { letter: "B", text: "Change \"beautiful\" → \"beauty\"",      isCorrect: false },
      { letter: "C", text: "Change \"listened\" → \"listens\"",      isCorrect: false },
      { letter: "D", text: "Add \"very\" before \"beautiful\"",      isCorrect: false },
    ],
    explanation: "Adverbs modify verbs; adjectives modify nouns. 'Sings' is an action verb, so it should be modified by the adverb 'beautifully', not the adjective 'beautiful'.",
    correction: "She sings beautifully and everyone in the room listened attentively.",
  },

  {
    id: 9,
    type: "Tenses",
    level: "easy",
    sentence: "He <ERR>has finished</ERR> his homework before the teacher arrived.",
    errorPhrase: "has finished",
    options: [
      { letter: "A", text: "Change to \"had finished\"",        isCorrect: true  },
      { letter: "B", text: "Change to \"was finishing\"",       isCorrect: false },
      { letter: "C", text: "Change to \"finished\"",            isCorrect: false },
      { letter: "D", text: "Change to \"will have finished\"",  isCorrect: false },
    ],
    explanation: "Two events occurred in the past. The one that happened first (finishing homework) uses past perfect 'had finished'. 'Has finished' is present perfect and incorrect for past sequences.",
    correction: "He had finished his homework before the teacher arrived.",
  },

  {
    id: 10,
    type: "Conjunction",
    level: "easy",
    sentence: "He is smart, but <ERR>also he is</ERR> very hardworking and dedicated.",
    errorPhrase: "also he is",
    options: [
      { letter: "A", text: "Restructure: \"not only smart but also hardworking\"", isCorrect: true  },
      { letter: "B", text: "Change \"but also\" → \"and\"",     isCorrect: false },
      { letter: "C", text: "Remove \"but\"",                    isCorrect: false },
      { letter: "D", text: "Add \"however\" before \"also\"",   isCorrect: false },
    ],
    explanation: "'Not only…but also' is a correlative conjunction pair. Without 'not only' at the start, 'but also' creates a broken structure. The correct pair must be used together.",
    correction: "He is not only smart but also very hardworking and dedicated.",
  },

  {
    id: 11,
    type: "Preposition",
    level: "easy",
    sentence: "She arrived <ERR>at</ERR> home very late last Tuesday night.",
    errorPhrase: "at",
    options: [
      { letter: "A", text: "Change \"at\" → \"to\"",            isCorrect: false },
      { letter: "B", text: "Change \"at\" → \"in\"",            isCorrect: false },
      { letter: "C", text: "The sentence is correct as written", isCorrect: true  },
      { letter: "D", text: "Change \"at\" → \"on\"",            isCorrect: false },
    ],
    explanation: "'Arrived at home' is the standard collocation in English. 'At' correctly indicates a destination point. This sentence is grammatically correct.",
    correction: "She arrived at home very late last Tuesday night. ✓ (No error)",
  },

  {
    id: 12,
    type: "Parallel Structure",
    level: "easy",
    sentence: "She enjoys reading novels, <ERR>to watch movies</ERR>, and hiking on weekends.",
    errorPhrase: "to watch movies",
    options: [
      { letter: "A", text: "Change \"to watch\" → \"watching\"", isCorrect: true  },
      { letter: "B", text: "Change \"to watch\" → \"watched\"",  isCorrect: false },
      { letter: "C", text: "Change \"reading\" → \"to read\"",   isCorrect: false },
      { letter: "D", text: "Change \"hiking\" → \"to hike\"",    isCorrect: false },
    ],
    explanation: "All items in the list after 'enjoys' must be in the same form (parallel). 'Reading' and 'hiking' are gerunds (-ing), so 'watching' must also be used.",
    correction: "She enjoys reading novels, watching movies, and hiking on weekends.",
  },

  /* ─────────────── MEDIUM (12 questions) ───────────── */
  {
    id: 13,
    type: "Tenses",
    level: "medium",
    sentence: "By the time she arrives tomorrow, we <ERR>will finish</ERR> the project.",
    errorPhrase: "will finish",
    options: [
      { letter: "A", text: "Change to \"will have finished\"",  isCorrect: true  },
      { letter: "B", text: "Change to \"finish\"",              isCorrect: false },
      { letter: "C", text: "Change to \"are finishing\"",       isCorrect: false },
      { letter: "D", text: "Change to \"have finished\"",       isCorrect: false },
    ],
    explanation: "'By the time' indicates the action will be completed before a future reference point. Future perfect 'will have finished' is required — not simple future 'will finish'.",
    correction: "By the time she arrives tomorrow, we will have finished the project.",
  },

  {
    id: 14,
    type: "Subject-Verb Agreement",
    level: "medium",
    sentence: "Neither the manager nor the employees <ERR>was</ERR> informed about the policy change.",
    errorPhrase: "was",
    options: [
      { letter: "A", text: "Change \"was\" → \"were\"",         isCorrect: true  },
      { letter: "B", text: "Change \"was\" → \"is\"",           isCorrect: false },
      { letter: "C", text: "Change \"was\" → \"has been\"",     isCorrect: false },
      { letter: "D", text: "Change \"was\" → \"had been\"",     isCorrect: false },
    ],
    explanation: "With 'neither…nor', the verb agrees with the noun closest to it ('employees', plural). 'Were' is required, not 'was'.",
    correction: "Neither the manager nor the employees were informed about the policy change.",
  },

  {
    id: 15,
    type: "Preposition",
    level: "medium",
    sentence: "She is very <ERR>good in mathematics</ERR> and often helps her classmates.",
    errorPhrase: "good in mathematics",
    options: [
      { letter: "A", text: "Change \"good in\" → \"good at\"",  isCorrect: true  },
      { letter: "B", text: "Change \"good in\" → \"good for\"", isCorrect: false },
      { letter: "C", text: "Change \"good in\" → \"well in\"",  isCorrect: false },
      { letter: "D", text: "Change \"good in\" → \"good with\"",isCorrect: false },
    ],
    explanation: "The fixed prepositional collocation for ability or skill is 'good at', not 'good in'. This applies to subjects, sports, and activities.",
    correction: "She is very good at mathematics and often helps her classmates.",
  },

  {
    id: 16,
    type: "Adjective vs Adverb",
    level: "medium",
    sentence: "The team performed <ERR>very good</ERR> in the regional competition last month.",
    errorPhrase: "very good",
    options: [
      { letter: "A", text: "Change \"good\" → \"well\"",         isCorrect: true  },
      { letter: "B", text: "Change \"good\" → \"greatly\"",      isCorrect: false },
      { letter: "C", text: "Change \"very\" → \"so\"",           isCorrect: false },
      { letter: "D", text: "Change \"performed\" → \"was performing\"", isCorrect: false },
    ],
    explanation: "'Performed' is an action verb and must be modified by an adverb. 'Good' is an adjective; 'well' is the correct adverb form to describe manner of performance.",
    correction: "The team performed very well in the regional competition last month.",
  },

  {
    id: 17,
    type: "Tenses",
    level: "medium",
    sentence: "If she <ERR>study</ERR> harder, she would pass the examination next week.",
    errorPhrase: "study",
    options: [
      { letter: "A", text: "Change \"study\" → \"studied\"",     isCorrect: true  },
      { letter: "B", text: "Change \"study\" → \"studies\"",     isCorrect: false },
      { letter: "C", text: "Change \"would pass\" → \"will pass\"", isCorrect: false },
      { letter: "D", text: "Change \"study\" → \"had studied\"", isCorrect: false },
    ],
    explanation: "Second conditional (hypothetical/unreal present) requires simple past in the if-clause: 'If she studied…'. Base form 'study' is incorrect.",
    correction: "If she studied harder, she would pass the examination next week.",
  },

  {
    id: 18,
    type: "Article",
    level: "medium",
    sentence: "<ERR>The happiness</ERR> is something that everyone in the world seeks every day.",
    errorPhrase: "The happiness",
    options: [
      { letter: "A", text: "Remove \"The\" — use no article",    isCorrect: true  },
      { letter: "B", text: "Change \"The\" → \"A\"",             isCorrect: false },
      { letter: "C", text: "Change \"The\" → \"An\"",            isCorrect: false },
      { letter: "D", text: "Keep \"The\" — it is correct",       isCorrect: false },
    ],
    explanation: "Abstract nouns used in a general sense ('happiness' as a concept) do not take any article in English. 'The happiness' implies a specific happiness, which is not the intended meaning.",
    correction: "Happiness is something that everyone in the world seeks every day.",
  },

  {
    id: 19,
    type: "Conjunction",
    level: "medium",
    sentence: "Although she worked hard, <ERR>but</ERR> she did not receive a promotion.",
    errorPhrase: "but",
    options: [
      { letter: "A", text: "Remove \"but\" — \"although\" is sufficient",   isCorrect: true  },
      { letter: "B", text: "Change \"but\" → \"however\"",                  isCorrect: false },
      { letter: "C", text: "Change \"Although\" → \"Because\"",             isCorrect: false },
      { letter: "D", text: "Change \"but\" → \"yet\"",                      isCorrect: false },
    ],
    explanation: "'Although' and 'but' are both contrast connectors. Using both creates a double connector error. Either 'although' alone or 'but' alone (or 'she worked hard, but she…') is correct.",
    correction: "Although she worked hard, she did not receive a promotion.",
  },

  {
    id: 20,
    type: "Parallel Structure",
    level: "medium",
    sentence: "The manager asked us to work quickly, <ERR>being efficient</ERR>, and with accuracy.",
    errorPhrase: "being efficient",
    options: [
      { letter: "A", text: "Change to \"efficiently\"",           isCorrect: true  },
      { letter: "B", text: "Change to \"to be efficient\"",       isCorrect: false },
      { letter: "C", text: "Change to \"with efficiency\"",       isCorrect: false },
      { letter: "D", text: "Remove this element entirely",        isCorrect: false },
    ],
    explanation: "After 'work', all elements should be adverbs modifying the verb: 'work quickly, efficiently, and accurately'. 'Being efficient' breaks parallel structure.",
    correction: "The manager asked us to work quickly, efficiently, and accurately.",
  },

  {
    id: 21,
    type: "Pronoun",
    level: "medium",
    sentence: "The committee announced <ERR>their</ERR> decision after a lengthy deliberation.",
    errorPhrase: "their",
    options: [
      { letter: "A", text: "Change \"their\" → \"its\"",          isCorrect: true  },
      { letter: "B", text: "Change \"their\" → \"his\"",          isCorrect: false },
      { letter: "C", text: "Change \"their\" → \"our\"",          isCorrect: false },
      { letter: "D", text: "Keep \"their\" — it is correct",      isCorrect: false },
    ],
    explanation: "In American English, collective nouns like 'committee' are singular and take singular pronouns. 'Its' is correct. (Note: British English commonly accepts 'their' for collective nouns.)",
    correction: "The committee announced its decision after a lengthy deliberation.",
  },

  {
    id: 22,
    type: "Tenses",
    level: "medium",
    sentence: "She <ERR>is working</ERR> at the company since she graduated from university in 2018.",
    errorPhrase: "is working",
    options: [
      { letter: "A", text: "Change to \"has been working\"",       isCorrect: true  },
      { letter: "B", text: "Change to \"was working\"",            isCorrect: false },
      { letter: "C", text: "Change to \"had been working\"",       isCorrect: false },
      { letter: "D", text: "Change to \"works\"",                  isCorrect: false },
    ],
    explanation: "'Since' with a past event requires present perfect continuous 'has been working' to show an action that started in the past and continues to the present.",
    correction: "She has been working at the company since she graduated from university in 2018.",
  },

  {
    id: 23,
    type: "Subject-Verb Agreement",
    level: "medium",
    sentence: "A number of students <ERR>has submitted</ERR> their assignments before the deadline.",
    errorPhrase: "has submitted",
    options: [
      { letter: "A", text: "Change \"has submitted\" → \"have submitted\"", isCorrect: true  },
      { letter: "B", text: "Change \"has submitted\" → \"had submitted\"",  isCorrect: false },
      { letter: "C", text: "Change \"has submitted\" → \"submitted\"",      isCorrect: false },
      { letter: "D", text: "Change \"has submitted\" → \"submits\"",        isCorrect: false },
    ],
    explanation: "'A number of' means 'several' and is treated as plural. Compare: 'The number of students has decreased' (singular). Here 'have submitted' is correct.",
    correction: "A number of students have submitted their assignments before the deadline.",
  },

  {
    id: 24,
    type: "Preposition",
    level: "medium",
    sentence: "She has a strong <ERR>interest for</ERR> classical music and attends concerts regularly.",
    errorPhrase: "interest for",
    options: [
      { letter: "A", text: "Change \"interest for\" → \"interest in\"",  isCorrect: true  },
      { letter: "B", text: "Change \"interest for\" → \"interest on\"",  isCorrect: false },
      { letter: "C", text: "Change \"interest for\" → \"interesting for\"", isCorrect: false },
      { letter: "D", text: "Change \"interest for\" → \"interest of\"",  isCorrect: false },
    ],
    explanation: "The fixed prepositional collocation is 'interest in' something. 'Interest for' is not standard English usage.",
    correction: "She has a strong interest in classical music and attends concerts regularly.",
  },

  /* ─────────────── HARD (11 questions) ─────────────── */
  {
    id: 25,
    type: "Tenses",
    level: "hard",
    sentence: "The report submitted last week <ERR>contain</ERR> several critical errors that must be fixed.",
    errorPhrase: "contain",
    options: [
      { letter: "A", text: "Change \"contain\" → \"contains\"",     isCorrect: true  },
      { letter: "B", text: "Change \"contain\" → \"contained\"",    isCorrect: false },
      { letter: "C", text: "Change \"contain\" → \"is containing\"",isCorrect: false },
      { letter: "D", text: "Change \"contain\" → \"have contained\"",isCorrect: false },
    ],
    explanation: "The subject is 'The report' (singular). The past participle phrase 'submitted last week' is a modifier, not a new clause, so the verb must agree with the singular subject: 'contains'.",
    correction: "The report submitted last week contains several critical errors that must be fixed.",
  },

  {
    id: 26,
    type: "Parallel Structure",
    level: "hard",
    sentence: "Not only did she complete the task on time, <ERR>and she also</ERR> exceeded all expectations.",
    errorPhrase: "and she also",
    options: [
      { letter: "A", text: "Change \"and she also\" → \"but she also\"", isCorrect: true  },
      { letter: "B", text: "Change \"and she also\" → \"but also she\"", isCorrect: false },
      { letter: "C", text: "Remove \"not only\" at the beginning",       isCorrect: false },
      { letter: "D", text: "Change \"and she also\" → \"however she\"",  isCorrect: false },
    ],
    explanation: "'Not only…but also' is a fixed correlative conjunction pair. 'And' breaks this pair. The second element must begin with 'but (she) also'.",
    correction: "Not only did she complete the task on time, but she also exceeded all expectations.",
  },

  {
    id: 27,
    type: "Article",
    level: "hard",
    sentence: "He is considered to be the best pianist in <ERR>a world</ERR> today.",
    errorPhrase: "a world",
    options: [
      { letter: "A", text: "Change \"a world\" → \"the world\"",    isCorrect: true  },
      { letter: "B", text: "Remove the article before \"world\"",   isCorrect: false },
      { letter: "C", text: "Change \"a world\" → \"this world\"",   isCorrect: false },
      { letter: "D", text: "Change \"a\" → \"our\"",               isCorrect: false },
    ],
    explanation: "'The world' is a unique, specific entity — there is only one world. Unique nouns always take the definite article 'the', never the indefinite 'a'.",
    correction: "He is considered to be the best pianist in the world today.",
  },

  {
    id: 28,
    type: "Tenses",
    level: "hard",
    sentence: "She would have succeeded if she <ERR>has worked</ERR> more diligently on the project.",
    errorPhrase: "has worked",
    options: [
      { letter: "A", text: "Change \"has worked\" → \"had worked\"",  isCorrect: true  },
      { letter: "B", text: "Change \"has worked\" → \"worked\"",      isCorrect: false },
      { letter: "C", text: "Change \"would have\" → \"would\"",       isCorrect: false },
      { letter: "D", text: "Change \"has worked\" → \"was working\"", isCorrect: false },
    ],
    explanation: "Third conditional (unreal past) requires past perfect in the if-clause: 'had worked'. 'Has worked' (present perfect) is grammatically incorrect here.",
    correction: "She would have succeeded if she had worked more diligently on the project.",
  },

  {
    id: 29,
    type: "Adjective vs Adverb",
    level: "hard",
    sentence: "The scientist spoke <ERR>clear</ERR> about her findings at the international conference.",
    errorPhrase: "clear",
    options: [
      { letter: "A", text: "Change \"clear\" → \"clearly\"",         isCorrect: true  },
      { letter: "B", text: "Change \"clear\" → \"clearer\"",         isCorrect: false },
      { letter: "C", text: "Change \"clear\" → \"with clarity\"",    isCorrect: false },
      { letter: "D", text: "Add \"and\" after \"clear\"",            isCorrect: false },
    ],
    explanation: "'Spoke' is an action verb that requires an adverb to indicate manner. 'Clear' is an adjective; the adverb 'clearly' must be used instead.",
    correction: "The scientist spoke clearly about her findings at the international conference.",
  },

  {
    id: 30,
    type: "Preposition",
    level: "hard",
    sentence: "The results of the experiment are <ERR>consistent to</ERR> the previous findings.",
    errorPhrase: "consistent to",
    options: [
      { letter: "A", text: "Change \"consistent to\" → \"consistent with\"", isCorrect: true  },
      { letter: "B", text: "Change \"consistent to\" → \"consistent in\"",   isCorrect: false },
      { letter: "C", text: "Change \"consistent to\" → \"consistent for\"",  isCorrect: false },
      { letter: "D", text: "Change \"consistent to\" → \"consistent on\"",   isCorrect: false },
    ],
    explanation: "The fixed adjective-preposition collocation is 'consistent with'. It means in agreement or in harmony with. 'Consistent to' is non-standard.",
    correction: "The results of the experiment are consistent with the previous findings.",
  },

  {
    id: 31,
    type: "Adjective vs Adverb",
    level: "hard",
    sentence: "The new regulation will <ERR>significant affect</ERR> the operations of small businesses.",
    errorPhrase: "significant affect",
    options: [
      { letter: "A", text: "Change \"significant\" → \"significantly\"",  isCorrect: true  },
      { letter: "B", text: "Change \"affect\" → \"effect\"",              isCorrect: false },
      { letter: "C", text: "Change \"significant\" → \"more significant\"",isCorrect: false },
      { letter: "D", text: "Remove \"significant\" entirely",             isCorrect: false },
    ],
    explanation: "'Affect' is a verb; verbs are modified by adverbs. 'Significant' is an adjective modifying nouns. Replace with the adverb 'significantly' to correctly modify the verb 'affect'.",
    correction: "The new regulation will significantly affect the operations of small businesses.",
  },

  {
    id: 32,
    type: "Conjunction",
    level: "hard",
    sentence: "She neither completed the report <ERR>nor did submit</ERR> the required documentation.",
    errorPhrase: "nor did submit",
    options: [
      { letter: "A", text: "Change \"nor did submit\" → \"nor submitted\"",    isCorrect: true  },
      { letter: "B", text: "Change \"nor did submit\" → \"nor did she submit\"",isCorrect: false },
      { letter: "C", text: "Change \"neither\" → \"either\"",                  isCorrect: false },
      { letter: "D", text: "Change \"nor did submit\" → \"or submitted\"",     isCorrect: false },
    ],
    explanation: "With 'neither…nor', both elements must be parallel in grammatical form. Since 'completed' is simple past, 'nor submitted' maintains the parallel structure.",
    correction: "She neither completed the report nor submitted the required documentation.",
  },

  {
    id: 33,
    type: "Subject-Verb Agreement",
    level: "hard",
    sentence: "The data collected from the three research sites <ERR>suggest</ERR> an inconsistent pattern.",
    errorPhrase: "suggest",
    options: [
      { letter: "A", text: "Change \"suggest\" → \"suggests\"",        isCorrect: true  },
      { letter: "B", text: "Change \"suggest\" → \"are suggesting\"",  isCorrect: false },
      { letter: "C", text: "Change \"suggest\" → \"have suggested\"",  isCorrect: false },
      { letter: "D", text: "Keep \"suggest\" — 'data' is plural",      isCorrect: false },
    ],
    explanation: "In American academic English, 'data' is increasingly treated as a collective noun (singular). When the subject is one body of data, 'suggests' is preferred. The past participle phrase is a modifier, not a new clause.",
    correction: "The data collected from the three research sites suggests an inconsistent pattern.",
  },

  {
    id: 34,
    type: "Pronoun",
    level: "hard",
    sentence: "Everyone in the department must complete <ERR>their</ERR> annual performance review by Friday.",
    errorPhrase: "their",
    options: [
      { letter: "A", text: "Change \"their\" → \"his or her\"",        isCorrect: true  },
      { letter: "B", text: "Change \"their\" → \"its\"",               isCorrect: false },
      { letter: "C", text: "Change \"their\" → \"our\"",               isCorrect: false },
      { letter: "D", text: "Remove the pronoun entirely",              isCorrect: false },
    ],
    explanation: "'Everyone' is a singular indefinite pronoun. In formal grammar, it requires the singular pronoun 'his or her'. (Note: 'their' is widely accepted in informal usage but not in formal/academic writing.)",
    correction: "Everyone in the department must complete his or her annual performance review by Friday.",
  },

  {
    id: 35,
    type: "Tenses",
    level: "hard",
    sentence: "The professor insisted that every student <ERR>submits</ERR> a research proposal before the seminar.",
    errorPhrase: "submits",
    options: [
      { letter: "A", text: "Change \"submits\" → \"submit\"",          isCorrect: true  },
      { letter: "B", text: "Change \"submits\" → \"submitted\"",       isCorrect: false },
      { letter: "C", text: "Change \"submits\" → \"should submit\"",   isCorrect: false },
      { letter: "D", text: "Change \"insists\" → \"insist\"",          isCorrect: false },
    ],
    explanation: "After verbs of demand/insistence ('insisted'), English uses the subjunctive mood in the that-clause: the base form of the verb without -s. 'That every student submit' (not 'submits') is correct.",
    correction: "The professor insisted that every student submit a research proposal before the seminar.",
  },
];

/* ──────────────────────────────────────────────────────────
   SECTION 2 — MOTIVATION QUOTES
────────────────────────────────────────────────────────── */
const MOTIVATIONS = [
  "Small progress is still progress. Keep going!",
  "Every mistake is a lesson in disguise.",
  "Grammar mastery is a journey, not a destination.",
  "The expert in anything was once a beginner.",
  "Push yourself — no one else will do it for you.",
  "You are stronger than your last wrong answer.",
  "Consistency is the key to mastery.",
  "Great things never come from comfort zones.",
  "Errors are proof that you are trying.",
  "The harder you work, the luckier you get.",
  "Your only limit is your own mind.",
  "Dream it. Believe it. Achieve it.",
  "Every champion was once a contender who refused to quit.",
  "Believe in yourself and your grammar skills!",
  "Don't stop when you're tired — stop when you're done.",
];

/* ──────────────────────────────────────────────────────────
   SECTION 3 — GAME STATE
────────────────────────────────────────────────────────── */
const state = {
  level        : "easy",
  questions    : [],
  currentIdx   : 0,
  score        : 0,
  lives        : 3,
  correct      : 0,
  wrong        : 0,
  answered     : false,
  combo        : 0,
  timerMax     : 30,
  timerLeft    : 30,
  timerInterval: null,
  totalQ       : 10,
};

/* ──────────────────────────────────────────────────────────
   SECTION 4 — AUDIO ENGINE  (Web Audio API)
────────────────────────────────────────────────────────── */
let audioCtx = null;

function getAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

function playTone(freq, type, dur, vol = 0.25) {
  try {
    const ctx  = getAudio();
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + dur);
  } catch (_) {
    // Audio context unavailable — silently ignore
  }
}

function sfxCorrect() {
  playTone(523.25, "sine", 0.12, 0.22);
  setTimeout(() => playTone(659.25, "sine", 0.12, 0.22), 100);
  setTimeout(() => playTone(783.99, "sine", 0.22, 0.28), 200);
}

function sfxWrong() {
  playTone(220, "sawtooth", 0.07, 0.15);
  setTimeout(() => playTone(196, "sawtooth", 0.13, 0.20), 80);
}

function sfxTimeout() {
  playTone(300, "triangle", 0.09, 0.14);
  setTimeout(() => playTone(250, "triangle", 0.18, 0.22), 120);
}

function sfxClick() {
  playTone(880, "sine", 0.04, 0.06);
}

function sfxGameOver() {
  [330, 294, 262].forEach((f, i) =>
    setTimeout(() => playTone(f, "sawtooth", 0.28, 0.22), i * 200)
  );
}

function sfxWin() {
  [523, 659, 784, 1047].forEach((f, i) =>
    setTimeout(() => playTone(f, "sine", 0.18, 0.28), i * 120)
  );
}

/* ──────────────────────────────────────────────────────────
   SECTION 5 — SCREEN NAVIGATION
────────────────────────────────────────────────────────── */
function showScreen(id) {
  document.querySelectorAll(".screen").forEach((s) =>
    s.classList.remove("active")
  );
  document.getElementById(id).classList.add("active");

  if (id === "screen-lb") renderLeaderboard();
}

/* ──────────────────────────────────────────────────────────
   SECTION 6 — HOME / LEVEL SELECTION
────────────────────────────────────────────────────────── */
function selectLevel(btn) {
  document.querySelectorAll(".level-btn").forEach((b) =>
    b.classList.remove("active")
  );
  btn.classList.add("active");
  state.level = btn.dataset.level;
  sfxClick();
}

/* ──────────────────────────────────────────────────────────
   SECTION 7 — SHUFFLE HELPER
────────────────────────────────────────────────────────── */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ──────────────────────────────────────────────────────────
   SECTION 8 — START GAME
────────────────────────────────────────────────────────── */
function startGame() {
  sfxClick();

  const pool = QUESTIONS.filter((q) => q.level === state.level);
  state.questions   = shuffle(pool).slice(0, Math.min(10, pool.length));
  state.currentIdx  = 0;
  state.score       = 0;
  state.lives       = 3;
  state.correct     = 0;
  state.wrong       = 0;
  state.combo       = 0;
  state.timerMax    = state.level === "easy" ? 35 : state.level === "medium" ? 25 : 18;

  updateHUD();
  showScreen("screen-game");
  loadQuestion();
}

/* ──────────────────────────────────────────────────────────
   SECTION 9 — LOAD / RENDER QUESTION
────────────────────────────────────────────────────────── */
function loadQuestion() {
  if (state.currentIdx >= state.questions.length) {
    endGame(true);
    return;
  }

  const q          = state.questions[state.currentIdx];
  state.answered   = false;

  // Tags
  document.getElementById("q-type").textContent = q.type;
  document.getElementById("q-counter").textContent =
    `Q ${state.currentIdx + 1} / ${state.questions.length}`;

  // Sentence — strip <ERR> tags, show plain text (no hint for players)
  const sentenceHTML = q.sentence.replace(/<ERR>(.*?)<\/ERR>/g, "$1");
  document.getElementById("sentence-box").innerHTML = sentenceHTML;

  // Choices — shuffle option order each time
  const shuffledOpts = shuffle(q.options);
  const grid         = document.getElementById("choices-grid");
  grid.innerHTML     = "";

  shuffledOpts.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className        = "choice-btn";
    btn.dataset.letter   = opt.letter;
    btn.dataset.correct  = opt.isCorrect ? "1" : "0";
    btn.setAttribute("aria-label", `Option ${opt.letter}: ${opt.text}`);
    btn.innerHTML = `
      <span class="choice-label" aria-hidden="true">${opt.letter}</span>
      <span class="choice-text">${opt.text}</span>
    `;
    btn.addEventListener("click", () => handleAnswer(btn, q));
    grid.appendChild(btn);
  });

  // Feedback panel — hidden
  const fp = document.getElementById("feedback-panel");
  fp.className = "feedback-panel";

  // Next button — hidden
  document.getElementById("btn-next").style.display = "none";

  // Progress bar
  const pct = (state.currentIdx / state.questions.length) * 100;
  document.getElementById("progress-bar").style.width = pct + "%";
  document.getElementById("progress-bar-wrap").setAttribute("aria-valuenow", Math.round(pct));
  document.getElementById("progress-label").textContent =
    `${state.correct} correct · ${state.wrong} wrong`;

  // Timer
  startTimer();
}

/* ──────────────────────────────────────────────────────────
   SECTION 10 — TIMER
────────────────────────────────────────────────────────── */
function startTimer() {
  clearInterval(state.timerInterval);
  state.timerLeft = state.timerMax;
  renderTimer();

  state.timerInterval = setInterval(() => {
    state.timerLeft--;
    renderTimer();
    if (state.timerLeft <= 0) {
      clearInterval(state.timerInterval);
      handleTimeout();
    }
  }, 1000);
}

function renderTimer() {
  const pct = (state.timerLeft / state.timerMax) * 100;
  const bar = document.getElementById("timer-bar");
  bar.style.width = pct + "%";
  bar.className   = "timer-bar" + (state.timerLeft <= 6 ? " warning" : "");
  document.getElementById("timer-num").textContent = state.timerLeft + "s";
}

function handleTimeout() {
  if (state.answered) return;
  state.answered = true;

  sfxTimeout();
  showToast("⏱ Time's up!", "t-timeout");
  state.wrong++;
  state.combo = 0;
  loseLife();

  const q = state.questions[state.currentIdx];
  revealCorrectChoice();
  showFeedback("timeout", q);
  document.getElementById("btn-next").style.display = "block";
}

/* ──────────────────────────────────────────────────────────
   SECTION 11 — HANDLE ANSWER
────────────────────────────────────────────────────────── */
function handleAnswer(btn, q) {
  if (state.answered) return;
  state.answered = true;
  clearInterval(state.timerInterval);

  const isCorrect = btn.dataset.correct === "1";

  // Disable all buttons
  document.querySelectorAll(".choice-btn").forEach((b) => {
    b.disabled = true;
  });

  if (isCorrect) {
    btn.classList.add("state-correct");
    dimOtherChoices(btn);
    sfxCorrect();
    state.correct++;
    state.combo++;

    const timeBonus  = Math.floor(state.timerLeft * 3);
    const comboBonus = state.combo > 1 ? (state.combo - 1) * 60 : 0;
    const earned     = 100 + timeBonus + comboBonus;
    state.score     += earned;

    const comboText  = state.combo > 1 ? ` 🔥 ×${state.combo} COMBO!` : "";
    showToast(`+${earned} pts${comboText}`, "t-correct");
    if (state.combo >= 3) triggerCombo(`🔥 ${state.combo}× COMBO!`);
    spawnParticles(btn, true);
    showFeedback("correct", q);
  } else {
    btn.classList.add("state-wrong");
    sfxWrong();
    state.wrong++;
    state.combo = 0;
    loseLife();
    showToast("Not quite! See the explanation below.", "t-wrong");
    spawnParticles(btn, false);
    revealCorrectChoice();
    showFeedback("wrong", q);
  }

  updateHUD();
  document.getElementById("btn-next").style.display = "block";
}

function revealCorrectChoice() {
  document.querySelectorAll(".choice-btn").forEach((b) => {
    if (b.dataset.correct === "1") {
      b.classList.add("state-correct");
    } else {
      b.classList.add("state-dim");
    }
  });
}

function dimOtherChoices(selected) {
  document.querySelectorAll(".choice-btn").forEach((b) => {
    if (b !== selected) b.classList.add("state-dim");
  });
}

/* ──────────────────────────────────────────────────────────
   SECTION 12 — FEEDBACK PANEL
────────────────────────────────────────────────────────── */
function showFeedback(type, q) {
  const panel = document.getElementById("feedback-panel");
  panel.className = "feedback-panel " + type;

  const titles = {
    correct: "✅ Excellent! That's correct.",
    wrong  : "❌ Not quite — here's why:",
    timeout: "⏱ Time's up! Here's the explanation:",
  };

  document.getElementById("feedback-title").textContent = titles[type];
  document.getElementById("feedback-body").textContent  = q.explanation;
  document.getElementById("feedback-fix").innerHTML     =
    `<strong>✔ Corrected sentence:</strong> ${q.correction}`;
}

/* ──────────────────────────────────────────────────────────
   SECTION 13 — NEXT QUESTION
────────────────────────────────────────────────────────── */
function nextQuestion() {
  sfxClick();
  state.currentIdx++;

  if (state.lives <= 0) {
    endGame(false);
    return;
  }
  if (state.currentIdx >= state.questions.length) {
    endGame(true);
  } else {
    loadQuestion();
  }
}

/* ──────────────────────────────────────────────────────────
   SECTION 14 — LIVES
────────────────────────────────────────────────────────── */
function loseLife() {
  state.lives = Math.max(0, state.lives - 1);
  renderHearts();
  if (state.lives <= 0) {
    clearInterval(state.timerInterval);
    sfxGameOver();
    setTimeout(() => endGame(false), 900);
  }
}

function renderHearts() {
  for (let i = 1; i <= 3; i++) {
    const h = document.getElementById(`heart-${i}`);
    if (i > state.lives) {
      h.classList.add("lost");
    } else {
      h.classList.remove("lost");
    }
  }
}

/* ──────────────────────────────────────────────────────────
   SECTION 15 — HUD UPDATE
────────────────────────────────────────────────────────── */
function updateHUD() {
  document.getElementById("hud-score").textContent = state.score;

  const total = state.correct + state.wrong;
  const acc   = total ? Math.round((state.correct / total) * 100) : null;
  document.getElementById("hud-acc").textContent =
    acc !== null ? acc + "%" : "—";

  const lvlMap = { easy: "Easy", medium: "Medium", hard: "Hard" };
  document.getElementById("hud-level").textContent = lvlMap[state.level];

  renderHearts();
}

/* ──────────────────────────────────────────────────────────
   SECTION 16 — TOAST NOTIFICATION
────────────────────────────────────────────────────────── */
let toastTimer = null;

function showToast(msg, cls) {
  const el    = document.getElementById("toast");
  el.textContent = msg;
  el.className   = `toast ${cls} show`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2400);
}

/* ──────────────────────────────────────────────────────────
   SECTION 17 — COMBO BADGE
────────────────────────────────────────────────────────── */
function triggerCombo(text) {
  const el      = document.getElementById("combo-badge");
  el.textContent = text;
  el.className   = "combo-badge show";
  setTimeout(() => (el.className = "combo-badge"), 1150);
}

/* ──────────────────────────────────────────────────────────
   SECTION 18 — PARTICLE EFFECTS
────────────────────────────────────────────────────────── */
function spawnParticles(el, correct) {
  const rect   = el.getBoundingClientRect();
  const emojis = correct
    ? ["✨", "⭐", "🎉", "💫", "🌟"]
    : ["💥", "😅", "🔴"];

  for (let i = 0; i < 5; i++) {
    const p       = document.createElement("div");
    p.className   = "particle";
    p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    p.style.left  = rect.left + Math.random() * rect.width + "px";
    p.style.top   = rect.top + window.scrollY + "px";
    p.style.animationDelay = Math.random() * 0.3 + "s";
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1300);
  }
}

/* ──────────────────────────────────────────────────────────
   SECTION 19 — END GAME (win / game over)
────────────────────────────────────────────────────────── */
function endGame(won) {
  clearInterval(state.timerInterval);

  const total  = state.correct + state.wrong;
  const acc    = total ? Math.round((state.correct / total) * 100) : 0;
  const card   = document.getElementById("result-card");
  const overlay = document.getElementById("overlay-result");

  // Emoji & title
  let emoji, title;
  if (won) {
    if (acc >= 90)      { emoji = "🏆"; title = "Brilliant!";      }
    else if (acc >= 70) { emoji = "🎯"; title = "Well Done!";      }
    else                { emoji = "👍"; title = "Round Complete!"; }
  } else {
    emoji = "💀"; title = "Game Over!";
  }

  document.getElementById("r-emoji").textContent = emoji;
  document.getElementById("r-title").textContent = title;
  document.getElementById("r-sub").textContent   = won
    ? `You completed the ${state.level} level with ${acc}% accuracy!`
    : `You ran out of lives on Q${state.currentIdx + 1}. Keep practising!`;

  card.className = "result-card " + (won ? "win-card" : "lose-card");

  // Stats
  document.getElementById("r-stats").innerHTML = `
    <div class="stat-box">
      <div class="stat-num">${state.score}</div>
      <div class="stat-lbl">Score</div>
    </div>
    <div class="stat-box">
      <div class="stat-num">${acc}%</div>
      <div class="stat-lbl">Accuracy</div>
    </div>
    <div class="stat-box">
      <div class="stat-num">${state.correct}/${total}</div>
      <div class="stat-lbl">Correct</div>
    </div>
  `;

  // Motivation
  const mot = MOTIVATIONS[Math.floor(Math.random() * MOTIVATIONS.length)];
  document.getElementById("r-motivation").textContent = `"${mot}"`;

  // Buttons
  document.getElementById("r-btns").innerHTML = `
    <button class="btn-primary"  onclick="promptSaveName()">Save Score 🏆</button>
    <button class="btn-ghost"    onclick="restartGame()">Play Again</button>
    <button class="btn-ghost"    onclick="goHome()">Home</button>
  `;

  overlay.classList.add("active");
  won ? sfxWin() : sfxGameOver();
}

function restartGame() {
  document.getElementById("overlay-result").classList.remove("active");
  startGame();
}

function goHome() {
  document.getElementById("overlay-result").classList.remove("active");
  showScreen("screen-home");
}

/* ──────────────────────────────────────────────────────────
   SECTION 20 — NAME MODAL & LEADERBOARD
────────────────────────────────────────────────────────── */
function promptSaveName() {
  const modal = document.getElementById("modal-name");
  modal.classList.add("active");
  document.getElementById("name-input").value = "";
  setTimeout(() => document.getElementById("name-input").focus(), 80);
}

function saveName() {
  const raw  = document.getElementById("name-input").value.trim();
  const name = raw.length ? raw : "Anonymous";
  persistScore(name);
  document.getElementById("modal-name").classList.remove("active");
  showToast("Score saved! 🎉", "t-correct");
}

function skipName() {
  document.getElementById("modal-name").classList.remove("active");
}

// Keyboard Enter in name input
document.getElementById("name-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") saveName();
});

function persistScore(name) {
  const entry = {
    name,
    score : state.score,
    level : state.level,
    acc   : (() => {
      const t = state.correct + state.wrong;
      return t ? Math.round((state.correct / t) * 100) : 0;
    })(),
    date  : new Date().toLocaleDateString(),
  };

  const lb = getLeaderboard();
  lb.push(entry);
  lb.sort((a, b) => b.score - a.score);
  localStorage.setItem("gd_lb", JSON.stringify(lb.slice(0, 20)));
}

function getLeaderboard() {
  try {
    return JSON.parse(localStorage.getItem("gd_lb")) || [];
  } catch (_) {
    return [];
  }
}

function renderLeaderboard() {
  const lb    = getLeaderboard();
  const table = document.getElementById("lb-table");

  if (!lb.length) {
    table.innerHTML =
      '<div class="lb-empty">No scores yet — play a game to get on the board! 🎮</div>';
    return;
  }

  const medals      = ["🥇", "🥈", "🥉"];
  const rankClasses = ["rank-1", "rank-2", "rank-3"];

  table.innerHTML = lb
    .slice(0, 10)
    .map(
      (entry, i) => `
      <div class="lb-row ${rankClasses[i] || ""}" role="listitem">
        <div class="lb-rank">${i < 3 ? medals[i] : i + 1}</div>
        <div class="lb-name">${entry.name}</div>
        <div class="lb-level-pill">${entry.level}</div>
        <div class="lb-score">${entry.score}</div>
      </div>
    `
    )
    .join("");
}

function clearLeaderboard() {
  if (confirm("Clear all saved scores from the leaderboard?")) {
    localStorage.removeItem("gd_lb");
    renderLeaderboard();
    showToast("Leaderboard cleared.", "t-timeout");
  }
}

/* ──────────────────────────────────────────────────────────
   SECTION 21 — KEYBOARD SHORTCUTS
────────────────────────────────────────────────────────── */
document.addEventListener("keydown", (e) => {
  // Enter → Next question (when button is visible)
  if (e.key === "Enter") {
    const btn = document.getElementById("btn-next");
    if (btn && btn.style.display !== "none") {
      nextQuestion();
      return;
    }
  }

  // A / B / C / D → click matching choice
  const letter = e.key.toUpperCase();
  if (["A", "B", "C", "D"].includes(letter) && !state.answered) {
    const btn = document.querySelector(`.choice-btn[data-letter="${letter}"]`);
    if (btn && !btn.disabled) btn.click();
  }
});

/* ──────────────────────────────────────────────────────────
   SECTION 22 — INIT
────────────────────────────────────────────────────────── */
// Everything is ready; home screen is shown by default via HTML class="screen active"