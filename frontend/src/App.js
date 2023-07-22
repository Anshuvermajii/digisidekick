import { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './App.css';

import axios from "axios"
import Formedit from "./component/Formedit";

axios.defaults.baseURL = "http://localhost:8080/"

function App() {



  const [addSection, setAddsection] = useState(false)//for the pop-up form
  const [edit, setEdit] = useState(false)//or the pop-up form

  const [pageData, setPageData] = useState([])// for pagination
  const [page, setPage] = useState(1)// for pagination
  const [pageCount, setPageCount] = useState(0) // for pagination

  const [formData, setformData] = useState({ // create data



    name: "",
    email: "",
    mobile: "",
    password: ""


  })
  // edit state 
  const [formDataEdit, setformDataEdit] = useState({


    name: "",
    email: "",
    mobile: "",
    password: "",
    _id: ""


  })

  const [dataList, setDataList] = useState([])//show data in list
  //sorting functionality
  const [sortType, setSortType] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // Sort users based on sortType and sortOrder
  const sortedDataList = dataList.slice().sort((a, b) => {
    const sortValueA = a[sortType];
    const sortValueB = b[sortType];
    if (sortValueA < sortValueB) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (sortValueA > sortValueB) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });


  const handleSortTypeChange = (e) => {
    setSortType(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };
  





  //handle on change
  const handleOnChange = (e) => {

    const { value, name } = e.target
    setformData((preve) => {
      return {

        ...preve,
        [name]: value
      }
    })

  }

  //handle submit
  const handleSubmit = async (e) => {


    const data = await axios.post("/users", formData)
    console.log(data)
    if (data.data.success) {

      setAddsection(false)
      alert(data.data.message)
      getFetchData()

      setformData({
        name: "",
        email: "",
        mobile: "",
        password: ""

      })


    }


  }
  //show all data in list
  const getFetchData = async () => {


    const data = await axios.get("/users")
    console.log(data)
    if (data.data.success) {
      setDataList(data.data.data)


    }


  }
  //show Data
  useEffect(() => {
    getFetchData()

  }, [page])

  //delete method
  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id)
    alert(data.data.message)
    if (data.data.success) {

      getFetchData()
    }
  }
  //update method
  const handleUpdate = async (e) => {


    const data = await axios.put("/update/", formDataEdit)
    alert(data.data.message)
    if (data.data.success) {
      setEdit(false)
      getFetchData()
      setformDataEdit({
        name: "",
        email: "",
        mobile: "",
        password: ""

      })

    }
  }

  //handle change form data
  const handleEditOnChange = async (e) => {
    const { value, name } = e.target
    setformDataEdit((preve) => {
      return {

        ...preve,
        [name]: value
      }
    })
  }
  //handle edit form
  const handleEdit = (el) => {
    setformDataEdit(el)
    setEdit(true)
  }
  //handle next
  const handleNext = () => {
    if (page === pageCount) return page;
    setPage(page + 1)


  }

  const indexOfLastUser = page * 5;
  const indexOfFirstUser = indexOfLastUser - 5;
  const currentDataList = sortedDataList.slice(indexOfFirstUser, indexOfLastUser);


  //handlePrevious
  const handlePrevious = () => {
    if (page === 1) return page;
    setPage(page - 1)
  }
  //for pagination
  useEffect(() => {
    const pagedatacount = Math.ceil(dataList.length / 5)
    setPageCount(pagedatacount)

    if (page) {
      const LIMIT = 5;
      const skip = LIMIT * page
      const dataskip = dataList.slice(page === 1 ? 0 : skip - LIMIT, skip)
      setPageData(dataskip)
    }
  }, [dataList])
//component return
  return (
    <>

      <div className="container">

        <button className="btnn btn-add " onClick={() => setAddsection(true)} >Add</button>
        {/* start props coming data like input fields*/}

        {
          addSection && (
            <>
              <Formedit
                handleSubmit={handleSubmit}
                handleOnChange={handleOnChange}         //props
                handleClose={() => setAddsection(false)}
                rest={formData}
              />

            </>
          )}


        {

          edit && (
            <>
              <Formedit
                handleSubmit={handleUpdate}
                handleOnChange={handleEditOnChange}
                handleClose={() => setEdit(false)}
                rest={formDataEdit}

              />

            </>
          )}

          {/* end props coming input field data */}
          

        {/* sorting start  */}

        <div className="m-5 bl-2 ">
          <label>
            Sort By:
            <select value={sortType} onChange={handleSortTypeChange}>
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="mobile">Mobile</option>
              {/* Add other attributes based on your user data */}
            </select>
          </label>
          <label>
            Sort Order:
            <select value={sortOrder} onChange={handleSortOrderChange}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </label>
        </div>
        {/* sorting end  */}

        <div className="tableContainer">
          <table className="table table-borderd">
            {/* Render the data for the current page */}
            <thead>

              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Password</th>

              <th>Action</th>
            </thead>

            <tbody>

              {currentDataList[0] ? (
                currentDataList &&
                currentDataList.map((el, index) => {
                  return (
                    <tr key={el._id}>
                      <td>{index + 1}</td>
                      <td>{el.name}</td>
                      <td>{el.email}</td>
                      <td>{el.mobile}</td>
                      <td>{el.password ? <label className="text-black">HIDE</label> : <label className="text-black">HIDE</label>}</td>
                      <td>
                        <button className="btn btn-outline-primary me-3" onClick={() => { handleEdit(el) }}>
                          Edit
                        </button>
                        <button className="btn btn-outline-danger" onClick={() => { handleDelete(el._id) }}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5">
                    <h4>
                      <p className="text-danger">NO <span className="text-primary">DATA</span></p>
                    </h4>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
      </div>

      {/* ... Pagination component start ... */}
      <div>
        <nav aria-label="Page navigation example">
          <ul className="pagination ">
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                aria-label="Previous"
                onClick={handlePrevious}
                disabled={page === 1}
              >
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </a>
            </li>
            {Array(pageCount)
              .fill(null)
              .map((ele, index) => {
                return (
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      active={page === index + 1 ? true : false}
                      onClick={() => {
                        setPage(index + 1);
                      }}
                    >
                      {index + 1}
                    </a>
                  </li>
                );
              })}
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                aria-label="Next"
                onClick={handleNext}
                disabled={page === pageCount}
              >
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );

  // ... Other existing code

}


export default App;
