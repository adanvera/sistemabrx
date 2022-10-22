import React from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom';

function DetailsTicket() {

    const { id } = useParams();

    return (
        <div className="main-content">
            <Container fluid={true} className="">
                DetailsTicket {id}
            </Container>
        </div>
    )
}

export default DetailsTicket