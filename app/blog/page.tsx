import { title } from "@/components/primitives";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default async function BlogPage() {
  await sleep(5000); // Simulate a delay for loading data
  // You can add any data fetching logic here after the sleep

  return (
    <div>
      <h1 className={title()}>Blog</h1>
    </div>
  );
}
