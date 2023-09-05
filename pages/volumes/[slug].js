import { volumes } from "../../lib/data";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Head from "next/head";
import { uid } from "uid";

export default function VolumeDetail() {
  const router = useRouter();
  const { slug } = router.query;
  console.log("slug: ", slug);

  const currentVolume = volumes.find((volume) => volume.slug === slug);

  const currentIndex = volumes.findIndex(
    (volume) => volume.slug === currentVolume.slug
  );

  const nextIndexSlug = volumes[currentIndex + 1]?.slug;
  const previousIndexSlug = volumes[currentIndex - 1]?.slug;

  return (
    <>
      <Head>
        <title>{currentVolume.title}</title>
      </Head>
      <Link href="/volumes">⬅ All Volumes</Link>
      <h1>{currentVolume.title}</h1>
      <p>{currentVolume.description}</p>
      <h3>Books:</h3>
      <ul>
        {currentVolume.books.map((book) => {
          return (
            <li key={uid()}>
              {book.ordinal}: {book.title}
            </li>
          );
        })}
      </ul>
      <Image
        src={currentVolume.cover}
        alt={`Cover of §{currentVolume.title}`}
        width={140}
        height={230}
      />
      <br />
      {previousIndexSlug && (
        <Link href={`/volumes/${previousIndexSlug}`}>Previous Volume</Link>
      )}
      <br />
      {nextIndexSlug && (
        <Link href={`/volumes/${nextIndexSlug}`}>Next Volume</Link>
      )}
    </>
  );
}
