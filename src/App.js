import React, { useState, useEffect } from 'react';
import Button from './components/UI/Button';
import { FaAngleDoubleRight } from 'react-icons/fa'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tabs-project'

function App() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async function() {
    try {
      const res = await fetch(url);

      if (!res.ok) return

      const data = await res.json();

      setLoading(false);
      setJobs(data);
    } catch (err) {
      setError(err)
    }
  }

  if (loading) {
    return (
      <main>
      <section className='loading'>
        <p>
        Loading...
        </p>
      </section>
    </main>
    )
  }

  if (error) {
    return (
      <main>
        <section className='section'>
          <p>
            {error}, Refresh the page.
          </p>
        </section>
      </main>
    )
  }

  const changeJob = function(value) {
    setIndex(value)
  }

  const { id, order, dates, title, duties, company } = jobs[index];

  const jobDesc = duties.map(d => <p><span><FaAngleDoubleRight /></span>{d}</p>)

  const buttons = jobs.map((job, i) => <Button key={job.id} onClick={() => changeJob(i)} className={`jobs-btn ${index === i && 'active-btn'}`}>{job.company}</Button>);

  return (
    <main>
      <h1 className='title'>Experiences</h1>
      <section className='section two-col'>
    
        <div className='btns-cont'>
          {buttons}
        </div>
    
        <div className='job-cont'>
          <h2>{title}</h2>
          <div className='h3'>
            <h3 className="company">{company}</h3>
          </div>
          <h4>{dates}</h4>
          <div className="job-info">
           {jobDesc}
          </div>
        </div>
      </section>
    </main>
  )
}

export default App