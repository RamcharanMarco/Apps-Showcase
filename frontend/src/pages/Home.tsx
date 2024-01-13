import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div className="home">
      <div className="banner">
        <h1>SHOWCASE</h1>
        <p>SHOW OF YOUR PROJECTS</p>
        <Link to='/signup'>get started</Link>
      </div>
      <main className='main1'>
        <h1>NEED TO SHOW OF YOUR PROJECTS</h1>
        <p>no need for a online portfolio as we got you covered</p>
        <p>Join millions and show of your projects online</p>
      </main>
      <main className='main2'>
        <h1>PROJECTS</h1>
        <p>3 types of projects</p>
        <div>
          <p>fullsytack</p>
          <p>backend</p>
          <p>frontend</p>
        </div>
        <Link to='/projects'>projects page</Link>
      </main>
    </div>
  )
}

export default Home