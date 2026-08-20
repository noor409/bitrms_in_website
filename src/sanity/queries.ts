export const servicesQuery = `*[_type == "service"] | order(order asc){
  "slug": slug.current, title, shortTitle, icon, summary, heroKicker,
  heroImage, features, benefits, useCases, body
}`;

export const serviceBySlugQuery = `*[_type == "service" && slug.current == $slug][0]{
  "slug": slug.current, title, shortTitle, icon, summary, heroKicker,
  heroImage, features, benefits, useCases, body
}`;

export const projectsQuery = `*[_type == "project"] | order(year desc){
  "slug": slug.current, title, client, location, year, summary, outcomes,
  coverImage, "serviceSlug": service->slug.current
}`;

export const projectsByServiceQuery = `*[_type == "project" && service->slug.current == $slug] | order(year desc){
  "slug": slug.current, title, client, location, year, summary, outcomes,
  coverImage, "serviceSlug": service->slug.current
}`;

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0]{
  "slug": slug.current, title, client, location, year, summary, outcomes,
  coverImage, body, "serviceSlug": service->slug.current
}`;

export const postsQuery = `*[_type == "post"] | order(publishedAt desc){
  "slug": slug.current, title, excerpt, category, author, publishedAt,
  coverImage, body
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  "slug": slug.current, title, excerpt, category, author, publishedAt,
  coverImage, body
}`;

export const testimonialsQuery = `*[_type == "testimonial"]{name, company, quote, photo}`;

export const certificationsQuery = `*[_type == "certification"] | order(year desc){name, issuer, year, logo}`;

export const clientLogosQuery = `*[_type == "clientLogo"] | order(order asc){name, url, logo, category}`;

export const recognitionQuery = `*[_type == "recognition"] | order(order asc){name, url, logo}`;

export const jobsQuery = `*[_type == "jobOpening"] | order(_createdAt desc){
  title, department, location, type, description
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  companyName, tagline, email, phone, address, linkedin, twitter, logo
}`;

export const homePageQuery = `*[_type == "homePage"][0]{
  heroKicker, heroTitle, heroSubtitle, stats
}`;

export const aboutPageQuery = `*[_type == "aboutPage"][0]{
  mission, vision, values
}`;
