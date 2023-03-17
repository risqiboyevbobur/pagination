import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row, Table } from "react-bootstrap";

function App() {
  const [value, setValue] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recorPage = 5;
  const lastIndex = currentPage * recorPage;
  const firstIndex = lastIndex - recorPage;
  const records = value.slice(firstIndex, lastIndex);
  const npage = Math.ceil(value.length / recorPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const getData = () => {
    axios.get("http://localhost:4444/data").then((res) => {
      setValue(res?.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(value);
  return (
    <div className="App">
      <Container>
        <Row className="justify-content-center mt-5">
          <Col xs={5}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Country Name</th>
                </tr>
              </thead>
              <tbody>
                {records?.map((item) => (
                  <>
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                    </tr>
                    <tr></tr>
                  </>
                ))}
              </tbody>
            </Table>
            <nav>
              <ul className="pagination">
                <li className="page-item">
                  <a href="#!" onClick={prePage} className="page-link">
                    Prev
                  </a>
                </li>
                {numbers.map((n, i) => (
                  <li className={`page-item ${currentPage === n ? "active" : ""}`} key={i}>
                    <a href="#!" className="page-link" onClick={() => changePage(n)}>{n}</a>
                  </li>
                ))}
                   <li className="page-item">
                  <a href="#!" onClick={nextPage} className="page-link">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </Col>
        </Row>
      </Container>
    </div>
  );
  function nextPage() {
    if(currentPage !== lastIndex){
      setCurrentPage(currentPage +1)
    }
  }
  function prePage() {
    if(currentPage !== firstIndex){
      setCurrentPage(currentPage -1)
    }
  }
  function changePage(id) {
    setCurrentPage(id)
  }
}

export default App;

// import React from "react";
// import ReactPaginate from "react-paginate";
// import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
// import { IconContext } from "react-icons";
// import { useEffect, useState } from "react";
// import "./App.css";

// const App = () => {
//   const data = [
//     "Uzbekistan",
//     "Tadjikistan",
//     "Pakistan",
//     "Kazakistan",
//     "Turkmanistan",
//     "QaraKalpag'istan",
//     "Arabistan",
//     "Turkey",
//     "USA",
//     "Russia",
//     "British",
//     "China",
//     "Czech",
//     "British",
//     "Iraq",
//     "Brazil",
//     "Japan",
//     "Korea",
//     "Canada",
//     "Japan",
//     "Korea",
//     "Canada",
//     "Japan",
//     "Korea",
//     "Canada",
//     "Japan",
//     "Korea",
//     "Canada",
//     "Japan",
//     "Korea",
//     "Canada",
//     "Japan",
//     "Korea",
//     "Canada",
//     "Australia",
//   ];

//   const [page, setPage] = useState(0);
//   const [filterData, setFilterData] = useState();
//   const n = 3;

//   useEffect(() => {
//     setFilterData(
//       data.filter((item, index) => {
//         return (index >= page * n) & (index < (page + 1) * n);
//       })
//     );
//     //
//   }, [page]);

//   return (
//     <div className="App">
//       <ul>
//         {filterData &&
//           filterData.map((item, index) => (
//             <>
//               <thead>
//                 <tr>
//                   <th>First Name</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                 <td>{item}</td>
//                 </tr>
//               </tbody>
//             </>
//           ))}
//       </ul>
//       <ReactPaginate
//         containerClassName={"pagination"}
//         activeClassName={"active"}
//         pageClassName={"page-item"}
//         onPageChange={(event) => setPage(event.selected)}
//         breakLabel="..."
//         pageCount={Math.ceil(data.length / n)}
//         previousLabel={
//           <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
//             <AiFillLeftCircle />
//           </IconContext.Provider>
//         }
//         nextLabel={
//           <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
//             <AiFillRightCircle />
//           </IconContext.Provider>
//         }
//       />
//     </div>
//   );
// };

// export default App;
