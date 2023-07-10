// import React from 'react';

import './App.css';
// import { Routes, Route, Outlet, Link} from "react-router-dom";
import { Routes, Route, Link} from "react-router-dom";
import Sudoku from './Sudoku/Sudoku';
import Navbar from './NavBar/NavBar';
import Resume from "./Resume/Resume";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="sudoku" element={<Sudoku />} />
        <Route path="resume" element={<Resume />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>

  );
}

// function Layout() {
//   return (
//     <div>
//       {/* A "layout route" is a good place to put markup you want to
//           share across all the pages on your site, like navigation. */}
//       <nav>
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/sudoku">Sudoku</Link>
//           </li>
//         </ul>
//       </nav>

//       <hr />

//       {/* An <Outlet> renders whatever child route is currently active,
//           so you can think about this <Outlet> as a placeholder for
//           the child routes we defined above. */}
//       <Outlet />
//     </div>
//   );
// }

function Home() {
  return (
    <div>
      <h2>Home</h2>

      <div>
        <Resume />
      </div>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App;
