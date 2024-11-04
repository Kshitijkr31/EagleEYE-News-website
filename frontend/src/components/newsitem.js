import React from "react";

const NewsItem = (props) => {
  const {
    title = "No title available",
    description = "No description available",
    imageUrl,
    url,
    defaultImage,
    defaultDesc,
    author = "Unknown",
    date,
    source = "Unknown source",
  } = props;

  return (
    <div className='my-3'>
      <div className='card'>
        <span
          className='position-absolute top-0 start-translate-middle badge rounded-pill bg-danger'
          style={{ left: "50%", zIndex: "1" }}
        >
          {source}
        </span>
        <img
          src={!imageUrl ? defaultImage : imageUrl}
          className='card-img-top'
          alt='News'
          style={{ height: "200px" }}
        />
        <div className='card-body'>
          <h5 className='card-title'>
            {title}
            <span className='badge text-bg-info'> Trending</span>
          </h5>
          <p className='card-text'>{!description ? defaultDesc : description}...</p>
          <p className='card-text'>
            <small className='text-body-secondary'>
              By- {author} on {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            href={url}
            target='_blank'
            rel='noopener noreferrer'
            className='btn btn-sm btn-dark'
          >
            Read More..
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
