import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage/errorMessage';
import CharacterPage from '../characterPage/characterPage';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import gotService from '../../services/gotService';
import './app.css';




export default class App extends Component {

    gotService = new gotService();

    state = {
        showRandomChar: true,
        error: false,
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage />
        }

        const char = this.state.showRandomChar ? <RandomChar /> : null;

        return (
            <>
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{ size: 5, offset: 0 }}>
                            {char}
                            <button
                                onClick={this.toggleRandomChar}
                                color="primary"
                                className="toggleBtn"
                            >
                                Toggle random character
                            </button>
                        </Col>
                    </Row>
                    <CharacterPage />
                    <Row>
                        <Col md='6'>
                            <ItemList 
                                onItemSelected={this.onItemSelected} 
                                getData={this.gotService.getAllBooks}
                                renderItem={(item) => item.name} />
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar} />
                        </Col>

                        
                            <Col md='6'>
                                <ItemList 
                                    onItemSelected={this.onItemSelected} 
                                    getData={this.gotService.getAllHouses}
                                    renderItem={(item) => item.name } />
                            </Col>
                            <Col md='6'>
                                <CharDetails charId={this.state.selectedChar} />
                            </Col>
                        
                    </Row>
                </Container>
            </>
        );
    }
};

