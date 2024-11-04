import React, { useEffect, useState } from "react";
import NewsItem from "./newsitem";
import PropTypes from "prop-types";
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from "./Spinner";
import Navbar from "./NavBar";




const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = (isOpen) => {
    setMenuOpen(isOpen);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - EagleEye News`;
    updatenews();
    //eslint-disable-next-line
  }, [props.category]);
  // constructor(props) {
  //   super(props);



  // async componentDidMount() {
    // this.setState({ loading: true }); // Set loading to true when fetching data
    // let Url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=3bb8bacca7304cafa171e36d6ca37842&page=1&pageSize=${props.pageSize}`;
    // let data = await fetch(Url);
    // let parseData = await data.json();
    // console.log(parseData);
    // this.setState({ articles: parseData.articles, totalResults: parseData.totalResults, loading: false }); // Set loading to false when data is fetched
  // }

  const updatenews = async () => {
    try {
      props.setProgress(10);
      const Url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apikey=3bb8bacca7304cafa171e36d6ca37842&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true);
      let data = await fetch(Url);
      props.setProgress(30);
      let parseData = await data.json();
      props.setProgress(70);
      console.log('API response:', parseData);  // Log the response
      if (parseData.articles) {
        setArticles(parseData.articles);
        setTotalResults(parseData.totalResults);
      } else {
        console.error('No articles found in response:', parseData);
      }
      setLoading(false);
      props.setProgress(100);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
    }
  };
    // this.setState({
    //   articles: ,
    //   totalResults: ,
    //   loading: false,
    // });
   

  // handlePreviousClick = async () => {
  //   console.log("previous");
  //   // this.setState({ loading: true });
  //   // let Url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=3bb8bacca7304cafa171e36d6ca37842&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
  //   // let data = await fetch(Url);
  //   // let parseData = await data.json();
  //   // console.log(parseData);
  //   // this.setState({
  //   //   page: this.state.page - 1,
  //   //   articles: parseData.articles,
  //   //   loading: false
  //   // });
  //   this.setState({ page: this.state.page - 1 });
  //   this.updatenews();
  // };

  // handleNextClick = async () => {
  //   console.log("next");
  //   // if (!this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)) {
  //   //   return;
  //   // } else {
  //   //   this.setState({ loading: true });
  //   //   let Url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=3bb8bacca7304cafa171e36d6ca37842&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
  //   //   let data = await fetch(Url);
  //   //   let parseData = await data.json();
  //   //   console.log(parseData);
  //   //   this.setState({
  //   //     page: this.state.page + 1,
  //   //     articles: parseData.articles,
  //   //     loading: false
  //   //   });
  //   // }
  //   this.setState({ page: this.state.page + 1 });
  //   this.updatenews();
  // };


  const fetchMoreData = async () => {
    try {
      setPage(page + 1);
      const Url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apikey=3bb8bacca7304cafa171e36d6ca37842&page=${page + 1}&pageSize=${props.pageSize}`;
      let data = await fetch(Url);
      let parseData = await data.json();
      console.log('API response:', parseData);  // Log the response
      if (parseData.articles) {
        setArticles(articles.concat(parseData.articles));
        setTotalResults(parseData.totalResults);
      } else {
        console.error('No articles found in response:', parseData);
      }
    } catch (error) {
      console.error('Error fetching more news:', error);
    }
  };
    // this.setState({
    //   articles: ,
    //   totalResults: ,
    // });
  // };
  


  
    const defaultImages = [
      "https://media.istockphoto.com/id/1313303632/video/breaking-news-template-intro-for-tv-broadcast-news-show-program-with-3d-breaking-news-text.jpg?s=640x640&k=20&c=S0dTZp37XKVcCAnoguMnRatvv4Nkp2cjmA5aYOOrJs8=",
    ];
    const defaultDesc = [
      "Latest news update that happens in the world - check this read more for more details and information",
    ];

    return (
      <>
        <Navbar onToggleMenu={handleToggleMenu} />
        <div className='news-container' style={{ marginTop:menuOpen ? '103vw' : '56px' }}>
          <div className='container my-3'>
            <h1 className='head1 text-center' style={{ fontSize: "3.5vw",color:"white" }}>
              EagleEye - Top {capitalizeFirstLetter(props.category)} Headlines
            </h1>

            {loading && <Spinner />}
        {!loading && articles.length === 0 && <p>No articles found</p>}
            
                <InfiniteScroll
                  dataLength={articles.length}
                  next={fetchMoreData}
                  hasMore={articles.length !== totalResults}
                  loader={<Spinner />}
                >


              <div className="container">
                <div className='row' style={{ marginTop: "2vw" }}>
                  {articles.map((article) => (
                    <div
                      className='col-md-4'
                      key={article.url}
                      style={{ marginBottom: "20px" }}
                    >
                      <NewsItem
                        title={article.title ? article.title : ""}
                        description={article.description ? article.description : ""}
                        imageUrl={article.urlToImage}
                        url={article.url}
                        defaultImage={defaultImages[0]}
                        defaultDesc={defaultDesc[0]}
                        author={article.author}
                        date={article.publishedAt}
                        source={article.source.name}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </InfiniteScroll>
            
          {/* <div className='container d-flex justify-content-between'>
            <button
              disabled={this.state.page <= 1}
              className='btn btn-primary'
              style={{
                fontSize: "18px",
                backgroundColor: "black",
                color: "white",
              }}
              type='button'
              onClick={this.handlePreviousClick}
            >
              &larr; Previous Page
            </button>
            <button
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / props.pageSize)
              }
              className='btn btn-primary'
              style={{
                fontSize: "18px",
                backgroundColor: "black",
                color: "white",
              }}
              type='button'
              onClick={this.handleNextClick}
            >
              Next Page &rarr;
            </button>
          </div> */}
              </div>
      </div>
      </>
    );
  };



News.defaultProps = {
  country: "us",
  pageSize: 6,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
