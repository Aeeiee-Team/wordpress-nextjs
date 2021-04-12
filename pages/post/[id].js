import Footer from '../../components/Footer';
import axios from 'axios';
import parse from 'html-react-parser';
import { getAuthor, getFeaturedImage } from '../../lib/utils';
import { POSTS_API_URL } from '../../lib/constants';
import Head from 'next/head';

export default function Post({ title, featuredImg, author, content, date }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center flex-1 px-20 py-10 max-w-5xl m-auto">
        <h1 className="text-6xl font-bold mt-5 mb-5 text-center">{title}</h1>
        <p className="text-sm">Written by {author}</p>
        <p className="text-sm">Published on {new Date(date).toDateString()}</p>

        <div className="mt-5">
          {/* {parse(content, {
            replace: (domNode) => {
              if (domNode.name === 'p') return <p className="mt-5">{domNode.data}</p>;
              // console.log(domNode)
            },
          })} */}
          {parse(content)}
        </div>
      </main>
      <Footer />
    </div>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await axios.get(POSTS_API_URL);
  const posts = res.data;

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await axios.get(`${POSTS_API_URL}/${params.id}`);
  const post = await res.data;

  const featuredImg = await getFeaturedImage(post.featured_media);
  const author = await getAuthor(post.author);

  // Pass post data to the page via props
  return {
    props: { title: post.title.rendered, content: post.content.rendered, featuredImg, author, date: post.date },
  };
}
