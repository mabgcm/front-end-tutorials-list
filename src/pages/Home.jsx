import AddTutorial from '../components/AddTutorial';
import TutorialList from '../components/TutorialList';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Home = () => {
  //define the state to transfer the data fetching from Api:
  const [tutorials, setTutorials] = useState();

  const url = 'https://cw-axios-example.herokuapp.com/api/tutorials';

  // setting up a function to fetch the data from Api:
  const getTutorials = async () => {
    try {
      const { data } = await axios.get(url);
      // Updating the fethced data
      setTutorials(data);
    } catch (error) {
      console.log(error);
    }
  };

  // request the data only when the component is mounted (in order to prevent loop-the data fetching and updating the state repatedly)
  useEffect(() => {
    getTutorials();
  }, []);

  console.log(tutorials);

  // posting the data to Api
  const addTutorial = async (tutorial) => {
    try {
      // taking key&value of the post from AddTutorial.js line:13
      await axios.post(url, tutorial);
    } catch (error) {
      console.log('error');
    }
    // refreshing the TutorialList.js after submitting the new data
    getTutorials();
  };

  //! DELETE (delete)
  const deleteTutorial = async (id) => {
    try {
      await axios.delete(`${url}/${id}`); //get the syntax from Api wth Postman
    } catch (error) {
      console.log(error);
    }
    getTutorials();
  };

  //! Update (PUT:Whole Update,PATCH :Partially Update)
  const editTutorial = async (id, title, desc) => {
    // filter->selects | map->updates
    // const filtered = tutorials.filter((tutor) => tutor.id === id).map(() => ({ title: title, description: desc }));
    // sending the edited data to Api

    // const filtered = tutorials
    //   .filter((tutor) => tutor.id === id)
    //   .map((item) => ({ title: title, description: desc }));

    try {
      await axios.put(`${url}/${id}`, { title, description: desc });
    } catch (error) {
      console.log(error);
    }
    getTutorials();
  };

  return (
    <>
      {/* Adding addTutorial function to AddTutorial.js App */}
      <AddTutorial addTutorial={addTutorial} />
      {/* Sending the 'tutorials' prop to the child component. */}
      <TutorialList
        tutorials={tutorials}
        deleteTutorial={deleteTutorial}
        editTutorial={editTutorial}
      />
    </>
  );
};

export default Home;
