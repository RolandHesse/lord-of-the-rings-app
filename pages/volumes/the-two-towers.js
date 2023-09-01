import { volumes } from "../../lib/data";
import Link from "next/link";
import { uid } from "uid";
import Image from "next/image";

const volume = volumes.find(({ slug }) => slug === "the-two-towers");

export default function TheTwoTowers() {
  return (
    <>
      <Link href="/volumes">⬅ All Volumes</Link>
      <h1 style={{ color: `${volume.color}` }}>{volume.title}</h1>
      <p>{volume.description}</p>
      <h3>Books:</h3>
      <ul>
        {volume.books.map((book) => {
          return (
            <li key={uid()}>
              {book.ordinal}: {book.title}
            </li>
          );
        })}
      </ul>
      <Image
        src={volume.cover}
        alt={`Cover of §{volume.title}`}
        width={140}
        height={230}
      />
      <br />
      <br />
      <Link href="/volumes/the-fellowship-of-the-ring">
        Previous Volume
      </Link>{" "}
      <Link href="/volumes/the-return-of-the-king">Next Volume</Link>
    </>
  );
}
