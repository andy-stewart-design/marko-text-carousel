const marqueeImages = [
  { id: "a", src: "/image-marquee/1.jpg", aspectRatio: "1/1", color: "teal" },
  { id: "b", src: "/image-marquee/2.jpg", aspectRatio: "4/5", color: "coral" },
  { id: "c", src: "/image-marquee/3.jpg", aspectRatio: "1/1", color: "violet" },
  {
    id: "d",
    src: "/image-marquee/4.jpg",
    aspectRatio: "4/3",
    color: "marigold",
  },
  { id: "e", src: "/image-marquee/5.jpg", aspectRatio: "4/5", color: "violet" },
  { id: "g", src: "/image-marquee/7.jpg", aspectRatio: "1/1", color: "violet" },
  { id: "f", src: "/image-marquee/6.jpg", aspectRatio: "4/5", color: "violet" },
  { id: "h", src: "/image-marquee/8.jpg", aspectRatio: "4/3", color: "violet" },
  { id: "i", src: "/image-marquee/9.jpg", aspectRatio: "4/5", color: "violet" },
  {
    id: "j",
    src: "/image-marquee/10.jpg",
    aspectRatio: "4/3",
    color: "violet",
  },
  {
    id: "k",
    src: "/image-marquee/11.jpg",
    aspectRatio: "4/5",
    color: "violet",
  },
  {
    id: "l",
    src: "/image-marquee/12.jpg",
    aspectRatio: "1/1",
    color: "violet",
  },
];

type MarqueeImage = (typeof marqueeImages)[number];

export { marqueeImages, type MarqueeImage };
