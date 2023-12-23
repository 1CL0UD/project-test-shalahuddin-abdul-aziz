import './App.css';
import Banner from './components/Banner';
import Header from './components/Header';
import PostList from './components/PostList';

function App() {
  return (
    <>
      <div className="flex flex-col">
        <Header />
        <Banner />
      </div>
      <div className="flex flex-col">
        <PostList />
      </div>
    </>
  );
}

export default App;
