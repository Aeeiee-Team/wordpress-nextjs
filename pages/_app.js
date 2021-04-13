import '../styles/globals.css'
import { getAllPostsFromServer } from '../lib/utils';
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }) {

  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    let mounted = true;

    if (mounted) {
      const postsFromServer = await getAllPostsFromServer();
      setPosts(postsFromServer);
    }

    return () => (mounted = false);
  }, []);

  return <Component posts={posts} {...pageProps} />
}

export default MyApp
