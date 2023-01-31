export default function(content: {
  title: string;
  description: string;
  image: string;
}) {
  useHead({ title: content.title });
  useServerSeoMeta({
    title: content.title,
    ogTitle: content.title,
    description: content.description,
    ogDescription: content.description,
    ogImage: content.image,
    twitterCard: "summary_large_image",
  });
}
