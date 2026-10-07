/* =========================================================
   HINDUISM SET — QUESTION BANK (batches 1 and 2)
   ---------------------------------------------------------
   Every question has:
     id       unique
     section  a section id from hinduism-cards.js
     type     "choice" | "match" | "order" | "sort"
     kind     label shown to students (Definition, Scenario, Iconography...)
     level    1 = core recall, 2 = deeper thinking (used for bonus rounds later)
     prompt   the question
     explain  shown after answering — every answer teaches something

   type-specific fields:
     choice : options: [...], answer: index of the correct option (0 = first)
     match  : pairs: [[left, right], ...]       (shown shuffled)
     order  : items: [...] in the CORRECT order (shown shuffled)
     sort   : buckets: [...], items: [{ text, bucket: index }, ...]
   ========================================================= */

window.GAME_QUESTIONS = window.GAME_QUESTIONS || {};

window.GAME_QUESTIONS.hinduism = [

  /* ================= 1. INTRODUCTION & HISTORY ================= */
  { id: "h1", section: "history", type: "choice", kind: "Definition", level: 1,
    prompt: "In which language were the Vedas composed?",
    options: ["Sanskrit", "Pali", "Hindi", "Tamil"], answer: 0,
    explain: "Sanskrit is the ancient sacred language of the Vedas and most classical Hindu scriptures." },

  { id: "h2", section: "history", type: "choice", kind: "Concept", level: 1,
    prompt: "Unlike many religions, Hinduism has no...",
    options: ["single founder", "sacred scriptures", "festivals", "places of worship"], answer: 0,
    explain: "Hinduism developed gradually over thousands of years from many teachers, sages and traditions, rather than from one founder." },

  { id: "h3", section: "history", type: "choice", kind: "Fill the Gap", level: 1,
    prompt: "Many Hindus call their tradition ______, meaning 'the eternal way'.",
    options: ["Sanatana Dharma", "Samsara", "Ahimsa", "Maya"], answer: 0,
    explain: "Sanatana Dharma means 'the eternal way' or 'eternal order'. 'Hinduism' is a later name, originally used by outsiders." },

  { id: "h4", section: "history", type: "choice", kind: "Definition", level: 1,
    prompt: "Which sacred river is honoured as a goddess and is the most important place for ritual bathing and scattering ashes?",
    options: ["Ganga (Ganges)", "Indus", "Thames", "Mekong"], answer: 0,
    explain: "The Ganga is honoured as the goddess Ganga. Bathing in it is believed to wash away impurities, and many families scatter ashes in it." },

  { id: "h5", section: "history", type: "choice", kind: "Connection", level: 2,
    prompt: "Gandhi's method of non-violent resistance was rooted in which Hindu principle?",
    options: ["Ahimsa", "Maya", "Samsara", "Moksha"], answer: 0,
    explain: "Ahimsa means non-violence. Gandhi applied it to politics, resisting British rule without using violence." },

  { id: "h6", section: "history", type: "choice", kind: "Connection", level: 2,
    prompt: "Which scripture did Gandhi describe as a guide he turned to throughout his life?",
    options: ["Bhagavad Gita", "Rig Veda", "Ramayana", "Upanishads"], answer: 0,
    explain: "Gandhi turned to the Bhagavad Gita for guidance, especially its teaching on doing one's duty without attachment to results." },

  { id: "h7", section: "history", type: "order", kind: "Timeline", level: 2,
    prompt: "Put these in order, from earliest to most recent.",
    items: ["Indus Valley Civilization", "The Vedas are composed", "The great epics take shape", "Gandhi leads India's independence movement"],
    explain: "The Indus Valley Civilization (c. 2600–1900 BCE) came first, then the Vedic period (c. 1500–500 BCE), then the epics (Ramayana and Mahabharata), and much later Gandhi in the 20th century." },

  { id: "h8", section: "history", type: "choice", kind: "Definition", level: 1,
    prompt: "The rishis are best described as...",
    options: ["ancient sages who received the Vedas", "priests who look after temples", "warrior kings of ancient India", "dancers who perform at festivals"], answer: 0,
    explain: "According to tradition, the rishis 'heard' the Vedas in deep meditation and passed them on orally." },

  { id: "h9", section: "history", type: "choice", kind: "Place", level: 1,
    prompt: "Which holy city on the Ganga do many Hindus hope to die in, or have their ashes scattered at?",
    options: ["Varanasi", "Mumbai", "Goa", "Chennai"], answer: 0,
    explain: "Varanasi, on the banks of the Ganga, is one of the holiest cities in Hinduism. Many believe dying there can bring moksha." },

  /* ---------- batch 2: Introduction & History ---------- */
  { id: "h10", section: "history", type: "choice", kind: "Definition", level: 1,
    prompt: "The word 'Hindu' comes from the ancient name of which river?",
    options: ["The Indus (Sindhu)", "The Ganga", "The Yamuna", "The Narmada"], answer: 0,
    explain: "Ancient Persians called the people living beyond the Sindhu (Indus) River 'Hindu'. The name came from outsiders, not from a founder." },

  { id: "h11", section: "history", type: "choice", kind: "Concept", level: 1,
    prompt: "How were the Vedas first passed down?",
    options: ["Orally: memorized and recited, teacher to student", "Carved into stone tablets in temples", "Printed in books and sold in markets", "Painted on the walls of temples"], answer: 0,
    explain: "For many centuries the Vedas were memorized word-for-word and recited aloud, long before they were written down." },

  { id: "h12", section: "history", type: "choice", kind: "Concept", level: 2,
    prompt: "Why is Hinduism often described as a family of traditions rather than one single religion?",
    options: ["It grew from many sources, with no single founder or central authority", "All Hindus follow one leader who sets the rules", "It began in one city during one single year", "It has just one scripture that all Hindus read"], answer: 0,
    explain: "Hinduism developed over thousands of years. Different communities focus on different deities, texts and practices, while sharing ideas like dharma, karma and moksha." },

  { id: "h13", section: "history", type: "match", kind: "Match", level: 1,
    prompt: "Match each term to its connection with Gandhi.",
    pairs: [["Satyagraha", "'Truth-force': non-violent resistance"], ["Ahimsa", "Non-violence toward all beings"], ["Salt March", "1930 protest against the British salt tax"], ["Bhagavad Gita", "The scripture he called his guide"]],
    explain: "Gandhi combined Hindu ideas like ahimsa and the Gita's teaching on duty with mass non-violent protest, such as the 1930 Salt March." },

  { id: "h14", section: "history", type: "choice", kind: "Fill the Gap", level: 1,
    prompt: "Gandhi called his method of non-violent resistance ______.",
    options: ["Satyagraha", "Samsara", "Sannyasa", "Samskara"], answer: 0,
    explain: "Satyagraha joins 'satya' (truth) and 'agraha' (holding firmly): holding firmly to truth without using violence." },

  { id: "h15", section: "history", type: "choice", kind: "Scenario", level: 2,
    prompt: "A classmate says, 'Hinduism started on one day when a prophet received a message.' What is the best correction?",
    options: ["Hinduism has no single founder or start date", "It started on the day Gandhi was born", "It began when the Ramayana was first written", "That is correct: it began with one prophet"], answer: 0,
    explain: "Unlike religions with a founder and a starting moment, Hinduism grew gradually from ancient practices, sages and texts." },

  { id: "h16", section: "history", type: "choice", kind: "Place", level: 1,
    prompt: "Where was the Indus Valley Civilization mainly located?",
    options: ["Present-day Pakistan and northwest India", "The island of Sri Lanka", "The far south of India", "The east, in today's Bangladesh"], answer: 0,
    explain: "Its great cities, such as Harappa and Mohenjo-daro, grew along the Indus River in what is now Pakistan and northwest India." },

  { id: "h17", section: "history", type: "choice", kind: "Connection", level: 2,
    prompt: "Why is the Ganga especially important at the end of life for many Hindus?",
    options: ["Ashes are placed in it, believed to help the soul toward moksha", "It is the only place in India where funerals are allowed", "Its water is used to bury the body in the riverbed", "It marks the border between India and its neighbours"], answer: 0,
    explain: "Many families place the ashes of loved ones in the Ganga. Its waters are believed to purify and to help the atman toward liberation." },

  { id: "h18", section: "history", type: "choice", kind: "Place", level: 1,
    prompt: "Where do the great majority of the world's Hindus live today?",
    options: ["India", "Indonesia", "Canada", "The United Kingdom"], answer: 0,
    explain: "The vast majority of Hindus live in India. There are also large communities around the world, including in Canada." },

  { id: "h19", section: "history", type: "choice", kind: "Place", level: 1,
    prompt: "Besides India, which country has a Hindu majority?",
    options: ["Nepal", "Japan", "Egypt", "Brazil"], answer: 0,
    explain: "Nepal, India's neighbour in the Himalayas, is the other country where most people are Hindu." },

  { id: "h20", section: "history", type: "sort", kind: "Sort", level: 2,
    prompt: "Sort each item: ancient Vedic period or modern Hinduism?",
    buckets: ["Ancient Vedic period", "Modern Hinduism"],
    items: [
      { text: "Rig Veda hymns are composed", bucket: 0 }, { text: "Rishis recite hymns orally", bucket: 0 }, { text: "Fire offerings to Agni", bucket: 0 },
      { text: "Gandhi's Salt March", bucket: 1 }, { text: "Mandirs built in Canada", bucket: 1 }, { text: "Diwali celebrated worldwide", bucket: 1 }
    ],
    explain: "The Vedic period was over 2,500 years ago. Today, Hinduism is practised around the world, including in Canada." },

  { id: "h21", section: "history", type: "choice", kind: "Definition", level: 1,
    prompt: "Gandhi was given the title 'Mahatma'. What does it mean?",
    options: ["Great soul", "Great king", "Holy river", "Brave warrior"], answer: 0,
    explain: "'Maha' means great and 'atma' means soul, the same word as atman." },

  { id: "h22", section: "history", type: "choice", kind: "Connection", level: 2,
    prompt: "Gandhi believed truth and non-violence could defeat injustice. Which pair of ideas is this?",
    options: ["Satya (truth) and ahimsa (non-violence)", "Maya (illusion) and samsara (rebirth)", "Puja (worship) and aarti (lamp ritual)", "Brahma (creator) and Vishnu (preserver)"], answer: 0,
    explain: "Gandhi built his whole movement on satya and ahimsa, ideas with deep roots in Hindu tradition." },

  /* ================= 2. DEITIES ================= */
  { id: "d1", section: "deities", type: "match", kind: "Match", level: 1,
    prompt: "Match each member of the Trimurti to their role.",
    pairs: [["Brahma", "Creator"], ["Vishnu", "Preserver"], ["Shiva", "Destroyer & transformer"]],
    explain: "Together, Brahma, Vishnu and Shiva form the Trimurti: the cycle of creation, preservation and destruction." },

  { id: "d2", section: "deities", type: "choice", kind: "Iconography", level: 1,
    prompt: "A blue-skinned deity holds a conch, a discus, a mace and a lotus. Who is it?",
    options: ["Vishnu", "Shiva", "Brahma", "Ganesha"], answer: 0,
    explain: "Vishnu is usually shown with blue skin and four arms holding a conch (shankha), discus (chakra), mace and lotus." },

  { id: "d3", section: "deities", type: "choice", kind: "Iconography", level: 1,
    prompt: "A deity has a trident, a third eye and a snake around his neck. Who is it?",
    options: ["Shiva", "Vishnu", "Hanuman", "Brahma"], answer: 0,
    explain: "Shiva carries the trishula (trident), has a third eye of wisdom, and wears a snake around his neck." },

  { id: "d4", section: "deities", type: "choice", kind: "Scenario", level: 1,
    prompt: "Before a wedding, a new business or an exam, many Hindus first pray to the remover of obstacles. Who?",
    options: ["Ganesha", "Durga", "Brahma", "Hanuman"], answer: 0,
    explain: "Ganesha, the elephant-headed god, removes obstacles and is honoured at the start of new beginnings." },

  { id: "d5", section: "deities", type: "match", kind: "Match", level: 1,
    prompt: "Match each deity to what they are known for.",
    pairs: [["Saraswati", "Knowledge, music & learning"], ["Lakshmi", "Wealth & good fortune"], ["Durga", "Warrior goddess who defeats evil"], ["Hanuman", "Strength & devotion to Rama"]],
    explain: "Saraswati: learning. Lakshmi: prosperity. Durga: protection and victory over evil. Hanuman: strength and loyal devotion." },

  { id: "d6", section: "deities", type: "choice", kind: "Odd One Out", level: 1,
    prompt: "Which of these is NOT part of the Trimurti?",
    options: ["Ganesha", "Brahma", "Vishnu", "Shiva"], answer: 0,
    explain: "The Trimurti is Brahma, Vishnu and Shiva. Ganesha is the son of Shiva and Parvati." },

  { id: "d7", section: "deities", type: "choice", kind: "Scenario", level: 1,
    prompt: "Anjali is preparing for a music exam and wants to do well in her studies. Which goddess might she pray to?",
    options: ["Saraswati", "Lakshmi", "Durga", "Ganga"], answer: 0,
    explain: "Saraswati is the goddess of knowledge, music and the arts. Students often honour her, especially at exam time." },

  { id: "d8", section: "deities", type: "choice", kind: "Connection", level: 1,
    prompt: "Rama and Krishna are avatars (earthly forms) of which deity?",
    options: ["Vishnu", "Shiva", "Brahma", "Ganesha"], answer: 0,
    explain: "Vishnu descends to Earth as avatars to restore dharma. Rama and Krishna are two of the best known." },

  { id: "d9", section: "deities", type: "choice", kind: "Iconography", level: 1,
    prompt: "A many-armed goddess rides a lion and holds weapons in her hands. Who is she?",
    options: ["Durga", "Saraswati", "Lakshmi", "Ganga"], answer: 0,
    explain: "Durga rides a lion (or tiger) and holds weapons given by the gods to defeat the demon Mahishasura." },

  { id: "d10", section: "deities", type: "choice", kind: "Concept", level: 2,
    prompt: "How do many Hindus understand the relationship between the many deities?",
    options: ["As different expressions of one ultimate reality, Brahman", "As rivals who compete with each other for worshippers", "As unrelated gods with no connection to each other", "As old myths that are no longer worshipped today"], answer: 0,
    explain: "Many Hindus see the deities as different forms or faces of the one ultimate reality, Brahman. Devotees may focus on one deity while respecting others." },

  { id: "d11", section: "deities", type: "match", kind: "Iconography", level: 1,
    prompt: "Match each deity to their vahana (the animal they ride).",
    pairs: [["Ganesha", "Mouse"], ["Shiva", "Nandi the bull"], ["Saraswati", "Swan"], ["Durga", "Lion"]],
    explain: "Each deity's vahana (vehicle) carries symbolic meaning, and helps identify them in art." },

  /* ---------- batch 2: Deities ---------- */
  { id: "d12", section: "deities", type: "choice", kind: "Concept", level: 2,
    prompt: "Why are many Hindu deities shown with several arms?",
    options: ["To show their great power, with each hand holding a symbol", "To show that they are monsters to be feared", "Because the artists who made them made mistakes", "To show that they are really animals, not gods"], answer: 0,
    explain: "Extra arms show divine power beyond human limits. Each hand often holds a meaningful object, like Vishnu's conch or Durga's weapons." },

  { id: "d13", section: "deities", type: "choice", kind: "Definition", level: 1,
    prompt: "What is an avatar?",
    options: ["A form in which a deity comes down to Earth", "A special type of temple built for Vishnu", "A festival of lights held in the autumn", "A string of beads used to count prayers"], answer: 0,
    explain: "'Avatar' means 'descent'. Vishnu is believed to come to Earth in different forms, such as Rama and Krishna, to restore dharma." },

  { id: "d14", section: "deities", type: "choice", kind: "Text to Idea", level: 2,
    prompt: "In the Bhagavad Gita, Krishna says that whenever dharma declines, he comes into the world to protect the good. Which belief does this explain?",
    options: ["Vishnu takes avatars to restore dharma", "Shiva destroys the universe", "Brahma wrote the Vedas", "Ganesha removes obstacles"], answer: 0,
    explain: "Krishna, an avatar of Vishnu, explains why avatars appear: to protect goodness and restore dharma when it is threatened." },

  { id: "d15", section: "deities", type: "match", kind: "Match", level: 1,
    prompt: "Match each deity to their divine partner.",
    pairs: [["Vishnu", "Lakshmi"], ["Shiva", "Parvati"], ["Brahma", "Saraswati"], ["Rama", "Sita"]],
    explain: "Many deities are honoured with their partners. Together they are often seen as two sides of one divine power." },

  { id: "d16", section: "deities", type: "choice", kind: "Concept", level: 2,
    prompt: "Why is Shiva called 'the destroyer' even though he is worshipped as good?",
    options: ["Destruction clears the way for new creation", "He is the enemy of all the other gods", "He destroys anyone who does not pray to him", "People worship him only because they fear him"], answer: 0,
    explain: "In the cosmic cycle, endings make new beginnings possible. Shiva also destroys ignorance and ego, so devotees see him as loving and transforming." },

  { id: "d17", section: "deities", type: "choice", kind: "Iconography", level: 1,
    prompt: "Which deity is shown with an elephant head and holding a broken tusk?",
    options: ["Ganesha", "Hanuman", "Durga", "Vishnu"], answer: 0,
    explain: "Ganesha is easy to recognize by his elephant head, his round belly and the broken tusk he often holds." },

  { id: "d18", section: "deities", type: "choice", kind: "Story", level: 1,
    prompt: "In the Ramayana, who leaps across the ocean to find Sita in Lanka?",
    options: ["Hanuman", "Ganesha", "Ravana", "Brahma"], answer: 0,
    explain: "Hanuman's great leap to Lanka shows his strength and his complete devotion to Rama." },

  { id: "d19", section: "deities", type: "choice", kind: "Scenario", level: 2,
    prompt: "A family's home shrine has images of Ganesha, Lakshmi and Shiva. How do many Hindus understand this?",
    options: ["It's normal: many see the deities as forms of one divine reality", "The family is confused about their own religion", "Only one deity is allowed in a Hindu home", "They must choose one before they can visit a mandir"], answer: 0,
    explain: "Many Hindus honour several deities, each connected to different needs and moments of life, while seeing them as expressions of Brahman." },

  { id: "d20", section: "deities", type: "choice", kind: "Connection", level: 1,
    prompt: "Parvati is the wife of which deity?",
    options: ["Shiva", "Vishnu", "Brahma", "Hanuman"], answer: 0,
    explain: "Parvati is Shiva's wife and the mother of Ganesha. Durga is often understood as a powerful form of the same Goddess." },

  { id: "d21", section: "deities", type: "sort", kind: "Sort", level: 2,
    prompt: "Sort these deities: member of the Trimurti, or a form of the Goddess (Devi)?",
    buckets: ["Trimurti", "The Goddess (Devi)"],
    items: [
      { text: "Brahma", bucket: 0 }, { text: "Vishnu", bucket: 0 }, { text: "Shiva", bucket: 0 },
      { text: "Lakshmi", bucket: 1 }, { text: "Saraswati", bucket: 1 }, { text: "Durga", bucket: 1 }
    ],
    explain: "The Trimurti are Brahma, Vishnu and Shiva. Lakshmi, Saraswati and Durga are forms of the Goddess, honoured as divine power (Shakti)." },

  { id: "d22", section: "deities", type: "choice", kind: "Odd One Out", level: 2,
    prompt: "Which of these is NOT an avatar of Vishnu?",
    options: ["Ganesha", "Rama", "Krishna", "Matsya, the fish"], answer: 0,
    explain: "Vishnu's ten best-known avatars (the Dashavatara) include Matsya the fish, Rama and Krishna. Ganesha is the son of Shiva and Parvati." },

  { id: "d23", section: "deities", type: "choice", kind: "Connection", level: 2,
    prompt: "Lakshmi is usually shown seated on a lotus. What does the lotus add to her meaning?",
    options: ["Purity: good fortune that rises above greed", "That she lives at the bottom of rivers", "That she is the goddess of water and rain", "That she is a warrior who fights demons"], answer: 0,
    explain: "The lotus blooms clean out of muddy water. With Lakshmi, it suggests prosperity that stays pure and spiritual." },

  { id: "d24", section: "deities", type: "choice", kind: "Iconography", level: 1,
    prompt: "Which musical instrument does Saraswati usually play?",
    options: ["The veena", "The flute", "The drum", "The conch"], answer: 0,
    explain: "Saraswati plays the veena, a stringed instrument, showing her connection to music, arts and learning. (Krishna is known for the flute.)" },

  { id: "d25", section: "deities", type: "choice", kind: "Iconography", level: 1,
    prompt: "Which deity is often shown playing a flute, sometimes with cows nearby?",
    options: ["Krishna", "Shiva", "Brahma", "Hanuman"], answer: 0,
    explain: "Krishna grew up among cowherds and is often shown playing his flute, whose music draws everyone to him." },

  /* ================= 3. BELIEFS ================= */
  { id: "b1", section: "beliefs", type: "match", kind: "Match", level: 1,
    prompt: "Match each belief to its meaning.",
    pairs: [["Brahman", "Ultimate reality"], ["Atman", "Eternal self or soul"], ["Samsara", "Cycle of birth, death & rebirth"], ["Maya", "Illusion"]],
    explain: "These four ideas fit together: the atman, caught in maya, moves through samsara until it realizes its connection to Brahman." },

  { id: "b2", section: "beliefs", type: "choice", kind: "Scenario", level: 1,
    prompt: "Raj secretly helps a struggling classmate. Many Hindus would say this good action will shape his future experiences. Which concept is this?",
    options: ["Karma", "Maya", "Moksha", "Samsara"], answer: 0,
    explain: "Karma is the law of cause and effect: good actions lead to good results, in this life or the next." },

  { id: "b3", section: "beliefs", type: "order", kind: "Cause & Effect", level: 2,
    prompt: "Put these steps of the cycle in order.",
    items: ["A person performs actions (karma)", "Karma shapes the next life", "The atman is reborn in a new body (samsara)", "Through realization, the atman is liberated (moksha)"],
    explain: "Actions create karma, karma shapes rebirth, and the atman continues through samsara until it achieves moksha (liberation)." },

  { id: "b4", section: "beliefs", type: "choice", kind: "Definition", level: 1,
    prompt: "Which concept means doing your duty and living in a morally right way?",
    options: ["Dharma", "Karma", "Maya", "Atman"], answer: 0,
    explain: "Dharma means duty, right conduct, and the moral order of the universe." },

  { id: "b5", section: "beliefs", type: "choice", kind: "Fill the Gap", level: 1,
    prompt: "The idea that the world of appearances hides the true reality of Brahman is called ______.",
    options: ["Maya", "Dharma", "Ahimsa", "Puja"], answer: 0,
    explain: "Maya is illusion: seeing the world as separate and permanent, when the deeper reality is Brahman." },

  { id: "b6", section: "beliefs", type: "choice", kind: "Concept", level: 1,
    prompt: "Why is the cow honoured in Hinduism?",
    options: ["As a gentle, life-giving animal connected to ahimsa", "Because it is the vehicle of Brahma", "Because it represents maya", "Because it is used to keep the calendar"], answer: 0,
    explain: "The cow gives milk and is seen as gentle and nurturing. Honouring it connects to ahimsa and to Krishna, raised as a cowherd. (Brahma's vehicle is a swan.)" },

  { id: "b7", section: "beliefs", type: "choice", kind: "Scenario", level: 1,
    prompt: "A Hindu family eats a vegetarian diet so they will not harm living creatures. Which principle are they following?",
    options: ["Ahimsa", "Maya", "Artha", "Samsara"], answer: 0,
    explain: "Ahimsa means non-violence toward all living beings. Many (not all) Hindus are vegetarian because of it." },

  { id: "b8", section: "beliefs", type: "choice", kind: "Text to Idea", level: 2,
    prompt: "The Upanishads teach that the self within you is one with the ultimate reality of the universe. Which two concepts are being connected?",
    options: ["Atman and Brahman", "Karma and Samsara", "Dharma and Ahimsa", "Maya and Moksha"], answer: 0,
    explain: "This is the teaching 'Tat Tvam Asi' (You are That): the atman (inner self) is one with Brahman (ultimate reality)." },

  { id: "b9", section: "beliefs", type: "sort", kind: "Sort", level: 2,
    prompt: "Sort each belief into the best category.",
    buckets: ["Reality & the self", "Actions & ethics"],
    items: [
      { text: "Brahman", bucket: 0 }, { text: "Atman", bucket: 0 }, { text: "Maya", bucket: 0 },
      { text: "Karma", bucket: 1 }, { text: "Dharma", bucket: 1 }, { text: "Ahimsa", bucket: 1 }
    ],
    explain: "Brahman, atman and maya describe what is real and who we are. Karma, dharma and ahimsa guide how we should act." },

  { id: "b10", section: "beliefs", type: "choice", kind: "Odd One Out", level: 2,
    prompt: "Which of these is NOT part of samsara?",
    options: ["Liberation", "Birth", "Death", "Rebirth"], answer: 0,
    explain: "Samsara is the cycle of birth, death and rebirth. Liberation (moksha) is escape from that cycle." },

  /* ---------- batch 2: Beliefs ---------- */
  { id: "b11", section: "beliefs", type: "choice", kind: "Scenario", level: 2,
    prompt: "Sam says, 'If I cheat on this test and nobody finds out, nothing will happen.' How would the idea of karma respond?",
    options: ["Every action has consequences, even if no one sees it", "Only actions that get caught by others create karma", "Karma only applies to adults, not to students", "Karma only counts on festival days and holy days"], answer: 0,
    explain: "Karma is not about being caught. Every action, even a hidden one, shapes a person's future." },

  { id: "b12", section: "beliefs", type: "choice", kind: "Concept", level: 1,
    prompt: "According to many Hindus, what happens to the atman when the body dies?",
    options: ["It moves on to a new body, shaped by its karma", "It is destroyed with the body", "It becomes a deity right away", "It stays in the old body forever"], answer: 0,
    explain: "The atman is eternal. At death it moves on to a new life (samsara), and its karma shapes that next life." },

  { id: "b13", section: "beliefs", type: "choice", kind: "Fill the Gap", level: 1,
    prompt: "The one ultimate reality behind everything in the universe is called ______.",
    options: ["Brahman", "Brahma", "Atman", "Maya"], answer: 0,
    explain: "Brahman (with an 'n') is the ultimate reality. Brahma (no 'n') is the creator deity in the Trimurti. They are easy to mix up!" },

  { id: "b14", section: "beliefs", type: "choice", kind: "Concept", level: 2,
    prompt: "Which statement about Brahman and Brahma is correct?",
    options: ["Brahman is ultimate reality; Brahma is the creator deity", "They are two spellings of the very same deity", "Both are names for the eternal soul, or atman", "Brahman is a festival and Brahma is a temple"], answer: 0,
    explain: "Brahman is beyond all forms. Brahma is one of its expressions: the creator, part of the Trimurti with Vishnu and Shiva." },

  { id: "b15", section: "beliefs", type: "choice", kind: "Scenario", level: 2,
    prompt: "Lena shouts insults at her younger brother. A friend reminds her of ahimsa. Why?",
    options: ["Ahimsa includes not harming others with words or thoughts", "Ahimsa only applies to how we treat animals", "Ahimsa is about keeping quiet inside temples", "Ahimsa means you should always win arguments"], answer: 0,
    explain: "Ahimsa is non-violence in thought, word and action. Hurtful words count as harm too." },

  { id: "b16", section: "beliefs", type: "choice", kind: "Text to Idea", level: 2,
    prompt: "The Bhagavad Gita compares the atman moving into a new body to something people do every day. What is it?",
    options: ["Taking off old clothes and putting on new ones", "Freezing water into ice", "Planting a seed that never grows", "Knocking down a house forever"], answer: 0,
    explain: "As a person gives up worn-out clothes and puts on new ones, the atman leaves an old body and takes a new one. The self stays the same." },

  { id: "b17", section: "beliefs", type: "match", kind: "Match", level: 1,
    prompt: "Match these beliefs about how to live to their meanings.",
    pairs: [["Karma", "Actions and their consequences"], ["Dharma", "Duty and right conduct"], ["Ahimsa", "Non-violence"], ["Moksha", "Liberation from rebirth"]],
    explain: "These ideas guide everyday Hindu life: act rightly (dharma), avoid harm (ahimsa), knowing actions matter (karma), on the way to liberation (moksha)." },

  { id: "b18", section: "beliefs", type: "choice", kind: "Concept", level: 2,
    prompt: "Why might maya make it harder to reach moksha?",
    options: ["It keeps people attached, so they don't see their true self", "It makes people forget the words of their prayers", "It is a rule that stops people visiting temples", "It makes all of a person's karma disappear"], answer: 0,
    explain: "Maya makes the changing world seem like all there is. Seeing past it to the atman and Brahman is part of the path to moksha." },

  { id: "b19", section: "beliefs", type: "choice", kind: "Connection", level: 1,
    prompt: "Many Hindus do not eat beef. Which beliefs is this most connected to?",
    options: ["Reverence for the cow and ahimsa", "Maya and samsara", "The Vedic period", "Moksha and the Mandir"], answer: 0,
    explain: "The cow is honoured as gentle and life-giving, and avoiding beef also reflects ahimsa. Practices vary, but this is common." },

  { id: "b20", section: "beliefs", type: "order", kind: "Cause & Effect", level: 2,
    prompt: "Put these in order to show how maya can keep the atman in samsara.",
    items: ["Maya: seeing the world as all there is", "Becoming attached to desires and possessions", "Acting out of desire creates karma", "Karma leads to another rebirth"],
    explain: "Illusion leads to attachment, attachment drives actions, and actions create karma that keeps the cycle of rebirth going." },

  { id: "b21", section: "beliefs", type: "choice", kind: "Scenario", level: 1,
    prompt: "A doctor stays at the hospital during a storm to care for her patients, even though she wants to go home. Which belief fits her choice?",
    options: ["Dharma", "Maya", "Samsara", "Moksha"], answer: 0,
    explain: "Dharma means doing your duty and what is right, even when it is hard." },

  /* ================= 4. RITUALS ================= */
  { id: "r1", section: "rituals", type: "choice", kind: "Definition", level: 1,
    prompt: "What is the ritual of waving a lit lamp in circles before a deity while singing hymns?",
    options: ["Aarti", "Upanayana", "Antyeshti", "Darshan"], answer: 0,
    explain: "In aarti, a lamp is waved before the deity. Devotees then pass their hands over the flame and touch their eyes to receive its blessing." },

  { id: "r2", section: "rituals", type: "choice", kind: "Definition", level: 1,
    prompt: "What is the general name for worship that offers flowers, food, incense and light to a deity?",
    options: ["Puja", "Aarti", "Samskara", "Moksha"], answer: 0,
    explain: "Puja is worship with offerings. It can be performed daily at a home shrine or in a temple." },

  { id: "r3", section: "rituals", type: "match", kind: "Match", level: 1,
    prompt: "Match each ritual to its description.",
    pairs: [["Upanayana", "Sacred thread ceremony"], ["Antyeshti", "Funeral rites"], ["Samskaras", "Life-cycle rites"], ["Puja", "Worship with offerings"]],
    explain: "The samskaras mark life's key stages. Upanayana and antyeshti are two of them." },

  { id: "r4", section: "rituals", type: "choice", kind: "Scenario", level: 1,
    prompt: "A family cremates their grandmother and later scatters her ashes in the Ganga. Which rite is this?",
    options: ["Antyeshti", "Upanayana", "Aarti", "Navaratri"], answer: 0,
    explain: "Antyeshti is the funeral rite, the last of the samskaras." },

  { id: "r5", section: "rituals", type: "order", kind: "Life Cycle", level: 2,
    prompt: "Put these samskaras in the order they happen in a person's life.",
    items: ["Naming ceremony", "Sacred thread ceremony (Upanayana)", "Marriage", "Funeral rites (Antyeshti)"],
    explain: "The samskaras follow a person's life: naming soon after birth, the sacred thread when formal learning begins, marriage, and funeral rites at death." },

  { id: "r6", section: "rituals", type: "choice", kind: "Concept", level: 2,
    prompt: "Why are Hindu bodies usually cremated?",
    options: ["Fire is believed to release the atman from the body", "To save space in cemeteries", "Because burial is against the law in India", "So the ashes can be kept at home forever"], answer: 0,
    explain: "Many Hindus believe cremation releases the atman from the physical body so it can continue its journey." },

  { id: "r7", section: "rituals", type: "choice", kind: "Definition", level: 1,
    prompt: "What does the sacred thread ceremony (Upanayana) mark?",
    options: ["The beginning of formal religious learning", "The day a couple gets married", "The end of a person's life", "The start of the harvest season"], answer: 0,
    explain: "Upanayana traditionally marks a young person beginning religious study with a teacher." },

  /* ---------- batch 2: Rituals ---------- */
  { id: "r8", section: "rituals", type: "choice", kind: "Definition", level: 1,
    prompt: "What is prasad?",
    options: ["Food offered to a deity, then shared as a blessing", "A bell rung to announce the start of worship", "The first day of a festival, when lamps are lit", "A prayer that is said only at funerals"], answer: 0,
    explain: "Once food has been offered to the deity, it is considered blessed. Sharing it as prasad spreads that blessing." },

  { id: "r9", section: "rituals", type: "choice", kind: "Scenario", level: 1,
    prompt: "After aarti, worshippers pass their hands over the flame, then touch their eyes and forehead. Why?",
    options: ["To receive the deity's blessing from the sacred light", "To warm their hands after a cold walk", "To check whether the flame is still hot", "To help put the lamp out after worship"], answer: 0,
    explain: "The aarti flame has been offered to the deity. Drawing its light toward yourself is a way of receiving blessing." },

  { id: "r10", section: "rituals", type: "choice", kind: "Concept", level: 1,
    prompt: "Why do many Hindus remove their shoes before entering a mandir or home shrine?",
    options: ["As a sign of respect, keeping the sacred space clean", "Because shoes are not allowed anywhere in India", "So that they make less noise while walking", "Because the temple floor is always wet"], answer: 0,
    explain: "Removing shoes shows respect and leaves the dirt of the outside world behind before approaching the deity." },

  { id: "r11", section: "rituals", type: "choice", kind: "Definition", level: 1,
    prompt: "How many samskaras are traditionally listed?",
    options: ["Sixteen", "Four", "Eight", "One hundred and eight"], answer: 0,
    explain: "Tradition lists sixteen samskaras, from before birth to after death. Today many families focus on a few of the main ones." },

  { id: "r12", section: "rituals", type: "choice", kind: "Scenario", level: 1,
    prompt: "At a Hindu wedding, the couple circles a sacred fire and takes seven steps together, making promises. Which samskara is this?",
    options: ["Vivaha (marriage)", "Antyeshti (funeral rites)", "Upanayana (sacred thread)", "Namakarana (naming)"], answer: 0,
    explain: "In the marriage samskara, the couple takes seven steps (saptapadi) around the fire, each with a promise to one another." },

  { id: "r13", section: "rituals", type: "choice", kind: "Concept", level: 2,
    prompt: "What do the samskaras show about how many Hindus see life?",
    options: ["Every stage of life, from birth to death, is sacred", "Only childhood matters for religious life", "Rituals are only meant for priests to perform", "Life is mostly about following strict rules"], answer: 0,
    explain: "By marking birth, learning, marriage and death with ritual, the samskaras treat the whole journey of life as sacred." },

  { id: "r14", section: "rituals", type: "choice", kind: "Definition", level: 1,
    prompt: "Which of these are usually offered during puja?",
    options: ["Flowers, incense, light, water and food", "Money only", "Written letters to the deity", "Nothing: puja is silent"], answer: 0,
    explain: "Puja engages the senses: flowers, incense, a lamp, water and food are offered with prayers or songs." },

  { id: "r15", section: "rituals", type: "choice", kind: "Concept", level: 2,
    prompt: "Millions of pilgrims gather to bathe in sacred rivers at the Kumbh Mela. What do many believe the bath does?",
    options: ["Purifies the soul and washes away bad karma", "Cures all illnesses forever", "Marks the start of the school year", "Is only for swimming practice"], answer: 0,
    explain: "Bathing in sacred rivers at holy times is believed to purify. The Kumbh Mela is one of the largest gatherings of people on Earth." },

  { id: "r16", section: "rituals", type: "choice", kind: "Definition", level: 1,
    prompt: "What is the samskara for naming a new baby called?",
    options: ["Namakarana", "Antyeshti", "Upanayana", "Vivaha"], answer: 0,
    explain: "Namakarana ('name-giving') usually takes place in the first weeks of a baby's life." },

  { id: "r17", section: "rituals", type: "sort", kind: "Sort", level: 2,
    prompt: "Sort these rituals: regular worship, or a once-in-a-lifetime samskara?",
    buckets: ["Regular worship", "Life-cycle samskara"],
    items: [
      { text: "Puja at a home shrine", bucket: 0 }, { text: "Aarti", bucket: 0 }, { text: "Sharing prasad", bucket: 0 },
      { text: "Naming ceremony", bucket: 1 }, { text: "Sacred thread ceremony", bucket: 1 }, { text: "Funeral rites", bucket: 1 }
    ],
    explain: "Puja, aarti and prasad can happen every day. Samskaras mark a single stage of a person's life." },

  { id: "r18", section: "rituals", type: "choice", kind: "Scenario", level: 2,
    prompt: "Every morning before breakfast, Arjun's family places a little food before Ganesha's murti and says a prayer. What does this show?",
    options: ["Worship is part of everyday home life, not only temple visits", "They are getting everything ready for a festival", "They believe Ganesha gets hungry just like a person", "This is part of a funeral ritual for a relative"], answer: 0,
    explain: "For many Hindus, daily puja at a home shrine is the heart of religious life." },

  { id: "r19", section: "rituals", type: "choice", kind: "Definition", level: 1,
    prompt: "What is a pilgrimage?",
    options: ["A journey to a sacred place for religious reasons", "A family dinner held after a wedding", "A song sung during the aarti ritual", "A school holiday for a Hindu festival"], answer: 0,
    explain: "Pilgrimage (tirtha yatra) to holy rivers, cities and temples is an important practice for many Hindus." },

  { id: "r20", section: "rituals", type: "match", kind: "Match", level: 1,
    prompt: "Match each ritual word to its meaning.",
    pairs: [["Prasad", "Blessed food shared after worship"], ["Aarti", "Lamp waved before a deity"], ["Namakarana", "Naming ceremony"], ["Vivaha", "Marriage ceremony"]],
    explain: "Rituals mark both everyday devotion (prasad, aarti) and major life events (naming, marriage)." },

  { id: "r21", section: "rituals", type: "choice", kind: "Concept", level: 2,
    prompt: "Why is a sacred fire at the centre of many Hindu rituals, such as weddings?",
    options: ["Fire (Agni) is a sacred witness and carries offerings to the divine", "It keeps the guests warm during the long ceremony", "It is used to cook the wedding meal for the guests", "It is only there as a beautiful decoration"], answer: 0,
    explain: "Since Vedic times, offerings have been made into fire. At a wedding, Agni witnesses the couple's promises." },

  /* ================= 5. SYMBOLS ================= */
  { id: "s1", section: "symbols", type: "choice", kind: "Definition", level: 1,
    prompt: "Which sacred sound is chanted at the start of prayers and represents Brahman?",
    options: ["Om", "Aarti", "Shankha", "Tilak"], answer: 0,
    explain: "Om (or Aum) is the most sacred sound in Hinduism, representing Brahman, the ultimate reality." },

  { id: "s2", section: "symbols", type: "choice", kind: "Definition", level: 1,
    prompt: "In Hinduism, the swastika is...",
    options: ["an ancient symbol of good fortune and well-being", "a symbol of war, used before battles", "a modern symbol first made in the 1900s", "a symbol of mourning, used at funerals"], answer: 0,
    explain: "The word comes from Sanskrit 'svastika', meaning well-being. It has been a sign of good fortune for thousands of years." },

  { id: "s3", section: "symbols", type: "choice", kind: "Scenario", level: 2,
    prompt: "A classmate sees a swastika on a Hindu family's doorway during Diwali and is upset. What is the most accurate explanation?",
    options: ["It's an ancient Hindu sign of good fortune, far older than the Nazi misuse", "It shows the family supports the ideas of the Nazis", "It is a modern decoration that has no real meaning", "It marks the house as a temple that people can visit"], answer: 0,
    explain: "For Hindus, the swastika is a sacred sign of good fortune. The Nazis appropriated the shape in the 20th century. Understanding the difference matters, and so does recognizing why the shape is painful for many people." },

  { id: "s4", section: "symbols", type: "choice", kind: "Symbol", level: 1,
    prompt: "It grows out of muddy water yet blooms clean and beautiful. Which symbol of purity is this?",
    options: ["Lotus", "Diya", "Trishula", "Shankha"], answer: 0,
    explain: "The lotus represents rising above the world's impurities toward spiritual growth. Many deities are shown sitting or standing on one." },

  { id: "s5", section: "symbols", type: "match", kind: "Match", level: 1,
    prompt: "Match each symbol to its description.",
    pairs: [["Trishula", "Shiva's trident"], ["Shankha", "Conch shell blown in worship"], ["Diya", "Clay oil lamp"], ["Tilak", "Mark worn on the forehead"]],
    explain: "Symbols help identify deities and traditions, and each carries spiritual meaning." },

  { id: "s6", section: "symbols", type: "choice", kind: "Scenario", level: 1,
    prompt: "At Diwali, families place rows of these small clay lamps around their homes. What are they?",
    options: ["Diyas", "Murtis", "Shankhas", "Tilaks"], answer: 0,
    explain: "Diyas are clay oil lamps. Their light represents knowledge and the victory of light over darkness." },

  { id: "s7", section: "symbols", type: "choice", kind: "Scenario", level: 1,
    prompt: "Before worship, a devotee applies a mark of sandalwood paste to their forehead. What is it called?",
    options: ["Tilak", "Diya", "Om", "Mandir"], answer: 0,
    explain: "A tilak is a sign of devotion. Its shape can show which tradition someone follows, such as devotion to Vishnu or Shiva." },

  { id: "s8", section: "symbols", type: "sort", kind: "Sort", level: 2,
    prompt: "Sort each symbol by the deity it is associated with.",
    buckets: ["Shiva", "Vishnu"],
    items: [
      { text: "Trishula (trident)", bucket: 0 }, { text: "Nandi the bull", bucket: 0 }, { text: "Third eye", bucket: 0 },
      { text: "Shankha (conch)", bucket: 1 }, { text: "Chakra (discus)", bucket: 1 }, { text: "Avatars Rama & Krishna", bucket: 1 }
    ],
    explain: "Shiva: trident, Nandi and the third eye. Vishnu: conch, discus, and avatars like Rama and Krishna." },

  /* ---------- batch 2: Symbols ---------- */
  { id: "s9", section: "symbols", type: "choice", kind: "Concept", level: 1,
    prompt: "Why is Om chanted at the start of prayers and meditation?",
    options: ["It is the sacred sound of Brahman and focuses the mind", "It is the name of a popular Hindu festival", "It is a friendly greeting used between friends", "It tells everyone that the service is over"], answer: 0,
    explain: "Om is considered the most sacred sound, the sound of ultimate reality. Chanting it centres the mind." },

  { id: "s10", section: "symbols", type: "choice", kind: "Symbol", level: 1,
    prompt: "What is the name of this sacred symbol: ॐ",
    options: ["Om", "Swastika", "Tilak", "Trishula"], answer: 0,
    explain: "ॐ is Om written in Devanagari, the script used for Sanskrit and Hindi. It appears on temples, shrines and jewellery." },

  { id: "s11", section: "symbols", type: "choice", kind: "Scenario", level: 2,
    prompt: "A Hindu student draws a swastika on a Diwali card for her grandmother. What does she most likely mean by it?",
    options: ["She is wishing her grandmother good fortune", "She is showing support for Nazi ideas", "She is marking the card as private", "She is showing that it is a funeral card"], answer: 0,
    explain: "For Hindus, the swastika is a sign of blessing and good fortune, especially at festivals and new beginnings." },

  { id: "s12", section: "symbols", type: "choice", kind: "Concept", level: 2,
    prompt: "How does the Hindu swastika usually look different from the Nazi symbol?",
    options: ["Usually upright and decorated with dots, in bright festive colours", "Always tilted and drawn in black inside a white circle", "Only ever drawn in red on funeral cards", "Exactly the same, so there is no way to tell"], answer: 0,
    explain: "Context matters: the Hindu swastika appears in colourful, decorated designs at doorways and festivals. The Nazis tilted the shape and used it as a symbol of hate." },

  { id: "s13", section: "symbols", type: "choice", kind: "Iconography", level: 2,
    prompt: "A devotee wears three horizontal lines of ash across the forehead. This tilak often shows devotion to which deity?",
    options: ["Shiva", "Vishnu", "Brahma", "Lakshmi"], answer: 0,
    explain: "Three horizontal lines of sacred ash are worn by many devotees of Shiva. Devotees of Vishnu often wear a vertical, U-shaped tilak." },

  { id: "s14", section: "symbols", type: "match", kind: "Match", level: 1,
    prompt: "Match each object to the deity who usually holds it.",
    pairs: [["Trishula (trident)", "Shiva"], ["Shankha (conch)", "Vishnu"], ["Veena", "Saraswati"], ["Broken tusk", "Ganesha"]],
    explain: "The objects deities hold help identify them in art, and each carries a meaning." },

  { id: "s15", section: "symbols", type: "choice", kind: "Concept", level: 1,
    prompt: "Why is the shankha (conch) blown at the start of worship?",
    options: ["To announce worship with a sacred sound linked to Om", "To call the family together for dinner", "To scare animals away from the temple", "To signal that the festival is over"], answer: 0,
    explain: "The deep sound of the conch marks the beginning of worship and is linked to the sacred sound Om." },

  { id: "s16", section: "symbols", type: "choice", kind: "Text to Idea", level: 2,
    prompt: "The Bhagavad Gita says a wise person acts like a lotus leaf, which sits on water but is never made wet by it. What is the teaching?",
    options: ["Do your duties without becoming attached to the world", "Stay away from rivers, lakes and the sea", "Avoid doing any work so that you stay pure", "Only worship in places close to water"], answer: 0,
    explain: "Like the lotus leaf, a person can do their duties in the world without being 'soaked' by desire and attachment." },

  { id: "s17", section: "symbols", type: "sort", kind: "Sort", level: 2,
    prompt: "Sort these symbols: used by worshippers, or held by deities in sacred art?",
    buckets: ["Used by worshippers", "Held by deities"],
    items: [
      { text: "Tilak", bucket: 0 }, { text: "Diya", bucket: 0 }, { text: "Swastika at a doorway", bucket: 0 },
      { text: "Trishula", bucket: 1 }, { text: "Chakra (discus)", bucket: 1 }, { text: "Veena", bucket: 1 }
    ],
    explain: "Worshippers wear a tilak, light diyas and draw auspicious signs. Deities are recognized by what they hold." },

  { id: "s18", section: "symbols", type: "choice", kind: "Concept", level: 1,
    prompt: "One common interpretation says the three points of Shiva's trishula stand for...",
    options: ["Creation, preservation and destruction", "Earth, wind and fire", "Past, present and future wealth", "Three festivals"], answer: 0,
    explain: "This is one of several interpretations. The trident is also linked to Shiva's power over the three worlds." },

  { id: "s19", section: "symbols", type: "choice", kind: "Odd One Out", level: 1,
    prompt: "Which of these is NOT a Hindu symbol?",
    options: ["The crescent and star", "Om (ॐ)", "The lotus flower", "Shiva's trishula"], answer: 0,
    explain: "The crescent and star is widely associated with Islam. Om, the lotus and the trishula are Hindu symbols." },

  { id: "s20", section: "symbols", type: "choice", kind: "Scenario", level: 1,
    prompt: "Why do families place diyas at doorways and windows during Diwali?",
    options: ["To welcome Lakshmi and celebrate light over darkness", "To keep insects away from the house at night", "Because electric lights are not allowed at Diwali", "To show visitors that the house is a temple"], answer: 0,
    explain: "The light of diyas recalls Rama's return to Ayodhya and welcomes Lakshmi into the home." },

  { id: "s21", section: "symbols", type: "choice", kind: "Concept", level: 2,
    prompt: "Why do symbols matter so much in Hindu worship?",
    options: ["They point to the divine and help people focus their devotion", "They are only decorations that make temples look nice", "They are secret codes that only priests can read", "They replace the need for any beliefs at all"], answer: 0,
    explain: "A lotus, a diya or Om each carries meaning. Symbols make big spiritual ideas something people can see, hold and remember." },

  /* ================= 6. SCRIPTURE ================= */
  { id: "sc1", section: "scripture", type: "match", kind: "Match", level: 1,
    prompt: "Match each scripture to its description.",
    pairs: [["The Vedas", "Oldest scriptures: hymns & rituals"], ["Upanishads", "Philosophy of Brahman & Atman"], ["Ramayana", "Epic of Rama and Sita"], ["Mahabharata", "Epic war that contains the Gita"]],
    explain: "The Vedas and Upanishads are the oldest layers. The Ramayana and Mahabharata are the two great epics." },

  { id: "sc2", section: "scripture", type: "choice", kind: "Definition", level: 1,
    prompt: "The Bhagavad Gita is a conversation between...",
    options: ["Krishna and Arjuna", "Rama and Sita", "Shiva and Parvati", "Brahma and Vishnu"], answer: 0,
    explain: "On the battlefield of Kurukshetra, Krishna teaches the warrior Arjuna about duty and the paths to moksha." },

  { id: "sc3", section: "scripture", type: "sort", kind: "Sort", level: 2,
    prompt: "Sort these texts: shruti ('what is heard' — revealed) or smriti ('what is remembered').",
    buckets: ["Shruti", "Smriti"],
    items: [
      { text: "The Vedas", bucket: 0 }, { text: "Upanishads", bucket: 0 },
      { text: "Ramayana", bucket: 1 }, { text: "Mahabharata", bucket: 1 }
    ],
    explain: "Shruti texts (the Vedas, including the Upanishads) are considered revealed. Smriti texts, like the epics, were remembered and passed down by people." },

  { id: "sc4", section: "scripture", type: "choice", kind: "Story", level: 1,
    prompt: "Which epic tells of Prince Rama rescuing his wife Sita from the demon king Ravana?",
    options: ["Ramayana", "Mahabharata", "Bhagavad Gita", "Rig Veda"], answer: 0,
    explain: "The Ramayana follows Rama, an avatar of Vishnu, as a model of dharma. Hanuman helps him rescue Sita." },

  { id: "sc5", section: "scripture", type: "choice", kind: "Text to Idea", level: 2,
    prompt: "In the Gita, Krishna tells Arjuna to do his duty without worrying about the rewards of his actions. Which path to moksha is this?",
    options: ["Karma yoga", "Bhakti yoga", "Jnana yoga", "Raja yoga"], answer: 0,
    explain: "Karma yoga is the path of selfless action: doing one's duty without attachment to results." },

  { id: "sc6", section: "scripture", type: "choice", kind: "Odd One Out", level: 1,
    prompt: "Which of these is NOT one of the four Vedas?",
    options: ["Ramayana", "Rig Veda", "Sama Veda", "Atharva Veda"], answer: 0,
    explain: "The four Vedas are the Rig, Sama, Yajur and Atharva Vedas. The Ramayana is an epic." },

  { id: "sc7", section: "scripture", type: "choice", kind: "Fill the Gap", level: 1,
    prompt: "The Bhagavad Gita is found inside the ______.",
    options: ["Mahabharata", "Ramayana", "Rig Veda", "Upanishads"], answer: 0,
    explain: "The Gita is a section of the Mahabharata, set just before the great battle." },

  /* ---------- batch 2: Scripture ---------- */
  { id: "sc8", section: "scripture", type: "choice", kind: "Definition", level: 1,
    prompt: "Which is the oldest of the four Vedas?",
    options: ["The Rig Veda", "The Sama Veda", "The Yajur Veda", "The Atharva Veda"], answer: 0,
    explain: "The Rig Veda, a collection of over 1,000 hymns, is the oldest Veda and one of the oldest religious texts in the world." },

  { id: "sc9", section: "scripture", type: "choice", kind: "Story", level: 2,
    prompt: "At the start of the Bhagavad Gita, why does Arjuna refuse to fight?",
    options: ["He doesn't want to fight his relatives, teachers and friends", "He is afraid of Krishna, his charioteer", "He has lost his bow on the battlefield", "He wants to become king without any fighting"], answer: 0,
    explain: "Seeing his family and teachers on the other side, Arjuna is overwhelmed. Krishna's teaching helps him understand his duty." },

  { id: "sc10", section: "scripture", type: "choice", kind: "Text to Idea", level: 2,
    prompt: "Krishna tells Arjuna that weapons cannot cut the soul and fire cannot burn it. Which belief is he teaching?",
    options: ["The atman is eternal and cannot be destroyed", "War is always good", "Fire is sacred", "Arjuna cannot be hurt in battle"], answer: 0,
    explain: "In the Gita, Krishna teaches that the body dies but the atman is eternal." },

  { id: "sc11", section: "scripture", type: "choice", kind: "Story", level: 1,
    prompt: "According to tradition, who wrote down the Mahabharata as the sage Vyasa recited it?",
    options: ["Ganesha", "Hanuman", "Rama", "Gandhi"], answer: 0,
    explain: "A well-known story says Ganesha served as scribe, even using his broken tusk as a pen to keep writing." },

  { id: "sc12", section: "scripture", type: "choice", kind: "Story", level: 1,
    prompt: "In the Ramayana, who kidnaps Sita?",
    options: ["Ravana", "Hanuman", "Arjuna", "Lakshmana"], answer: 0,
    explain: "Ravana, the demon king of Lanka, kidnaps Sita. Rama, with Hanuman's help, rescues her." },

  { id: "sc13", section: "scripture", type: "choice", kind: "Concept", level: 2,
    prompt: "Why is Rama seen as a role model by many Hindus?",
    options: ["He always follows dharma, as a son, husband and king", "He is the strongest warrior who ever lived", "He never faced any problems or hard choices", "He is the sage who first wrote down the Vedas"], answer: 0,
    explain: "Rama accepts exile to keep his father's promise and rules justly. He is often called the ideal person." },

  { id: "sc14", section: "scripture", type: "order", kind: "Story", level: 1,
    prompt: "Put these events from the Ramayana in order.",
    items: ["Rama is sent into exile in the forest", "Ravana kidnaps Sita", "Hanuman finds Sita in Lanka", "Rama defeats Ravana and returns to Ayodhya"],
    explain: "Exile, kidnapping, search and rescue, then the return home, which many Hindus celebrate at Diwali." },

  { id: "sc15", section: "scripture", type: "choice", kind: "Definition", level: 2,
    prompt: "The word 'Upanishad' suggests 'sitting down near'. What does that tell us about these texts?",
    options: ["They were learned by sitting near a teacher", "They were written by people sitting in temples", "They are short, simple songs for festivals", "They were meant to be read alone, in silence"], answer: 0,
    explain: "The Upanishads record teachings passed from teacher to student about the nature of Brahman and Atman." },

  { id: "sc16", section: "scripture", type: "match", kind: "Match", level: 1,
    prompt: "Match each character to their role.",
    pairs: [["Arjuna", "Warrior who doubts his duty"], ["Krishna", "Arjuna's charioteer and teacher"], ["Sita", "Rama's wife"], ["Ravana", "Demon king of Lanka"]],
    explain: "Arjuna and Krishna are central to the Gita and Mahabharata. Sita and Ravana are central to the Ramayana." },

  { id: "sc17", section: "scripture", type: "choice", kind: "Concept", level: 2,
    prompt: "What is a key difference between the Vedas and the epics?",
    options: ["The Vedas are shruti (heard); the epics are smriti (remembered)", "The Vedas are stories; the epics are collections of hymns", "The epics are much older than the Vedas", "There is no real difference between them"], answer: 0,
    explain: "Shruti is considered the most authoritative revelation. Smriti texts, like the epics, teach through stories and are loved by many." },

  { id: "sc18", section: "scripture", type: "choice", kind: "Scenario", level: 1,
    prompt: "A teenager must choose between what she wants and what is right. Her grandfather suggests reading a famous text about doing your duty. Which one?",
    options: ["The Bhagavad Gita", "The Rig Veda", "The Upanishads", "A Diwali card"], answer: 0,
    explain: "The Gita is all about facing a hard choice and doing one's dharma, which is why many Hindus turn to it for guidance." },

  { id: "sc19", section: "scripture", type: "choice", kind: "Definition", level: 1,
    prompt: "About how many verses are in the Bhagavad Gita?",
    options: ["700", "7", "70,000", "100"], answer: 0,
    explain: "The Gita has 700 verses in 18 chapters, a small part of the much larger Mahabharata." },

  { id: "sc20", section: "scripture", type: "choice", kind: "Connection", level: 2,
    prompt: "The teaching 'Tat Tvam Asi' (You are That) about Atman and Brahman comes from which texts?",
    options: ["The Upanishads", "The Ramayana", "The Mahabharata's battle scenes", "Festival songs"], answer: 0,
    explain: "The Upanishads explore how the inner self (Atman) relates to ultimate reality (Brahman). 'Tat Tvam Asi' is one of their best-known teachings." },

  { id: "sc21", section: "scripture", type: "sort", kind: "Sort", level: 2,
    prompt: "Sort these into the epic they belong to.",
    buckets: ["Ramayana", "Mahabharata"],
    items: [
      { text: "Rama", bucket: 0 }, { text: "Sita", bucket: 0 }, { text: "Ravana", bucket: 0 },
      { text: "Arjuna", bucket: 1 }, { text: "The Pandavas", bucket: 1 }, { text: "Battle of Kurukshetra", bucket: 1 }
    ],
    explain: "The Ramayana follows Rama's quest to rescue Sita. The Mahabharata tells of the Pandavas' war, where Krishna teaches Arjuna the Gita." },

  /* ================= 7. SALVATION & WORSHIP ================= */
  { id: "w1", section: "salvation", type: "match", kind: "Match", level: 1,
    prompt: "Match each path to moksha to its meaning.",
    pairs: [["Karma yoga", "Selfless action"], ["Bhakti yoga", "Loving devotion"], ["Jnana yoga", "Knowledge & wisdom"], ["Raja yoga", "Meditation"]],
    explain: "Hindus describe several paths to moksha. Many people combine more than one." },

  { id: "w2", section: "salvation", type: "choice", kind: "Scenario", level: 1,
    prompt: "Priya spends her evenings singing devotional songs to Krishna and offering him flowers. Which path is she following?",
    options: ["Bhakti yoga", "Jnana yoga", "Raja yoga", "Karma yoga"], answer: 0,
    explain: "Bhakti yoga is the path of loving devotion to a personal deity, and it is the most widely practised path." },

  { id: "w3", section: "salvation", type: "choice", kind: "Scenario", level: 2,
    prompt: "Arun studies the Upanishads and reflects deeply on the nature of the self. Which path is he following?",
    options: ["Jnana yoga", "Bhakti yoga", "Karma yoga", "Raja yoga"], answer: 0,
    explain: "Jnana yoga is the path of knowledge: realizing through study and reflection that atman and Brahman are one." },

  { id: "w4", section: "salvation", type: "choice", kind: "Scenario", level: 1,
    prompt: "Meera meditates every morning to calm and discipline her mind. Which path is she following?",
    options: ["Raja yoga", "Karma yoga", "Bhakti yoga", "Jnana yoga"], answer: 0,
    explain: "Raja yoga is the path of meditation and mental discipline." },

  { id: "w5", section: "salvation", type: "choice", kind: "Definition", level: 1,
    prompt: "What is moksha?",
    options: ["Liberation from the cycle of samsara", "A festival of lights", "A sacred river", "The law of cause and effect"], answer: 0,
    explain: "Moksha is the release of the atman from samsara, the ultimate goal for many Hindus." },

  { id: "w6", section: "salvation", type: "choice", kind: "Definition", level: 1,
    prompt: "What is a consecrated image of a deity that devotees believe the divine is present in?",
    options: ["Murti", "Mandir", "Diya", "Tilak"], answer: 0,
    explain: "A murti is honoured as a living presence of the deity: bathed, dressed and offered food during puja." },

  { id: "w7", section: "salvation", type: "choice", kind: "Fill the Gap", level: 2,
    prompt: "At the mandir, seeing and being seen by the deity is called ______.",
    options: ["Darshan", "Moksha", "Samsara", "Maya"], answer: 0,
    explain: "Darshan is a central part of temple worship: a two-way connection between devotee and deity." },

  { id: "w8", section: "salvation", type: "choice", kind: "Connection", level: 2,
    prompt: "Which belief best explains WHY Hindus seek moksha?",
    options: ["The atman is otherwise reborn again and again in samsara", "Moksha brings wealth in this life", "Moksha is required to enter a mandir", "Moksha is a festival everyone must attend"], answer: 0,
    explain: "Without liberation, the atman keeps cycling through birth, death and rebirth. Moksha ends that cycle." },

  { id: "w9", section: "salvation", type: "choice", kind: "Concept", level: 1,
    prompt: "Where does much Hindu worship take place?",
    options: ["At home shrines as well as in temples", "Only in temples on festival days", "Only when a priest is present", "Only on the banks of the Ganga"], answer: 0,
    explain: "Many Hindu homes have a shrine where families perform daily puja. The mandir is important, but worship is not limited to it." },

  /* ---------- batch 2: Salvation & Worship ---------- */
  { id: "w10", section: "salvation", type: "choice", kind: "Concept", level: 2,
    prompt: "Why do many Hindus say there is more than one path to moksha?",
    options: ["People differ: some prefer action, devotion, knowledge or meditation", "Because no one agrees on what moksha actually is", "Because each path leads to a different heaven", "Because only priests are allowed to reach moksha"], answer: 0,
    explain: "The four yogas suit different personalities, and all are understood as leading toward the same goal." },

  { id: "w11", section: "salvation", type: "choice", kind: "Scenario", level: 1,
    prompt: "Dev volunteers at a food bank every week and doesn't want praise or thanks. Which path is he following?",
    options: ["Karma yoga", "Bhakti yoga", "Jnana yoga", "Raja yoga"], answer: 0,
    explain: "Karma yoga is selfless action: doing good work without attachment to rewards or praise." },

  { id: "w12", section: "salvation", type: "choice", kind: "Scenario", level: 2,
    prompt: "Asha waits in a long temple line just to stand before the murti for a moment. Why is that moment so meaningful?",
    options: ["It is darshan: seeing, and being seen by, the deity", "She is buying a ticket", "She is checking that the murti is clean", "It is the only way to earn karma"], answer: 0,
    explain: "Darshan is a two-way exchange of sight between devotee and deity, and a central part of temple worship." },

  { id: "w13", section: "salvation", type: "choice", kind: "Place", level: 2,
    prompt: "What is the innermost room of a mandir, where the main murti is kept?",
    options: ["The garbhagriha, or 'womb chamber'", "The kitchen where prasad is cooked", "The gateway at the temple entrance", "The hall where people sit and sing"], answer: 0,
    explain: "The garbhagriha is the heart of the temple: a small, sacred room where the main deity resides." },

  { id: "w14", section: "salvation", type: "choice", kind: "Concept", level: 2,
    prompt: "Hindus who worship a murti say they are not worshipping stone or metal. What do they mean?",
    options: ["Once consecrated, the divine is present in the murti", "The murti is only a decoration for the temple", "They are worshipping the artist who made it", "They believe every statue anywhere is a god"], answer: 0,
    explain: "The murti helps devotees focus on and connect with the divine, which is believed to be present in it after consecration." },

  { id: "w15", section: "salvation", type: "match", kind: "Match", level: 1,
    prompt: "Match each path to moksha to an example.",
    pairs: [["Karma yoga", "Volunteering without wanting a reward"], ["Bhakti yoga", "Singing hymns to Krishna"], ["Jnana yoga", "Studying the Upanishads"], ["Raja yoga", "Daily meditation"]],
    explain: "Action, devotion, knowledge and meditation are four ways of moving toward moksha." },

  { id: "w16", section: "salvation", type: "choice", kind: "Concept", level: 2,
    prompt: "Which image is often used to describe moksha?",
    options: ["A drop of water returning to the ocean", "A tree losing its leaves", "A candle being blown out by the wind", "A bird locked in a cage"], answer: 0,
    explain: "Many describe moksha as the atman realizing its unity with Brahman, like a drop rejoining the ocean." },

  { id: "w17", section: "salvation", type: "choice", kind: "Concept", level: 1,
    prompt: "Which path to moksha is the most widely practised, and open to anyone whatever their education?",
    options: ["Bhakti yoga", "Jnana yoga", "Raja yoga", "None of them"], answer: 0,
    explain: "Loving devotion needs no special learning. Prayer, song and puja are open to everyone." },

  { id: "w18", section: "salvation", type: "choice", kind: "Scenario", level: 2,
    prompt: "Ravi meditates, sings hymns to Shiva and volunteers in the temple kitchen. Which is true?",
    options: ["He is combining several paths, as many Hindus do", "He has to choose just one path and stick to it", "He is not following any path to moksha at all", "Only his meditation counts toward moksha"], answer: 0,
    explain: "The paths are not separate boxes. Many Hindus mix devotion, selfless action, study and meditation." },

  { id: "w19", section: "salvation", type: "choice", kind: "Concept", level: 1,
    prompt: "Why do many Hindus walk clockwise around the shrine in a mandir?",
    options: ["To keep the deity on their right as a sign of respect", "To get some exercise before they start to pray", "Because the temple floor slopes in that direction", "Because it is the quickest way to find the exit"], answer: 0,
    explain: "This circling (pradakshina) is an act of devotion: the divine is kept at the centre of one's life." },

  { id: "w20", section: "salvation", type: "order", kind: "Sequence", level: 2,
    prompt: "Put the steps of a typical temple visit in order.",
    items: ["Remove shoes at the entrance", "Ring the bell to announce your arrival", "Darshan and offerings before the murti", "Receive prasad before leaving"],
    explain: "Practices vary between temples, but many visits follow this pattern: respect, arrival, worship, then blessing." },

  { id: "w21", section: "salvation", type: "choice", kind: "Odd One Out", level: 1,
    prompt: "Which of these is NOT a path to moksha?",
    options: ["Gaining as much wealth as possible", "Karma yoga: selfless action", "Bhakti yoga: loving devotion", "Jnana yoga: knowledge and wisdom"], answer: 0,
    explain: "The paths to moksha are action, devotion, knowledge and meditation. Chasing wealth tends to increase attachment." },

  /* ================= 8. FESTIVALS ================= */
  { id: "f1", section: "festivals", type: "match", kind: "Match", level: 1,
    prompt: "Match each festival to its description.",
    pairs: [["Diwali", "Festival of lights"], ["Holi", "Festival of colours"], ["Navaratri", "Nine nights honouring the Goddess"], ["Janmashtami", "Krishna's birth"]],
    explain: "Each festival celebrates a deity or story, and many share the theme of good over evil." },

  { id: "f2", section: "festivals", type: "choice", kind: "Story", level: 1,
    prompt: "Diwali celebrates Rama's return to Ayodhya and also honours which goddess of prosperity?",
    options: ["Lakshmi", "Saraswati", "Durga", "Ganga"], answer: 0,
    explain: "Families light diyas to welcome Lakshmi, goddess of wealth and good fortune, into their homes." },

  { id: "f3", section: "festivals", type: "choice", kind: "Story", level: 2,
    prompt: "The bonfire lit the night before Holi recalls which story?",
    options: ["Prahlad is saved while the demoness Holika burns", "Rama defeats the demon king Ravana in Lanka", "Krishna is born at midnight in a prison", "Durga defeats the buffalo demon Mahishasura"], answer: 0,
    explain: "Prahlad stayed devoted to Vishnu and was protected, while his evil aunt Holika was destroyed: good over evil." },

  { id: "f4", section: "festivals", type: "choice", kind: "Story", level: 2,
    prompt: "During Navaratri, many Hindus celebrate Durga's victory over which demon?",
    options: ["Mahishasura", "Ravana", "Holika", "Kamsa"], answer: 0,
    explain: "Durga battles the buffalo demon Mahishasura and defeats him, a victory of good over evil." },

  { id: "f5", section: "festivals", type: "choice", kind: "Definition", level: 1,
    prompt: "Which festival is observed with fasting and an all-night vigil in honour of Shiva?",
    options: ["Maha Shivaratri", "Holi", "Diwali", "Janmashtami"], answer: 0,
    explain: "Maha Shivaratri means 'the great night of Shiva'. Devotees fast, pray and stay awake through the night." },

  { id: "f6", section: "festivals", type: "choice", kind: "Concept", level: 1,
    prompt: "Why do Janmashtami celebrations often reach their peak at midnight?",
    options: ["Krishna is believed to have been born at midnight", "The temples only open at night", "It marks the start of the new year", "That is when Rama returned home"], answer: 0,
    explain: "Devotees often fast until midnight, the hour of Krishna's birth, then celebrate." },

  { id: "f7", section: "festivals", type: "match", kind: "Connection", level: 1,
    prompt: "Match each festival to the deity it most honours.",
    pairs: [["Diwali", "Lakshmi (and Rama)"], ["Navaratri", "Durga"], ["Janmashtami", "Krishna"], ["Maha Shivaratri", "Shiva"]],
    explain: "Festivals connect directly to deities and their stories, which is why knowing the deities helps you understand the festivals." },

  { id: "f8", section: "festivals", type: "choice", kind: "Connection", level: 2,
    prompt: "What theme do Diwali, Holi and Navaratri share?",
    options: ["The victory of good over evil", "Mourning the dead", "The start of the school year", "Honouring Brahma the creator"], answer: 0,
    explain: "Rama defeats Ravana, Prahlad is saved from Holika, and Durga defeats Mahishasura: light over darkness in each." },

  /* ---------- batch 2: Festivals ---------- */
  { id: "f9", section: "festivals", type: "choice", kind: "Definition", level: 1,
    prompt: "In which season is Holi celebrated?",
    options: ["Spring", "Summer", "Autumn", "Winter"], answer: 0,
    explain: "Holi welcomes spring with colour, music and celebration." },

  { id: "f10", section: "festivals", type: "choice", kind: "Story", level: 1,
    prompt: "According to the Diwali story, how did the people of Ayodhya welcome Rama home?",
    options: ["By lighting rows of lamps", "By ringing every bell in the city", "By throwing coloured powder", "By fasting all night"], answer: 0,
    explain: "Lamps lit the way for Rama, Sita and Lakshmana. That is why Diwali is called the festival of lights." },

  { id: "f11", section: "festivals", type: "choice", kind: "Story", level: 1,
    prompt: "Navaratri ends with which festival, celebrating Rama's victory over Ravana?",
    options: ["Dussehra", "Holi", "Janmashtami", "Maha Shivaratri"], answer: 0,
    explain: "Dussehra (Vijayadashami) falls on the tenth day. In many places, large effigies of Ravana are burned." },

  { id: "f12", section: "festivals", type: "choice", kind: "Concept", level: 1,
    prompt: "At Dussehra, many communities burn large effigies of Ravana. What does this represent?",
    options: ["The victory of good over evil", "The start of winter", "Mourning for Ravana", "A warning about fire safety"], answer: 0,
    explain: "Burning the effigy celebrates Rama's victory, and the triumph of dharma over evil." },

  { id: "f13", section: "festivals", type: "choice", kind: "Definition", level: 1,
    prompt: "What do people throw at each other during Holi?",
    options: ["Coloured powder and water", "Rice and flower petals", "Small clay lamps", "Sweets and coins"], answer: 0,
    explain: "Bright colours fill the streets during Holi, as friends, family and even strangers celebrate together." },

  { id: "f14", section: "festivals", type: "choice", kind: "Concept", level: 2,
    prompt: "Holi's colours recall Krishna playing with his friends. What does this side of Holi celebrate?",
    options: ["Joyful love and friendship, setting differences aside", "Respect and remembrance for those who have died", "Fasting and silence in honour of the gods", "The start of the new school year in India"], answer: 0,
    explain: "During Holi, people of all ages and backgrounds play together, remembering Krishna's playful, loving nature." },

  { id: "f15", section: "festivals", type: "choice", kind: "Scenario", level: 1,
    prompt: "A family cleans the house, makes a colourful rangoli at the door and lights lamps to welcome Lakshmi. Which festival is it?",
    options: ["Diwali", "Holi", "Maha Shivaratri", "Janmashtami"], answer: 0,
    explain: "Before Diwali, homes are cleaned and decorated to welcome Lakshmi, goddess of prosperity." },

  { id: "f16", section: "festivals", type: "match", kind: "Story", level: 2,
    prompt: "Match each festival to the story behind it.",
    pairs: [["Diwali", "Rama returns to Ayodhya"], ["Holi", "Prahlad is saved from Holika"], ["Navaratri", "Durga defeats Mahishasura"], ["Janmashtami", "Krishna is born at midnight"]],
    explain: "Each festival retells a sacred story. Knowing the stories explains what people do and why." },

  { id: "f17", section: "festivals", type: "choice", kind: "Concept", level: 2,
    prompt: "During Maha Shivaratri, devotees often pour water or milk over the Shiva lingam. What is the lingam?",
    options: ["A rounded symbol of the formless Shiva", "A bell rung during Shiva's worship", "A small clay lamp lit for Shiva", "A statue of Shiva's son Ganesha"], answer: 0,
    explain: "The lingam is the most common form in which Shiva is worshipped: a simple shape pointing to the formless divine." },

  { id: "f18", section: "festivals", type: "choice", kind: "Concept", level: 2,
    prompt: "Why do many Hindus fast during festivals like Maha Shivaratri or Janmashtami?",
    options: ["To practise self-discipline and focus on devotion", "Because festival food is thought to be unhealthy", "To save money for buying festival gifts", "Because eating is forbidden inside temples"], answer: 0,
    explain: "Fasting turns attention away from the body's wants and toward the divine." },

  { id: "f19", section: "festivals", type: "choice", kind: "Scenario", level: 1,
    prompt: "How do many Hindus in Canada celebrate Diwali?",
    options: ["Lighting diyas, sharing sweets and visiting the mandir", "Throwing coloured powder at each other in the snow", "Fasting until midnight, then breaking the fast", "Staying completely silent for the whole day"], answer: 0,
    explain: "Diwali is celebrated across Canada with lights, food, family, worship and community events." },

  { id: "f20", section: "festivals", type: "sort", kind: "Sort", level: 2,
    prompt: "Sort each festival by the deity it mainly honours.",
    buckets: ["Krishna", "The Goddess", "Shiva"],
    items: [
      { text: "Janmashtami", bucket: 0 }, { text: "Holi's colour play", bucket: 0 },
      { text: "Navaratri", bucket: 1 }, { text: "Lakshmi puja at Diwali", bucket: 1 },
      { text: "Maha Shivaratri", bucket: 2 }
    ],
    explain: "Festivals connect to deities: Krishna's birth and play, the Goddess as Durga and Lakshmi, and the great night of Shiva." },

  { id: "f21", section: "festivals", type: "choice", kind: "Definition", level: 1,
    prompt: "Diwali comes from 'Deepavali'. What does it mean?",
    options: ["Row of lamps", "Festival of colours", "Great night", "Nine nights"], answer: 0,
    explain: "'Deepa' means lamp and 'avali' means row: a row of lamps." }
];
