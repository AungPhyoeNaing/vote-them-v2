import { Candidate, CategoryId } from './types';

// Helper to generate a consistent image URL
const getImg = (id: number, width: number, height: number) => 
  `https://picsum.photos/id/${id}/${width}/${height}`;

export const CANDIDATES: Candidate[] = [
  // KING Candidates
  { 
    id: 'k1', number: '01', name: 'Alex Johnson', class: 'IT-A 2025', categoryId: CategoryId.KING, imageUrl: getImg(100, 400, 500),
    quote: "Innovation distinguishes between a leader and a follower.",
    bio: "Passionate about cloud computing and cybersecurity. I believe in fostering a collaborative environment where every fresher feels welcome."
  },
  { 
    id: 'k2', number: '02', name: 'Michael Chen', class: 'CS-B 2025', categoryId: CategoryId.KING, imageUrl: getImg(101, 400, 500),
    quote: "Code is poetry, leadership is art.",
    bio: "Full-stack developer by night, student leader by day. Let's make this academic year the most memorable one yet."
  },
  { 
    id: 'k3', number: '03', name: 'David Smith', class: 'SE-A 2025', categoryId: CategoryId.KING, imageUrl: getImg(103, 400, 500),
    quote: "Simplicity is the ultimate sophistication.",
    bio: "An advocate for clean code and cleaner campuses. Ready to represent the Software Engineering cohort with pride."
  },
  
  // QUEEN Candidates
  { 
    id: 'q1', number: '04', name: 'Sarah Lee', class: 'IT-A 2025', categoryId: CategoryId.QUEEN, imageUrl: getImg(104, 400, 500),
    quote: "Empowerment through technology.",
    bio: "Leading the Women in Tech initiative. I strive to create opportunities for everyone to shine in the IT field."
  },
  { 
    id: 'q2', number: '05', name: 'Emily Davis', class: 'CS-A 2025', categoryId: CategoryId.QUEEN, imageUrl: getImg(106, 400, 500),
    quote: "Dream big, work hard, stay focused.",
    bio: "Balancing algorithms and athletics. I want to bring energy and enthusiasm to every fresher event."
  },
  { 
    id: 'q3', number: '06', name: 'Jessica Wong', class: 'SE-B 2025', categoryId: CategoryId.QUEEN, imageUrl: getImg(111, 400, 500),
    quote: "Design is not just what it looks like, it's how it works.",
    bio: "UX enthusiast with a heart for community service. Let's design a better future together."
  },

  // MISTER Candidates
  { 
    id: 'm1', number: '07', name: 'Ryan Gosling (Junior)', class: 'AI-A 2025', categoryId: CategoryId.MISTER, imageUrl: getImg(200, 400, 500),
    quote: "I'm just Ken... enough to be your Mister.",
    bio: "Bringing charm and AI expertise. If elected, I promise to optimize our fun parameters to maximum efficiency."
  },
  { 
    id: 'm2', number: '08', name: 'Kevin Hart (Lite)', class: 'NET-B 2025', categoryId: CategoryId.MISTER, imageUrl: getImg(203, 400, 500),
    quote: "Laughter is the best debugger.",
    bio: "The class clown who takes networking seriously. Vote for me if you want smiles and strong connections."
  },

  // MISS Candidates
  { 
    id: 'ms1', number: '09', name: 'Zendaya Two', class: 'DS-A 2025', categoryId: CategoryId.MISS, imageUrl: getImg(338, 400, 500),
    quote: "Data tells a story, let's make ours legendary.",
    bio: "Data Science major with a flair for fashion. Turning raw data into insights and regular days into celebrations."
  },
  { 
    id: 'ms2', number: '10', name: 'Taylor S.', class: 'WEB-A 2025', categoryId: CategoryId.MISS, imageUrl: getImg(334, 400, 500),
    quote: "Shake it off, code it up.",
    bio: "Web wizard and musical soul. I promise to keep our student community responsive and bug-free."
  },
];

export const CATEGORIES = [
  { id: CategoryId.KING, label: 'KING', color: 'bg-blue-600' },
  { id: CategoryId.QUEEN, label: 'QUEEN', color: 'bg-pink-600' },
  { id: CategoryId.MISTER, label: 'MISTER', color: 'bg-teal-600' },
  { id: CategoryId.MISS, label: 'MISS', color: 'bg-purple-600' },
];

export const ADMIN_PIN = "2025";