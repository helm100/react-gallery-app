import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Nav from './pages/static/nav';
import PageNotFound from './pages/static/notfound';
import GalleryPage from './pages/static/galleryPage';
import pageIndex from './pages/index.json';

import {pageMapper} from './pages/pageIndex';

let date = new Date();

ReactDOM.render(
  <BrowserRouter className='Content'>
    <Routes>
      <Route path='/' element={<Nav />}>
        <Route index element={React.createElement(pageMapper[pageIndex[0].jsName])} />
        {pageIndex.map(p => {
          if (p.type === "text") {
            return <Route path={p.name} element={React.createElement(pageMapper[p.jsName])}/>;
          }
          else if (p.type === "gallery") {
            return (
              <Route path={p.name} element={<GalleryPage indexJson={pageMapper[p.jsName]} />}>
                <Route path=':pageNr' element={<GalleryPage indexJson={pageMapper[p.jsName]} />}>
                  <Route path=':imageId' element={<GalleryPage indexJson={pageMapper[p.jsName]} />} />
                </Route>
              </Route>
            );
          }
          else return <></>
        })}
        <Route path='*' element={<PageNotFound />} />
      </Route>
    </Routes>
    <footer className='Footer'>&copy; Alexa Meyerman {date.getMonth()+1}-{date.getFullYear()}</footer>
  </BrowserRouter>,
  document.getElementById('root')
);