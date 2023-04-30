import React from "react";

import BlogCard from "./BlogCard";

import "./BlogsList.css";

const BlogsList = (props) => {
  

  if (props.items.length === 0) {
    return (
      <div className="center">
        <div>
          <h2>No Blogs found.</h2>
        </div>
      </div>
    );
  }

  return (
    <ul className="blogs-list">

      {props.items.map((blog) => {
        
          return (
            <BlogCard
              key={blog.id}
              id={blog.id}
              title={blog.title}
              content={blog.content}
              authorId={blog.author.id}
              author={blog.author.name}
              updatedAt={blog.updatedAt}
              createdAt={blog.createdAt}
              readMode={false}
            />
          );
        
      })}
    </ul>
  );
};

export default BlogsList;
