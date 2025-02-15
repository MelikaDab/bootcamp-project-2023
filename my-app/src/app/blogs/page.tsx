import React from "react";
import BlogPreview from "@/components/blogPreview";
import blogSchema from "@/database/blogSchema";
import style from "./blog.module.css";
import connectDB from "@/helpers/db";

export default async function Blogs() {
  const blogs = await Blog();
  if (blogs == null) {
    return (
      <main>
        <div className={style.blog}>
          <h1 className={style.pageTitle}>Blog</h1>
          <p>No blogs currently.</p>
        </div>
      </main>
    );
  } else {
    return (
      <main>
        <div>
          <h1 className={style.pageTitle}>Blogs</h1>
          {blogs.map((blog) => (
            <BlogPreview
              key={blog.title}
              title={blog.title}
              description={blog.description}
              date={blog.date}
              slug={blog.slug}
              image={blog.image}
              content={blog.content}
              comments={blog.comments}
            />
          ))}
        </div>
      </main>
    );
  }
}

async function Blog() {
  await connectDB(); // function from db.ts before

  try {
    // query for all blogs and sort by date
    const blogs = await blogSchema.find().sort({ date: -1 }).orFail();
    // send a response as the blogs as the message
    return blogs;
  } catch (err) {
    return null;
  }
}
