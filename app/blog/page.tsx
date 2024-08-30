import { title } from "@/components/primitives";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default async function BlogPage() {
  await sleep(1000); // Simulate a delay for loading data
  // You can add any data fetching logic here after the sleep
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();
  console.log(posts);
  return (
    <div>
      <h1 className={title()}>Blog</h1>
      <h1>blog {new Date().toLocaleTimeString()}</h1>
    </div>
  );
}
