import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>Lord of the Rings - The Ultimate Fan Page</h1>
      <Link href="./volumes/">Volumes Overview</Link>
    </div>
  );
}
