import { volumes } from "../../lib/data";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Head from "next/head";
import { uid } from "uid";
import { styled } from "styled-components";
import Chevron from "@/icons/chevron-left.svg";
import ArrowLeft from "@/icons/arrow-left.svg";
import ArrowRight from "@/icons/arrow-right.svg";

const PageWrapper = styled.div`
  padding: 0px;
  font: var(--font-body);
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

const BooksWrapper = styled.ul`
  list-style: none;
`;

const ListEntry = styled.li``;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
`;

export default function VolumeDetail() {
  const router = useRouter();
  const routerSlug = router.query.slug;

  const currentIndex = volumes.findIndex(
    (volume) => volume.slug === routerSlug
  );
  const currentVolume = volumes[currentIndex];

  const nextIndexSlug = volumes[currentIndex + 1]?.slug;
  const previousIndexSlug = volumes[currentIndex - 1]?.slug;

  return (
    <>
      <Head>
        <title>{currentVolume.title}</title>
      </Head>
      <PageWrapper>
        <StyledLink href="/volumes">
          <Chevron /> All Volumes
        </StyledLink>
        <h1>{currentVolume.title}</h1>
        <p>{currentVolume.description}</p>
        {/* <h3>Books:</h3> */}
        <BooksAndCoverWrapper $backgroundColor={currentVolume.color}>
          <BooksWrapper>
            {currentVolume.books.map((book) => {
              return (
                <li key={uid()}>
                  {book.ordinal}
                  <br />
                  {book.title}
                </li>
              );
            })}
          </BooksWrapper>
          <Image
            src={currentVolume.cover}
            alt={`Cover of §{currentVolume.title}`}
            width={140}
            height={230}
          />
        </BooksAndCoverWrapper>
        <br />
        <Nav>
          {previousIndexSlug && (
            <div>
              <ArrowLeft />
              <StyledLink href={`/volumes/${previousIndexSlug}`}>
                Previous Volume
                {volumes[currentIndex - 1].title}
                <br />
              </StyledLink>
            </div>
          )}
          <br />
          {nextIndexSlug && (
            <div>
              <StyledLink href={`/volumes/${nextIndexSlug}`}>
                Next Volume
                {volumes[currentIndex + 1].title}
              </StyledLink>
              <ArrowRight />
            </div>
          )}
        </Nav>
      </PageWrapper>
    </>
  );
}
