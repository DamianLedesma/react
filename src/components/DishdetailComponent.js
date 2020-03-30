import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {

    constructor(props) {
        super(props);
    }



    renderDish(dish) {

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

    renderComments(comments) {
        if (comments != null) {
            const comms = comments.map((com) => {
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

    render() {
        return (
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.selectedDish)}
                </div>
                    {this.renderComments(this.props.selectedComments)}
            </div>
        );
    }

}
   
export default DishDetail;