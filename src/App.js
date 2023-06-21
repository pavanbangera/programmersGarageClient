
import './App.css';
import Carosel from './components/Carosel';
import Course from './components/Course';
import CourseListItem from './components/CourseListItem';
import Navbar from './components/Navbar';
import Tutorial from './components/Tutorial';
import CourseState from './context/Course/CourseState';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TutorialState from './context/Tutorial/TutorialState';
import NotFound from './components/NotFound';
import Blog from './components/Blog';
import BlogState from './context/Blog/BlogState';
import BlogItem from './components/BlogItem';
import TutorialItem from './components/TutorialItem';
import SearchModal from './components/SearchModal';
import { useRef } from 'react';
import SearchState from './context/Search/SearchState';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import AuthState from './context/Auth/AuthState';
import BugsWorld from './components/BugsWorld';
import BugsState from './context/Bugs/BugsState';
import BugsWorldItem from './components/BugsWorldItem';
import AlertBox from './components/AlertBox'
import AlertState from './context/alert/AlertState'
import TopBarLoader from './components/TopBarLoader';
import Contact from './components/Contact';
import Verify from './components/Verify';


function App () {

  const ref1 = useRef(null)

  const handleSearchBoxClick = () => {
    ref1.current.click();
  };

  return (
    <div className="App">
      <BrowserRouter>
        <AlertState>
          <AuthState>
            <CourseState>
              <TutorialState>
                <BlogState>
                  <SearchState>
                    <BugsState>
                      <Navbar handleSearchBoxClick={handleSearchBoxClick} />
                      <TopBarLoader />
                      <AlertBox />
                      <SearchModal ref={ref1} />
                      <Routes>
                        <Route exact path='/' element={<> <Carosel /><Course heading="Latest Courses" home="home" /></>} ></Route>
                        <Route exact path='/course' element={<Course />}></Route>
                        <Route exact path='/course/:id' element={<CourseListItem />}></Route>
                        <Route exact path='/course/:id/:name' element={<CourseListItem />}></Route>
                        <Route exact path='/tutorial' element={<Tutorial />}></Route>
                        <Route exact path='/tutorial/:id' element={<TutorialItem />}></Route>
                        <Route exact path='/blog/' element={<Blog />}></Route>
                        <Route exact path='/blog/:id' element={<BlogItem />}></Route>
                        <Route exact path='/login' element={<LoginPage />}></Route>
                        <Route exact path='/signup' element={<SignupPage />}></Route>
                        <Route exact path='/bugs' element={<BugsWorld />}></Route>
                        <Route exact path='/bugs/:bg' element={<BugsWorldItem />}></Route>
                        <Route exact path='/contact' element={<Contact />}></Route>
                        <Route exact path='/user/verify/:id' element={<Verify />}></Route>
                        <Route path='/*' element={<NotFound />}></Route>
                      </Routes>
                      <Footer />
                    </BugsState>
                  </SearchState>
                </BlogState>
              </TutorialState>
            </CourseState>
          </AuthState>
        </AlertState>
      </BrowserRouter>

    </div>
  );
}

export default App;
