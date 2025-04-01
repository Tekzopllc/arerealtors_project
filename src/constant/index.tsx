import { user1, user2, user3, user4, user5, user6 } from "../assets";

export const testimonials: Array<{
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
    image: user1,
    role: null,
  },
  {
    name: "James & Olivia W.",
    location: "Miami, Florida",
    text: "We had no idea where to start when selling our home, but AceRealtors took care of everything. They hooked us up with an amazing realtor in Miami and somehow got us a lower commission than the agent normally charges. It was super easy, and we saved a bunch! The whole process was smooth and stress-free. We couldn't be happier with the results!",
    image: user2,
    role: null,
  },
  {
    name: "Sarah M.",
    location: "Denver, Colorado",
    text: "Honestly, I thought finding a good realtor would be a pain, but AceRealtors matched me with someone awesome. They knew the Denver market inside and out, and I ended up paying way less in commission than I expected. Totally worth it!",
    image: user3,
    role: null,
  },
  {
    name: "David & Amanda L.",
    location: "Los Angeles, California",
    text: "We wanted a solid realtor but didn't want to get ripped off on commission. AceRealtors came through big time! They connected us with one of the best agents in L.A., and we paid way less than we thought we would. Super happy with how everything worked out. The marketing was top-notch, and we got multiple offers within weeks. Couldn't have asked for a better experience!",
    image: user4,
    role: null,
  },
  {
    name: "Jessica T.",
    location: "Chicago, Illinois",
    text: "Took the quiz, got matched with a great agent, and sold my house fast. Seriously, that's it. No stress, no hassle—just super easy. Can't recommend AceRealtors enough!",
    image: user5,
    role: null,
  },
  {
    name: "Mark & Emily S.",
    location: "Atlanta, Georgia",
    text: "A friend told us about AceRealtors, and I'm so glad they did. The quiz was quick, and we got matched with a fantastic agent who made the whole selling process smooth. If you're looking for a stress-free way to find a realtor, this is it. The commission savings were a nice surprise. We'd definitely use AceRealtors again if we need to sell another property.",
    image: user6,
    role: null,
  },
];
