/**
 * BlogPosts — "Our Most Popular Blog Posts" 3-col card row.
 * Each card: image, H3 22/800 uppercase, 2-line excerpt, Read More pill.
 */
const POSTS = [
  {
    title: "Top Benefits of Professional Drain Cleaning Services in Spring, TX",
    excerpt:
      "Regular drain maintenance stops clogs before they start and extends the life of your plumbing.",
  },
  {
    title: "How to Fix Common Faucet Problems in The Woodlands, TX",
    excerpt:
      "Leaky faucets waste up to 3,000 gallons a year. Here's when to repair and when to call a pro.",
  },
  {
    title: "Still Got It! Bear in the Field Solving Tough Sewer Line Issues",
    excerpt:
      "A behind-the-scenes look at how our crew tackled a root-invaded sewer line in under a day.",
  },
];

export default function BlogPosts() {
  return (
    <section className="section">
      <div className="container-1200">
        <h2 className="text-h2-desktop uppercase text-center mb-10">Our Most Popular Blog Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {POSTS.map((p) => (
            <article key={p.title} className="rounded-card overflow-hidden bg-brand-white shadow-card-soft">
              <div className="aspect-[4/3] bg-brand-gray-soft flex items-center justify-center text-brand-gray-text text-sm">
                {"{{POST IMAGE}}"}
              </div>
              <div className="p-6">
                <h3 className="text-h3-blog uppercase mb-3 text-brand-ink">{p.title}</h3>
                <p className="text-body-base text-brand-ink/80 mb-4">{p.excerpt}</p>
                <a href="#" className="btn btn-primary">Read More</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
