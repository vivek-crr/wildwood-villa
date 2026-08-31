"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
  Trees,
  Compass,
  MapPin,
  Users,
  Wifi,
  Utensils,
  Car,
  Zap,
  Flame,
  ShieldAlert,
  PhoneCall,
  Clock,
  Send,
  BedDouble,
  ChevronRight,
  Menu,
  X,
  Droplet,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Footprints,
  Info,
  HeartHandshake,
  ConciergeBell,
  Bath,
  Image as ImageIcon,
  AlertCircle
} from 'lucide-react';

const PLACEHOLDER_PHONE = "917306818377";
const PLACEHOLDER_EMAIL = "stay@thewildwoodvilla.com";
const PLACEHOLDER_LOCATION = "Anchunadu (Marayoor), Idukki, Kerala";
const GOOGLE_MAPS_PIN_URL = "https://www.google.com/maps/place/AYOTHYA+STORE/@10.2688039,77.1537213,743m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3b0783fdd7b03339:0x72ff34d4ed729f54!8m2!3d10.2687986!4d77.1562962!16s%2Fg%2F11t1btfjlt!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDgyNS4wIKXMDSoASAFQAw%3D%3D";
const PLACEHOLDER_MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.3575971439486!2d77.1537213!3d10.2688039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0783fdd7b03339%3A0x72ff34d4ed729f54!2sAYOTHYA%20STORE!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";

const ASSETS = {
  logo: "/logo.png",
  hero: "/exterior night2.png",
  heroFallback: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80",
  villa: "/exterior day.jpg",
  villaFallback: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
  room: "/bedroom.jpg",
  roomFallback: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
  campfire: "/campfire.png",
  campfireFallback: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1000&q=80",
  safari: "/jeep safari.png",
  safariFallback: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80",
  dining: "/meals.png",
  diningFallback: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1000&q=80",
  attraction1: "/sandal.png",
  attraction1Fallback: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80",
  attraction2: "/irachilpara.png",
  attraction2Fallback: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1000&q=80",
  attraction3: "/anakottappara.png",
  attraction3Fallback: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=80",
  attraction4: "/lakkom.png",
  attraction4Fallback: "https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1000&q=80",
  attraction5: "/bhramaram.png",
  attraction5Fallback: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80"
};

const GALLERY_DATA = [
  {
    id: 1,
    category: "villa",
    categoryLabel: "Villa & Grounds",
    title: "Villa Day View",
    path: "/exterior day.jpg",
    fallback: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    category: "villa",
    categoryLabel: "Villa & Grounds",
    title: "Villa Evening View",
    path: "/exterior evening.jpg",
    fallback: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    category: "villa",
    categoryLabel: "Villa & Grounds",
    title: "Villa Night Ambiance",
    path: "/exterior night.jpg",
    fallback: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    category: "villa",
    categoryLabel: "Villa & Grounds",
    title: "Front Area",
    path: "/front area.jpg",
    fallback: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    category: "rooms",
    categoryLabel: "Rooms & Interiors",
    title: "Bedrooms",
    path: "/bedroom.jpg",
    fallback: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    category: "rooms",
    categoryLabel: "Rooms & Interiors",
    title: "Bathroom",
    path: "/bathroom.jpg",
    fallback: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    category: "dining",
    categoryLabel: "Dining",
    title: "Dining",
    path: "/dining2.jpg",
    fallback: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    category: "ambience",
    categoryLabel: "Experiences",
    title: "Campfire Evenings",
    path: "/campfire.png",
    fallback: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 9,
    category: "ambience",
    categoryLabel: "Experiences",
    title: "Jeep Safari",
    path: "/jeep safari.png",
    fallback: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80"
  }
];

interface NavProps {
  currentPath?: string;
  navigate: (path: string) => void;
}

function Navbar({ currentPath = '/', navigate }: NavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Stays', path: '/stays' },
    { name: 'Experiences', path: '/experiences' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Location & Advisory', path: '/location' },
    { name: 'Contact & Book', path: '/book' },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <button 
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="w-12 h-12 rounded-xl bg-white border border-stone-200/80 flex items-center justify-center p-1 shadow-sm overflow-hidden group-hover:border-emerald-800 transition-colors">
            <img 
              src={ASSETS.logo} 
              alt="The WildWood Villa Logo" 
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
          <div>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1E3A2F] block leading-none">
              The WildWood Villa
            </span>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`transition-colors py-1 relative ${
                  isActive 
                    ? 'text-[#1E3A2F] font-semibold' 
                    : 'hover:text-[#1E3A2F]'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1E3A2F] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => handleNavClick('/book')}
            className="bg-[#1E3A2F] hover:bg-emerald-900 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm hover:shadow flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-emerald-300" />
            <span>Book via WhatsApp</span>
          </button>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-stone-700 hover:text-stone-950 rounded-xl hover:bg-stone-200/50"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-[#FAF9F6] px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`w-full text-left px-4 py-3 rounded-xl font-medium text-sm transition-colors flex items-center justify-between ${
                  isActive
                    ? 'bg-[#1E3A2F] text-white font-semibold'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 opacity-60" />
              </button>
            );
          })}

          <div className="pt-2">
            <button
              onClick={() => handleNavClick('/book')}
              className="w-full bg-[#1E3A2F] text-white py-3 rounded-xl font-medium text-sm shadow-sm flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-300" />
              <span>Book via WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer({ navigate, onOpenPolicy }: { navigate: (path: string) => void; onOpenPolicy: (type: 'terms' | 'privacy') => void }) {
  return (
    <footer className="bg-[#1E3A2F] text-stone-300 py-16 border-t border-emerald-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center p-1 shadow-sm overflow-hidden">
                <img 
                  src={ASSETS.logo} 
                  alt="The WildWood Villa Logo" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-tight">
                The WildWood Villa
              </span>
            </div>
            <p className="text-sm text-stone-300/80 max-w-md leading-relaxed font-normal">
              A private luxury nature villa immersed in raw forest peace. Experience starry night fires, rustic trails and homemade culinary delights in total privacy.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-amber-200/90 font-medium">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{PLACEHOLDER_LOCATION}</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400">Quick Navigation</h4>
            <ul className="space-y-2 text-sm text-stone-300/90 font-medium">
              <li>
                <button onClick={() => navigate('/')} className="hover:text-white transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/stays')} className="hover:text-white transition-colors">
                  Stay Options
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/experiences')} className="hover:text-white transition-colors">
                  Experiences & Facilities
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/gallery')} className="hover:text-white transition-colors">
                  Property Gallery
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/location')} className="hover:text-white transition-colors">
                  Location & Road Advisory
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/book')} className="hover:text-white transition-colors">
                  WhatsApp Reservations
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400">Direct Contact</h4>
            <ul className="space-y-2.5 text-sm text-stone-300/90">
              <li className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:+${PLACEHOLDER_PHONE}`} className="hover:text-white transition-colors">
                  +{PLACEHOLDER_PHONE}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`https://wa.me/${PLACEHOLDER_PHONE}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  WhatsApp Direct Inquiry
                </a>
              </li>
              <li className="flex items-center gap-2">
                <ConciergeBell className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${PLACEHOLDER_EMAIL}`} className="hover:text-white transition-colors">
                  {PLACEHOLDER_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} The WildWood Villa. All rights reserved.</p>
          <div className="flex gap-6 flex-wrap">
            <button onClick={() => navigate('/location')} className="hover:text-stone-200">
              Vehicle Clearance Guide
            </button>
            <button onClick={() => onOpenPolicy('terms')} className="hover:text-stone-200">
              Terms & Conditions
            </button>
            <button onClick={() => onOpenPolicy('privacy')} className="hover:text-stone-200">
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeLightboxImage, setActiveLightboxImage] = useState<typeof GALLERY_DATA[0] | null>(null);

  const categories = [
    { id: "all", label: "All" },
    { id: "villa", label: "Villa & Grounds" },
    { id: "rooms", label: "Rooms & Interiors" },
    { id: "dining", label: "Dining" },
    { id: "ambience", label: "Experiences" }
  ];

  const filteredPhotos = useMemo(() => {
    if (activeCategory === "all") return GALLERY_DATA;
    return GALLERY_DATA.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 text-xs font-semibold">
          <ImageIcon className="w-3.5 h-3.5 text-emerald-700" />
          <span>Visual Tour</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E3A2F]">Property Gallery</h2>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Explore spaces across The WildWood Villa — peaceful forest surrounds, cozy private rooms, dining, and serene nature ambience. Click any photo to view full size.
        </p>
      </div>

      <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all shadow-sm ${
                isSelected
                  ? "bg-[#1E3A2F] text-white shadow-md scale-105"
                  : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-50 hover:text-stone-950"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pt-4">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setActiveLightboxImage(photo)}
            className="group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] bg-stone-100 border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <img
              src={photo.path}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = photo.fallback;
              }}
              alt={photo.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
            
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 backdrop-blur-md text-[10px] font-semibold text-amber-200 border border-amber-300/20">
                {photo.categoryLabel}
              </span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 text-white">
              <p className="font-serif text-xs sm:text-sm font-bold leading-tight drop-shadow-sm">
                {photo.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeLightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveLightboxImage(null)}
        >
          <div 
            className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLightboxImage(null)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={activeLightboxImage.path}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = activeLightboxImage.fallback;
              }}
              alt={activeLightboxImage.title}
              className="max-h-[80vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
            />
            <div className="mt-4 text-center">
              <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold block mb-1">
                {activeLightboxImage.categoryLabel}
              </span>
              <h3 className="font-serif text-xl font-bold text-white">
                {activeLightboxImage.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function BookingForm({ initialStay = 'villa' }: { initialStay?: string }) {
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    stayType: initialStay,
    rooms: initialStay === 'villa' ? '5' : '1',
    guests: initialStay === 'villa' ? '8' : '2',
    checkIn: '',
    checkOut: '',
    notes: ''
  });

  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [submittedEnquiry, setSubmittedEnquiry] = useState<{
    waUrl: string;
    details: {
      name: string;
      phone: string;
      stayLabel: string;
      rooms: string;
      guests: string;
      checkIn: string;
      checkOut: string;
      nights: number;
    };
  } | null>(null);

  useEffect(() => {
    if (initialStay) {
      setFormData(prev => ({
        ...prev,
        stayType: initialStay,
        rooms: initialStay === 'villa' ? '5' : '1',
        guests: initialStay === 'villa' ? '8' : '2'
      }));
    }
  }, [initialStay]);

  const minCheckOutDate = useMemo(() => {
    if (!formData.checkIn) return todayStr;
    const nextDay = new Date(formData.checkIn);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay.toISOString().split('T')[0];
  }, [formData.checkIn, todayStr]);

  const nightsCount = useMemo(() => {
    if (!formData.checkIn || !formData.checkOut) return 1;
    const start = new Date(formData.checkIn);
    const end = new Date(formData.checkOut);
    const diffTime = end.getTime() - start.getTime();
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 1;
  }, [formData.checkIn, formData.checkOut]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];

    // 10-digit mobile number validation
    const cleanedPhone = formData.phone.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanedPhone) && cleanedPhone.length !== 10) {
      errors.push("Please enter a valid 10-digit Indian mobile number.");
    }

    // Guest vs Room ratio validation (Max 3 guests per room)
    const numRooms = parseInt(formData.rooms) || 1;
    const numGuests = parseInt(formData.guests) || 1;
    if (formData.stayType === 'room' && numGuests > numRooms * 3) {
      errors.push(`Maximum 3 guests are allowed per room (${numRooms * 3} guests for ${numRooms} room(s)). Please increase the number of rooms.`);
    }

    // Check-in and Check-out Date validation
    if (!formData.checkIn) {
      errors.push("Check-in date is required.");
    } else if (formData.checkIn < todayStr) {
      errors.push("Check-in date cannot be in the past.");
    }

    if (!formData.checkOut) {
      errors.push("Check-out date is required.");
    } else if (formData.checkOut <= formData.checkIn) {
      errors.push("Check-out date must be after check-in date.");
    }

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors([]);

    const stayLabel = formData.stayType === 'villa' 
      ? 'Entire Villa Buyout (Private Buyout)' 
      : 'Individual Room(s)';

    const formattedMessage = `*🌲 New Resort Booking Enquiry*
──────────────────────────
👤 *Guest Name:* ${formData.name}
📞 *Mobile:* ${formData.phone}

🏡 *Room Type:* ${stayLabel}
🚪 *Number of Rooms:* ${formData.rooms}
👥 *Number of Guests:* ${formData.guests}

📅 *Check-in:* ${formData.checkIn}
📅 *Check-out:* ${formData.checkOut}
🌙 *Number of Nights:* ${nightsCount}
──────────────────────────
📝 *Special Requests / Notes:*
${formData.notes || 'None'}

Please confirm availability and share pricing / booking details.`;

    const encodedMessage = encodeURIComponent(formattedMessage);
    const waUrl = `https://wa.me/${PLACEHOLDER_PHONE}?text=${encodedMessage}`;

    setSubmittedEnquiry({
      waUrl,
      details: {
        name: formData.name,
        phone: formData.phone,
        stayLabel,
        rooms: formData.rooms,
        guests: formData.guests,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        nights: nightsCount
      }
    });

    window.open(waUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xl space-y-8">
      {submittedEnquiry ? (
        <div className="text-center py-8 space-y-6 max-w-xl mx-auto">
          <div className="w-16 h-16 bg-emerald-100 text-[#1E3A2F] rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-9 h-9 text-emerald-700" />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-3xl font-bold text-[#1E3A2F]">Thank You, {submittedEnquiry.details.name}!</h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Your booking enquiry for <strong>{submittedEnquiry.details.stayLabel}</strong> ({submittedEnquiry.details.checkIn} to {submittedEnquiry.details.checkOut}) has been prepared.
            </p>
            <p className="text-xs text-amber-900 bg-amber-50 border border-amber-200 rounded-xl p-3 inline-block mt-2">
              ℹ️ Please click the button below to continue on WhatsApp to receive rates and confirm availability.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <a
              href={submittedEnquiry.waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1E3A2F] hover:bg-emerald-950 text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-300" />
              <span>Continue on WhatsApp</span>
            </a>
            <button
              onClick={() => setSubmittedEnquiry(null)}
              className="bg-stone-100 hover:bg-stone-200 text-stone-700 px-6 py-4 rounded-2xl font-semibold text-sm transition-all"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              Direct WhatsApp Reservation
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#1E3A2F]">Check Availability & Rates</h2>
            <p className="text-sm text-stone-600 max-w-lg mx-auto">
              Submit your dates and guest count below to receive seasonal rates and availability directly from our host on WhatsApp.
            </p>
          </div>

          {formErrors.length > 0 && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl space-y-1 text-xs text-red-700">
              <div className="flex items-center gap-2 font-bold text-red-800">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>Please correct the following errors:</span>
              </div>
              <ul className="list-disc pl-6 space-y-0.5 pt-1">
                {formErrors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                  Guest Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#1E3A2F] focus:bg-white text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                  Mobile Number * (10-Digit)
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#1E3A2F] focus:bg-white text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                  Stay Option *
                </label>
                <select
                  value={formData.stayType}
                  onChange={(e) => {
                    const st = e.target.value;
                    setFormData({
                      ...formData,
                      stayType: st,
                      rooms: st === 'villa' ? '5' : '1',
                      guests: st === 'villa' ? '8' : '2'
                    });
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#1E3A2F] focus:bg-white text-sm font-medium"
                >
                  <option value="villa">Entire Villa Buyout</option>
                  <option value="room">Individual Room(s)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                  Number of Rooms *
                </label>
                {formData.stayType === 'villa' ? (
                  <input
                    type="text"
                    disabled
                    value="5 Bedrooms (Entire Villa)"
                    className="w-full px-4 py-3 rounded-xl bg-stone-100 border border-stone-200 text-stone-600 text-sm font-medium cursor-not-allowed"
                  />
                ) : (
                  <select
                    value={formData.rooms}
                    onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#1E3A2F] focus:bg-white text-sm font-medium"
                  >
                    <option value="1">1 Room (Max 3 Guests)</option>
                    <option value="2">2 Rooms (Max 6 Guests)</option>
                    <option value="3">3 Rooms (Max 9 Guests)</option>
                    <option value="4">4 Rooms (Max 12 Guests)</option>
                  </select>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                  Number of Guests *
                </label>
                <input
                  type="number"
                  min="1"
                  max={formData.stayType === 'villa' ? "15" : (parseInt(formData.rooms) * 3).toString()}
                  required
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#1E3A2F] focus:bg-white text-sm"
                />
                <p className="text-[11px] text-stone-500">
                  {formData.stayType === 'room' ? `Max 3 guests/room (${parseInt(formData.rooms) * 3} max)` : 'Up to 10–12 guests base'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                  Check-In Date *
                </label>
                <input
                  type="date"
                  required
                  min={todayStr}
                  value={formData.checkIn}
                  onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#1E3A2F] focus:bg-white text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                  Check-Out Date *
                </label>
                <input
                  type="date"
                  required
                  min={minCheckOutDate}
                  value={formData.checkOut}
                  onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#1E3A2F] focus:bg-white text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                Special Requests / Notes
              </label>
              <textarea
                rows={3}
                placeholder="Jeep pickup required at junction, dietary preferences, arrival time..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#1E3A2F] focus:bg-white text-sm"
              />
            </div>

            <div className="p-4 bg-stone-50 border border-stone-200/80 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs text-stone-500 font-medium">Selected Duration</p>
                <p className="text-sm font-bold text-[#1E3A2F]">
                  {nightsCount} Night(s) Stay
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full">
                  Rates on WhatsApp
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl font-bold bg-[#1E3A2F] hover:bg-emerald-950 text-white transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3 text-sm sm:text-base"
            >
              <Send className="w-5 h-5 text-emerald-400" />
              <span>Get Rates & Check Availability via WhatsApp</span>
            </button>
          </form>
        </>
      )}
    </div>
  );
}

function HomePage({ navigate }: { navigate: (path: string) => void }) {
  return (
    <div className="space-y-20 pb-20">
      {/* Responsive Hero Background optimized for Mobile & Desktop */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-stone-950">
        <img
          src={ASSETS.hero}
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = ASSETS.heroFallback; }}
          alt="The WildWood Villa Exterior"
          className="absolute inset-0 w-full h-full object-cover object-[center_40%] sm:object-center filter brightness-95 scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 space-y-6 pt-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/90 text-amber-200 text-xs font-semibold backdrop-blur-md border border-amber-300/30">
            <Trees className="w-4 h-4" />
            <span>Exclusive Nature Homestay</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-md">
            The WildWood Villa
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => navigate('/stays')}
              className="w-full sm:w-auto bg-amber-100 hover:bg-white text-[#1E3A2F] px-8 py-3.5 rounded-full text-sm font-bold transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <span>Explore Stay Options</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/book')}
              className="w-full sm:w-auto bg-[#1E3A2F] hover:bg-emerald-900 text-white px-8 py-3.5 rounded-full text-sm font-bold border border-white/20 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-300" />
              <span>Book via WhatsApp</span>
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-amber-800 font-bold">The Retreat Experience</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E3A2F] leading-snug">
              Immerse yourself in calm & untouched natural beauty.
            </h2>
            <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
              Set inside a one acre area in Anchunadu (Marayoor-Kanthalloor), Idukki, The WildWood Villa offers high-altitude freshness without city noises or crowded resort corridors. Enjoy authentic homemade regional meals, open skies, and peaceful seclusion.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-stone-100/80 border border-stone-200">
                <p className="text-2xl font-serif font-bold text-[#1E3A2F]">100%</p>
                <p className="text-xs text-stone-500 font-medium">Villa Seclusion</p>
              </div>
              <div className="p-4 rounded-2xl bg-stone-100/80 border border-stone-200">
                <p className="text-2xl font-serif font-bold text-[#1E3A2F]">360°</p>
                <p className="text-xs text-stone-500 font-medium">Forest & Mountain Views</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] relative bg-stone-100">
              <img
                src={ASSETS.dining}
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = ASSETS.diningFallback; }}
                alt="Fresh culinary meals prepared on order"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs uppercase tracking-widest text-amber-200 font-bold">Our Hospitality</p>
                <p className="text-sm font-medium">Fresh culinary meals prepared on order.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stay Cards */}
      <section className="bg-stone-100/80 py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#1E3A2F] font-bold">Accommodations</span>
              <h2 className="font-serif text-3xl font-bold text-[#1E3A2F]">Featured Stay Options</h2>
            </div>
            <button
              onClick={() => navigate('/stays')}
              className="text-sm font-bold text-[#1E3A2F] hover:underline flex items-center gap-1"
            >
              <span>Explore All Stay Options</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="aspect-[16/10] relative overflow-hidden bg-stone-100">
                  <img
                    src={ASSETS.villa}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = ASSETS.villaFallback; }}
                    alt="Entire Villa"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-serif text-2xl font-bold text-[#1E3A2F]">Entire Villa</h3>
                    <span className="text-xs font-semibold text-amber-900 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                      Rates on WhatsApp
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-2">Spacious private sanctuary for full family gatherings and groups.</p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <button
                  onClick={() => navigate('/book?stay=villa')}
                  className="w-full py-3 bg-stone-100 hover:bg-[#1E3A2F] hover:text-white text-stone-800 rounded-xl font-medium text-sm transition-colors"
                >
                  Enquire Entire Villa
                </button>
              </div>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="aspect-[16/10] relative overflow-hidden bg-stone-100">
                  <img
                    src={ASSETS.room}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = ASSETS.roomFallback; }}
                    alt="Individual Room"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-serif text-2xl font-bold text-[#1E3A2F]">Individual Room</h3>
                    <span className="text-xs font-semibold text-amber-900 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                      Rates on WhatsApp
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-2">Cozy private room with modern amenities for couples and small families.</p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <button
                  onClick={() => navigate('/book?stay=room')}
                  className="w-full py-3 bg-stone-100 hover:bg-[#1E3A2F] hover:text-white text-stone-800 rounded-xl font-medium text-sm transition-colors"
                >
                  Enquire Individual Room
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-800 font-bold">Unforgettable Memories</span>
          <h2 className="font-serif text-3xl font-bold text-[#1E3A2F]">Signature Adventures</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative rounded-3xl overflow-hidden min-h-[320px] flex flex-col justify-end p-8 text-white border border-stone-200 group">
            <img
              src={ASSETS.campfire}
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = ASSETS.campfireFallback; }}
              alt="Evening Campfire"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <div className="relative z-10 space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/80 text-xs font-semibold">
                <Flame className="w-3.5 h-3.5" /> Evening Feature
              </span>
              <h3 className="font-serif text-2xl font-bold">Starlight Campfire & BBQ</h3>
              <p className="text-xs text-stone-200">Warm outdoor firepit with roasted snacks.</p>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden min-h-[320px] flex flex-col justify-end p-8 text-white border border-stone-200 group">
            <img
              src={ASSETS.safari}
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = ASSETS.safariFallback; }}
              alt="Jeep Safari"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <div className="relative z-10 space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/80 text-xs font-semibold">
                <Compass className="w-3.5 h-3.5" /> Outdoor Excursion
              </span>
              <h3 className="font-serif text-2xl font-bold">Off-Road Jeep Safari</h3>
              <p className="text-xs text-stone-200">Rugged mountain trails and hidden viewpoints drives.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-100 text-amber-900 rounded-2xl shrink-0">
              <Car className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-lg text-amber-950">Driving to The WildWood Villa?</h4>
              <p className="text-xs text-amber-900 leading-relaxed max-w-xl">
                The last 1.7 kms is an unpaved forest track. Suitable for all cars/SUVs. Jeep transfer available at junction on request for mini-buses/tempo travellers.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/location')}
            className="shrink-0 bg-[#1E3A2F] text-white px-6 py-3 rounded-xl text-xs font-bold transition-colors hover:bg-emerald-950 flex items-center gap-2"
          >
            <span>Read Road Guide</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}

function StaysPage({ navigate }: { navigate: (path: string) => void }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#1E3A2F] font-bold">Accommodations</span>
        <h1 className="font-serif text-4xl font-bold text-[#1E3A2F]">Choose Your Stay</h1>
        <p className="text-stone-600 text-sm sm:text-base">
          Choose between full private villa buyout for large families or cozy individual rooms.
        </p>
      </div>

      <div className="bg-amber-50/90 border border-amber-200/90 rounded-2xl p-5 sm:p-6 space-y-3 shadow-sm">
        <div className="flex items-center gap-2.5 text-amber-950 font-bold text-sm sm:text-base">
          <Info className="w-5 h-5 text-amber-700 shrink-0" />
          <span>Stay Coverage & Add-On Services Note</span>
        </div>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
          Room and Villa reservations cover <strong>accommodation only</strong>. All additional services and meals are optional add-ons arranged on order.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700 pt-1">
          <div className="flex items-start gap-2 bg-white/90 p-3 rounded-xl border border-amber-200/70">
            <Utensils className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-900 block font-semibold">Cook on Demand</strong>
              Available for <strong>Breakfast and Dinner only</strong> (additional cost for food/groceries).
            </div>
          </div>
          <div className="flex items-start gap-2 bg-white/90 p-3 rounded-xl border border-amber-200/70">
            <Sparkles className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-900 block font-semibold">Separate Paid Services</strong>
              Food/Meals, Jeep Pickup & Drop, Campfire & Music setup, and Off-Road Jeep Safari.
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="lg:col-span-5 aspect-[16/10] lg:aspect-auto relative overflow-hidden bg-stone-100">
            <img
              src={ASSETS.villa}
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = ASSETS.villaFallback; }}
              alt="Entire Villa"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute top-4 left-4 bg-[#1E3A2F] text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              Private Buyout
            </div>
          </div>

          <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-baseline flex-wrap gap-2">
                <h2 className="font-serif text-3xl font-bold text-[#1E3A2F]">Entire Villa</h2>
                <span className="text-xs font-semibold text-amber-900 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                  Rates on WhatsApp
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex items-center gap-2.5 text-xs font-semibold text-stone-800">
                  <Users className="w-4 h-4 text-[#1E3A2F]" />
                  <span>Up to 10–12 Guests</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex items-center gap-2.5 text-xs font-semibold text-stone-800">
                  <BedDouble className="w-4 h-4 text-[#1E3A2F]" />
                  <span>5 Bedrooms</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex items-center gap-2.5 text-xs font-semibold text-stone-800">
                  <Utensils className="w-4 h-4 text-[#1E3A2F]" />
                  <span>Private Kitchen</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">Included Amenities</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-700" /> Hot Water Geyser</div>
                  <div className="flex items-center gap-2"><Trees className="w-4 h-4 text-emerald-700" /> Exclusive private lawn & outdoor space</div>
                  <div className="flex items-center gap-2"><Utensils className="w-4 h-4 text-emerald-700" /> Cook on demand (Breakfast & Dinner only)</div>
                  <div className="flex items-center gap-2"><Wifi className="w-4 h-4 text-emerald-700" /> High-Speed Optical Wi-Fi</div>
                  <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-emerald-700" /> 24/7 Power backup</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs text-stone-500 font-medium">Mutual exclusion logic applies when booked.</span>
              <button
                onClick={() => navigate('/book?stay=villa')}
                className="bg-[#1E3A2F] hover:bg-emerald-900 text-white px-6 py-3 rounded-xl text-xs font-bold transition-colors flex items-center gap-2"
              >
                <span>Enquire Entire Villa</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="lg:col-span-5 aspect-[16/10] lg:aspect-auto relative overflow-hidden bg-stone-100">
            <img
              src={ASSETS.room}
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = ASSETS.roomFallback; }}
              alt="Individual Room"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute top-4 left-4 bg-amber-800 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              Individual Room
            </div>
          </div>

          <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-baseline flex-wrap gap-2">
                <h2 className="font-serif text-3xl font-bold text-[#1E3A2F]">Individual Room</h2>
                <span className="text-xs font-semibold text-amber-900 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                  Rates on WhatsApp
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex items-center gap-2.5 text-xs font-semibold text-stone-800">
                  <Users className="w-4 h-4 text-[#1E3A2F]" />
                  <span>2–3 Guests Max</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex items-center gap-2.5 text-xs font-semibold text-stone-800">
                  <BedDouble className="w-4 h-4 text-[#1E3A2F]" />
                  <span>1 King Bed</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">Included Amenities</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-700" /> Hot Water Geyser</div>
                  <div className="flex items-center gap-2"><Bath className="w-4 h-4 text-emerald-700" /> Attached Bathroom</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs text-stone-500 font-medium">Direct enquiry via WhatsApp</span>
              <button
                onClick={() => navigate('/book?stay=room')}
                className="bg-[#1E3A2F] hover:bg-emerald-900 text-white px-6 py-3 rounded-xl text-xs font-bold transition-colors flex items-center gap-2"
              >
                <span>Enquire This Room</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExperiencesPage() {
  const facilities = [
    { title: 'High-Speed Wi-Fi', desc: 'Optical fiber connection suitable for workation calls', icon: Wifi },
    { title: 'Home-Cooked Meals', desc: 'Authentic regional recipes prepared fresh on order', icon: Utensils },
    { title: 'Free Private Parking', desc: 'Secure parking space on the private estate lawn', icon: Car },
    { title: '24/7 Power Backup', desc: 'Inverter system for uninterrupted lighting and Wi-Fi', icon: Zap },
    { title: 'Hot Water Geysers', desc: 'Continuous hot water in all attached modern bathrooms', icon: Droplet },
    { title: 'Forest Walking Trails', desc: 'Private guided paths through estate pine slopes', icon: Footprints },
    { title: 'Barbecue Setup', desc: 'Outdoor grill and marinated snacks available on request', icon: Flame },
    { title: 'Caretaker Assistance', desc: 'On-site host family ready to assist you anytime', icon: HeartHandshake }
  ];

  const attractions = [
    {
      badge: "10 mins drive",
      name: "Marayoor Sandalwood Forest",
      description: "Explore natural fragrant sandalwood reserves and scenic woodland drives unique to the Marayoor valley.",
      image: ASSETS.attraction1,
      fallback: ASSETS.attraction1Fallback,
    },
    {
      badge: "15 mins drive",
      name: "Irachilpara Waterfalls",
      description: "A peaceful cascade cascading down rocky terrain, ideal for refreshing morning stops and photography.",
      image: ASSETS.attraction2,
      fallback: ASSETS.attraction2Fallback,
    },
    {
      badge: "8 mins drive",
      name: "Muniyara – Anakottappara Park",
      description: "Ancient Megalithic dolmens and dolmenoid cists perched on panoramic rock formations offering valley views.",
      image: ASSETS.attraction3,
      fallback: ASSETS.attraction3Fallback,
    },
    {
      badge: "20 mins drive",
      name: "Lakkom Waterfalls",
      description: "A stunning crystal-clear cascade nestled amidst dense shola forest and tea slopes along the Marayoor route.",
      image: ASSETS.attraction4,
      fallback: ASSETS.attraction4Fallback,
    },
    {
      badge: "15 mins drive",
      name: "Brahmaram Point",
      description: "A breathtaking cliff-edge viewpoint offering sweeping panoramic vistas of the mist-covered valleys and rolling hills.",
      image: ASSETS.attraction5,
      fallback: ASSETS.attraction5Fallback,
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#1E3A2F] font-bold">Curated Activities & Sights</span>
        <h1 className="font-serif text-4xl font-bold text-[#1E3A2F]">Experiences & Surroundings</h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          From cozy campfire evenings at the villa to exploring hidden attractions nearby, immerse yourself in nature.
        </p>
      </div>

      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-800 font-bold">At the Villa</span>
          <h2 className="font-serif text-3xl font-bold text-[#1E3A2F]">On-Site Signature Experiences</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative rounded-3xl overflow-hidden min-h-[360px] flex flex-col justify-end p-8 text-white border border-stone-200 group shadow-sm hover:shadow-md transition-all">
            <img
              src={ASSETS.campfire}
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = ASSETS.campfireFallback; }}
              alt="Evening Campfire & Stargazing"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            
            <div className="absolute top-6 left-6 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-stone-950 font-bold text-xs shadow-sm backdrop-blur-sm">
                <Flame className="w-3.5 h-3.5" /> Nightly Feature
              </span>
            </div>

            <div className="relative z-10 space-y-2">
              <h3 className="font-serif text-2xl font-bold text-white leading-tight">
                Evening Campfire & Stargazing
              </h3>
              <p className="text-xs text-stone-200 leading-relaxed font-light">
                Gather around a warm private fire pit under clear starry skies with tea and BBQ on request.
              </p>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden min-h-[360px] flex flex-col justify-end p-8 text-white border border-stone-200 group shadow-sm hover:shadow-md transition-all">
            <img
              src={ASSETS.safari}
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = ASSETS.safariFallback; }}
              alt="Off-Road Jeep Safari"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            
            <div className="absolute top-6 left-6 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700 text-white font-bold text-xs shadow-sm backdrop-blur-sm">
                <Compass className="w-3.5 h-3.5" /> Adventure Feature
              </span>
            </div>

            <div className="relative z-10 space-y-2">
              <h3 className="font-serif text-2xl font-bold text-white leading-tight">
                Off-Road Jeep Safari
              </h3>
              <p className="text-xs text-stone-200 leading-relaxed font-light">
                Rugged mountain trails and hidden viewpoints drives.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8 pt-4">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-800 font-bold">Explore the Region</span>
          <h2 className="font-serif text-3xl font-bold text-[#1E3A2F]">Nearby Attractions & Places to Explore</h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Explore scenic sights located just a short drive from The WildWood Villa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {attractions.map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-3xl overflow-hidden min-h-[360px] flex flex-col justify-between p-6 text-white border border-stone-200 group shadow-sm hover:shadow-md transition-all"
            >
              <img
                src={item.image}
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = item.fallback; }}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              
              <div className="relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/90 text-stone-950 font-bold text-xs shadow-sm backdrop-blur-sm">
                  <Compass className="w-3.5 h-3.5" /> {item.badge}
                </span>
              </div>

              <div className="relative z-10 space-y-2">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight">
                  {item.name}
                </h3>
                <p className="text-xs text-stone-200 leading-relaxed font-light">
                  {item.description}
                </p>
                <div className="pt-1 flex items-center gap-1.5 text-[11px] text-amber-300 font-medium">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.badge}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-8 pt-4">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-800 font-bold">Thoughtful Comforts</span>
          <h2 className="font-serif text-3xl font-bold text-[#1E3A2F]">On-Site Villa Facilities</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {facilities.map((fac, idx) => {
            const IconComp = fac.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-3 text-center hover:border-emerald-700/40 transition-colors"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 text-[#1E3A2F] flex items-center justify-center">
                  <IconComp className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-[#1E3A2F]">{fac.title}</h4>
                <p className="text-xs text-stone-500 leading-relaxed">{fac.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function LocationPage() {
  const connectingCities = [
    { name: "Palani", distance: "Approx. 45 km", duration: "1.5 – 2 hrs drive", tag: "Tamil Nadu Route" },
    { name: "Munnar Town", distance: "Approx. 40 km", duration: "1.5 hrs drive", tag: "Scenic Hill Route" },
    { name: "Coimbatore", distance: "Approx. 115 km", duration: "3 – 3.5 hrs drive", tag: "Airport & Rail Hub" },
    { name: "Kochi (Cochin)", distance: "Approx. 170 km", duration: "4.5 – 5 hrs drive", tag: "Airport Hub" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#1E3A2F] font-bold">Directions & Access</span>
        <h1 className="font-serif text-4xl font-bold text-[#1E3A2F]">Location & Vehicle Clearance Guide</h1>
        <p className="text-stone-600 text-sm sm:text-base">
          Location: <strong className="text-stone-800">{PLACEHOLDER_LOCATION}</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 border border-stone-200 shadow-sm space-y-4">
          <div className="w-full h-80 rounded-2xl overflow-hidden bg-stone-200 relative">
            <iframe
              title="WildWood Villa Location Map"
              src={PLACEHOLDER_MAP_EMBED_URL}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between text-xs text-stone-600 font-medium px-1">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#1E3A2F]" />
                Main Road Landmark Meeting Point
              </span>
            </div>

            <a
              href={GOOGLE_MAPS_PIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 bg-[#1E3A2F] hover:bg-emerald-950 text-white rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Open Main Road Pin on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-300" />
            </a>

            <p className="text-[11px] text-stone-500 leading-relaxed text-center px-1">
              📍 This navigation link directs you to the paved main road junction landmark (AYOTHYA STORE). Host off-road Jeep support and luggage transfer is available from here for the final 1.7 km stretch to the villa (additional charges apply).
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 bg-amber-50/80 border-2 border-amber-200 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-100 text-amber-900 rounded-2xl shrink-0 mt-0.5">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-amber-950">
                Important: Unpaved Estate Road Notice
              </h3>
              <p className="text-xs sm:text-sm text-amber-900 mt-1 leading-relaxed">
                The final 1.7-kilometer approach leading directly to the homestay gate is a rustic, unpaved estate track currently undergoing road widening. Please review access specifications carefully below.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-amber-200 space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Suitable Vehicles</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Standard hatchbacks, sedans, compact SUVs, and 4x4 vehicles can drive up directly to our secure estate parking lawn.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-amber-200 space-y-2">
              <div className="flex items-center gap-2 text-stone-800 font-bold text-xs uppercase tracking-wider">
                <Info className="w-4 h-4 text-emerald-800 shrink-0" />
                <span>Restricted Vehicles</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Mini-buses and 12+ seater Tempo Travellers cannot enter due to narrow estate bends. Safe private parking is arranged at the main junction.
              </p>
            </div>
          </div>

          <div className="p-4 bg-amber-100/80 rounded-2xl border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-950">
                Host Shuttle & Pickup Service
              </p>
              <p className="text-xs text-amber-900">
                Off-road Jeep pickup & luggage transfer available from the main road meeting point upon arrival (additional charges apply).
              </p>
            </div>

            <a
              href={`tel:+${PLACEHOLDER_PHONE}`}
              className="shrink-0 inline-flex items-center gap-2 bg-[#1E3A2F] hover:bg-emerald-950 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Call Host for Live Directions
            </a>
          </div>
        </div>
      </div>

      {/* Connecting Major Cities & Transit Hubs */}
      <div className="space-y-6 pt-4">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-800 font-bold">Regional Connectivity</span>
          <h2 className="font-serif text-3xl font-bold text-[#1E3A2F]">Distances to Key Cities & Hubs</h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Convenient road access to major transit centres and tourist destinations across Kerala and Tamil Nadu.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {connectingCities.map((city, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-3 hover:border-emerald-700/40 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800 block mb-1">
                  {city.tag}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1E3A2F]">
                  {city.name}
                </h3>
              </div>
              <div className="pt-4 border-t border-stone-100 space-y-1">
                <p className="text-base font-bold text-stone-800 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                  {city.distance}
                </p>
                <p className="text-xs text-stone-500 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  {city.duration}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-md mx-auto text-center pt-4">
          <div className="bg-stone-100/80 p-5 rounded-2xl border border-stone-200">
            <p className="text-xs uppercase tracking-wider text-stone-500 font-bold">Nearest Local Bus Station</p>
            <p className="font-serif font-bold text-lg text-[#1E3A2F] mt-1">Marayoor Bus Station</p>
            <p className="text-xs text-stone-500 mt-0.5">Approx. 4 km (10 Mins Drive)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function GalleryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <GallerySection />
    </div>
  );
}

function BookPage({ queryStay }: { queryStay?: string }) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    { q: "What is included in the room/villa reservation?", a: "Accommodation covers lodging only. Food/meals, jeep pickup & drop, campfire & music setup, and off-road jeep safari are separate paid services." },
    { q: "How do I get the price/rates for my stay?", a: "Fill out the booking form on this page with your dates and guest count. You will receive real-time seasonal rates and availability directly via WhatsApp." },
    { q: "Is cook service available?", a: "Yes, cook-on-demand service is available for Breakfast and Dinner only. Grocery and raw food item costs are charged separately." },
    { q: "How do I finalize my booking?", a: "Submit the form to send a pre-formatted message on WhatsApp. Once dates and rates are confirmed, you can transfer a 50% advance token via UPI/Bank transfer." },
    { q: "What is the cancellation policy?", a: "Advance deposits are 100% refundable if cancelled 7 days prior to check-in. Within 7 days, date rescheduling is offered subject to availability." },
    { q: "Are pets allowed at the villa?", a: "Yes! We love pets. Since we have open estate gardens, pets can roam freely under your supervision." }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#1E3A2F] font-bold">Direct Inquiry</span>
        <h1 className="font-serif text-4xl font-bold text-[#1E3A2F]">Reserve Your Stay</h1>
        <p className="text-stone-600 text-sm sm:text-base">
          Connect directly with the host on WhatsApp for real-time rates and availability.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <BookingForm initialStay={queryStay || 'villa'} />
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        <h3 className="font-serif text-2xl font-bold text-[#1E3A2F] text-center">Frequently Asked Questions</h3>
        
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full text-left p-5 font-bold text-sm text-[#1E3A2F] flex items-center justify-between gap-4"
              >
                <span>{faq.q}</span>
                <ChevronRight className={`w-4 h-4 transition-transform ${activeFaq === idx ? 'rotate-90' : ''}`} />
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-5 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto bg-emerald-950 text-white rounded-3xl p-8 text-center space-y-4">
        <h3 className="font-serif text-2xl font-bold text-amber-200">Prefer Direct Assistance?</h3>
        <p className="text-xs text-stone-300">
          Feel free to call our host desk directly or send us an email inquiry.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <a
            href={`tel:+${PLACEHOLDER_PHONE}`}
            className="w-full sm:w-auto px-6 py-3 bg-amber-100 text-[#1E3A2F] rounded-xl font-bold text-xs flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call +{PLACEHOLDER_PHONE}</span>
          </a>
          <a
            href={`mailto:${PLACEHOLDER_EMAIL}`}
            className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium text-xs flex items-center justify-center gap-2 border border-white/20"
          >
            <ConciergeBell className="w-4 h-4" />
            <span>Email Host</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [currentPath, setCurrentPath] = useState('/');
  const [queryStay, setQueryStay] = useState('villa');
  const [policyModal, setPolicyModal] = useState<'terms' | 'privacy' | null>(null);

  const navigate = (fullPath: string) => {
    const [path, queryString] = fullPath.split('?');
    setCurrentPath(path || '/');

    if (queryString) {
      const params = new URLSearchParams(queryString);
      const stay = params.get('stay');
      if (stay) setQueryStay(stay);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-800 font-sans antialiased selection:bg-[#1E3A2F] selection:text-white flex flex-col justify-between">
      <Navbar currentPath={currentPath} navigate={navigate} />

      <main className="flex-grow">
        {currentPath === '/' && <HomePage navigate={navigate} />}
        {currentPath === '/stays' && <StaysPage navigate={navigate} />}
        {currentPath === '/experiences' && <ExperiencesPage />}
        {currentPath === '/gallery' && <GalleryPage />}
        {currentPath === '/location' && <LocationPage />}
        {currentPath === '/book' && <BookPage queryStay={queryStay} />}
      </main>

      <Footer navigate={navigate} onOpenPolicy={(type) => setPolicyModal(type)} />

      {/* Policy Modal */}
      {policyModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setPolicyModal(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-4 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="font-serif text-2xl font-bold text-[#1E3A2F]">
                {policyModal === 'terms' ? 'Terms & Conditions' : 'Privacy Policy'}
              </h3>
              <button 
                onClick={() => setPolicyModal(null)}
                className="p-2 hover:bg-stone-100 rounded-full text-stone-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs sm:text-sm text-stone-600 space-y-3 leading-relaxed">
              {policyModal === 'terms' ? (
                <>
                  <p><strong>1. Booking Enquiries & Confirmation:</strong> All reservations requested through this website operate as booking inquiries. Final confirmation and rates are provided directly by our host desk upon verification of date availability and receipt of advance token deposit.</p>
                  <p><strong>2. Check-in & Check-out:</strong> Standard check-in is 2:00 PM and check-out is 11:00 AM. Early check-in or late check-out is subject to prior availability.</p>
                  <p><strong>3. Estate Access & Road:</strong> The final 1.7 km approach road is an unpaved rustic forest road. Please review vehicle clearances prior to arrival. Jeep transfers from junction are available on request.</p>
                  <p><strong>4. Add-on Services:</strong> Food, cook-on-demand services, campfire, and jeep safaris are separate paid services not included in base room or villa reservations.</p>
                </>
              ) : (
                <>
                  <p><strong>1. Information Collection:</strong> We collect details (name, contact number, arrival/departure dates, guest count) strictly to format your reservation enquiry and connect you with our host team on WhatsApp.</p>
                  <p><strong>2. Data Protection:</strong> We do not sell, rent, or trade your personal booking details with third-party advertisers.</p>
                  <p><strong>3. Communication:</strong> Your contact number is used solely to share rates, confirm reservation status, send location coordinates, and assist during your stay at The WildWood Villa.</p>
                </>
              )}
            </div>

            <div className="pt-4 border-t border-stone-100 text-right">
              <button
                onClick={() => setPolicyModal(null)}
                className="px-6 py-2.5 bg-[#1E3A2F] text-white rounded-xl text-xs font-bold hover:bg-emerald-950 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}