/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { GetStaticProps } from 'next';
import Link from 'next/link';

import { FiCalendar, FiUser } from 'react-icons/fi';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import Header from '../components/Header';
import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results?: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  return (
    <>
      <main className={commonStyles.container}>
        <Header />

        <div className={styles.postsContainer}>
          {postsPagination?.results.map(post => (
            <Link key={post.uid} href={`/posts/${post.uid}`}>
              <a className={styles.post}>
                <strong>{post.uid}</strong>
                <p>{post.data.subtitle}</p>
                <ul>
                  <li>
                    <FiCalendar />
                    {post.first_publication_date}
                  </li>
                  <li>
                    <FiUser />
                    {post.data.author}
                  </li>
                </ul>
              </a>
            </Link>
          ))}
          <button type="button">Carregar mais posts</button>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      fetch: ['posts.title', 'posts.content'],
      pageSize: 100,
    }
  );

  const posts = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: new Date(
        post.first_publication_date
      ).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    };
  });

  return {
    props: {
      results: posts,
      next_page: postsResponse.next_page,
    },
  };
};
