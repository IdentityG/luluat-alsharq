"use client";

import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import FadeIn from "@/components/animations/FadeIn";

const IMAGES = [
  { src: "/images/gallery/1.jpg", alt: "Gallery image 1" },
  { src: "/images/gallery/2.jpg", alt: "Gallery image 2" },
  { src: "/images/gallery/3.jpg", alt: "Gallery image 3" },
  { src: "/images/gallery/4.jpg", alt: "Gallery image 4" },
  { src: "/images/gallery/5.jpg", alt: "Gallery image 5" },
  { src: "/images/gallery/6.jpg", alt: "Gallery image 6" },
];

export default function Gallery() {
  return (
    <section className="py-20 lg:py-28 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="text-center mb-16">
          <FadeIn>
            <Badge dot className="mb-4">Our Gallery</Badge>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Glimpses of <span className="text-gradient">Success</span>
            </h2>
          </FadeIn>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {IMAGES.map((image, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="relative aspect-square overflow-hidden rounded-2xl glass border border-white/10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
