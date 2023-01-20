import React from 'react'
import AddClientModal from './../components/client/ClientAdd';
import ProjectList from './../components/project/Projects';
import ClientList from './../components/client/Clients';
import AddProjectModal from './../components/project/ProjectAdd';

export default function Home() {
    return (
        <>
            <div className='d-flex gap-3 mb-4'>
                <AddClientModal />
                <AddProjectModal />
            </div>
            <ProjectList />
            <hr />
            <ClientList />
        </>
    )
}
