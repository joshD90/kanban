import { StoryDetails } from "../../components/CreateStory";
//create our story
const fetchCreateStory = async (details: StoryDetails): Promise<boolean> => {
  console.log(details);
  const url = `${import.meta.env.VITE_BASE_URL}/stories/`;
  //send off our request / will probably optimistically update our stories later
  //check all through our objects to see whether they are null
  if (
    Object.entries(details).some(([key, value]) => {
      if (value === null || value === undefined) return true;
    })
  )
    //return false from our function if so
    return false;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(details),
    });
    if (!response) throw Error("No Created Response was returned from Server");
    const data = await response.json();
    console.log(data);
    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return false;
    }
    console.log(error);
    return false;
  }
};

export default fetchCreateStory;
