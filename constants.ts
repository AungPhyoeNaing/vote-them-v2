import { Candidate, CategoryId } from './types';

// Helper to generate a consistent image URL
// TODO: In production, change this to: 'https://assets.totumdy.com/candidates'
// const BASE_URL = '/images/candidates'; 
const BASE_URL = 'https://asset.totumdy.com/candidates'; 
const TOTAL_IMAGES = 38;

const getImg = (id: number, width?: number, height?: number) => {
  // Map the ID to one of our local images (1.jpg to 37.jpg)
  const imageIndex = (id % TOTAL_IMAGES) + 1;
  return `${BASE_URL}/${imageIndex}.jpg`;
};

export const CANDIDATES: Candidate[] = [
  // --- KING Candidates (1-15) ---
  { id: 'k1', number: '01', name: 'Alex Johnson', class: 'IT-A 2025', categoryId: CategoryId.KING, imageUrl: getImg(11, 400, 500), quote: "Innovation distinguishes between a leader and a follower.", bio: "Passionate about cloud computing and cybersecurity." },
  { id: 'k2', number: '02', name: 'Michael Chen', class: 'CS-B 2025', categoryId: CategoryId.KING, imageUrl: getImg(12, 400, 500), quote: "Code is poetry, leadership is art.", bio: "Full-stack developer by night, student leader by day." },
  { id: 'k3', number: '03', name: 'David Smith', class: 'SE-A 2025', categoryId: CategoryId.KING, imageUrl: getImg(13, 400, 500), quote: "Simplicity is the ultimate sophistication.", bio: "An advocate for clean code and cleaner campuses." },
  { id: 'k4', number: '04', name: 'James Wilson', class: 'IT-B 2025', categoryId: CategoryId.KING, imageUrl: getImg(14, 400, 500), quote: "Stay hungry, stay foolish.", bio: "Aiming to bring more hackathons to campus." },
  { id: 'k5', number: '05', name: 'Daniel Kim', class: 'AI-A 2025', categoryId: CategoryId.KING, imageUrl: getImg(15, 400, 500), quote: "The future belongs to those who prepare for it today.", bio: "Machine Learning enthusiast." },
  { id: 'k6', number: '06', name: 'Robert Taylor', class: 'CS-A 2025', categoryId: CategoryId.KING, imageUrl: getImg(16, 400, 500), quote: "Success is not final, failure is not fatal.", bio: "President of the Coding Club." },
  { id: 'k7', number: '07', name: 'William Brown', class: 'SE-B 2025', categoryId: CategoryId.KING, imageUrl: getImg(17, 400, 500), quote: "Knowledge is power.", bio: "Dedicated to peer tutoring programs." },
  { id: 'k8', number: '08', name: 'Joseph Davis', class: 'NET-A 2025', categoryId: CategoryId.KING, imageUrl: getImg(18, 400, 500), quote: "Network your net worth.", bio: "Cisco certified dreamer." },
  { id: 'k9', number: '09', name: 'Charles Miller', class: 'IT-A 2025', categoryId: CategoryId.KING, imageUrl: getImg(19, 400, 500), quote: "Just do it.", bio: "Sports captain and tech geek." },
  { id: 'k10', number: '10', name: 'Thomas Anderson', class: 'CS-B 2025', categoryId: CategoryId.KING, imageUrl: getImg(20, 400, 500), quote: "There is no spoon.", bio: "Virtual reality explorer." },
  { id: 'k11', number: '11', name: 'Christopher Lee', class: 'DS-A 2025', categoryId: CategoryId.KING, imageUrl: getImg(21, 400, 500), quote: "Data is the new oil.", bio: "Big data analyst in the making." },
  { id: 'k12', number: '12', name: 'Paul Martinez', class: 'WEB-B 2025', categoryId: CategoryId.KING, imageUrl: getImg(22, 400, 500), quote: "Make it pop.", bio: "Frontend wizard." },
  { id: 'k13', number: '13', name: 'Mark White', class: 'AI-B 2025', categoryId: CategoryId.KING, imageUrl: getImg(23, 400, 500), quote: "Automate everything.", bio: "Building bots to make life easier." },
  { id: 'k14', number: '14', name: 'Donald Harris', class: 'SE-A 2025', categoryId: CategoryId.KING, imageUrl: getImg(24, 400, 500), quote: "Quality over quantity.", bio: "QA testing expert." },
  { id: 'k15', number: '15', name: 'George Clark', class: 'IT-B 2025', categoryId: CategoryId.KING, imageUrl: getImg(25, 400, 500), quote: "Keep moving forward.", bio: "Always learning, always growing." },

  // --- QUEEN Candidates (16-30) ---
  { id: 'q1', number: '16', name: 'Sarah Lee', class: 'IT-A 2025', categoryId: CategoryId.QUEEN, imageUrl: getImg(30, 400, 500), quote: "Empowerment through technology.", bio: "Leading the Women in Tech initiative." },
  { id: 'q2', number: '17', name: 'Emily Davis', class: 'CS-A 2025', categoryId: CategoryId.QUEEN, imageUrl: getImg(31, 400, 500), quote: "Dream big, work hard.", bio: "Balancing algorithms and athletics." },
  { id: 'q3', number: '18', name: 'Jessica Wong', class: 'SE-B 2025', categoryId: CategoryId.QUEEN, imageUrl: getImg(32, 400, 500), quote: "Design is intelligence made visible.", bio: "UX enthusiast." },
  { id: 'q4', number: '19', name: 'Amanda Martin', class: 'DS-A 2025', categoryId: CategoryId.QUEEN, imageUrl: getImg(33, 400, 500), quote: "Believe you can and you're halfway there.", bio: "Student council secretary." },
  { id: 'q5', number: '20', name: 'Jennifer Garcia', class: 'WEB-A 2025', categoryId: CategoryId.QUEEN, imageUrl: getImg(34, 400, 500), quote: "Creativity takes courage.", bio: "Graphic design lead." },
  { id: 'q6', number: '21', name: 'Nicole Thompson', class: 'AI-B 2025', categoryId: CategoryId.QUEEN, imageUrl: getImg(35, 400, 500), quote: "Be the change.", bio: "Environmental club president." },
  { id: 'q7', number: '22', name: 'Stephanie Martinez', class: 'NET-A 2025', categoryId: CategoryId.QUEEN, imageUrl: getImg(36, 400, 500), quote: "Connect, collaborate, create.", bio: "Networking specialist." },
  { id: 'q8', number: '23', name: 'Lauren Robinson', class: 'IT-B 2025', categoryId: CategoryId.QUEEN, imageUrl: getImg(37, 400, 500), quote: "Grace under pressure.", bio: "Public speaking champion." },
  { id: 'q9', number: '24', name: 'Rachel Clark', class: 'CS-B 2025', categoryId: CategoryId.QUEEN, imageUrl: getImg(38, 400, 500), quote: "Logic will get you from A to B. Imagination will take you everywhere.", bio: "Algorithm ace." },
  { id: 'q10', number: '25', name: 'Megan Rodriguez', class: 'SE-A 2025', categoryId: CategoryId.QUEEN, imageUrl: getImg(39, 400, 500), quote: "Shoot for the stars.", bio: "Astronomy club member." },
  { id: 'q11', number: '26', name: 'Ashley Walker', class: 'AI-A 2025', categoryId: CategoryId.QUEEN, imageUrl: getImg(40, 400, 500), quote: "Artificial Intelligence, Real Results.", bio: "AI researcher." },
  { id: 'q12', number: '27', name: 'Elizabeth Hall', class: 'WEB-B 2025', categoryId: CategoryId.QUEEN, imageUrl: getImg(41, 400, 500), quote: "Life is what you make it.", bio: "Content creator." },
  { id: 'q13', number: '28', name: 'Brittany Allen', class: 'DS-B 2025', categoryId: CategoryId.QUEEN, imageUrl: getImg(42, 400, 500), quote: "Visualizing success.", bio: "Data viz expert." },
  { id: 'q14', number: '29', name: 'Danielle Young', class: 'IT-A 2025', categoryId: CategoryId.QUEEN, imageUrl: getImg(43, 400, 500), quote: "Kindness matters.", bio: "Volunteer coordinator." },
  { id: 'q15', number: '30', name: 'Courtney King', class: 'CS-A 2025', categoryId: CategoryId.QUEEN, imageUrl: getImg(44, 400, 500), quote: "Coding creates worlds.", bio: "Game developer." },

  // --- MISTER Candidates (31-45) ---
  { id: 'm1', number: '31', name: 'Ryan Gosling (Junior)', class: 'AI-A 2025', categoryId: CategoryId.MISTER, imageUrl: getImg(50, 400, 500), quote: "I'm just Ken... enough.", bio: "Bringing charm and AI expertise." },
  { id: 'm2', number: '32', name: 'Kevin Hart (Lite)', class: 'NET-B 2025', categoryId: CategoryId.MISTER, imageUrl: getImg(51, 400, 500), quote: "Laughter is the best debugger.", bio: "Class clown." },
  { id: 'm3', number: '33', name: 'Justin T.', class: 'SE-A 2025', categoryId: CategoryId.MISTER, imageUrl: getImg(52, 400, 500), quote: "Bringing sexy back to code.", bio: "Musician and coder." },
  { id: 'm4', number: '34', name: 'Brandon Stark', class: 'DS-A 2025', categoryId: CategoryId.MISTER, imageUrl: getImg(53, 400, 500), quote: "I see everything.", bio: "Data analyst with vision." },
  { id: 'm5', number: '35', name: 'Peter Parker', class: 'WEB-A 2025', categoryId: CategoryId.MISTER, imageUrl: getImg(54, 400, 500), quote: "With great power comes great responsibility.", bio: "Web crawler." },
  { id: 'm6', number: '36', name: 'Tony Stark', class: 'AI-B 2025', categoryId: CategoryId.MISTER, imageUrl: getImg(55, 400, 500), quote: "I am Iron Man.", bio: "Tech genius billionaire (in making)." },
  { id: 'm7', number: '37', name: 'Steve Rogers', class: 'CS-A 2025', categoryId: CategoryId.MISTER, imageUrl: getImg(56, 400, 500), quote: "I can do this all day.", bio: "Class representative." },
  { id: 'm8', number: '38', name: 'Bruce Wayne', class: 'IT-B 2025', categoryId: CategoryId.MISTER, imageUrl: getImg(57, 400, 500), quote: "I'm Batman.", bio: "Cybersecurity specialist." },
  { id: 'm9', number: '39', name: 'Clark Kent', class: 'SE-B 2025', categoryId: CategoryId.MISTER, imageUrl: getImg(58, 400, 500), quote: "Truth, justice, and clean code.", bio: "Journalist and dev." },
  { id: 'm10', number: '40', name: 'Barry Allen', class: 'NET-A 2025', categoryId: CategoryId.MISTER, imageUrl: getImg(59, 400, 500), quote: "Fastest coder alive.", bio: "Track team captain." },
  { id: 'm11', number: '41', name: 'Arthur Curry', class: 'DS-B 2025', categoryId: CategoryId.MISTER, imageUrl: getImg(60, 400, 500), quote: "King of the (data) seas.", bio: "Marine biology enthusiast." },
  { id: 'm12', number: '42', name: 'Hal Jordan', class: 'AI-A 2025', categoryId: CategoryId.MISTER, imageUrl: getImg(61, 400, 500), quote: "In brightest day...", bio: "Pilot and programmer." },
  { id: 'm13', number: '43', name: 'Oliver Queen', class: 'WEB-B 2025', categoryId: CategoryId.MISTER, imageUrl: getImg(62, 400, 500), quote: "You have failed this city.", bio: "Full stack archer." },
  { id: 'm14', number: '44', name: 'Wade Wilson', class: 'CS-B 2025', categoryId: CategoryId.MISTER, imageUrl: getImg(63, 400, 500), quote: "Maximum effort.", bio: "Unconventional troubleshooter." },
  { id: 'm15', number: '45', name: 'Logan H.', class: 'IT-A 2025', categoryId: CategoryId.MISTER, imageUrl: getImg(64, 400, 500), quote: "I'm the best there is at what I do.", bio: "Legacy system maintainer." },

  // --- MISS Candidates (46-60) ---
  { id: 'ms1', number: '46', name: 'Zendaya Two', class: 'DS-A 2025', categoryId: CategoryId.MISS, imageUrl: getImg(70, 400, 500), quote: "Data tells a story.", bio: "Data Science major." },
  { id: 'ms2', number: '47', name: 'Taylor S.', class: 'WEB-A 2025', categoryId: CategoryId.MISS, imageUrl: getImg(71, 400, 500), quote: "Shake it off, code it up.", bio: "Web wizard." },
  { id: 'ms3', number: '48', name: 'Ariana G.', class: 'CS-A 2025', categoryId: CategoryId.MISS, imageUrl: getImg(72, 400, 500), quote: "Thank u, next (bug).", bio: "Vocal about variable naming." },
  { id: 'ms4', number: '49', name: 'Selena G.', class: 'SE-A 2025', categoryId: CategoryId.MISS, imageUrl: getImg(73, 400, 500), quote: "Kill 'em with kindness.", bio: "Community manager." },
  { id: 'ms5', number: '50', name: 'Billie E.', class: 'IT-B 2025', categoryId: CategoryId.MISS, imageUrl: getImg(74, 400, 500), quote: "Duh.", bio: "Alternative thinker." },
  { id: 'ms6', number: '51', name: 'Dua L.', class: 'AI-A 2025', categoryId: CategoryId.MISS, imageUrl: getImg(75, 400, 500), quote: "New rules.", bio: "Defining new protocols." },
  { id: 'ms7', number: '52', name: 'Katy P.', class: 'NET-B 2025', categoryId: CategoryId.MISS, imageUrl: getImg(76, 400, 500), quote: "Hear me roar.", bio: "Network administrator." },
  { id: 'ms8', number: '53', name: 'Rihanna F.', class: 'CS-B 2025', categoryId: CategoryId.MISS, imageUrl: getImg(77, 400, 500), quote: "Shine bright like a diamond.", bio: "UI/UX polished perfection." },
  { id: 'ms9', number: '54', name: 'Beyonce K.', class: 'SE-B 2025', categoryId: CategoryId.MISS, imageUrl: getImg(78, 400, 500), quote: "Run the world (girls).", bio: "Project Manager." },
  { id: 'ms10', number: '55', name: 'Adele A.', class: 'DS-B 2025', categoryId: CategoryId.MISS, imageUrl: getImg(79, 400, 500), quote: "Hello, it's me.", bio: "Communication specialist." },
  { id: 'ms11', number: '56', name: 'Lady G.', class: 'WEB-B 2025', categoryId: CategoryId.MISS, imageUrl: getImg(80, 400, 500), quote: "Born this way.", bio: "Advocate for accessibility." },
  { id: 'ms12', number: '57', name: 'Miley C.', class: 'IT-A 2025', categoryId: CategoryId.MISS, imageUrl: getImg(81, 400, 500), quote: "Wrecking ball.", bio: "Breaking monoliths into microservices." },
  { id: 'ms13', number: '58', name: 'Demi L.', class: 'AI-B 2025', categoryId: CategoryId.MISS, imageUrl: getImg(82, 400, 500), quote: "Confident.", bio: "Self-assured coder." },
  { id: 'ms14', number: '59', name: 'Sia F.', class: 'NET-A 2025', categoryId: CategoryId.MISS, imageUrl: getImg(83, 400, 500), quote: "Unstoppable.", bio: "Resilient backend engineer." },
  { id: 'ms15', number: '60', name: 'Halsey', class: 'CS-A 2025', categoryId: CategoryId.MISS, imageUrl: getImg(84, 400, 500), quote: "Without me.", bio: "Indispensable team member." },
];

export const CATEGORIES = [
  { id: CategoryId.KING, label: 'KING', color: 'bg-blue-600' },
  { id: CategoryId.QUEEN, label: 'QUEEN', color: 'bg-pink-600' },
  { id: CategoryId.MISTER, label: 'MISTER', color: 'bg-teal-600' },
  { id: CategoryId.MISS, label: 'MISS', color: 'bg-purple-600' },
];

export const ADMIN_PIN = "2025";