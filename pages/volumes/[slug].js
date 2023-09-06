import { volumes } from "../../lib/data";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Head from "next/head";
import { uid } from "uid";
import { styled } from "styled-components";

const PageWrapper = styled.div`
  padding: 20px;
`;

const BooksAndCoverWrapper = styled.div`
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  color: var(--color-clouds);
  display: flex;
  justify-content: space-around;
  gap: 50px;
  padding: 20px;
  margin: 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--color-earth);
`;

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
      <PageWrapper>
        <StyledLink href="/volumes">⬅ All Volumes</StyledLink>
        <h1>{currentVolume.title}</h1>
        <p>{currentVolume.description}</p>
        {/* <h3>Books:</h3> */}
        <BooksAndCoverWrapper $backgroundColor={currentVolume.color}>
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
        </BooksAndCoverWrapper>
        <br />
        {previousIndexSlug && (
          <StyledLink href={`/volumes/${previousIndexSlug}`}>
            Previous Volume
          </StyledLink>
        )}
        <br />
        {nextIndexSlug && (
          <StyledLink href={`/volumes/${nextIndexSlug}`}>
            Next Volume
          </StyledLink>
        )}
      </PageWrapper>
    </>
  );
}
