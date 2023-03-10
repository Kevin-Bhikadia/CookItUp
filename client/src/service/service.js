import axios from "axios";
import { useState } from "react";

const url = "http://localhost:9000/api";

export const authenticateSignup = async (user) => {
  try {
    return await axios.post(`${url}/signup`, user);
  } catch (error) {
    console.log("Error while calling signup api", error);
  }
};

export const authenticateLogin = async (user) => {
  try {
    return await axios.post(`${url}/login`, user);
  } catch (error) {
    console.log("Error while calling login api", error);
  }
};

export const recipeDelete = async(recipe) => {
  try {
    console.log(recipe);
      await axios.post(`${url}/recipe/delete`, recipe);
      
  }
  catch(error) {
      console.log('Error while calling medicine delete api', error);
  }
}
