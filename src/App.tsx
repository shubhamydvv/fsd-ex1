import { useState, useEffect } from 'react';
import './App.css';

interface Post {
  id: number;
  title: string;
  body: string;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1>Experiment 1: API Integration</h1>
        <p>Fetching and displaying data from a backend REST API</p>
      </header>

      {loading && (
        <div className="status">
          <div className="spinner"></div>
          <p>Loading posts...</p>
        </div>
      )}

      {error && (
        <div className="status error">
          <p>Error: {error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="post-grid">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <span className="post-id">Post #{post.id}</span>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
