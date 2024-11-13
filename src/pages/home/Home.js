import Header from '../../components/Header/Header';
import Introduction from '../../components/Introduction/Introduction';
import Sports from '../../components/Sports/Sports';

import { Outlet } from 'react-router-dom';

import './Home.css';

function Home() {

  return (
    <div class="container-home">
      <Header/>
      <Outlet/>
      <Introduction/>
      <Sports/>
    </div>  
  );
}

export default Home;
