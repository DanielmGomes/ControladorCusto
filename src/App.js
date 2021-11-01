import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Home from './components/pages/Home'
import About from './components/pages/About'
import Contact from './components/pages/Contact'
import NewProject from './components/pages/NewProject'
import Projects from './components/pages/Projects'
import Project from './components/pages/Project'

import Container from './components/layout/Container'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

function App() {
  return (
      
      <Router>
        <Navbar />
        <Switch>
          <Container customClass="min-height">

            <Route exact path='/'>
              <Home/>
            </Route>
            <Route path='/about'>
              <About/>
            </Route>
            <Route path='/contact'>
              <Contact/>
            </Route>
            <Route path='/newProject'>
              <NewProject/>
            </Route>
            <Route path='/projects'>
              <Projects/>
            </Route>
            <Route exact path='/project/:id'>
              <Project/>
            </Route>

          </Container>
        </Switch>
        <Footer />
      </Router>
        
  )
}

export default App;
