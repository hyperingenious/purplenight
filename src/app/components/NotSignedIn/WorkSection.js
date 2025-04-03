import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SmallBlogCard from "./SmallBlogCard";

const data = [
  {
    blog_link:
      "https://purplenight.live/shared/blogs/public/67db4e9b00216bc38209",
    image_link:
      "https://cloud.appwrite.io/v1/storage/buckets/6700e87a00391724d5a6/files/67a653530034a5babc2d/view?project=66dbf6d3002ec04e3664&project=66dbf6d3002ec04e3664&mode=admin",
    book_image_link:
      "https://purplenight.live//compress-cats/98.jpg",
    blog_content:
      "Venus, the dazzling morning and evening star, has captivated humanity for millennia. Its beauty, often mistaken for a celestial beacon of hope and even life, has fueled countless myths and stories throughout history.",
    book_name: "Cosmos",
    author_name: "Carl Sagan",
    blog_title: "The Mystery of Venus: The Tale of Scientific Misconception",
  },
  {
    blog_link:
      "https://purplenight.live/shared/blogs/public/67db4e2d003df41e51d1",
    image_link:
      "https://cloud.appwrite.io/v1/storage/buckets/6700e87a00391724d5a6/files/67b19438001d80a5ffd9/view?project=66dbf6d3002ec04e3664&project=66dbf6d3002ec04e3664&mode=admin",
    book_image_link:
      "https://purplenight.live/compress-cats/91.jpg",
    blog_content: `There's a certain irony in the way Dostoevsky uses the term "noble house" in Crime and Punishment. It's not referring to some grand mansion, but rather to a rather ordinary, even tawdry, lodging house in St. Petersburg. The "noble house" belongs to a German woman, Laviza Ivanovna, who prides herself on her "noble behavior" and her "noble house.`,
    book_name: "Crime and Punishment",
    author_name: "Fyodor Dostoevsky",
    blog_title: 'The Shame of a "Noble House"',
  },
  {
    blog_link: "https://purplenight.live/blog/67479b1b0027a180ed68",
    image_link:
      "https://cloud.appwrite.io/v1/storage/buckets/6700e87a00391724d5a6/files/67479b190012e81f2b1a/view?project=66dbf6d3002ec04e3664&project=66dbf6d3002ec04e3664&mode=admin",
    book_image_link:
      "https://purplenight.live//compress-cats/33.jpg",
    blog_content:
      `Bill Gates, the name synonymous with Microsoft and the personal computer revolution, takes us on a captivating journey into the future of communication and information in his 1995 book, "The Road Ahead." This book, written before the internet became a household name, paints a vivid picture of a world transformed by the "information highway," a concept that foreshadows today's interconnected digital landscape.`,
    book_name: "The Road Ahead",
    author_name: "Bill Gates",
    blog_title:
      "The Information Highway: A Visionary Journey Through the Dawn of the Digital Age",
  },
];

function WorkSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} id="work" className="py-12 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-xl font-semibold mb-6">Blog Examples</h3>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"} 
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 }, 
            },
          }}
        >
          {data.map((props, i) => (
            <motion.a
              key={i}
              href={props.blog_link}
              target="_blank"
              rel="noopener noreferrer"
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.9 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              className="block"
            >
              <SmallBlogCard {...props} />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default WorkSection;