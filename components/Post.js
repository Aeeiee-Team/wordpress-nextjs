import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getAuthor, getFeaturedImage } from '../lib/utils';
import parse from 'html-react-parser';

export default function Post({ post }) {
  const [postImgAndAuthor, setPostImgAndAuthor] = useState({ featImgUrl: '', author: '' });

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      const author = getAuthor(post.author);
      const featuredImg = getFeaturedImage(post.featured_media);

      //   resolve the promises in getAuthor and getFeaturedImg async functions using Promise.all
      Promise.all([author, featuredImg]).then((res) => {
        setPostImgAndAuthor({
          author: res[0],
          featImgUrl: res[1],
        });
      });
    }

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div>
      <Link href={`/post/${post.id}`}>
        <a className="text-4xl font-bold">
          <img className="excerpt-img mb-5" src={postImgAndAuthor ? postImgAndAuthor.featImgUrl : '/aeeiee-logo.png'} />
          {post.title.rendered}
        </a>
      </Link>
      <h4>{new Date(post.date).toDateString()}</h4>
      <div className="mt-2 relative">
        <div className="mb-2 max-w-lg">{parse(post.excerpt.rendered)}</div>

        <Link href={`/post/${post.id}`}>
          <a className="mt-3 text-blue-800 bottom-0">Continue reading</a>
        </Link>
      </div>
    </div>
  );
}
