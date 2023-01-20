import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries';
import ClientInfo from '../components/client/ClientInfo';
import ProjectDelete from '../components/project/ProjectDelete';
import ProjectEdit from '../components/project/ProjectEdit';
import { FaEdit } from 'react-icons/fa';

export default function ProjectDetails() {

  const [editMode, setEditMode] = useState(false);

  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id }
  });

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <div className='mx-auto w-75 card p-5'>
          <Link to='/' className='btn btn-light btn-sm w-25 d-inline ms-auto'>
            Back
          </Link>

          <h1>{data.project.name}</h1>
          <p>{data.project.description}</p>

          <h5 className='mt-3'>Project Status</h5>
          <p className='lead'>{data.project.status}</p>

          <ClientInfo client={data.project.client} />


          {
            editMode ? (<ProjectEdit project={data.project} setEditMode={setEditMode} />) : (
              <div className='d-flex mt-5 ms-auto'>
                <button className='btn btn-danger m-2' onClick={() => setEditMode(true)}>
                  <FaEdit className='icon' /> Edit Project
                </button>
              </div>
            )
          }


          <ProjectDelete projectId={id} />
        </div>
      )}
    </>
  );
}
