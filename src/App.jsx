
import { useState } from "react";
import uisbLogo from "./assets/UISB-actual-logo.png";
import "./App.css";

function App() {
  // Control which application is displayed
  const [activeTab, setActiveTab] = useState("students");

  // Student registration states
  const [studentName, setStudentName] = useState("");
  const [course, setCourse] = useState("");
  const [students, setStudents] = useState([]);

  // Blog application states
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);

  // Add a student
  function addStudent(e) {
    e.preventDefault();

    if (!studentName.trim() || !course.trim()) {
      alert("Please enter the student name and course.");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: studentName.trim(),
      course: course.trim(),
    };

    setStudents([...students, newStudent]);
    setStudentName("");
    setCourse("");
  }

  // Delete a student
  function deleteStudent(id) {
    setStudents(students.filter((student) => student.id !== id));
  }

  // Create a blog post
  function addPost(e) {
    e.preventDefault();

    if (!postText.trim()) return;

    const newPost = {
      id: Date.now(),
      content: postText.trim(),
      likes: 0,
    };

    setPosts([newPost, ...posts]);
    setPostText("");
  }

  // Like a post
  function likePost(id) {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );
  }

  // Delete a post
  function deletePost(id) {
    setPosts(posts.filter((post) => post.id !== id));
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="topbar">
        <div className="brand">
          <img src={uisbLogo} alt="UISB Logo" />
          <div>
            <h2>UISB</h2>
            <span>Student Community Portal</span>
          </div>
        </div>

        <span className="header-label">UNIVERSITY OF IBADAN</span>
      </header>

      {/* Welcome Section */}
      <section className="welcome-section">
        <p className="eyebrow">UNIVERSITY OF IBADAN SCHOOL OF BUSINESS</p>
        <h1>Welcome to the UISB Community</h1>
        <p>
          Manage student registrations and connect with your
          academic community.
        </p>
      </section>

      {/* Navigation */}
      <nav className="tabs">
        <button
          className={activeTab === "students" ? "active" : ""}
          onClick={() => setActiveTab("students")}
        >
          Student Registration
        </button>

        <button
          className={activeTab === "blog" ? "active" : ""}
          onClick={() => setActiveTab("blog")}
        >
          Community Blog
        </button>
      </nav>

      <main className="content">
        {activeTab === "students" && (
          <section>
            <div className="section-heading">
              <div>
                <p className="eyebrow">STUDENT MANAGEMENT</p>
                <h2>Student Registration</h2>
                <p>Register and manage UISB students.</p>
              </div>

              <div className="stat-card">
                <strong>{students.length}</strong>
                <span>Registered Students</span>
              </div>
            </div>

            <form className="form-card" onSubmit={addStudent}>
              <h3>Register a New Student</h3>

              <label>Student Name</label>
              <input
                type="text"
                placeholder="Enter student's full name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />

              <label>Course</label>
              <input
                type="text"
                placeholder="Enter course of study"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              />

              <button type="submit" className="primary-btn">
                + Register Student
              </button>
            </form>

            <div className="list-card">
              <h3>Registered Students</h3>

              {students.length === 0 ? (
                <p className="empty-state">
                  No students registered yet. Add your first student above.
                </p>
              ) : (
                <div className="student-list">
                  {students.map((student) => (
                    <div className="student-item" key={student.id}>
                      <div className="avatar">
                        {student.name.charAt(0).toUpperCase()}
                      </div>

                      <div className="student-info">
                        <strong>{student.name}</strong>
                        <span>{student.course}</span>
                      </div>

                      <button
                        className="delete-btn"
                        onClick={() => deleteStudent(student.id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {activeTab === "blog" && (
          <section>
            <div className="section-heading">
              <div>
                <p className="eyebrow">STUDENT COMMUNITY</p>
                <h2>UISB Community Blog</h2>
                <p>Share ideas and engage with your community.</p>
              </div>

              <div className="stat-card">
                <strong>{posts.length}</strong>
                <span>Published Posts</span>
              </div>
            </div>

            <form className="form-card" onSubmit={addPost}>
              <h3>Create a Post</h3>

              <textarea
                placeholder="What's happening in the UISB community?"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                rows="4"
              />

              <button type="submit" className="primary-btn">
                Publish Post
              </button>
            </form>

            <div className="list-card">
              <h3>Community Feed</h3>

              {posts.length === 0 ? (
                <p className="empty-state">
                  No posts yet. Be the first to share something!
                </p>
              ) : (
                <div className="post-list">
                  {posts.map((post) => (
                    <article className="post-item" key={post.id}>
                      <div className="post-author">
                        <div className="avatar">U</div>
                        <div>
                          <strong>UISB Community Member</strong>
                          <span>Community post</span>
                        </div>
                      </div>

                      <p className="post-content">{post.content}</p>

                      <div className="post-actions">
                        <button onClick={() => likePost(post.id)}>
                          ♥ Like ({post.likes})
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => deletePost(post.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      <footer>
        <p>© 2026 UISB Student Community Portal</p>
        <span>University of Ibadan School of Business</span>
      </footer>
    </div>
  );
}

export default App;
