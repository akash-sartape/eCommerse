
import { useEffect } from 'react';
import axios from 'axios'
import './App.css';
import { useState } from 'react';
import ReactPaginate from "react-paginate"; 





function App() {

  const [item, setitem] = useState([])
  
  const [selected, setSelected] = useState("all");
  // console.log(selected)


  useEffect(() => {
    axios({
      method: "GET",
      url: "https://ecommerse-service-node.herokuapp.com/item"
    }).then((itemdata) => {
      // console.log(itemdata);
      setitem(itemdata.data)
    }).catch((err) => {
      console.log(err)
    })



  }, [])
//  paginate
  const [PageNumber, SetPageNumber] = useState(0);
  const UsersPerPage = 10;
  const PagesVisited = PageNumber * UsersPerPage;
  const pageCount = Math.ceil(item.length / UsersPerPage);
  const changepage = ({ selected }) => {
    SetPageNumber(selected);
};

  var DisplayItems =
    item.filter((serachid) => {
      // filter with searchdata
      if (selected === "all") {
        return serachid;
      } else if (
        
        serachid.item_catagory===selected  ) {
         
         
        return serachid;
      }
      // return serachid
    }) //display users per page

      .map((itemdata, i) => {
        return (

          <div key={i} className="container" popupdata={itemdata.discription}>
            <div className="itemcart">
              <div className="itemheading">
                <h4> {itemdata.item_name}</h4>
              </div>
              <img src={itemdata.item_image} alt="imagpic"></img>

              <div className="itemprice">
                {"Actual Price RS. " + itemdata.actual_price}<br></br>
                <b><i> {"Discounted Price RS. " + itemdata.discounted_price}</i></b>
              </div>
              <button >Add to cart</button>
              <button >Buy Now</button>
            </div>

          </div>
        )
      }).slice(PagesVisited, PagesVisited + UsersPerPage);


  return (<>

    <div className='searchbox'>
      <select name="cars" id="cars" onChange={(e) => setSelected(e.target.value || null)}
        value={selected || ""}>
        <option value="all">All</option>
        <option value="Electronic">Electronic</option>
        <option value="Home_App">Home Appliances</option>
        <option value="Skin_Product">Skin Product</option>

      </select>
    </div>
    {DisplayItems}
    <ReactPaginate //pagination inbuilt module
                    previousLabel={"<"}
                    nextLabel={">"}
                    pageCount={pageCount}
                    onPageChange={changepage}
                    containerClassName={"paginationbutton"}
                    previousLinkClassName={"previousbutton"}
                    nextLinkClassName={"nextbutton"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                />


  </>

  )


}

export default App;
