import { StoryDetails } from "../../components/CreateStory";
//create our story
const fetchCreateStory = async (details: StoryDetails): Promise<boolean> => {
  const url = `${import.meta.env.VITE_BASE_URL}/stories/`;
  //send off our request / will probably optimistically update our stories later
  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
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
