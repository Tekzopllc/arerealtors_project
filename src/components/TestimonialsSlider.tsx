import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const testimonials: Array<{
  name: string;
  location: string;
  text: string;
  image: string;
  role: string | null;
}> = [
  {
    name: "Emily R.",
    location: "Austin, Texas",
    text: "Selling a house is stressful, but AceRealtors made it so easy. I got matched with a top agent in Austin, and the best part? They already worked out a lower commission, so I did not even have to negotiate. Saved me a ton of money!",
    image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?auto=format&fit=crop&q=80&w=400&h=400",
    role: null
  },
  {
    name: 'James & Olivia W.',
    location: 'Miami, Florida',
    text: 'We had no idea where to start when selling our home, but AceRealtors took care of everything. They hooked us up with an amazing realtor in Miami and somehow got us a lower commission than the agent normally charges. It was super easy, and we saved a bunch!',
    image: 'https://th.bing.com/th/id/OIP.1dvjD36rvYLE0eXkl80OdwHaHa?rs=1&pid=ImgDetMain',
    role: null
  },
  {
    name: 'Sarah M.',
    location: 'Denver, Colorado',
    text: 'Honestly, I thought finding a good realtor would be a pain, but AceRealtors matched me with someone awesome. They knew the Denver market inside and out, and I ended up paying way less in commission than I expected. Totally worth it!',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=400&h=400',
    role: null
  },
  {
    name: 'David & Amanda L.',
    location: 'Los Angeles, California',
    text: "We wanted a solid realtor but didn't want to get ripped off on commission. AceRealtors came through big time! They connected us with one of the best agents in L.A., and we paid way less than we thought we would. Super happy with how everything worked out.",
    image: 'https://img.freepik.com/free-photo/young-happy-couple-home_144627-26872.jpg',
    role: null
  },
  {
    name: 'Jessica T.',
    location: 'Chicago, Illinois',
    text: "Took the quiz, got matched with a great agent, and sold my house fast. Seriously, that's it. No stress, no hassle—just super easy. Can't recommend AceRealtors enough!",
    image: 'https://media.istockphoto.com/id/1486674561/photo/young-woman-taking-a-selfie.webp?a=1&b=1&s=612x612&w=0&k=20&c=Cnf47gdBz2fpvF-bwegQUxTJl54dJGmc3qhiJJ1UE0o=',
    role: null
  },
  {
    name: 'Mark & Emily S.',
    location: 'Atlanta, Georgia',
    text: "A friend told us about AceRealtors, and I'm so glad they did. The quiz was quick, and we got matched with a fantastic agent who made the whole selling process smooth. If you're looking for a stress-free way to find a realtor, this is it.",
    image: 'https://i.pinimg.com/originals/9e/78/14/9e7814fe8050b3fbd0961c82a3ddf3d2.jpg',
    role: null
  },
  {
    name: 'Rachel H.',
    location: 'Phoenix, Arizona',
    text: "I didn't want to spend hours searching for a realtor, and thanks to AceRealtors, I didn't have to. They matched me with someone great, and everything just worked. Super easy, highly recommend!",
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400',
    role: null
  },
  {
    name: 'Brian C.',
    location: 'Seattle, Washington',
    text: "AceRealtors was a lifesaver. I had no idea how to find a good agent, but I took their quiz, got matched, and boom—house sold. Simple as that. I'd use them again in a heartbeat.",
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=400&h=400',
    role: null
  }
];

export default function TestimonialsSlider() {
  return (
    <div className="relative group">
      <div className="swiper-button-prev absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 bg-[#ff6b00] p-3 rounded-full shadow-lg cursor-pointer transition-all duration-300 hover:bg-[#ff6b00]/90 hover:scale-110 hover:shadow-xl" >
        <ChevronLeft className="w-8 h-8 text-white" />
      </div>
      
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={32}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
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
            <div className="bg-gray-50 p-8 rounded-lg h-full min-h-[360px]">
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="flex text-[#ff6b00] mb-1">
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

      <div className="swiper-button-next absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 bg-[#ff6b00] p-3 rounded-full shadow-lg cursor-pointer transition-all duration-300 hover:bg-[#ff6b00]/90 hover:scale-110 hover:shadow-xl">
        <ChevronRight className="w-8 h-8 text-white" />
      </div>
    </div>
  );
}