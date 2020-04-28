import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Col, Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger} from 'react-animation-components';

    function RenderDish({dish}) {

        if (dish != null) {
            return (
                <FadeTransform in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                    <Card>
                        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>
                                {dish.name}
                            </CardTitle>
                            <CardText>
                                {dish.description}
                            </CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            );
        }
        else {
            return(
                <div></div>
            );
        }
    }

    function RenderComments({comments, postComment, dishId}) {
        if (comments != null) {                             
            const comms = comments.map((comment) => {
                const date = new Intl.DateTimeFormat('en-US', {
                    year:'numeric',
                    month:'short',
                    day:'2-digit'
                }).format(new Date(comment.date))

                return (
                        <ul key={comment.id} className="list-unstyled">
                            <Stagger in>
                                <Fade in>
                                    <li className="comment">{comment.comment}</li>
                                    <li className="author">-- {comment.author}, {date}</li>
                                </Fade>
                            </Stagger>
                        </ul>
                );
            })

            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <div>{comms}</div>
                    <CommentForm dishId={dishId} postComment={postComment} />
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
        if ( props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );  
        }
        else if (props.dish != null)
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                                <h3>{props.dish.name}</h3>
                                <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish}/>
                        </div>
                            <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id} />
                    </div>
                </div>
            );    
    }
   
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);


class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen 
        })
    }

    handleSubmit(value) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, value.rating, value.author, value.comment)
    }

    render () {
        return(
            <>
                <Button outline type="submit" onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(value) => this.handleSubmit(value)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" xs={12}>Rating</Label>
                                <Col>
                                    <Control.select model=".rating" className="form-control" name="rating" id="rating">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" xs={12}>Your Name</Label>
                                <Col>
                                        <Control.text validators={{required, minLength: minLength(3), maxLength: maxLength(15)}} model=".author" className="form-control" name="author" placeholder="Your Name" id="author" />
                                        <Errors className="text-danger" model=".author" show="touched" messages={{required: 'Required. ', minLength: 'The author\'s name should be at least 3 characters long.', maxLength: 'The author\'s name should be 15 characters max.'}} />
                                </Col>
                           </Row>
                           <Row className="form-group">
                                <Label htmlFor="comment" xs={12}>Comment</Label>
                                <Col>
                                    <Control.textarea model=".comment" className="form-control" name="comment" rows="6" id="comment" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

export default DishDetail;