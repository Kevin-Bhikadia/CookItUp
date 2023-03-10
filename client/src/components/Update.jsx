import { Card, Button, Row, Col } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { recipeDelete } from '../service/service';
import axios from "axios";
import Speech from "react-speech";
import { useHistory } from "react-router-dom";


const url = "http://localhost:9000/api";


const timeStyle = {
  display: "flex",
  gridTemplateColumns: "1fr 1fr",
  gap: "5px",
};

const buttonStyle = {
  display: "flex",
  justifyContent: "center",
  alignItem: "center",
};

const clockStyle = {
  fontSize: "20px",
  display: "flex",
  justifyContent: "center",
  alignItem: "center",
};

const titleStyle = {
  display: "flex",
  justifyContent: "space-between",
};


const speechstyle = {
  play: {
    hover: {
      backgroundColor: "black",
      color: "white",
    },
    button: {
      padding: "4",
      fontFamily: "Helvetica",
      fontSize: "1.0em",
      cursor: "pointer",
      pointerEvents: "none",
      outline: "none",
      backgroundColor: "inherit",
      border: "none",
    },
  },
};

const type_color = {
  'veg': 'success', 
  'nonveg': 'danger', 
  'vegan': 'warning'
}
const del_recipe = {
  '_id': ""
}
const RecipeCard = () => {
  const [recipes, setRecipes] = useState([]);
  const [ recDel, setRecDel ] = useState(del_recipe);
  useEffect(() => {
    fetchdata();
    console.log(recipes);
  }, []);
  const fetchdata = async () => {
    try {
      await axios.get(`${url}/recipe/search`, {}).then((res) => {
        setRecipes(res.data);
      });
    } catch (err) {
      console.log("Error while finding User", err);
    }
  };
  // const history = useHistory();
  const clickHandlerDelete = (e) => {
    console.log(e);
    setRecDel({...recDel, [e.target.name]: e.target.value});
    console.log(recDel);
    recipeDelete(recDel);
    // history.push("/");
  }
  return (
    <Row xs={1} md={3} className="g-4 mx-auto" style={{margin: '3% 3%'}}>
      {recipes.map((recipe) => (
        <Col className="mb-3">
          <Card style={{ width: "auto",padding: "20px", height: "40rem", borderWidth: '2px'}} key={recipe.id} className="mx-auto d-flex shadow-lg" border={type_color[recipe.type]}>
            <Card.Img variant="top" style={{height: "50%"}} src={recipe.photo} />
            <Card.Body >
              <Card.Title style={titleStyle}>
                <p className="mr-4">{recipe.name}</p>
                <Speech
                  text={recipe.name}
                  style={speechstyle}
                  textAsButton={true}
                  displayText="Click to Hear"
                />
              </Card.Title>
              <hr />
              <Card.Text>
                <div className="d-flex justify-content-around">
                  <div style={timeStyle} className="d-flex align-items-start">
                    <AiOutlineClockCircle style={clockStyle} />
                    <p>{recipe.time}</p>
                  </div>
                  <p>{recipe.type}</p>
                  <p>{recipe.difficulty}</p>
                </div>
              </Card.Text>
              <Card.Text>{recipe.introduction}</Card.Text>
              <Row  >
              <div style={buttonStyle, {marginLeft: "5%", marginTop: 5 }} >
                <Link to={`/recipe/${recipe._id}`}>
                  <Button variant="primary">Go to Recipe</Button>
                </Link>
                </div>
                <div style={buttonStyle, {marginLeft: "5%", marginTop: 5 }} >
                <Button variant="primary"  onClick={(e) =>clickHandlerDelete(e)} value = {recipe._id} name = "_id" >Delete</Button>
              </div>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default RecipeCard;
