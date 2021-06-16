import React, {useState, useEffect} from 'react'
import './Card.css';

const Loader = () => { // to show the laoder
  return (
      <div className="md:w-3/5 mx-auto p-4 text-center mb-4" style={{"width": "50px",
        "margin": "0 auto"}}>
          <svg class="animate-spin h-8 w-8 mx-auto text-purple-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
      </div>
  )
}

function ListCard() {
  const [cardData, setCardData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const handleFetch = (pageNum) => { //fetching data from api
    setIsLoading(true);
    fetch(`http://jsonplaceholder.typicode.com/posts?_start=0&_limit=10&_page=${pageNum}`)
    .then(res => res.json())
    .then(res => {
      setCardData(prevCard => { return [...prevCard,...res]})
      setIsLoading(false)
    })
  };

  const infiniteScroll = () => { //fetching data on scroll
    // End of the document reached?
    if (window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight){
      let newPage = page;
      newPage++
      setPage(newPage)
      handleFetch(newPage)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', infiniteScroll);
    handleFetch(page)
    return () => window.removeEventListener('scroll', infiniteScroll);
  },[page])

  return(
    <div>
      <h1>List</h1>
      {cardData.length > 0 && cardData.map((item) => {
        return (
          <div className="card">
            <div className="card-header">
              <p className="card-title">{item.title}</p>
            </div>
            <div className="body">
              <ul>
                <li>
                  <b>ID:</b> {item.id}
                </li>
                <li>
                  <b>user id</b>{item.userId}
                </li>
              </ul>
              <p>{item.body}</p>
            </div>
          </div>
        )
      }
      )}
      {isLoading && <Loader />}

    </div>
  )

}
export default ListCard