// Bangla EdTech Question Bank Data

export interface SubjectData {
  id: string;
  name: string;
  nameBn: string;
  icon: string;
  color: string;
  bgColor: string;
  isFree: boolean;
  chapters: ChapterData[];
}

export interface ChapterData {
  id: string;
  name: string;
  nameBn: string;
  questionCount: number;
}

export const subjectGroups = [
  { id: "hsc-science", label: "HSC - বিজ্ঞান" },
  { id: "hsc-arts", label: "HSC - মানবিক" },
  { id: "hsc-commerce", label: "HSC - বাণিজ্য" },
  { id: "admission", label: "ভর্তি পরীক্ষা" },
];

export const classOptions = [
  { id: "hsc", label: "HSC/Admission" },
  { id: "ssc", label: "SSC" },
  { id: "university", label: "University" },
];

export const subjectsData: SubjectData[] = [
  {
    id: "higher-math-1",
    name: "Higher Math 1st Paper",
    nameBn: "উচ্চতর গণিত ১ম পত্র",
    icon: "📐",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    isFree: true,
    chapters: [
      { id: "hm1-ch1", name: "Matrix & Determinant", nameBn: "অধ্যায়-০১: ম্যাট্রিক্স ও নির্ণায়ক", questionCount: 45 },
      { id: "hm1-ch2", name: "Set & Function", nameBn: "অধ্যায়-০২: সেট ও ফাংশন", questionCount: 38 },
      { id: "hm1-ch3", name: "Straight Line", nameBn: "অধ্যায়-০৩: সরলরেখা", questionCount: 52 },
      { id: "hm1-ch4", name: "Circle", nameBn: "অধ্যায়-০৪: বৃত্ত", questionCount: 41 },
      { id: "hm1-ch5", name: "Trigonometric Ratios", nameBn: "অধ্যায়-০৫: ত্রিকোণমিতিক অনুপাত", questionCount: 35 },
      { id: "hm1-ch6", name: "Vectors", nameBn: "অধ্যায়-০৬: ভেক্টর", questionCount: 28 },
      { id: "hm1-ch7", name: "Differentiation", nameBn: "অধ্যায়-০৭: অন্তরীকরণ", questionCount: 60 },
      { id: "hm1-ch8", name: "Integration", nameBn: "অধ্যায়-০৮: যোগজীকরণ", questionCount: 55 },
      { id: "hm1-ch9", name: "Probability", nameBn: "অধ্যায়-০৯: সম্ভাবনা", questionCount: 30 },
      { id: "hm1-ch10", name: "Complex Numbers", nameBn: "অধ্যায়-১০: জটিল সংখ্যা", questionCount: 25 },
    ],
  },
  {
    id: "higher-math-2",
    name: "Higher Math 2nd Paper",
    nameBn: "উচ্চতর গণিত ২য় পত্র",
    icon: "📊",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    isFree: true,
    chapters: [
      { id: "hm2-ch1", name: "Real Numbers", nameBn: "অধ্যায়-০১: বাস্তব সংখ্যা", questionCount: 32 },
      { id: "hm2-ch2", name: "Logarithm", nameBn: "অধ্যায়-০২: লগারিদম", questionCount: 28 },
      { id: "hm2-ch3", name: "Sequence & Series", nameBn: "অধ্যায়-০৩: অনুক্রম ও ধারা", questionCount: 40 },
      { id: "hm2-ch4", name: "Permutation & Combination", nameBn: "অধ্যায়-০৪: বিন্যাস ও সমাবেশ", questionCount: 36 },
      { id: "hm2-ch5", name: "Binomial Expansion", nameBn: "অধ্যায়-০৫: দ্বিপদী বিস্তৃতি", questionCount: 22 },
    ],
  },
  {
    id: "physics-1",
    name: "Physics 1st Paper",
    nameBn: "পদার্থবিজ্ঞান ১ম পত্র",
    icon: "⚛️",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    isFree: true,
    chapters: [
      { id: "ph1-ch1", name: "Physical World & Measurement", nameBn: "অধ্যায়-০১: ভৌত জগৎ ও পরিমাপ", questionCount: 35 },
      { id: "ph1-ch2", name: "Vector", nameBn: "অধ্যায়-০২: ভেক্টর", questionCount: 42 },
      { id: "ph1-ch3", name: "Dynamics", nameBn: "অধ্যায়-০৩: গতিবিদ্যা", questionCount: 55 },
      { id: "ph1-ch4", name: "Newton's Laws", nameBn: "অধ্যায়-০৪: নিউটনের গতিসূত্র", questionCount: 48 },
      { id: "ph1-ch5", name: "Work, Energy & Power", nameBn: "অধ্যায়-০৫: কাজ, শক্তি ও ক্ষমতা", questionCount: 38 },
      { id: "ph1-ch6", name: "Gravity", nameBn: "অধ্যায়-০৬: মহাকর্ষ ও অভিকর্ষ", questionCount: 30 },
      { id: "ph1-ch7", name: "Properties of Matter", nameBn: "অধ্যায়-০৭: পদার্থের গুণাবলি", questionCount: 25 },
      { id: "ph1-ch8", name: "Oscillation & Waves", nameBn: "অধ্যায়-০৮: পর্যাবৃত্ত গতি", questionCount: 40 },
    ],
  },
  {
    id: "physics-2",
    name: "Physics 2nd Paper",
    nameBn: "পদার্থবিজ্ঞান ২য় পত্র",
    icon: "🔌",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    isFree: true,
    chapters: [
      { id: "ph2-ch1", name: "Heat & Thermodynamics", nameBn: "অধ্যায়-০১: তাপগতিবিদ্যা", questionCount: 38 },
      { id: "ph2-ch2", name: "Static Electricity", nameBn: "অধ্যায়-০২: স্থির তড়িৎ", questionCount: 45 },
      { id: "ph2-ch3", name: "Current Electricity", nameBn: "অধ্যায়-০৩: চল তড়িৎ", questionCount: 50 },
      { id: "ph2-ch4", name: "Magnetism", nameBn: "অধ্যায়-০৪: চুম্বকত্ব", questionCount: 32 },
      { id: "ph2-ch5", name: "Modern Physics", nameBn: "অধ্যায়-০৫: আধুনিক পদার্থবিজ্ঞান", questionCount: 40 },
    ],
  },
  {
    id: "chemistry-1",
    name: "Chemistry 1st Paper",
    nameBn: "রসায়ন ১ম পত্র",
    icon: "🧪",
    color: "text-green-600",
    bgColor: "bg-green-50",
    isFree: true,
    chapters: [
      { id: "ch1-ch1", name: "Atomic Structure", nameBn: "অধ্যায়-০১: ল্যাবরেটরির নিরাপত্তা", questionCount: 20 },
      { id: "ch1-ch2", name: "Qualitative Analysis", nameBn: "অধ্যায়-০২: গুণগত রসায়ন", questionCount: 35 },
      { id: "ch1-ch3", name: "Periodic Table", nameBn: "অধ্যায়-০৩: মৌলের পর্যায়বৃত্ত ধর্ম", questionCount: 42 },
      { id: "ch1-ch4", name: "Chemical Bonds", nameBn: "অধ্যায়-০৪: রাসায়নিক বন্ধন", questionCount: 48 },
      { id: "ch1-ch5", name: "States of Matter", nameBn: "অধ্যায়-০৫: পদার্থের অবস্থা", questionCount: 30 },
    ],
  },
  {
    id: "chemistry-2",
    name: "Chemistry 2nd Paper",
    nameBn: "রসায়ন ২য় পত্র",
    icon: "⚗️",
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    isFree: true,
    chapters: [
      { id: "ch2-ch1", name: "Environmental Chemistry", nameBn: "অধ্যায়-০১: পরিবেশ রসায়ন", questionCount: 25 },
      { id: "ch2-ch2", name: "Organic Chemistry", nameBn: "অধ্যায়-০২: জৈব রসায়ন", questionCount: 55 },
      { id: "ch2-ch3", name: "Quantitative Analysis", nameBn: "অধ্যায়-০৩: পরিমাণগত রসায়ন", questionCount: 40 },
      { id: "ch2-ch4", name: "Electrochemistry", nameBn: "অধ্যায়-০৪: তড়িৎ রসায়ন", questionCount: 35 },
    ],
  },
  {
    id: "biology-1",
    name: "Biology 1st Paper",
    nameBn: "জীববিজ্ঞান ১ম পত্র",
    icon: "🧬",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    isFree: true,
    chapters: [
      { id: "bi1-ch1", name: "Cell Biology", nameBn: "অধ্যায়-০১: কোষ ও এর গঠন", questionCount: 45 },
      { id: "bi1-ch2", name: "Cell Division", nameBn: "অধ্যায়-০২: কোষ বিভাজন", questionCount: 38 },
      { id: "bi1-ch3", name: "Plant Tissue", nameBn: "অধ্যায়-০৩: কলা ও টিস্যু তন্ত্র", questionCount: 32 },
      { id: "bi1-ch4", name: "Plant Physiology", nameBn: "অধ্যায়-০৪: উদ্ভিদ শারীরতত্ত্ব", questionCount: 50 },
      { id: "bi1-ch5", name: "Ecology", nameBn: "অধ্যায়-০৫: বাস্তুবিদ্যা", questionCount: 28 },
    ],
  },
  {
    id: "biology-2",
    name: "Biology 2nd Paper",
    nameBn: "জীববিজ্ঞান ২য় পত্র",
    icon: "🦠",
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    isFree: true,
    chapters: [
      { id: "bi2-ch1", name: "Animal Diversity", nameBn: "অধ্যায়-০১: প্রাণীর বৈচিত্র্য", questionCount: 40 },
      { id: "bi2-ch2", name: "Animal Identity", nameBn: "অধ্যায়-০২: প্রাণীর পরিচিতি", questionCount: 35 },
      { id: "bi2-ch3", name: "Human Physiology", nameBn: "অধ্যায়-০৩: মানব শারীরতত্ত্ব", questionCount: 55 },
      { id: "bi2-ch4", name: "Genetics", nameBn: "অধ্যায়-০৪: বংশগতি ও বিবর্তন", questionCount: 42 },
    ],
  },
];

// Sample questions for question listing
export interface QuestionItem {
  id: string;
  subjectId: string;
  chapterId: string;
  questionText: string;
  questionBn: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  examTag: string;
  topic: string;
  type: "board" | "admission" | "practice" | "test";
  difficulty: "Easy" | "Medium" | "Hard";
}

export const sampleQuestions: QuestionItem[] = [
  {
    id: "sq1",
    subjectId: "higher-math-1",
    chapterId: "hm1-ch1",
    questionText: "If A = [[1,2],[3,4]], find det(A)",
    questionBn: "যদি A = [[1,2],[3,4]] হয়, তবে det(A) নির্ণয় করো।",
    options: ["-2", "2", "-1", "0"],
    correctAnswer: "-2",
    explanation: "det(A) = (1×4) - (2×3) = 4 - 6 = -2",
    examTag: "RU-C '23-24",
    topic: "নির্ণায়ক",
    type: "admission",
    difficulty: "Easy",
  },
  {
    id: "sq2",
    subjectId: "higher-math-1",
    chapterId: "hm1-ch1",
    questionText: "Which matrix has an inverse?",
    questionBn: "কোন ম্যাট্রিক্সের বিপরীত ম্যাট্রিক্স আছে?",
    options: ["Non-singular", "Singular", "Zero", "None"],
    correctAnswer: "Non-singular",
    explanation: "A matrix has an inverse only if it is non-singular (determinant ≠ 0).",
    examTag: "DU '22-23",
    topic: "বিপরীত ম্যাট্রিক্স",
    type: "admission",
    difficulty: "Medium",
  },
  {
    id: "sq3",
    subjectId: "physics-1",
    chapterId: "ph1-ch3",
    questionText: "What is the SI unit of acceleration?",
    questionBn: "ত্বরণের SI একক কী?",
    options: ["m/s²", "m/s", "N", "kg·m/s"],
    correctAnswer: "m/s²",
    explanation: "Acceleration = change in velocity / time = m/s / s = m/s²",
    examTag: "Board '23",
    topic: "গতিবিদ্যা",
    type: "board",
    difficulty: "Easy",
  },
  {
    id: "sq4",
    subjectId: "chemistry-1",
    chapterId: "ch1-ch4",
    questionText: "Which bond is formed by sharing electrons?",
    questionBn: "ইলেকট্রন শেয়ারের মাধ্যমে কোন বন্ধন গঠিত হয়?",
    options: ["সমযোজী", "তড়িৎযোজী", "ধাতব", "হাইড্রোজেন"],
    correctAnswer: "সমযোজী",
    explanation: "সমযোজী বন্ধনে পরমাণুসমূহ ইলেকট্রন জোড় শেয়ার করে।",
    examTag: "Board '22",
    topic: "রাসায়নিক বন্ধন",
    type: "board",
    difficulty: "Easy",
  },
];
