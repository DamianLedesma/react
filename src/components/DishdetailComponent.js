import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

    function RenderDish({dish}) {

        if (dish != null) {
            return (
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>
                            {dish.name}
                        </CardTitle>
                        <CardText>
                            {dish.description}
                        </CardText>
                    </CardBody>
                </Card>
            );
        }
        else {
            return(
                <div></div>
            );
        }
    }

    function RenderComments({dish}) {
        if (dish != null) {
            const comms = dish.comments.map(com => {
                const date = new Intl.DateTimeFormat('en-US', {
                    year:'numeric',
                    month:'short',
                    day:'2-digit'
                }).format(new Date(com.date))

                return (
                        <ul key={com.id} className="list-unstyled">
                            <li className="comment">{com.comment}</li>
                            <li className="author">-- {com.author}, {date}</li>
                        </ul>
                );
            })

            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <div>{comms}</div>
                </div>
            );
        }
        else {
            return(
                <div></div>
            )
        }
    }

    const DishDetail = (props) => {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish}/>
                    </div>
                        <RenderComments dish={props.dish}/>
                </div>
            </div>
        );    
    }
   
export default DishDetail;