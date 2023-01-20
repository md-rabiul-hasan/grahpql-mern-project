import React from 'react'
import {  useQuery } from '@apollo/client'
import Spinner from '../Spinner';
import { GET_PROJECTS } from '../../queries/projectQueries';
import ProjectRow from './ProjectRow';

export default function Projects() {

  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <Spinner />;
  if (error) return <p>Somethings went wrong</p>;
  return (
    <>
      {
        data.projects.length > 0 ? (
          <div className='row mt-4'>
            {
              data.projects.map((project) => {
                return <ProjectRow key={project.id} project={project} />
              })
            }
          </div>
        ) : (<p>No Project Found !</p>)
      }
    </>
  )
}
