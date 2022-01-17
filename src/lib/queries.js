/**
 * Example of how you could re-use GROQ queries across different contexts with Javascript.
 * As your schema evolves, this pattern will be useful to keep your data in sync across all surfaces.
 */
export function getPostsQuery(extraFilter) {
  return /* groq */ `*[
    _type == "post" &&
    defined(slug.current) &&
    publishedAt < now()
    ${extraFilter ? `&& ${extraFilter}` : ''}
  ] | order(publishedAt desc) {
    _id,
    title,
    'date': publishedAt,
    excerpt,
    'slug': slug.current,
    'coverImage': mainImage.asset->,
      'author': author->{name, twitter, image},
      "numberOfCharacters": length(pt::text(body)),
      "estimatedWordCount": round(length(pt::text(body)) / 5),
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
      'categories': categories[]->{title,slug,icon},
      'tags': tags[]->{title,slug,icon},
      'technologies': technologies[]->{title,slug,icon}
  }`
}

export const globalQuery = `'global': *[_type == 'global'][0]{...,author->{...}}`
export const pageQuery = `'page': *[_type == 'page' && slug.current == $slug][0]{...}`
export const sectionsQuery = `'sections': *[_type == "section"] | order(weight asc){
     title,
     slug,
     description
    }`

/**
 * You can also re-use parts of projections as fragments.
 * In this case, we're defining that, to render an author card, we need their name, slug & image.
 */
export const AUTHOR_CARD_FRAGMENT = `
name,
slug,
image,
`
