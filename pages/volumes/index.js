import { introduction, volumes } from "../../lib/data";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { styled } from "styled-components";

const VolumeWrapper = styled.ul`
  background-color: hotpink;
`;

export default function Overview() {
  const router = useRouter();

  function handleClick() {
    const randomVolume = volumes[Math.floor(Math.random() * volumes.length)];
    router.push(`volumes/${randomVolume.slug}`);
  }

  return (
    <div>
      <Head>
        <title>Lord of the Rings</title>
      </Head>
      <h1>Lord of the Rings</h1>
      <p>{introduction}</p>
      <h2>All Volumes</h2>
      <VolumeWrapper>
        {volumes.map((volume) => {
          return (
            <li key={volume.slug}>
              <Link href={`/volumes/${volume.slug}`}>{volume.title}</Link>
            </li>
          );
        })}
      </VolumeWrapper>
      <button type="button" onClick={handleClick}>
        Show Random Volume
      </button>
    </div>
  );
}
