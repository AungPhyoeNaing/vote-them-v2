import { Candidate, CategoryId } from './types';

// Helper to generate a consistent image URL
// TODO: In production, change this to: 'https://assets.totumdy.com/candidates'
// const BASE_URL = '/images/candidates'; 
const BASE_URL = 'https://asset.totumdy.com/candidates'; 
const TOTAL_IMAGES = 38;

// Simplified image getter - direct mapping
const getImg = (index: number) => {
  // Ensure we fall back gracefully if index > total (though we plan to match exact files)
  const safeIndex = ((index - 1) % TOTAL_IMAGES) + 1;
  return `${BASE_URL}/${safeIndex}.jpg`;
};

export const CANDIDATES: Candidate[] = [
  // --- KING Candidates (1-13) ---
  { id: 'k1', number: '01', name: 'အောင်သူဖြိုး', class: '01', categoryId: CategoryId.KING, imageUrl: getImg(1), quote: "Innovation distinguishes between a leader and a follower.", bio: "Passionate about cloud computing and cybersecurity." },
  { id: 'k2', number: '02', name: 'ကောင်းခန့်ဇော်', class: '02', categoryId: CategoryId.KING, imageUrl: getImg(2), quote: "Code is poetry, leadership is art.", bio: "Full-stack developer by night, student leader by day." },
  { id: 'k3', number: '03', name: 'သံလွင်ထက်နောင်', class: '03', categoryId: CategoryId.KING, imageUrl: getImg(3), quote: "Simplicity is the ultimate sophistication.", bio: "An advocate for clean code and cleaner campuses." },
  { id: 'k4', number: '04', name: 'ရဲရင့်အောင်', class: '04', categoryId: CategoryId.KING, imageUrl: getImg(4), quote: "Stay hungry, stay foolish.", bio: "Aiming to bring more hackathons to campus." },
  { id: 'k5', number: '05', name: 'မင်းထက်ကျော်', class: '05', categoryId: CategoryId.KING, imageUrl: getImg(5), quote: "The future belongs to those who prepare for it today.", bio: "Machine Learning enthusiast." },
  { id: 'k6', number: '06', name: 'ထက်နိုင်သန့်', class: '06', categoryId: CategoryId.KING, imageUrl: getImg(6), quote: "Success is not final, failure is not fatal.", bio: "President of the Coding Club." },
  { id: 'k7', number: '07', name: 'သတိုးစံ', class: '07', categoryId: CategoryId.KING, imageUrl: getImg(7), quote: "Knowledge is power.", bio: "Dedicated to peer tutoring programs." },
  { id: 'k8', number: '08', name: 'စိုးမြတ်မင်း', class: '08', categoryId: CategoryId.KING, imageUrl: getImg(8), quote: "Network your net worth.", bio: "Cisco certified dreamer." },
  { id: 'k9', number: '09', name: 'ဟန်ထူးဇော်', class: '09', categoryId: CategoryId.KING, imageUrl: getImg(9), quote: "Just do it.", bio: "Sports captain and tech geek." },
  { id: 'k10', number: '10', name: 'အောင်ဘုန်းပြည့်', class: '10', categoryId: CategoryId.KING, imageUrl: getImg(10), quote: "There is no spoon.", bio: "Virtual reality explorer." },
  { id: 'k11', number: '11', name: 'ဖြိုးဝေယံဇော်', class: '11', categoryId: CategoryId.KING, imageUrl: getImg(11), quote: "Data is the new oil.", bio: "Big data analyst in the making." },
  { id: 'k12', number: '12', name: 'ဇေယျာထူးနိုင်', class: '12', categoryId: CategoryId.KING, imageUrl: getImg(12), quote: "Make it pop.", bio: "Frontend wizard." },
  { id: 'k13', number: '13', name: 'အောင်ထက်ပိုင်', class: '13', categoryId: CategoryId.KING, imageUrl: getImg(13), quote: "Automate everything.", bio: "Building bots to make life easier." },

  // --- QUEEN Candidates (1-13) ---
  { id: 'q1', number: '01', name: 'ဖူးပြည့်စုံမောင်', class: '01', categoryId: CategoryId.QUEEN, imageUrl: getImg(14), quote: "Empowerment through technology.", bio: "Leading the Women in Tech initiative." },
  { id: 'q2', number: '02', name: 'အိကိုကို', class: '02', categoryId: CategoryId.QUEEN, imageUrl: getImg(15), quote: "Dream big, work hard.", bio: "Balancing algorithms and athletics." },
  { id: 'q3', number: '03', name: 'ဖြူဖြူပွင့်ချယ်', class: '03', categoryId: CategoryId.QUEEN, imageUrl: getImg(16), quote: "Design is intelligence made visible.", bio: "UX enthusiast." },
  { id: 'q4', number: '04', name: 'ဝိုင်းချစ်မှူး', class: '04', categoryId: CategoryId.QUEEN, imageUrl: getImg(17), quote: "Believe you can and you're halfway there.", bio: "Student council secretary." },
  { id: 'q5', number: '05', name: 'အေးသက်မွန်', class: '05', categoryId: CategoryId.QUEEN, imageUrl: getImg(18), quote: "Creativity takes courage.", bio: "Graphic design lead." },
  { id: 'q6', number: '06', name: 'နန်းစံဖွေး', class: '06', categoryId: CategoryId.QUEEN, imageUrl: getImg(19), quote: "Be the change.", bio: "Environmental club president." },
  { id: 'q7', number: '07', name: 'ဟေဇင်မိုးမြင့်ထက်', class: '07', categoryId: CategoryId.QUEEN, imageUrl: getImg(20), quote: "Connect, collaborate, create.", bio: "Networking specialist." },
  { id: 'q8', number: '08', name: 'နန်းမိုနွံဟွမ်', class: '08', categoryId: CategoryId.QUEEN, imageUrl: getImg(21), quote: "Grace under pressure.", bio: "Public speaking champion." },
  { id: 'q9', number: '09', name: 'ဆုမြတ်နိုးဦး', class: '09', categoryId: CategoryId.QUEEN, imageUrl: getImg(22), quote: "Logic will get you from A to B. Imagination will take you everywhere.", bio: "Algorithm ace." },
  { id: 'q10', number: '10', name: 'နွယ်နီဝင်း', class: '10', categoryId: CategoryId.QUEEN, imageUrl: getImg(23), quote: "Shoot for the stars.", bio: "Astronomy club member." },
  { id: 'q11', number: '11', name: 'သီရိချို', class: '11', categoryId: CategoryId.QUEEN, imageUrl: getImg(24), quote: "Artificial Intelligence, Real Results.", bio: "AI researcher." },
  { id: 'q12', number: '12', name: 'ယဉ်မူအောင်', class: '12', categoryId: CategoryId.QUEEN, imageUrl: getImg(25), quote: "Life is what you make it.", bio: "Content creator." },
  { id: 'q13', number: '13', name: 'ချစ်သုဝေ', class: '13', categoryId: CategoryId.QUEEN, imageUrl: getImg(26), quote: "Visualizing success.", bio: "Data viz expert." },

  // --- MISTER Candidates (10) ---
  { id: 'm1', number: '31', name: 'မင်းစွမ်းပြည့်', class: '31', categoryId: CategoryId.MISTER, imageUrl: getImg(27), quote: "I'm just Ken... enough.", bio: "Bringing charm and AI expertise." },
  { id: 'm2', number: '32', name: 'ပြည့်စုံထွန်း', class: '32', categoryId: CategoryId.MISTER, imageUrl: getImg(28), quote: "Laughter is the best debugger.", bio: "Class clown." },
  { id: 'm3', number: '33', name: 'ဝေယံဦ်း', class: '33', categoryId: CategoryId.MISTER, imageUrl: getImg(29), quote: "Bringing sexy back to code.", bio: "Musician and coder." },
  { id: 'm4', number: '34', name: 'ပြည့်ဖြိုးဟိန်း', class: '34', categoryId: CategoryId.MISTER, imageUrl: getImg(30), quote: "I see everything.", bio: "Data analyst with vision." },
  { id: 'm5', number: '35', name: 'မျိုးသီဟကျော်', class: '35', categoryId: CategoryId.MISTER, imageUrl: getImg(31), quote: "With great power comes great responsibility.", bio: "Web crawler." },
  { id: 'm6', number: '36', name: 'ဇော်မိုးထွန်း', class: '36', categoryId: CategoryId.MISTER, imageUrl: getImg(32), quote: "I am Iron Man.", bio: "Tech genius billionaire (in making)." },
  { id: 'm7', number: '37', name: 'ဝဿန်', class: '37', categoryId: CategoryId.MISTER, imageUrl: getImg(33), quote: "I can do this all day.", bio: "Class representative." },
  { id: 'm8', number: '38', name: 'အောင်ချမ်းမြေ့ဦး', class: '38', categoryId: CategoryId.MISTER, imageUrl: getImg(34), quote: "I'm Batman.", bio: "Cybersecurity specialist." },
  { id: 'm9', number: '39', name: 'မျိုးသက်ခိုင်', class: '39', categoryId: CategoryId.MISTER, imageUrl: getImg(35), quote: "Truth, justice, and clean code.", bio: "Journalist and dev." },
  { id: 'm10', number: '40', name: 'ခန့်ဇေယျာကျော်', class: '40', categoryId: CategoryId.MISTER, imageUrl: getImg(36), quote: "Fastest coder alive.", bio: "Track team captain." },

  // --- MISS Candidates (11) ---
  { id: 'ms1', number: '46', name: 'ခိုင်ဆွေရည်', class: '46', categoryId: CategoryId.MISS, imageUrl: getImg(42), quote: "Data tells a story.", bio: "Data Science major." },
  { id: 'ms2', number: '47', name: 'နီလာပြည့်ဖြိုး', class: '47', categoryId: CategoryId.MISS, imageUrl: getImg(43), quote: "Shake it off, code it up.", bio: "Web wizard." },
  { id: 'ms3', number: '48', name: 'မွန်မွန်မြင့်', class: '48', categoryId: CategoryId.MISS, imageUrl: getImg(44), quote: "Thank u, next (bug).", bio: "Vocal about variable naming." },
  { id: 'ms4', number: '49', name: 'စန္ဒီလင််းလက်', class: '49', categoryId: CategoryId.MISS, imageUrl: getImg(45), quote: "Kill 'em with kindness.", bio: "Community manager." },
  { id: 'ms5', number: '50', name: 'နွေးနွေးလှိုင်', class: '50', categoryId: CategoryId.MISS, imageUrl: getImg(46), quote: "Duh.", bio: "Alternative thinker." },
  { id: 'ms6', number: '51', name: 'ဆုမြတ်နိုး', class: '51', categoryId: CategoryId.MISS, imageUrl: getImg(47), quote: "New rules.", bio: "Defining new protocols." },
  { id: 'ms7', number: '52', name: 'အလင်္ကာမိုး', class: '52', categoryId: CategoryId.MISS, imageUrl: getImg(48), quote: "Hear me roar.", bio: "Network administrator." },
  { id: 'ms8', number: '53', name: 'ဖြိုးသီရိ', class: '53', categoryId: CategoryId.MISS, imageUrl: getImg(49), quote: "Shine bright like a diamond.", bio: "UI/UX polished perfection." },
  { id: 'ms9', number: '54', name: 'မို့မို့သဇင်', class: '54', categoryId: CategoryId.MISS, imageUrl: getImg(50), quote: "Run the world (girls).", bio: "Project Manager." },
  { id: 'ms10', number: '55', name: 'ဟန်နီဇင်', class: '55', categoryId: CategoryId.MISS, imageUrl: getImg(51), quote: "Hello, it's me.", bio: "Communication specialist." },
  { id: 'ms11', number: '56', name: 'စံထိပ်ထားခင်', class: '56', categoryId: CategoryId.MISS, imageUrl: getImg(52), quote: "Born this way.", bio: "Advocate for accessibility." },
];

export const CATEGORIES = [
  { id: CategoryId.KING, label: 'KING', color: 'bg-blue-600' },
  { id: CategoryId.QUEEN, label: 'QUEEN', color: 'bg-pink-600' },
  { id: CategoryId.MISTER, label: 'MISTER', color: 'bg-teal-600' },
  { id: CategoryId.MISS, label: 'MISS', color: 'bg-purple-600' },
];

export const ADMIN_PIN = "45644779";
