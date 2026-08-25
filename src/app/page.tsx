import { hero } from '@/content/site';

export default function Home() {
  return (
    <main>
      <h1>{hero.title}</h1>
      <p>{hero.body}</p>
      <p>{hero.status}</p>
    </main>
  );
}
