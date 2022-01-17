import { getPostsQuery,pageQuery} from '$lib/queries'
import { client } from '$lib/sanityClient'
import formatISO9075 from 'date-fns/formatISO9075/index.js';
import isSameMonth from 'date-fns/isSameMonth/index.js';
import isSameYear from 'date-fns/isSameYear/index.js';

// Fetch all valid posts & authors to display in the homepage
export async function get() {
  const data = await client.fetch(/* groq */ `{
    ${pageQuery},
		"posts": ${getPostsQuery()}
  }`,
    { slug: "/blog" })

  const { page, posts } = data;
  if (data) {
    return {
      status: 200,
      body: {page,  posts}
    }
  }

  return {
    status: 500,
    body: new Error('Internal Server Error')
  }
}
function getPostsByMonth(posts) {
  return posts.reduce((postsByDate, post) => {
    const exists = postsByDate.find((p) => {
      const newDate = new Date(post.date);
      const existingDate = new Date(p.date);
      return isSameMonth(newDate, existingDate) && isSameYear(newDate, existingDate);
    });

    if (exists) {
      exists.posts.push(post);
    } else {
      const date = new Date(post.date);

      postsByDate.push({
        date: formatISO9075(date, { representation: 'date' }),
        posts: [post]
      });
    }

    return postsByDate;
  }, []);
}
