import { Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    "name": "David",
    "location": "FL",
    "text": "I can't thank AceRealtors enough! They connected me with an amazing agent and helped me save a ton with a lower commission rate. The whole process was so smooth, and I really felt supported and guided the entire time. Highly recommend them!",
    "image": 'assets/clent1.webp',
    "role": null,
  },
  {
    "name": "Michael and Sarah",
    "location": "CA",
    "text": "I'm so glad I worked with AceRealtors! They paired me with a great agent and even helped me lower my commission rate, which was a huge win. It was a stressful time, but they made everything feel easy and took care of me throughout. Can't thank them enough!",
    "image": 'assets/client3.webp',
    "role": null,
  },
  {
    "name": "James",
    "location": "TX",
    "text": "AceRealtors made selling my home so much easier. They found me a fantastic agent and helped me secure a lower commission rate, which saved me a lot of money. I'm really grateful for their help and couldn't have asked for a better experience!",
    "image": 'assets/clent2.webp',
    "role": null,
  },
  {
    name: 'Emily W.',
    location: 'Tampa, FL',
    text: 'Our agent helped us sell our vacation home for 15% above asking price. Their local market knowledge and staging suggestions made all the difference.',
    image: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?auto=format&fit=crop&q=80&w=400&h=400',
    role: 'Real Estate Investor'
  },
  {
    name: 'Michael P.',
    location: 'Manhattan, NY',
    text: 'Relocating from overseas was daunting, but AceRealtors made it seamless. They found us the perfect apartment and handled everything while we were still abroad.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400',
    role: 'Finance Executive'
  },
  {
    name: 'Sarah L.',
    location: 'Los Angeles, CA',
    text: "Our agent's expertise in luxury properties was evident. They helped us find a stunning home in Beverly Hills and negotiated terms that exceeded our expectations.",
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=400&h=400',
    role: 'Entertainment Producer'
  },
  {
    name: 'David H.',
    location: 'Naples, FL',
    text: 'The team at AceRealtors helped us find the perfect retirement home. Their patience and attention to our specific needs made the process enjoyable and stress-free.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400&h=400',
    role: 'Retired Executive'
  },
  {
    name: 'James K.',
    location: 'Brooklyn, NY',
    text: 'Found the perfect brownstone thanks to AceRealtors. They understood exactly what we were looking for and helped us navigate the complex NYC market with ease.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400',
    role: 'Business Owner'
  }
];

export default function TestimonialsSlider() {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={32}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
        speed: 500,
      }}
      speed={500}
      breakpoints={{
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
      className="testimonials-swiper"
    >
      {testimonials.map((testimonial, index) => (
        <SwiperSlide key={index}>
          <div className="bg-gray-50 p-8 rounded-lg h-full">
            <div className="flex items-center mb-6">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <div className="flex text-primary mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.role}</div>
              </div>
            </div>
            <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
            <div className="text-sm text-gray-500">{testimonial.location}</div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}