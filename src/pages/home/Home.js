import Header from '../../components/Header/Header';
import Introduction from '../../components/Introduction/Introduction';
import Highlights from '../../components/Highlights/Highlights';
import { Outlet } from 'react-router-dom';
import './Home.css';


function Home() {

  return (
    <div class="container-home">
      <Header/>
      <Outlet/>
      <Introduction/>
      <Highlights/> 
    </div>  
  );
}

export default Home;
