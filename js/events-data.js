// ============================================================
// events-data.js — Central events data store
// ============================================================

const EVENTS = [
  {
    id: 1,
    title: "TechFest 2026",
    category: "technology",
    date: "2026-12-15",
    time: "10:00 AM",
    endTime: "6:00 PM",
    venue: "Silicon Convention Centre, Bangalore",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    description: "Join thousands of tech enthusiasts at TechFest 2026 — the biggest technology conference of the year. Explore cutting-edge innovations in AI, Web3, and quantum computing.",
    longDescription: `TechFest 2026 brings together the brightest minds in technology for a day of inspiration, learning, and networking. From keynote speeches by industry titans to hands-on workshops, this event has something for everyone in the tech community.

Highlights include:
• Keynote by leading AI researchers
• Live product demos from 50+ startups
• Hands-on workshops on ML, blockchain, and cloud
• Networking sessions and career fair
• Hackathon with ₹5 Lakh prize pool`,
    price: 1499,
    capacity: 2000,
    registered: 1543,
    organizer: "TechIndia Foundation",
    tags: ["AI", "Web3", "Innovation", "Networking"],
    featured: true,
    badge: "Featured"
  },
  {
    id: 2,
    title: "Creative Arts Summit",
    category: "arts",
    date: "2026-12-22",
    time: "11:00 AM",
    endTime: "5:00 PM",
    venue: "National Art Gallery, Mumbai",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
    description: "A celebration of creativity and artistic expression featuring exhibitions, live performances, and interactive workshops from renowned artists across India.",
    longDescription: `The Creative Arts Summit is a vibrant celebration of India's rich artistic heritage merged with contemporary expression. Spanning painting, sculpture, digital art, and performance, this event showcases the best of Indian creativity.

What's in store:
• Curated art exhibitions from 100+ artists
• Live mural painting and sculpture sessions
• Photography and digital art competitions
• Panel discussions on the future of art
• Art marketplace with original works for sale`,
    price: 799,
    capacity: 800,
    registered: 412,
    organizer: "Creative India Trust",
    tags: ["Art", "Culture", "Exhibition", "Workshops"],
    featured: true,
    badge: "Popular"
  },
  {
    id: 3,
    title: "Startup Pitch Night",
    category: "business",
    date: "2026-12-28",
    time: "5:00 PM",
    endTime: "9:00 PM",
    venue: "The Leela Business Hub, Delhi",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80",
    description: "Watch 20 promising startups pitch their ideas to top investors. Network with entrepreneurs, VCs, and industry leaders in this electrifying evening of innovation.",
    longDescription: `Startup Pitch Night is the premier platform for early-stage startups to gain visibility, investment, and mentorship. Selected from hundreds of applications, 20 startups take the stage to present their vision to a panel of seasoned investors.

Event Highlights:
• 20 curated startup pitches across 5 sectors
• Live voting by audience and investors
• ₹10 Lakh investment deal on the night
• VIP networking dinner post-event
• One-on-one mentoring sessions`,
    price: 2499,
    capacity: 300,
    registered: 287,
    organizer: "VentureHub India",
    tags: ["Startups", "Investment", "Networking", "Entrepreneurship"],
    featured: true,
    badge: "Hot 🔥"
  },
  {
    id: 4,
    title: "Wellness & Yoga Retreat",
    category: "health",
    date: "2027-01-08",
    time: "6:00 AM",
    endTime: "6:00 PM",
    venue: "Rishikesh Yoga Ashram, Uttarakhand",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    description: "A full-day wellness retreat featuring guided yoga sessions, meditation, Ayurvedic consultations, and organic vegetarian meals in the serene foothills of the Himalayas.",
    longDescription: `Escape the chaos of city life and reconnect with yourself at our annual Wellness & Yoga Retreat held in the spiritual heartland of Rishikesh. This is more than an event — it's a transformational experience.

The day includes:
• Morning yoga and pranayama with master instructors
• Guided meditation and sound healing sessions
• Ayurvedic consultation with certified practitioners
• Nutritious organic meals (breakfast, lunch, dinner)
• Ganga Aarti ceremony at sunset
• Certificate of participation`,
    price: 3999,
    capacity: 150,
    registered: 89,
    organizer: "Holistic Wellness India",
    tags: ["Yoga", "Wellness", "Meditation", "Health"],
    featured: false,
    badge: "New"
  },
  {
    id: 5,
    title: "Music Fest India 2027",
    category: "music",
    date: "2027-01-20",
    time: "3:00 PM",
    endTime: "11:00 PM",
    venue: "JLN Stadium, Hyderabad",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
    description: "India's largest outdoor music festival featuring 30+ artists across indie, electronic, classical fusion, and pop. An unforgettable night of music under the stars.",
    longDescription: `Music Fest India returns in 2027 with its biggest lineup ever! Featuring artists from across the country and globe, this outdoor festival promises an electric atmosphere across 3 main stages and 2 intimate acoustic stages.

Lineup Highlights:
• 30+ artists including international headliners
• 3 stages — Main, Electronic, and Acoustic Fusion
• Food court with 40+ regional cuisine vendors
• Art installations and interactive experiences
• Live streaming for virtual attendees`,
    price: 1299,
    capacity: 15000,
    registered: 9823,
    organizer: "SoundWave Events",
    tags: ["Music", "Festival", "Live", "Entertainment"],
    featured: true,
    badge: "Trending"
  },
  {
    id: 6,
    title: "Data Science Bootcamp",
    category: "technology",
    date: "2027-01-25",
    time: "9:00 AM",
    endTime: "5:00 PM",
    venue: "IIT Madras Research Park, Chennai",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    description: "An intensive one-day bootcamp covering Python for data science, machine learning fundamentals, and real-world case studies. Perfect for beginners and intermediate learners.",
    longDescription: `The Data Science Bootcamp is designed to fast-track your career in one of the world's most in-demand fields. Led by industry practitioners with real-world experience, this bootcamp provides hands-on learning with actual datasets.

Curriculum:
• Python essentials for data science
• Data cleaning and exploratory analysis
• Machine learning algorithms (supervised & unsupervised)
• Model evaluation and deployment basics
• Case study: Build a recommendation engine
• Q&A and career guidance session`,
    price: 2999,
    capacity: 100,
    registered: 67,
    organizer: "DataLearn Academy",
    tags: ["Data Science", "Machine Learning", "Python", "AI"],
    featured: false,
    badge: null
  },
  {
    id: 7,
    title: "Literary Festival Kolkata",
    category: "education",
    date: "2027-02-05",
    time: "10:00 AM",
    endTime: "7:00 PM",
    venue: "Victoria Memorial Grounds, Kolkata",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
    description: "Celebrate the love of literature at Kolkata's most beloved literary festival. Meet authors, attend readings, participate in debates, and discover new books.",
    longDescription: `The Literary Festival Kolkata is a homage to Bengal's timeless literary tradition and India's vibrant contemporary writing scene. Now in its 12th year, the festival draws over 200 authors from India and abroad.

Festival Features:
• 50+ author sessions and panel discussions
• Book launches and meet-and-greet opportunities
• Children's literature zone
• Poetry slams and creative writing workshops
• Translation and regional language sessions
• Books exhibition and marketplace`,
    price: 299,
    capacity: 5000,
    registered: 2156,
    organizer: "Bengal Literature Society",
    tags: ["Literature", "Books", "Culture", "Authors"],
    featured: false,
    badge: "Free Entry"
  },
  {
    id: 8,
    title: "Food & Culture Carnival",
    category: "food",
    date: "2027-02-14",
    time: "12:00 PM",
    endTime: "10:00 PM",
    venue: "Bandra-Kurla Complex, Mumbai",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    description: "A food lover's paradise! Sample cuisines from 25 Indian states and 15 countries. Live cooking demos, celebrity chef appearances, and cultural performances.",
    longDescription: `The Food & Culture Carnival is a gastronomic journey through India and the world, celebrating the universal language of food. Valentine's Day weekend makes this the perfect event for foodie couples and families alike.

What to Expect:
• 200+ food stalls from 25 states and 15 countries
• Live cooking demos by celebrity chefs
• Competitive eating contests with prizes
• Regional folk performances and music
• Food photography competition
• Kids' zone with cooking classes`,
    price: 499,
    capacity: 10000,
    registered: 4321,
    organizer: "Culinary India Foundation",
    tags: ["Food", "Culture", "Carnival", "Cuisine"],
    featured: false,
    badge: "Valentine's Special"
  }
];

// Category definitions
const CATEGORIES = [
  { id: "all", label: "All Events", icon: "🎯" },
  { id: "technology", label: "Technology", icon: "💻" },
  { id: "arts", label: "Arts & Culture", icon: "🎨" },
  { id: "business", label: "Business", icon: "💼" },
  { id: "health", label: "Health & Wellness", icon: "🧘" },
  { id: "music", label: "Music", icon: "🎵" },
  { id: "education", label: "Education", icon: "📚" },
  { id: "food", label: "Food & Drinks", icon: "🍽️" }
];

// Utility functions
function getEventById(id) {
  return EVENTS.find(e => e.id === parseInt(id));
}

function getFeaturedEvents() {
  return EVENTS.filter(e => e.featured);
}

function getEventsByCategory(category) {
  if (category === "all") return EVENTS;
  return EVENTS.filter(e => e.category === category);
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function formatShortDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function getDaysUntil(dateStr) {
  const eventDate = new Date(dateStr);
  const now = new Date();
  const diff = eventDate - now;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function getSpotsLeft(event) {
  return event.capacity - event.registered;
}

function getAvailabilityPercent(event) {
  return Math.round((event.registered / event.capacity) * 100);
}
